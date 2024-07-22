// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectToDatabase from "./src/db/conn";
import routes from "./src/routes/router";
import cors from 'cors'

dotenv.config();

const app: Express = express();
app.use(cors()); //add cors middleware

const port = process.env.PORT;

const startServer = async () => {
  await connectToDatabase();
  console.log("Pronto para interagir com o banco de dados.");

  app.use(express.json());
  app.use("/", routes)

  app.get("/", (req: Request, res: Response) => {
    res.send("Retornando valor teste");
  });

  app.listen(port, () => {
    console.log(`[Servidor]: Servidor está rodando em http://localhost:${port}`);
  });
};

startServer().catch(console.error);