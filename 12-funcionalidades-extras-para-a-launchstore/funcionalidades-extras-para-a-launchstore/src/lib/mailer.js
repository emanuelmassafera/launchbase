const nodeMailer = require('nodemailer');

const transport = nodeMailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'ff31ca0540c706',
    pass: '2a6a6816b2dc74',
  },
});

module.exports = transport;
