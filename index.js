const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
require("dotenv").config();

app.use(express.static("public"));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.post("/forms", async (req, res, next) => {

  // const mailgun = require("mailgun-js")({
  //   apiKey: process.env.APIKEY,
  //   domain: process.env.DOMAIN,
  // });
  // const name =req.body.name
  // const email =req.body.email
  // const type =req.body.type
  // const project =req.body.project

  // const sendEmail = (name, email, type, project) =>
  // new Promise((resolve, reject) => {
  //   const data = {
  //     from: "korshunidzze@gmail.com",
  //     to: "angelinasachivko@gmail.com",
  //     subject: "Email from my website",
  //     text:  "Hello, my name is " +
  //           name +
  //           ". My email is " +
  //           email +
  //           ". Project type is - " +
  //           type +
  //           ". Details: " +
  //           project,
  //   };

  //   mailgun.messages().send(data, (error) => {
  //     if (error) {
  //       return reject(error);
  //     }
  //     return resolve();
  //   });
  // });

  // try {
  //     await sendEmail(name, email, type, project);
  //     res.json({message: 'Your query has been sent'});
  //     await next();
  //    } catch (e) {
  //     await next(e);
  //  }

  // const mailgun = require("mailgun-js")({
  //   apiKey: process.env.APIKEY,
  //   domain: process.env.DOMAIN,
  //   host: "api.eu.mailgun.net",
  // });

  // sendMail = function () {
  //   const data = {
  //     from: "korshunidzze@gmail.com",
  //     to: "angelinasachivko@gmail.com",
  //     subject: "Email from my website",
  //     text:
  //       "Hello, my name is " +
  //       req.body.name +
  //       ". My email is " +
  //       req.body.email +
  //       ". Project type is - " +
  //       req.body.type +
  //       ". Details: " +
  //       req.body.project,
  //   };

  //   mailgun.messages().send(data, (err, body) => {
  //     if (err) {
  //       console.log(err);
  //       res.status(400).send(err);
  //     } else {
  //       console.log(body);
  //       res.status(200).send();
  //     }
  //   });
  // };
  // sendMail();

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
      text: "Hello, my name is " + req.body.name + ". My email is " + req.body.email + ". Project type is - " + req.body.type + ". Details: "+ req.body.project,
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
});

const PORT = process.env.PORT || 3001;

async function start() {
  app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
}
start();