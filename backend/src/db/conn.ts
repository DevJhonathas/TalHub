import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();
const mongoUrl = process.env.CONN_MONGODB;

if(!mongoUrl){
    throw new Error("A variável de ambiente CONN_MONGODB não está definida.")
}

const connectToDatabase = async () => {
    try{
        await mongoose.connect(mongoUrl);
        console.log("Conectado com sucesso ao MongoDB.");
    } catch (error){
        console.error("Erro ao conectar ao MongoDB", error);
        process.exit(1);
    }
};

export default connectToDatabase;