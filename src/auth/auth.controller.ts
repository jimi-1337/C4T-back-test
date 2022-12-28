import {
    AuthService
} from './auth.service';
import {
    Controller,
    Request,
    UseGuards,
    Post,
    Body,
    Param
} from '@nestjs/common';
import {
    AuthGuard
} from '@nestjs/passport';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
  
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @ApiBody({type : CreateUserDto})
    @UseGuards(AuthGuard('local'))
    @Post(`/login`)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}