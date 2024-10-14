import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async generate() {
    const captcha = svgCaptcha.create({
      size: 4,
      noise: 3,
      color: true,
      background: '#ffffff',
      charPreset: '0123456789',
    });
    const sessionId = randomUUID();
    await this.cacheManager.set(sessionId, captcha.text, 10 * 1000);
    return {
      sessionId,
      svg: captcha.data,
    };
  }

  async validate(sessionId: UUID, userInput: string) {
    const cachedCaptchaText: string = await this.cacheManager.get(sessionId);
    if (!cachedCaptchaText) {
      return false;
    }
    if (String(cachedCaptchaText).toLowerCase() === userInput.toLowerCase()) {
      await this.cacheManager.del(sessionId);
      return true;
    }
    return false;
  }
}
