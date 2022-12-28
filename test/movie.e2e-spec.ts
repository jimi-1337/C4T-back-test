import { HttpStatus } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import { CreateMovieDto } from 'src/dto/create-movie.dto';
import { GenreType } from '../src/form.types';
import * as request from 'supertest';

import { User } from '../src/entities/user.entity';
import { UpdateMovieDto } from '../src/dto/update-movie.dto';

describe('movieController (e2e)', () => {
    let token : string = "";
    let id : string = "";
    const authUrl = `http://localhost:3000`;
    const mockUser: User = {
        username: "givenName8@mail.com",
        password: "password",
    };
    const createMovieDto : CreateMovieDto = {
        title : "test1111",
        description : "Inception is a 2010 science fiction action film written and directed by Christopher Nolan",
        releaseDate : "08-07-2010",
        rating : 5,
        poster : "Poster",
        actors : ['Leonardo DiCaprio', 'Tom Hardy'],
        genre : GenreType.Aventure
    }
    const upMovieDto : UpdateMovieDto = {
        title : "test1111",
        description : "Inception is a 2010 science fiction action film written and directed by Christopher Nolan",
        releaseDate : "08-07-2010",
        rating : 7,
        poster : "Poster",
        actors : ['Leonardo DiCaprio', 'Tom Hardy'],
        genre : GenreType.Aventure
    }
    beforeAll(async () => {
        const response = await request(authUrl)
        .post("/auth/login")
        .set("Accept", "application/json")
        .send(mockUser)
      token = response.body.access_token;
    });
    describe('/movies/createMovie (POST)', () => {
        it("it should register a user and return the new user object", async () => {
            const response = await request(authUrl)
            .post('/movies/createMovie')
            .set('Authorization', `Bearer ${token}`)
            .send(createMovieDto)
            .expect((response: request.Response) => {
                const {
                    _id,
                    title,
                    description,
                    releaseDate,
                    rating,
                    poster,
                    actors,
                    genre,
                } = response.body;
                id = _id;
                expect(typeof _id).toBe("string")
                expect(title).toEqual(createMovieDto.title)
                expect(description).toEqual(createMovieDto.description)
                expect(rating).toEqual(createMovieDto.rating)
                expect(poster).toEqual(createMovieDto.poster)
                expect(actors).toEqual(createMovieDto.actors)
                // expect(releaseDate).toBeInstanceOf(Date)
                expect(genre).toEqual(createMovieDto.genre)
            }).expect(HttpStatus.CREATED);
        })
    })
    describe("/movies (GET)", () => {
        it("it should register a user and return the new user object", async () => {
            const response = await request(authUrl)
            .get("/movies")
            .set('Authorization', `Bearer ${token}`)
            .expect((response: request.Response) => {
             }).expect(HttpStatus.OK);
        })
    })
    describe('/modifyMovie/:id (PUT)', () => {
        it("it should register a user and return the new user object", async () => {
            const response = await request(authUrl)
            .put(`/movies/modifyMovie/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(upMovieDto)
            .expect((response: request.Response) => {
                const {
                    _id,
                    title,
                    description,
                    releaseDate,
                    rating,
                    poster,
                    actors,
                    genre,
                } = response.body;
                id = _id;
                expect(typeof _id).toBe("string")
                expect(title).toEqual(createMovieDto.title)
                expect(description).toEqual(createMovieDto.description)
                expect(rating).toEqual(createMovieDto.rating)
                expect(poster).toEqual(createMovieDto.poster)
                expect(actors).toEqual(createMovieDto.actors)
                // expect(releaseDate).toBeInstanceOf(Date)
                expect(genre).toEqual(createMovieDto.genre)
            }).expect(HttpStatus.OK);
        })
    })
    describe('/deleteMovie/:id (PUT)', () => {
        it("it should register a user and return the new user object", async () => {
            const response = await request(authUrl)
            .delete(`/movies/deleteMovie/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect((response: request.Response) => {
                const {
                    _id,
                    title,
                    description,
                    releaseDate,
                    rating,
                    poster,
                    actors,
                    genre,
                } = response.body;
                expect(typeof _id).toBe("string")
                expect(title).toEqual(upMovieDto.title)
                expect(description).toEqual(upMovieDto.description)
                expect(rating).toEqual(upMovieDto.rating)
                expect(poster).toEqual(upMovieDto.poster)
                expect(actors).toEqual(upMovieDto.actors)
                // expect(releaseDate).toBeInstanceOf(Date)
                expect(genre).toEqual(upMovieDto.genre)
            }).expect(HttpStatus.OK);
        })
    })
});