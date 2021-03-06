const nodemailer = require('nodemailer');

const sendEmail = options => {
    
  /*  const transpoter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
    });*/

    const transpoter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
    });


    const mailOptions = {
        from: 'Shivlal Chavan <shivlalchavan>',
        to: options.email,
        subject: options.subject,
        text: options.message
        // html:
      };

       transporter.sendMail(mailOptions);
};

module.exports  = sendEmail;