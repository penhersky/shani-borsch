import 'source-map-support/register';

const lambda = async (event: any): Promise<any> => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      message: 'TypeScrip serverless project',
      input: event,
    },
    null,
    2,
  ),
});

// eslint-disable-next-line import/prefer-default-export
export const handler = lambda;
