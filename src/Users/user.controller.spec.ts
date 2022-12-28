import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { UserController } from './user.controller';
import { GenreType } from '../form.types';
import { CreateUserDto } from '../dto/create-user.dto';

describe("MovieController Unit Tests", () => {
    let userController: UserController;
    let spyService: UserService;
    const ApiServiceProvider = {
        provide: UserService,
        useFactory: () => ({
            getUserByUsername: jest.fn(() => []),
            registerUser: jest.fn(() => []),
        })
    }
    beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
        controllers: [UserController],
        providers: [UserService, ApiServiceProvider],
    }).compile();
    userController = app.get<UserController>(UserController);
    spyService = app.get<UserService>(UserService);
    })
    it('ApiService - should be defined', () => {
        expect(spyService).toBeDefined();
      });
    it("calling registerUser method", async () => {
        const createuserdto : CreateUserDto = {
            username : "givenName8@mail",
            password : "test",
        }
        expect(userController.registerUser(createuserdto)).not.toEqual(null);
    })
    it("calling registerUser method", async () => {
        const createuserdto : CreateUserDto = {
            username : "givenName8@mail",
            password : "test",
        }
        userController.registerUser(createuserdto);
        expect(spyService.registerUser).toHaveBeenCalled();
        expect(spyService.registerUser).toHaveBeenCalledWith(createuserdto);
    })
    // it("calling getUserByUsername method", () => {
    //     const name : string = 'jhdsfhds';
    //     userController.getUserByUsername(name);
    //     expect(spyService.getUserByUsername).toHaveBeenCalled();
    //     expect(spyService.getUserByUsername).toHaveBeenCalledWith(name);
    // })
})