import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import dbConfig from '@/config/db.config';
import appConfig from '@/config/app.config';

import * as Joi from '@hapi/joi';

/* 数据库连接模块 */
import { KnexModule } from './db';

import { CommonModule } from './common/common.module';
import { SharedModule } from './shared/shared.module';
import { ModuleModule } from './module/module.module';
import { AuthModule } from './auth/auth.module';

/* 加载环境配置文件 */
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig, appConfig],
      validationSchema: Joi.object({
        DB_TYPE: Joi.required(),
        DB_HOST: Joi.required(),
        DB_USERNAME: Joi.required(),
        DB_PASSWORD: Joi.required(),
        DB_DATABASE: Joi.required(),
        DB_PORT: Joi.number().default(3306)
      })
    }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({ config: config.get('database') }),
      inject: [ConfigService]
    }),
    CommonModule,
    SharedModule,
    ModuleModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
