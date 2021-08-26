const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Open Music App',
      to: targetEmail,
      subject: 'Ekspor Playlist Song',
      text: 'Terlampir hasil dari ekspor playlist song',
      attachments: [
        {
          filename: 'songs-of-playlist.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailService;
