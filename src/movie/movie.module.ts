import {
    Module
} from '@nestjs/common';
import {
    MongooseModule
} from '@nestjs/mongoose';
import {
    Movie,
    MovieSchema
} from '../schema/movie.schema';
import {
    JwtModule
} from '@nestjs/jwt';
import {
    jwtConstants
} from '../strategy/constants';
import {
    JwtStrategy
} from '../strategy/jwt.strategy';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
  
@Module({
    imports: [
     MongooseModule.forFeature([{
        name: Movie.name,
        schema: MovieSchema
      }]),
     JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {
          expiresIn: '60d'
        },
      }),
    ],
    controllers: [MovieController],
    providers: [MovieService, JwtStrategy],
})
export class MovieModule {}