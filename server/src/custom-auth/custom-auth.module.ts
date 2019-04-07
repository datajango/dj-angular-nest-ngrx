import { Module } from '@nestjs/common';
import { CustomAuthService } from './custom-auth.service';
import { CustomAuthController } from './custom-auth.controller';

@Module({
  providers: [CustomAuthService],
  controllers: [CustomAuthController]
})
export class CustomAuthModule {}
