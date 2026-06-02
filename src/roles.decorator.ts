
import { Reflector } from '@nestjs/core';
import { Role } from './user/user.types';

export const Roles = Reflector.createDecorator<Role[]>();
