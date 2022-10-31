import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  MinLength,
  Matches,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Genders } from '../../user/dto/user.enum';
import { ApiProperty } from '@nestjs/swagger';

export class TouristSignupDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "Tourist's first name", default: 'John' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "Tourist's last name", default: 'Doe' })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ description: "Tourist's email", default: 'tourino@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'password: must have at least 8 characters' })
  @Matches(/(?=.*[a-z])/, {
    message: 'password: must contain at least one lowercase alphabet',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'password: must contain at least one uppercase alphabet',
  })
  @Matches(/(?=.*[0-9])/, {
    message: 'password: must contain at least one number',
  })
  @Matches(/\W|_/, {
    message: 'password: must contain at least one special character',
  })
  @ApiProperty({ description: "Tourist's password", default: 'Trappo&f9' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('NG')
  @ApiProperty({ description: "Tourist's last name", default: '08131157827' })
  phone: string;

  @IsNotEmpty()
  @IsEnum(Genders)
  @ApiProperty({ description: "Tourist's gender", default: 'MALE' })
  gender: Genders;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "Tourist's age", default: 31 })
  age: number;
}
