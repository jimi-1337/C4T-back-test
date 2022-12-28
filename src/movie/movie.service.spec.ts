import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MovieController } from './movie.controller';
import { GenreType } from '../form.types';

class ApiServiceMock {
    getMovieByTitle(title: string) {
       return [];
    }
    getMovieById(id: string) {
        return [];
    }
    createMovie(createMovieDto: CreateMovieDto) {
      return [];
    }
    allMovies() {
      return null;
    }
    updateMovie(id: string, updateMovieDto: UpdateMovieDto) {
      return [];
    }
    removeMovie(id: string) {
        return [];
    }
}

describe.only("MovieService", () => {
    let movieService: MovieService;
    beforeAll(async () => {
        const ApiServiceProvider = {
          provide: MovieService,
          useClass: ApiServiceMock,
        }
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            MovieService, ApiServiceProvider
          ],
        }).compile();
        movieService = module.get<MovieService>(MovieService);
    })

    it('should call createMovie method with expected params', async () => {
        const createNoteSpy = jest.spyOn(movieService, 'createMovie');
        const dto = new CreateMovieDto();
        movieService.createMovie(dto);
        expect(createNoteSpy).toHaveBeenCalledWith(dto);
    });

    it('should call getMovieByTitle method with expected param', async () => {
        const getMovieByTitleSpy = jest.spyOn(movieService, 'getMovieByTitle');
        const title: string = "Inception";
        movieService.getMovieByTitle(title);
        expect(getMovieByTitleSpy).toHaveBeenCalledWith(title);
    });

    it('should call getMovieById method with expected param', async () => {
        const getMovieByIdSpy = jest.spyOn(movieService, 'getMovieById');
        const id: string = "Id";
        movieService.getMovieById(id);
        expect(getMovieByIdSpy).toHaveBeenCalledWith(id);
    });

    it('should call updateMovie method with expected params', async () => {
        const updateMovieSpy = jest.spyOn(movieService, 'updateMovie');
        const Id = 'noteId';
        const dto = new UpdateMovieDto();
        movieService.updateMovie(Id, dto);
        expect(updateMovieSpy).toHaveBeenCalledWith(Id, dto);
    });

    it('should call removeMovie method with expected param', async () => {
        const removeMovieSpy = jest.spyOn(movieService, 'removeMovie');
        const Id = 'Id';
        movieService.removeMovie(Id);
        expect(removeMovieSpy).toHaveBeenCalledWith(Id);
    });
})