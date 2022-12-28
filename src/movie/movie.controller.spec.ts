import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MovieController } from './movie.controller';
import { GenreType } from '../form.types';

describe("MovieController Unit Tests", () => {
    let movieController: MovieController;
    let spyService: MovieService;
    const ApiServiceProvider = {
        provide: MovieService,
        useFactory: () => ({
            getMovieByTitle: jest.fn(() => []),
            getMovieById: jest.fn(() => []),
            allMovies: jest.fn(() => { }),
            createMovie: jest.fn(() => { }),
            updateMovie: jest.fn(() => { }),
            removeMovie: jest.fn(() => { })
        })
    }
    beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
        controllers: [MovieController],
        providers: [MovieService, ApiServiceProvider],
    }).compile();
    movieController = app.get<MovieController>(MovieController);
    spyService = app.get<MovieService>(MovieService);
    })
    it('ApiService - should be defined', () => {
        expect(spyService).toBeDefined();
      });
    it("calling createMovie method", async () => {
        const createmoviedto : CreateMovieDto = {
            title : "Inception",
            description : "Inception is a 2010 science fiction action film written and directed by Christopher Nolan",
            releaseDate : "08-07-2010",
            rating : 5,
            poster : "Poster",
            actors : ['Leonardo DiCaprio', 'Tom Hardy'],
            genre : GenreType.Aventure
        }
        expect(movieController.createMovie(createmoviedto)).not.toEqual(null);
    })
    it("calling createMovie method", async () => {
        const createmoviedto : CreateMovieDto = {
            title : "Inception",
            description : "Inception is a 2010 science fiction action film written and directed by Christopher Nolan",
            releaseDate : "08-07-2010",
            rating : 5,
            poster : "Poster",
            actors : ['Leonardo DiCaprio', 'Tom Hardy'],
            genre : GenreType.Aventure
        }
        movieController.createMovie(createmoviedto);
        expect(spyService.createMovie).toHaveBeenCalled();
        expect(spyService.createMovie).toHaveBeenCalledWith(createmoviedto);
    })
    it("calling getAllMovies method", () => {
        movieController.getAllMovies();
        expect(spyService.allMovies).toHaveBeenCalled();
    })
    it("calling modifyMovie method", () => {
        const id : string = 'jhdsfhds';
        const updateMovieDto : UpdateMovieDto = {
            title : "Inception",
            description : "Inception is a 2010 science fiction action film written and directed by Christopher Nolan",
            releaseDate : "08-07-2010",
            rating : 5,
            poster : "Poster",
            actors : ['Leonardo DiCaprio', 'Tom Hardy'],
            genre : GenreType.Aventure
        }
        movieController.modifyMovie(id, updateMovieDto);
        expect(spyService.updateMovie).toHaveBeenCalled();
        expect(spyService.updateMovie).toHaveBeenCalledWith(id, updateMovieDto);
    })
    it("calling deleteMovie method", () => {
        const id : string = 'jhdsfhds';
        movieController.deleteMovie(id);
        expect(spyService.removeMovie).toHaveBeenCalled();
        expect(spyService.removeMovie).toHaveBeenCalledWith(id);
    })
})