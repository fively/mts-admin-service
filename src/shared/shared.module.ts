import { Module, Global } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { CryptoModule } from './crypto/crypto.module';

/**
 * 共享逻辑模块
 */
@Global()
@Module({
  imports: [LoggerModule, CryptoModule],
  exports: [LoggerModule, CryptoModule]
})
export class SharedModule {}
