const nodemailer = require('nodemailer');
const config = require('../constant/Config');

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: false,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  }

  sendEmail({
    from, to, subject, text, attachments,
  }) {
    const message = {
      from,
      to,
      subject,
      text,
      attachments,
    };

    return this.transporter.sendMail(message);
  }
}

module.exports = MailSender;
