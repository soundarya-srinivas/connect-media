const nodemailer = require('nodemailer');

const sendEmail = (options) => {
    console.log("hi")
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    }
    console.log("mailoptions",mailOptions)

    // transporter.sendEmail(mailOptions, function (err, info) {
    //     console.log("entered transporter")
    //     if (err) {
    //         console.log("err from email",err)
    //     }
    //     else {
    //         console.log("information",info)
    //     }
    // })
    transporter.sendMail(mailOptions, function(error, info){
        console.log("entered transporter")
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}

module.exports = sendEmail;