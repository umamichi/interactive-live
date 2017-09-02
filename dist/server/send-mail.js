const nodemailer = require('nodemailer');

const sendMail = (text) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'm.u.interactive.live@gmail.com',
      pass: 'pK3XYGf5'
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"馬道まさたか🎸" <m.u.interactive.live@gmail.com>', // sender address
    to: 'masaumamichi@live.jp', // list of receivers
    subject: '馬道まさたか INTERACTIVE LIVE メール送信', // Subject line
    text, // plain text body
    // html: 'こんちわわ' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return false;
  });  
}

module.exports = sendMail;