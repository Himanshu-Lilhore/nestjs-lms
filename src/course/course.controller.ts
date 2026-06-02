import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { createDto } from './createCourse.dto';
import { CourseService } from './course.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/user/user.types';
import { RolesGuard } from 'src/roles.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.Admin])
  create(@Body() createCourseDto: createDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @Get()
  findAll() {}
}
