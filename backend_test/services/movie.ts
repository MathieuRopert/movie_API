import { ObjectId } from "mongodb";

export default class Movie {
    constructor(
        public name: string, 
        public director: string, 
        public category: string, 
        public duration: string,
        ) {}
}