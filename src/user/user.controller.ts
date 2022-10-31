import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entity/user.entity';

@Controller('users')
export class UserController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
}
