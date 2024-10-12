import { Controller, Get } from '@nestjs/common';

@Controller('captcha')
export class CaptchaController {
  @Get()
  getCaptcha() {
    return 'captcha';
  }
}
