import { APIGatewayEvent } from 'aws-lambda';
import 'source-map-support/register';

import res from '../common/responses';
import { uploadFile, generatePath } from '../common/upload';
import logger from '../common/logger';

const lambda = async (event: APIGatewayEvent): Promise<any> => {
  try {
    const decodedImage = Buffer.from(event.body, 'base64');

    const result = await uploadFile(
      decodedImage,
      event.headers['Content-Type'].split('/')[1],
      generatePath,
    );

    return res.C200({ result: 'success', data: result });
  } catch (error) {
    logger.error(error);
    return res.C500({ result: 'error', message: 'send email response error' });
  }
};

// eslint-disable-next-line import/prefer-default-export
export const handler = lambda;
