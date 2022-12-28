import {
    Module
} from '@nestjs/common';
import {
    UserService
} from './users.service';
import {
    UserController
} from './user.controller';
import {
    MongooseModule
} from '@nestjs/mongoose';
import {
    User,
    UserSchema
} from '../schema/user.schema';
import {
    JwtModule
} from '@nestjs/jwt';
import {
    jwtConstants
} from '../strategy/constants';
import {
    HashService
} from '../Users/hash.service';
import {
    AuthService
} from '../auth/auth.service';
import {
    JwtStrategy
} from '../strategy/jwt.strategy';
import {
    LocalStrategy
} from '../strategy/local.strategy';
  
@Module({
    imports: [
     MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema
      }]),
     JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {
          expiresIn: '60d'
        },
      }),
    ],
    controllers: [UserController],
    providers: [UserService, HashService, AuthService, JwtStrategy, LocalStrategy],
})
export class UserModule {}