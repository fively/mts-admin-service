import * as Joi from '@hapi/joi';

/**
 * 验证环境配置变量
 */
export const configValidationSchema = Joi.object({
  DB_TYPE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_PORT: Joi.number().default(3306)
});
