const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.post('/apply', upload.single('cv'), (req, res) => {
  const { name, email, message, phone, city, jobRole } = req.body;
  const resume = req.file;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aayushisrivastava4545@gmail.com',       // 👉 Replace with your Gmail rukhsar.surve@prkjobsolutions.com  maam password rtsd ofgr owrv asvj
      pass: 'cdso jveu smxf noqz'          // 👉 Replace with Gmail App Password
    }
  });

    const mailOptions = {
    from: 'aayushisrivastava4545@gmail.com',
    to: 'aayushisrivastava1920@gmail.com',
    subject: 'New Resume Submission',
    text: `New Job Application Received!

    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    City: ${city}
    Job Role: ${jobRole || "Not specified"}
    Message: ${message || "No message provided"}`,


    attachments: [
        {
        filename: resume.originalname,
        path: resume.path
        }
    ]
    };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      res.status(500).send('Email failed.');
    } else {
      res.send('Application sent!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
