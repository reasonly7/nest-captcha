import { Module } from '@nestjs/common';
import { CaptchaModule } from './captcha/captcha.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client'),
      exclude: ['/api/(.*)'],
    }),
    CacheModule.register({ isGlobal: true, ttl: 60 * 1000 }),
    CaptchaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
