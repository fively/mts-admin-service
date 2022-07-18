import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import configs from '@/config';
import { configValidationSchema } from '@/config.schema';

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
      load: configs,
      validationSchema: configValidationSchema
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
