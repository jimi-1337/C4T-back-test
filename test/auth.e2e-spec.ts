import { HttpStatus } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';

import { User } from '../src/entities/user.entity';

describe('UserController (e2e)', () => {
        const authUrl = `http://localhost:3000`;
        const mockUser: User = {
            username: "givenName8@mail.com",
            password: "password",
        };
        // describe("/register (POST)", () => {
        //     it("it should register a user and return the new user object", () => {
        //         return request(authUrl)
        //         .post("/register")
        //         .set("Accept", "application/json")
        //         .send(mockUser)
        //         .expect((response: request.Response) => {
        //             const {
        //                 _id,
        //                 username,
        //                 password
        //             } = response.body;
        //             expect(typeof _id).toBe("string")
        //             expect(username).toEqual(mockUser.username),
        //             expect(typeof password).toBe("string")
        //         }).expect(HttpStatus.CREATED);
        //     })
        // })
});

describe('authController (e2e)', () => {
    const authUrl = `http://localhost:3000`;
    const mockUser: User = {
        username: "givenName8@mail.com",
        password: "password",
    };
    describe("/auth/login (POST)", () => {
        it("it should register a user and return the new user object", () => {
            return request(authUrl)
            .post("/auth/login")
            .set("Accept", "application/json")
            .send(mockUser)
            .expect((response: request.Response) => {
                const {
                    access_token
                } = response.body;
                expect(typeof access_token).toBe("string")
             }).expect(HttpStatus.CREATED);
        })
    })
});

describe('userController with authController (e2e)', () => {
    let token : string = "";
    const authUrl = `http://localhost:3000`;
    const mockUser: User = {
        username: "givenName8@mail.com",
        password: "password",
    };
    beforeAll(async () => {
      const response = await request(authUrl)
      .post("/auth/login")
      .set("Accept", "application/json")
      .send(mockUser)
    token = response.body.access_token;
    });
    describe("/register (GET)", () => {
        it("it should register a user and return the new user object", async () => {
            const response = await request(authUrl)
            .get("/register/username")
            .set('Authorization', `Bearer ${token}`)
            .expect((response: request.Response) => {
                const {
                    _id,
                    username,
                    password
                } = response.body;
                expect(typeof _id).toBe("string")
                expect(username).toEqual(mockUser.username),
                expect(typeof password).toBe("string")
             }).expect(HttpStatus.OK);
        })
    })
})