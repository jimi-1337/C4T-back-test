import {
    Movie
} from "../entities/movie.entity";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GenreType } from "../form.types";
import { IsEnum } from "class-validator";

  
export class CreateMovieDto extends Movie {
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

// const createmoviedto = {
//     title : "Inception",
//     description : "Inception is a 2010 science fiction action film written and directed by Christopher Nolan",
//     releaseDate : "08-07-2010",
//     rating : 5,
//     poster : "Poster",
//     actors : ['Leonardo DiCaprio', 'Tom Hardy'],
//     genre : GenreType.Aventure
// }