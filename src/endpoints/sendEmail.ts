import { APIGatewayEvent } from 'aws-lambda';
import { createTransport } from 'nodemailer';
import 'source-map-support/register';

import res from '../common/responses';

const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = process.env;

const lambda = async (event: APIGatewayEvent): Promise<any> => {
  const data = JSON.parse(event.body);

  const transporter = createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `${data.fromTitle} <${EMAIL_USER}>`,
      to: String(data.to).split(', '),
      subject: data.object,
      html: data.html,
    });
    return res.C200({ result: 'success' });
  } catch (error) {
    console.log(error);
    return res.C500({ result: 'error' });
  }
};

// eslint-disable-next-line import/prefer-default-export
export const handler = lambda;
