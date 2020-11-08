import * as aws from 'aws-sdk';

import logger from './logger';
import { awsConfig } from './config';

const { NODE_ENV, CLOUD_BUCKET_NAME } = process.env;

export const generatePath = (): string => {
  const date = new Date();
  const folder = `${date.getFullYear()}/${date.getMonth()}`;
  return `${folder}/${Date.now().toString()}`;
};

export const uploadFileParams = (
  file: any,
  fileType: string,
  path = generatePath,
) => {
  return {
    Bucket: `${CLOUD_BUCKET_NAME}-${NODE_ENV}`,
    Key: `${path()}.${fileType}`,
    Body: file,
    ACL: 'public-read',
  };
};

type uploadSuccess = Promise<aws.S3.ManagedUpload.SendData>;

export const uploadFile = async (
  file: any,
  fileType: string,
  path: () => string,
): uploadSuccess | undefined => {
  try {
    const s3 = new aws.S3(awsConfig);

    return s3.upload(uploadFileParams(file, fileType, path)).promise();
  } catch (error) {
    logger.error(error);
  }
};

export const deleteObject = async (
  key: string,
): Promise<boolean | undefined> => {
  try {
    const s3 = new aws.S3(awsConfig);

    await s3
      .deleteObject({
        Bucket: CLOUD_BUCKET_NAME,
        Key: key,
      })
      .promise();
    return true;
  } catch (error) {
    logger.error(error);
  }
};
