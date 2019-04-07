import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { Course as CourseInterface } from './interfaces/course.interface';

@Controller('courses')
export class CoursesController {
    constructor(private readonly postsService: CoursesService) { }

    @Post()
    async create(@Body() createCourseDto: CreateCourseDto) {
        this.postsService.create(createCourseDto);
    }

    @Get()
    async findAll(): Promise<CourseInterface[]> {
        console.log('GET courses');
        return this.postsService.findAll();
    }
}