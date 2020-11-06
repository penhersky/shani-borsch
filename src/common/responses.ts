export const defineResponse = (statusCode = 502, data = {}) => ({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*',
  },
  statusCode,
  body: JSON.stringify(data),
});

const responses = {
  C200: (data = {}) => defineResponse(200, data),
  C201: (data = {}) => defineResponse(201, data),
  C204: (data = {}) => defineResponse(204, data),

  C400: (data = {}) => defineResponse(400, data),
  C401: (data = {}) => defineResponse(401, data),
  C404: (data = {}) => defineResponse(404, data),
  C500: (data = {}) =>
    defineResponse(500, { ...data, message: 'Server Error' }),
};

export default responses;
