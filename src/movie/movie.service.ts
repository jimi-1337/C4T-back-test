import {
    Injectable,
    BadRequestException
} from '@nestjs/common';
import {
    CreateUserDto
} from '../dto/create-user.dto';
import {
    InjectModel
} from '@nestjs/mongoose';
import {
    Model
} from 'mongoose';
import {
    Movie,
    MovieDocument
} from '../schema/movie.schema';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
  
@Injectable()
export class MovieService {

    constructor(@InjectModel(Movie.name) private movieModel: Model < MovieDocument >) {}

    async getMovieByTitle(title: string) {
        return this.movieModel.findOne({
            title
        })
        .exec();
    }

    async getMovieById(id: string) {
        return this.movieModel.findById(id)
        .exec();
    }

    async allMovies() {
        return this.movieModel.find().exec();
    }

    async createMovie(createMovieDto: CreateMovieDto) {
        // validate DTO
        const createMovie = new this.movieModel(createMovieDto);
        // check if movie exists
        const movie = await this.getMovieByTitle(createMovie.title);
        if (movie) {
            throw new BadRequestException();
        }
        createMovie.releaseDate = new Date(createMovieDto.releaseDate);
        return createMovie.save();
    }

    async updateMovie(id: string, updateMovieDto: UpdateMovieDto) {
        const movie = await this.getMovieByTitle(updateMovieDto.title);
        if (!movie) {
            throw new BadRequestException();
        }
        // updateMovieDto.releaseDate = new Date(updateMovieDto.releaseDate);
        return this.movieModel.findByIdAndUpdate(id, updateMovieDto);
    }
    
    async removeMovie(id: string) {
        const movie = await this.getMovieById(id);
        if (!movie) {
            throw new BadRequestException();
        }
        return this.movieModel.findByIdAndRemove(id);
    }
}