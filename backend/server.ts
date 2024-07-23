// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectToDatabase from "./src/db/conn";
import routes from "./src/routes/router";
import cors from 'cors'

dotenv.config();

const app: Express = express();
app.use(cors()); 

app.use(cors({
  origin: 'http://localhost:5000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'],    // Cabeçalhos permitidos
  credentials: true                                     // Habilitar envio de cookies e credenciais
}));


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