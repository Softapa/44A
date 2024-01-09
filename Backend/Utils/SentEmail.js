const nodemailer = require("nodemailer");
const sentEmail = (mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.logicloopsolutions.net",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "ammar.abdul@logicloopsolutions.net",
      pass: "LAktwgE1U",
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error", error);
    } else {
      console.log("Email Sent Sucessfully!", info.response);
    }
  });
};
module.exports = sentEmail;
