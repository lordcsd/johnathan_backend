import {
  Injectable,
  UnprocessableEntityException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entity/user.entity';
import { UserRoles } from '../user/dto/user.enum';
import { TouristSignupDTO } from './dto/touristSignUpDTO';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { configConstants } from '../common/constants';
import { LoginDTO } from './dto/loginDTO';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  bcryptSalt = Number(
    this.configService.get<string>(configConstants.bcrypt.salt),
  );

  async touristSignUp(details: TouristSignupDTO) {
    const { email } = details;

    const emailInUse = await this.userModel.findOne({ email });

    if (emailInUse) {
      throw new UnprocessableEntityException('Email Already in use');
    }

    details.password = await bcrypt.hash(details.password, this.bcryptSalt);

    return await this.userModel.create({ ...details, role: UserRoles.TOURIST });
  }

  async login(details: LoginDTO) {
    const { email, password } = details;
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    delete user['_doc']['password'];

    return {
      access_token: this.jwtService.sign({
        id: user.id,
        email,
      }),
      user,
    };
  }
}
