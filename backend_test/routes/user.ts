// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { userCollection } from "../services/database.service";
import User from "../services/user";
import { checkBody } from "../modules/checkBody";
import bcript from "bcrypt";
import validator from "validator";

// Global Config
export const userRouter = express.Router();
userRouter.use(express.urlencoded({ extended: true }));

// GET
userRouter.get("/", async (_req: Request, res: Response) => {
    try {
       if (!userCollection.users) {
           res.status(500).send("collection undefined");
           return;
       }

       const users = (await userCollection.users.find().toArray()) as unknown as User[];
       if (users.length === 0) {
           res.status(404).send("User not found");
           return;
       }
       res.status(200).send(users);
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
});

//GET by ID
userRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        if (!userCollection.users) {
            res.status(500).send("collection undefined");
            return;
        }
        const users = (await userCollection.users.findOne(query)) as unknown as User;

        if (users) {
            res.status(200).send(users);
        }else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
});

// POST Sign Up
userRouter.post("/signup", async (req: Request, res: Response) => {
    try {

        if (!checkBody(req.body, ['email', 'password'])) {

            res.status(400).send("Empty or invalid fields");
            return;
          }
    
          const users = await userCollection.users?.findOne({ email: req.body.email });
            if (users) {

                res.status(409).send("User already exists");
                return;

            }else{
                if (!validator.isEmail(req.body.email)) {

                    res.status(400).send("Invalid email");
                    return;
                }
                const hashedPassword = await bcript.hash(req.body.password, 10);

                const user = {
                    email: req.body.email,
                    password: hashedPassword,
                };

                const result = await userCollection.users?.insertOne(user);
                result

                ?res.status(201).send("User created")
                : res.status(500).send("Failed to create a movie");

            }
    } catch (error) {

        console.error(error);
        res.status(400).send((error as Error).message);
    }
});

// POST Sign In
userRouter.post("/signin", async (req: Request, res: Response) => {
    try {

        if (!checkBody(req.body, ['email', 'password'])) {

            res.status(400).send("Empty or invalid fields");
            return;
          }
    
          const users = await userCollection.users?.findOne({ email: req.body.email });
            if (!users) {

                res.status(404).send("User not found");
                return;

            }else{
                if (!validator.isEmail(req.body.email)) {

                    res.status(400).send("Invalid email");
                    return;
                }
                const user = await bcript.compare(req.body.password, users.password);

                if(user){
                    res.status(200).send("User logged in");
                }else{
                    res.status(401).send("Invalid credentials");
                }

            }
    } catch (error) {

        console.error(error);
        res.status(400).send((error as Error).message);
    }
});

// PUT
userRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedUser: User = req.body as User;
        const query = { _id: new ObjectId(id) };

        if (!userCollection.users) {
            res.status(500).send("collection undefined");
            return;
        }

        const result = await userCollection.users.updateOne(query, { $set: updatedUser });

        result.matchedCount && result.modifiedCount
            ? res.status(200).send("User updated")
            : res.status(404).send("User not found");
    } catch (error) {
        res.status(400).send((error as Error).message);
    }
});

// DELETE
userRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };

        if (!userCollection.users) {
            res.status(500).send("collection undefined");
            return;
        }

        const result = await userCollection.users.deleteOne(query);

        result.deletedCount
            ? res.status(202).send("User removed")
            : res.status(404).send("User not found");
    } catch (error) {
        res.status(400).send((error as Error).message);
    }
});
export default userRouter;