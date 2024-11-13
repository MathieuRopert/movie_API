import { response, Request } from "express";
import movieRouter from "./movie";
import { describe, test, expect} from '@jest/globals'
import request from 'supertest'
import { ObjectId } from 'mongodb';


//TEST GET
describe("GET /", () => {
    test("responds with 200 status", async () => {
        const response = await request(movieRouter).get('/movies')
        expect(response.status).toEqual(200)
    });

});


//TEST GET BY ID
describe("GET /:id", () => {
    test("responds with 200 status", async () => {
        const response = await request(movieRouter).get(`/movies/${ObjectId}`)
        expect(response.status).toEqual(200)
    });
});

//TEST POST
describe("POST /", () => {
    test("responds with 200 status", async () => {
        const response = await request(movieRouter).post(`/movies`)
        expect(response.status).toEqual(200)
    });
});

//TEST PUT
describe("PUT /:id", () => {
    test("responds with 200 status", async () => {
        const response = await request(movieRouter).put(`/movies/${ObjectId}`)
        expect(response.status).toEqual(200)
    });
});

//TEST DELETE
describe("DELETE /:id", () => {
    test("responds with 200 status", async () => {
        const response = await request(movieRouter).delete(`/movies/${ObjectId}`)
        expect(response.status).toEqual(200)
    });
});