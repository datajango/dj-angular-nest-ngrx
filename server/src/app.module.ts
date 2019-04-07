import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
//import { APP_GUARD } from '@nestjs/core';
//import { RolesGuard } from './auth/roles.guard';
import { CustomAuthModule } from './custom-auth/custom-auth.module';
import { CustomUserModule } from './custom-user/custom-user.module';

@Module({  
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cobblestome'),
    TodosModule,
    UsersModule,
    ItemsModule,
    AuthModule,
    CustomAuthModule,
    CustomUserModule
  ],
  controllers: [AppController],
    providers: [AppService, 
      //{ provide: APP_GUARD, useClass: RolesGuard }
  ],
})
export class AppModule {}
