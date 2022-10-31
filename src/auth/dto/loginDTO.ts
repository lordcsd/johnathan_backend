import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
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
}
