import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(public usersService: UserService) {}
  @Post('register')
  create(@Body() createUserDto: any): Promise<any> {
    if(createUserDto.email == null || createUserDto.password == null ||
       createUserDto.firstName == null || createUserDto.lastName == null)
    {
     throw new Error('Please fill all the fields');
    }
    return this.usersService.create(createUserDto);
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
