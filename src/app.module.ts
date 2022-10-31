import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { configConstants } from './common/constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env[configConstants.database.mongooseUrl]),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
