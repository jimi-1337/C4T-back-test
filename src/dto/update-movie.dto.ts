import {
    PartialType
  } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { upMovie } from '../entities/upMovie.entity';
import { GenreType } from '../form.types';
import {
    CreateMovieDto
} from './create-movie.dto';
  
export class UpdateMovieDto extends upMovie {
  @ApiProperty({
    description: 'movie Title',
    example: 'Inception',
  })
  title: string;
  @ApiProperty({
      description: 'movie Description',
      example: 'Inception is a 2010 science fiction action film written and directed by Christopher Nolan',
  })
  description: string;
  @ApiProperty({
      description: 'movie Release Date',
      example: '08-07-2010',
  })
  releaseDate: string;
  @ApiProperty({
      description: 'movie Rating',
      example: 5,
  })
  rating: Number;
  @ApiProperty({
      description: 'movie Poster',
      example: 'Poster',
  })
  poster: string;
  @ApiProperty({
      description: 'movie Poster',
      example: ['Leonardo DiCaprio', 'Tom Hardy'],
  })
  actors: string[];
  @ApiProperty({
      description: 'movie Genre',
      example: GenreType.Aventure,
      enum: GenreType,
  })
  @IsEnum(GenreType, {
      message: 'Entrée $value incorrect',
  })
  genre: GenreType
}