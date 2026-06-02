import { IsString } from 'class-validator';

export class createDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;
}
