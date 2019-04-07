import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { lessonsProviders } from './lessons.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [LessonsController],
    providers: [ LessonsService, ...lessonsProviders ],
})
export class LessonsModule { }