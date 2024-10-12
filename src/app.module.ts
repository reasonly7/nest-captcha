import { Module } from '@nestjs/common';
import { importConfigModule } from './config/importConfigModule';
import { UserModule } from './user/user.module';
import { importTypeOrmModule } from './typeorm/importTypeOrmModule';

@Module({
  imports: [importConfigModule(), importTypeOrmModule(), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
