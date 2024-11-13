// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const movieCollection: { movies?: mongoDB.Collection } = {}
export const userCollection: { users?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectDB () {
   dotenv.config();

   if (!process.env.DB_CONN) {
       throw new Error("DB_CONN_STRING is not defined");
   }
   const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN);
           
   await client.connect();
       
   const db: mongoDB.Db = client.db(process.env.DB_NAME);
  
   if (!process.env.MOVIE_COLLECTION) {
       throw new Error("GAMES_COLLECTION_NAME is not defined");
   }
   const gamesCollection: mongoDB.Collection = db.collection(process.env.MOVIE_COLLECTION);

   if (!process.env.USER_COLLECTION) {
    throw new Error("USER_COLLECTION_NAME is not defined");
    }
    const usersCollection: mongoDB.Collection = db.collection(process.env.USER_COLLECTION);

 movieCollection.movies = gamesCollection;
 userCollection.users = usersCollection;
      
    console.log("Successfully connected to database ADDE");
}