import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    public  _jwt: JwtService,
    public  _userService: UserService,
  ) {}

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<any> {
    const user = await this._userService.findOne(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async loginWithCredentials(user: any) {
    console.log("user",user)
    const payload = { email: user.email, sub: user.password };

    return {
      access_token: this._jwt.sign(payload),
    };
  }
}
