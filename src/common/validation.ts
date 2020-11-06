import * as Joi from 'joi';

export const emailValidation = async (data: {
  email: String;
  password: string;
}): Promise<string | undefined> => {
  const schema = Joi.object({
    forTitle: Joi.string().required(),
    to: Joi.array().items(Joi.string().required()).required(),
    subject: Joi.string().required(),
    html: Joi.string().required(),
  });

  const result = schema.validate(data);
  return result.error ? result.error.details[0].message : undefined;
};
