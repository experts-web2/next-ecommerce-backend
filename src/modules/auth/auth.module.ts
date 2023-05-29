import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './auth.constants';
('');
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../users/users.service';
import { UsersController } from '../users/users.controller';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthController, UsersController],
  providers: [
    AuthService,
    UserService,
    PassportModule,
    JwtStrategy,
    LocalStrategy,
  ],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
