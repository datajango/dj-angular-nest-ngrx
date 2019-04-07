import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomUserController } from './custom-user.controller';
import { CustomUserService } from './custom-user.service';
import { CustomUserSchema } from './schema/custom-user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'CustomUser', schema: CustomUserSchema }])],
  controllers: [CustomUserController],
  providers: [CustomUserService],
  exports: [CustomUserService, MongooseModule.forFeature([{ name: 'CustomUser', schema: CustomUserSchema }])],
})
export class CustomUserModule {}
