import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
@Module({
  controllers: [UsersController,AuthController],
  providers: [UserService,AuthService,JwtService,PassportModule],
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UsersModule {}
