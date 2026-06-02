import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.schema';
import { createDto } from './createCourse.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async createCourse(createDto: createDto) {
    try {
      const { name, description } = createDto;
      const newCourse = await this.courseModel.create({ name, description });
      console.log('new course :', newCourse);
      return newCourse;
    } catch (err) {
      throw err;
    }
  }
}
