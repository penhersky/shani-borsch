import * as winston from 'winston';
import * as WinstonCloudWatch from 'winston-cloudwatch';
import { config, CloudWatchLogs } from 'aws-sdk';

import { awsConfig } from './config';

const { NODE_ENV, CLOUD_LOGROUP_NAME } = process.env;

const prodStatus = NODE_ENV === 'development' ? 'dev' : 'prod';

config.update(awsConfig);

const logParams = {
  cloudWatchLogs: new CloudWatchLogs(),
  logGroupName: CLOUD_LOGROUP_NAME,
  logStreamName: prodStatus,
  createLogGroup: true,
  createLogStream: true,
  formatLog: (item: any) =>
    `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`,
};

winston.add(new WinstonCloudWatch(logParams));

export default winston;
