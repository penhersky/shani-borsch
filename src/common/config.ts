const {
  CLOUD_AUTH_CLIENT_ID,
  CLOUD_AUTH_CLIENT_SECRET,
  CLOUD_REGION,
} = process.env;

export const awsConfig = {
  accessKeyId: CLOUD_AUTH_CLIENT_ID,
  secretAccessKey: CLOUD_AUTH_CLIENT_SECRET,
  region: CLOUD_REGION,
};
