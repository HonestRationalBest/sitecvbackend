const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config();

app.use(express.static("public"));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.post('/forms', (req, res) => {
    if(!process.env.EMAIL || !process.env.PASSWORD){
        res.status(400).send();
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,     
            pass: process.env.PASSWORD,
        },
    });

    const mailData = {
        from: 'korshunidzze@gmail.com',  
        to: 'angelinasachivko@gmail.com',
        subject: 'Email from my website',
        text: req.body.projectType + ". " + req.body.project,
    };
    transporter.sendMail(mailData, function (err, info) {
            if(err){
              console.log(err)
              res.status(400).send(err);
            } else{
              console.log(info);
              res.status(200).send();
            }
    });
})

const PORT = process.env.PORT || 3001;

async function start() {
  app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
}
start();