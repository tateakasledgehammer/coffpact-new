const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// CHANGE TO YOUR EMAIL + GMAIL APP PASSWORD
const EMAIL = "YOUR_EMAIL@gmail.com";
const PASSWORD = "YOUR_APP_PASSWORD";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

exports.sendWelcomeEmail = functions.firestore
  .document("signups/{id}")
  .onCreate(async (snap) => {
    const data = snap.data();
    const mailOptions = {
      from: EMAIL,
      to: data.email,
      subject: "Welcome to Coffpact!",
      text: `Hey ${data.firstName}, thanks for joining Coffpact!`
    };
    await transporter.sendMail(mailOptions);
  });
