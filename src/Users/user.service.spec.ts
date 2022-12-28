import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';

class ApiServiceMock {
    getUserByUsername(name: string) {
       return [];
    }
    registerUser(createUserDto: CreateUserDto) {
      return [];
    }
}

describe.only("UserService", () => {
    let userService: UserService;
    beforeAll(async () => {
        const ApiServiceProvider = {
          provide: UserService,
          useClass: ApiServiceMock,
        }
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            UserService, ApiServiceProvider
          ],
        }).compile();
        userService = module.get<UserService>(UserService);
    })

    it('should call registerUser method with expected params', async () => {
        const createNoteSpy = jest.spyOn(userService, 'registerUser');
        const dto = new CreateUserDto();
        userService.registerUser(dto);
        expect(createNoteSpy).toHaveBeenCalledWith(dto);
    });

    it('should call getUserByUsername method with expected param', async () => {
        const getUserByUsernameSpy = jest.spyOn(userService, 'getUserByUsername');
        const name : string = "givenName8@mail";
        userService.getUserByUsername(name);
        expect(getUserByUsernameSpy).toHaveBeenCalledWith(name);
    });
})