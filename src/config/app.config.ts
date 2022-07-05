import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  environment: process.env.NODE_ENV || 'development',
  name: 'my tools admin service',
  document: { // 接口文档相关配置
    title: 'My Tools Service',
    desc: 'My Tools Service - Api服务文档',
    path: 'doc',
    version: '0.0.1'
  }
}));
