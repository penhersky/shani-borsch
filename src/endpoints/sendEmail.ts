import { APIGatewayEvent } from 'aws-lambda';
import { createTransport } from 'nodemailer';
import 'source-map-support/register';

import res from '../common/responses';
import { emailValidation } from '../common/validation';

const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = process.env;

const lambda = async (event: APIGatewayEvent): Promise<any> => {
  const transporter = createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    const data = JSON.parse(event.body);
    console.log(data);
    const validationError = await emailValidation(data);
    if (typeof validationError === 'string')
      return res.C400({ result: 'error', message: validationError });

    await transporter.sendMail({
      from: `${data.forTitle} <${EMAIL_USER}>`,
      to: String(data.to).split(', '),
      subject: data.object,
      html: data.html,
    });
    return res.C200({ result: 'success' });
  } catch (error) {
    console.log(error);
    return res.C500({ result: 'error', message: 'send email response error' });
  }
};

// eslint-disable-next-line import/prefer-default-export
export const handler = lambda;
