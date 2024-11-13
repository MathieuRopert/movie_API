import { response, Request } from "express";
import userRouter from "./movie";
import { describe, test, expect} from '@jest/globals'
import request from 'supertest'
import { ObjectId } from 'mongodb';


//TEST GET
describe("GET /", () => {
    test("responds with 200 status", async () => {
        const response = await request(userRouter).get('/users')
        expect(response.status).toEqual(200)
    });

});


//TEST GET BY ID
describe("GET /:id", () => {
    test("responds with 200 status", async () => {
        const response = await request(userRouter).get(`/users/${ObjectId}`)
        expect(response.status).toEqual(200)
    });
});

//TEST POST SIGN UP
describe("POST /", () => {
    test("responds with 200 status", async () => {
        const response = await request(userRouter).post(`/users/signup`)
        expect(response.status).toEqual(200)
    });
});

//TEST POST SIGN IN
describe("POST /", () => {
    test("responds with 200 status", async () => {
        const response = await request(userRouter).post(`/users/signin`)
        expect(response.status).toEqual(200)
    });
});

//TEST PUT
describe("PUT /:id", () => {
    test("responds with 200 status", async () => {
        const response = await request(userRouter).put(`/users/${ObjectId}`)
        expect(response.status).toEqual(200)
    });
});

//TEST DELETE
describe("DELETE /:id", () => {
    test("responds with 200 status", async () => {
        const response = await request(userRouter).delete(`/users/${ObjectId}`)
        expect(response.status).toEqual(200)
    });
});