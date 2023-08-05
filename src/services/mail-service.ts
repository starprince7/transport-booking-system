import Mailgun from 'mailgun.js';
import formData from 'form-data';

if (!process.env.MAILGUN_PRIVATE_KEY) {
  throw new Error('Missing MAILGUN_PRIVATE_KEY enviroment variable.');
}
if (!process.env.DOMAIN) {
  throw new Error('Missing DOMAIN enviroment variable.');
}

const domain = process.env.DOMAIN;
const mailgun = new Mailgun(formData);

const authCredentials = {
  username: 'api',
  key: process.env.MAILGUN_PRIVATE_KEY,
  url: 'https://api.mailgun.net/',
};
const mailgunClient = mailgun.client(authCredentials);

const sendMail = async (mailOptions: any) => {
  return mailgunClient.messages.create(domain, mailOptions);
};

export default sendMail;
