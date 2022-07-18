import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // 加载系统配置
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: false, // 请求参数中有无效属性时是否抛出错误
      transform: true, // 将参数转换为dto实例
      whitelist: true, // 剔除请求参数中的无效属性
      validateCustomDecorators: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  if (process.env.NODE_ENV !== 'production') {
    /* 集成api文档*/
    SwaggerModule.setup(
      config.get('application.document.path'),
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
          .setTitle(config.get('application.document.title'))
          .setDescription(config.get('application.document.desc'))
          .setVersion(config.get('application.document.version'))
          .build()
      )
    );
  } else {
    // 增加sentry监控 @sentry/node
  }

  const _port = parseInt(process.env.PORT, 10) || 3000;
  await app.listen(_port, '127.0.0.1');
  console.info(`url: http://127.0.0.1:${_port}, env: ${process.env.NODE_ENV || 'development'}`);
}
bootstrap();
