const express = require('express');
const router = express.Router();
const pg = require('pg');
const { verifyToken } = require('../../middlewares/auth');

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

router.get('/fetch', (req,res,next) => {
    pool.connect().then(client => {
        let query;
        if(req.query.articleId) {
            query = `SELECT * FROM articles WHERE "articleId" = ${req.query.articleId}`
        } else {
            query = `SELECT * FROM articles ORDER BY "articleId"`;
        }
        if(req.query.view) {
            let viewQuery = `UPDATE articles SET views = views + 1 WHERE "articleId" = ${req.query.articleId}`;
            client.query(viewQuery, (err,response) => {
                if(err) {
                    console.log(err);
                } else {
                    res.status(200).send(response);
                }
            });
        }
        console.log(query)
        client.query(query, (err,response) => {
            client.release();
            if(err) {
                console.log(err);
            } else {
                res.status(200).send(response.rows)
            }
        })
    })
})

router.post('/post', verifyToken, (req,res,next) => {
    pool.connect().then(client => {
        const { heroImg, header, subHeader, content } = req.body;
        let query = `INSERT INTO articles("heroImg", header, "subHeader", content, date, views) VALUES ('${heroImg}', '${header}', '${subHeader}', '${content}', NOW(), 0)`;
        console.log(query)
        client.query(query, (err,response) => {
            client.release();
            if(err) {
                console.log(err);
            } else {
                res.status(200).send(response)
            }
        })
    })
})

router.post('/update', verifyToken, (req,res,next) => {
    pool.connect().then(client => {
        const { heroImg, header, subHeader, content, id } = req.body;
        const query = `UPDATE articles SET "heroImg" = '${heroImg}', header = '${header}', "subHeader" = '${subHeader}', content = '${content}' WHERE "articleId" = ${id}`
        console.log(query)
        client.query(query, (err,response) => {
            client.release();
            if(err) {
                console.log(err);
            } else {
                res.status(200).send(response)
            }
        })
    })
})

router.post('/delete', verifyToken, (req,res,next) => {
    const { id } = req.body;
    console.log(id);
    let query = `DELETE FROM articles WHERE "articleId" = ${id}`;
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
module.exports = router;