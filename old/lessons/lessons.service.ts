import { Model } from 'mongoose';
import { Injectable} from '@nestjs/common';

import { Lesson } from './interfaces/lesson.interface';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LESSON_MODEL_PROVIDER } from '../../server/src/constants';

@Injectable()
export class LessonsService {
    constructor(
        @Inject(LESSON_MODEL_PROVIDER) private readonly lessonModel: Model<Lesson>) { }

    async create(createPostDto: CreateLessonDto): Promise<Lesson> {
        const createdLesson = new this.lessonModel(createPostDto);
        return await createdLesson.save();
    }

    async findAll(): Promise<Lesson[]> {
        return await this.lessonModel.find().exec();
    }
}