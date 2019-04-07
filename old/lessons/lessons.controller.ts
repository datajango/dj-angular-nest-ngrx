import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonsService } from './lessons.service';
import { Lesson as LessonInterface } from './interfaces/lesson.interface';

@Controller('lessons')
export class LessonsController {
    constructor(private readonly postsService: LessonsService) { }

    @Post()
    async create(@Body() createLessonDto: CreateLessonDto) {
        this.postsService.create(createLessonDto);
    }

    @Get()
    async findAll(): Promise<LessonInterface[]> {
        return this.postsService.findAll();
    }
}