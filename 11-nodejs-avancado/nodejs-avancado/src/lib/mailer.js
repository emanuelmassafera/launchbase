const nodeMailer = require("nodemailer");

const transport = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "e10ce36aa4d9ce",
        pass: "76014ccddbf05d"
    }
});

module.exports = transport;