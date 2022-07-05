import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OsModule } from './os/os.module';
import { ReportModule } from './report/report.module';

/**
 * 业务逻辑模块
 */
@Module({
  imports: [OsModule, UserModule, ReportModule]
})
export class ModuleModule {}
