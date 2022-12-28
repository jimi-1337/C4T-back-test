import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Request,
    UseGuards
  } from '@nestjs/common';
  import {
    UserService
  } from './users.service';
  import {
    CreateUserDto
  } from '../dto/create-user.dto';
  import {
    AuthGuard
  } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
  
@Controller('register')
export class UserController {
constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('username')
    getUserByUsername(@Request() req) {
        return this.userService.getUserByUsername(req.user.username);
    }
    
    @Post()
    registerUser(@Body() createUserDto: CreateUserDto) {
      if (createUserDto && Object.keys(createUserDto).length)
        return this.userService.registerUser(createUserDto);
      return null;
    }
}