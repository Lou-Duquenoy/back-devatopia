const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const https = require("https");
const fs = require("fs");

const app = express();
const port = 3000; // Replace with your desired port

app.use(express.json());
app.use(cors()); // Enable CORS

// Disable SSL/TLS certificate verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Create an HTTPS agent with certificate verification disabled
const agent = new https.Agent({
  rejectUnauthorized: false,
});

app.post("/send-email", (req, res) => {
  const { email } = req.body;

  console.log(email);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Replace with your SMTP port
    secure: true, // Set to true if using a secure connection
    auth: {
      user: email, // Replace with your SMTP username
      pass: "kxbxyyldwbksmjsn", // Replace with your SMTP password
    },
    https: {
      agent: agent, // Use the agent with certificate verification disabled
    },
  });

  const mailOptions = {
    from: email,
    to: "lou.duquenoy@gmail.com",
    subject: "Test",
    text: "Voila un test",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
