import { ObjectId } from "mongodb";

export default class Movie {
    constructor(
        public name: string, 
        public director: number, 
        public category: string, 
        duration: string,
        ) {}
}