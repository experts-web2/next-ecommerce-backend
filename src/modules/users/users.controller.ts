import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
@Controller('users')
export class UsersController {
  constructor(
    public usersService: UserService,
    public AuthService: AuthService,
  ) {}
  @Post('register')
  create(@Body() createUserDto: any): Promise<any> {
    // if (
    //   createUserDto.email == null ||
    //   createUserDto.password == null ||
    //   createUserDto.firstName == null ||
    //   createUserDto.lastName == null
    // ) {
    //   throw new Error('Please fill all the fields');
    // }

    return this.usersService.create(createUserDto);
  }

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: any) {
    console.log("user")
    return this.AuthService.loginWithCredentials(user);
  }

  @Get('allusers')
  findAll(): Promise<any[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any): Promise<any> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.usersService.remove(id);
  }
}
