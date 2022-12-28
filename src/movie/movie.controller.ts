import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Request,
    UseGuards,
    Put,
    Delete,
    BadRequestException
  } from '@nestjs/common';
  import {
    MovieService
  } from './movie.service';
  import {
    CreateUserDto
  } from '../dto/create-user.dto';
  import {
    AuthGuard
  } from '@nestjs/passport';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
  
@Controller('movies')
export class MovieController {
constructor(private readonly movieService: MovieService) {}

    @Get()
    getAllMovies() {
        return this.movieService.allMovies();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('/createMovie')
    createMovie(@Body() createMovieDto: CreateMovieDto) {
      if (createMovieDto && Object.keys(createMovieDto).length)
        return this.movieService.createMovie(createMovieDto);
      return null;
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put('/modifyMovie/:id')
    modifyMovie(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
      return this.movieService.updateMovie(id, updateMovieDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete('/deleteMovie/:id')
    deleteMovie(@Param('id') id: string,) {
        return this.movieService.removeMovie(id);
    }
}