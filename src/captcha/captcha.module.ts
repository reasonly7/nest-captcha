import { Module } from '@nestjs/common';
import { CaptchaController } from './captcha.controller';

@Module({
  imports: [],
  controllers: [CaptchaController],
  providers: [],
})
export class UserModule {}
