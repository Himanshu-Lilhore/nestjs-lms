import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/registerUser.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from 'src/auth/loginUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDto: RegisterDto) {
    try {
      const { fname, lname, email, password } = registerUserDto;
      const newUser = await this.userModel.create({
        fname,
        lname,
        email,
        password,
      });
      console.log('new user :', newUser);
      return newUser;
    } catch (err) {
      const DUPLICATE_KEY_CODE = 11000; // 11000 err code in mongodb is for duplicacy
      if (err?.code === DUPLICATE_KEY_CODE) {
        throw new ConflictException('Email is already taken');
      }
      throw err;
    }
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
