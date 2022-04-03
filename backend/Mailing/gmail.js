const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const juice = require('juice');
require('dotenv').config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const Mail = async ({
  template: templateName,
  templateVars,
  ...restOfOptions
}) => {
  const templatePath = `Mailing/templates/${templateName}.html`;
  const options = {
    ...restOfOptions,
  };

  if (templateName && fs.existsSync(templatePath)) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const html = ejs.render(template, templateVars);
    const htmlWithStylesInlined = juice(html);
    options.html = htmlWithStylesInlined;
  }
  return transporter.sendMail(options);
};

module.exports = { Mail };
