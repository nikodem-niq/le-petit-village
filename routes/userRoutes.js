const express = require('express');
const router = express.Router();
const pg = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const {verifyToken} = require('../middlewares/auth');
require('dotenv').config();

const pool = new pg.Pool({
    connectionString: process.env.PGURI,
    ssl: {
      rejectUnauthorized: false
    }
  });

router.post('/delete', verifyToken, (req,res,next) => {
const { id } = req.body;
console.log(id);
let query = `DELETE FROM users WHERE id = ${id}`;
pool.connect().then((client) => {
    client.query(query, (err,response) => {
    console.log(query);
    client.release();
    if(err) {
        res.status(403).send(err)
    } else {
        res.status(200).send(response);
    }
    })
})
})

router.get('/fetch', verifyToken, (req,res,next) => {
    pool.connect().then(client => {
        let query;
        if(req.query.id) {
            query = `SELECT * FROM users WHERE id = ${req.query.id}`;
        } else {
            query = `SELECT * FROM users ORDER BY id ASC`;
        }
        client.query(query, (err,response) => {
            client.release();
            if(err) {
                res.status(403).send(err);
            } else {
                res.status(200).send(response);
            }
        })
    }).catch(err => {
        res.status(403).send(err);
    }) 
})

router.post('/update', (req,res,next) => {
    pool.connect().then(client => {
        let { oldPassword, newPassword, id } = req.body;
        console.log(oldPassword,newPassword,id);
        client.query(`SELECT password FROM users WHERE id = ${id}`, (err,response) => {
            if(err) {
                res.status(400).send(err)
            } else {
                bcrypt.compare(oldPassword,response.rows[0].password, (err, same) => {
                    if(same) {
                        bcrypt.genSalt(10, (err,salt) => {
                            if(!err) {
                                bcrypt.hash(newPassword, salt, (err, hashed) => {
                                    if(err) {
                                        res.status(400).send('err with hash');
                                    } else {
                                        // change user in db
                                        client.query(`UPDATE users SET password = '${hashed}' WHERE id = ${id}`, (err, response) => {
                                            if(err) {
                                                res.status(400).send(err);
                                            } else {
                                                res.status(200).send(response);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    } else {
                        res.status(400).send(err);
                    }
                })
            }
            client.release();
        })
    }).catch(err => {
        res.status(400).send(err);
        client.release();
    })
})

  // User auth and register
router.post('/register', verifyToken, async (req,res,next) => {
    const { login, password }= req.body;
    pool.connect().then(client => {
        let query = `SELECT 'login' FROM "users" WHERE "login" LIKE '${login}'`;
        console.log(query)
        client.query(query).then(response => {
            client.release();
            if(!response.rowCount < 1) {
                res.status(config.loginOrEmailExists.code).json(config.loginOrEmailExists.message)
            } else {
                // Hash passwords
                bcrypt.genSalt(10, (err,salt) => {
                    if(!err) {
                        bcrypt.hash(password, salt, (err, hashed) => {
                            if(err) {
                                res.status(400).send('err with hash');
                                // client.release();
                            } else {
                                // Insert user into db
                                client.query(`INSERT INTO users(login, password, "dateCreated") VALUES('${login}', '${hashed}', 'NOW()')`, (err, response) => {
                                    // client.release();
                                    const token = jwt.sign({ login }, process.env.SECRET_JWT, { expiresIn: '6h' });
                                    res.status(config.registered.code).json({message: config.registered.message, token})
                                })
                            }
                        })
                    }
                })
            }
        }).catch(err => {
            res.status(403).send(err)
            // client.release();
        })
    });

    // Check if user with { login } exists.

})

router.post('/auth', (req,res,next) => {
    const { login, password } = req.body;

    pool.connect().then(client => {
        client.query(`SELECT 'login','password' FROM "users" WHERE "login" LIKE '${login}'`).then(response => {
            client.release();
            if(!response.rowCount > 0) {
                res.status(config.badLoginOrPassword.code).json(config.badLoginOrPassword.message);
            } else {
                client.query(`SELECT * FROM "users" WHERE "login" LIKE '${login}'`).then(response => {
                    // client.release();
                    let encryptedPassword = response.rows[0].password;
                    bcrypt.compare(password, encryptedPassword, (err, same) => {
                        if(same) {
                            const token = jwt.sign({ login }, process.env.SECRET_JWT, { expiresIn: '3h' });
                            res.status(200).send({msg : `user ${login} logged in`, token})
                        } else {
                            res.status(401).send({msg : 'bad password'})
                        }
                    })
                }).catch(err => {
                    // client.release();
                    console.log(err);
                })
            }
        });
    }).catch(err => {
        // client.release();
        console.log(err);
    });

})

module.exports = router;
