import { createTransport } from 'nodemailer';
import { existsSync, readFileSync } from 'fs';
import { render } from 'ejs';
import juice from 'juice';
import dotenv from 'dotenv';
dotenv.config();

let transporter = createTransport({
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

  if (templateName && existsSync(templatePath)) {
    const template = readFileSync(templatePath, 'utf-8');
    const html = render(template, templateVars);
    const htmlWithStylesInlined = juice(html);
    options.html = htmlWithStylesInlined;
  }
  return transporter.sendMail(options);
};

export default Mail;
