import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';

import { Course } from './interfaces/course.interface';
import { CreateCourseDto } from './dto/create-course.dto';
import { COURSE_MODEL_PROVIDER } from '../../server/src/constants';

@Component()
export class CoursesService {
    constructor(
        @Inject(COURSE_MODEL_PROVIDER) private readonly courseModel: Model<Course>) { }

    async create(createPostDto: CreateCourseDto): Promise<Course> {
        const createdCourse = new this.courseModel(createPostDto);
        return await createdCourse.save();
    }

    async findAll(): Promise<Course[]> {
        return await this.courseModel.find().exec();
    }
}