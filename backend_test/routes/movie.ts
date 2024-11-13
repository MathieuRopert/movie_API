// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { movieCollection } from "../services/database.service";
import Movie from "../services/movie";


// Global Config
export const movieRouter = express.Router();
movieRouter.use(express.urlencoded({ extended: true }));


// GET
movieRouter.get("/", async (_req: Request, res: Response) => {
    try {
       if (!movieCollection.movies) {
           res.status(500).send("collection undefined");
           return;
       }

       const movies = (await movieCollection.movies.find().toArray()) as unknown as Movie[];
       if (movies.length === 0) {
           res.status(404).send("Movie not found");
           return;
       }
       res.status(200).send(movies);
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
});


//GET by ID
movieRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        if (!movieCollection.movies) {
            res.status(500).send("collection undefined");
            return;
        }
        const movie = (await movieCollection.movies.findOne(query)) as unknown as Movie;

        if (movie) {
            res.status(200).send(movie);
        }
    } catch (error) {
        res.status(404).send(`Unable to find movie`);
    }
});

// POST

movieRouter.post("/", async (req: Request, res: Response) => {
    const { name, director, category, duration } = req.body;
    //console.log(req.body);

    if (!name || !director || !category || !duration) {
        res.status(400).send("All fields are required");
        return;
    }
    
    try {
        const newMovie = { name, director, category, duration } as Movie;

        if (!movieCollection.movies) {
            res.status(500).send("collection undefined");
            return;
        }
        const result = await movieCollection.movies.insertOne(newMovie);
        result
            ? res.status(201).send(`Movie successfully created`)
            : res.status(500).send("Failed to create a movie");
    } catch (error) {
        console.error(error);
        res.status(400).send((error as Error).message);
    }
});

// PUT
movieRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedMovie: Movie = req.body as Movie;
        const query = { _id: new ObjectId(id) };

        if (!movieCollection.movies) {
            res.status(500).send("collection undefined");
            return;
        }

        const result = await movieCollection.movies.updateOne(query, { $set: updatedMovie });
        result

            ? res.status(200).send("Movie successfully updated")
            : res.status(304).send("Failed to update movie");

    } catch (error) {

        console.error((error as Error).message);
        res.status(400).send((error as Error).message);
    }
});

// DELETE
movieRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };

        if (!movieCollection.movies) {
            res.status(500).send("collection undefined");
            return;
        }
        const result = await movieCollection.movies.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send("Game successfully removed");
        } else if (!result) {
            res.status(400).send("Failed to remove game");
        } else if (!result.deletedCount) {
            res.status(404).send("Game not found");
        }
    } catch (error) {
        console.error((error as Error ).message);
        res.status(400).send((error as Error ).message);
    }
});
export default movieRouter;