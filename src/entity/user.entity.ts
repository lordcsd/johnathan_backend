import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Genders, UserRoles } from '../user/dto/user.enum';

export type UserDocument = User & Document;

export interface UserActiveTicket {
  title: string;
  duration: number;
  time: Date;
  price: number;
}

export interface Notification {
  title: string;
  body: string;
}

@Schema()
export class User {
  @Prop({ default: UserRoles.TOURIST, enum: UserRoles })
  role: UserRoles;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  gender: Genders;

  @Prop({ type: Number })
  age: number;

  @Prop({ required: false })
  activeTickets: UserActiveTicket[];

  @Prop({ required: false })
  notifications: Notification[];

  @Prop({ required: false })
  admin_firm: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
