import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "johnpaul.sporer85@ethereal.email",
    pass: "MCZmyekdUkUn1mn7gd",
  },
});

const publishEmail = async (info: Mail.Options) => {
  const mailInfo = await transporter.sendMail(info);
  console.log("Message sent: %s", mailInfo.messageId);
  console.log("preview url: %s", nodemailer.getTestMessageUrl(mailInfo));
  return mailInfo;
};

const emailProcessor = async (email: string, resetPin: string) => {
  const info = {
    from: '"CRM Company" <johnpaul.sporer85@ethereal.email', // sender address
    to: email, // list of receivers
    subject: "Password Reset Pin", // Subject line
    text: `Here is your password reset pin: ${resetPin} . this pin will expire in 1 day`, // plain text body
    html: `<b>Hello</b>
    Here is your password reset pin
    <b>${resetPin}</b>
    this pin will expire in 1 day
    `, // html body
  };

  const result = await publishEmail(info);
  return result;
};

const notifyPasswordUpdate = async (email: string) => {
  const info = {
    from: '"CRM Company" <johnpaul.sporer85@ethereal.email', // sender address
    to: email, // list of receivers
    subject: "Password updated", // Subject line
    text: "your password has been updated Successfully", // plain text body
    // html body
  };

  const result = await publishEmail(info);
  return result;
};

export { emailProcessor, notifyPasswordUpdate };
