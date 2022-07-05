import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  debug: process.env.DB_DEBUG === 'true', // process.env返回数据为字符串，需要进行转换
  client: process.env.DB_TYPE,
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306, // process.env返回数据为字符串，需要进行转换
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
}));
