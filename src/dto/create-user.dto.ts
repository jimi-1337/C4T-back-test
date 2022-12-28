import { ApiProperty } from '@nestjs/swagger';
import {
    User
} from '../entities/user.entity';
  
export class CreateUserDto extends User {
    @ApiProperty({
        description: 'User Name',
        example: 'test4@mail.com',
    })
    username: string;
    @ApiProperty({
        description: 'User Password',
        example: 'test',
    })
    password: string;
}