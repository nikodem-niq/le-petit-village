const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');

router.post('/send', (req,res, next) => {
    const emailFrom = req.body.emailFrom;
    const nameFrom = req.body.nameFrom
    const messageContent = req.body.messageContent;

    let transport = {
        service : 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    }

    const transporter = nodeMailer.createTransport(transport)

    const mailOptions = {
        from: process.env.EMAIL,
        to: 'tomekzaje.plw@gmail.com',
        subject: 'Aurora - Report',
        html: messageContent,
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
            res.send(err);
        }
        res.send({messageContent})
        console.log(info)
    }) 
})

router.get('/send', (req,res) => { 
    res.status(200).send('Mailer working..');
})

module.exports = router;