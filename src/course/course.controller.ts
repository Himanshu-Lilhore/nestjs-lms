import { Body, Controller, Get, Post } from '@nestjs/common';
import { createDto } from './createCourse.dto';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post("create")
  create(@Body() createCourseDto: createDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @Get()
  findAll() {}
}
