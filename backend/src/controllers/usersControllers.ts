import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import userModel from "../models/user"

const jwtSecret = process.env.JWT_SECRET as string;

const generateToken = (id: string): string => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};

interface customRequest extends Request{
    user?: any;
};

const userController = {
    createUser: async (req: Request, res:Response): Promise<void> => {
        const {username, email, password, profileImage } = req.body;
        try {
            //check if user already exists
            const existingUser = await userModel.findOne({email}) as any;
            if(existingUser){
                res.status(409).json({ msg: ["Usuário já existe!"] })
                return;
            }

            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            const newUser = new userModel({
                username,
                email,
                password: passwordHash,
                profileImage,
                role: "usuario"
            });

            const savedUser = await newUser.save();
            const userPassword = savedUser._id as string;
            res.status(201).json({
                user: savedUser,
                token: generateToken(userPassword.toString()),
                msg: "Usuário criado com sucesso!"
            });

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    signLogin: async (req: Request, res: Response): Promise<void> => {
        const {email, password} = req.body;
        const user = await userModel.findOne({ email })
        
        if(!user){
            res.status(404).json({ errors: ["Usuário não encontrado."]})
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password as string);
        if (!isMatch) {
            res.status(422).json({ errors: ["Senhas não são iguais."] })
            return;
        }
        
        const userPassword = user._id as string;
        const token = generateToken(userPassword);
        res.status(201).json({
            email: email,
            token: token,
            msg: "O login está feito!"
        });
    },
    
    getAllLogin: async(req: Request, res: Response): Promise<void> => {
        try {
            const login = await userModel.find();
            res.json(login);
        } catch(error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    getLogin: async(req: Request, res: Response): Promise<void> => {
        try {
            const {id} = req.params;
            const login = await userModel.findById(new mongoose.Types.ObjectId(id)).select("-password")

            if(!login){
                res.status(204).json({ msg: ["Usuário não encontrado."] })
            };

            res.status(200).json(login);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    updateLogin: async(req: Request, res: Response): Promise<void> => {
        const {username, email, password} = req.body;
        const { id } = req.params;
        const user = await userModel.findById(id).select("-password") as any;

        if(!user){
            res.status(204).json({ msg: ["Usuário não encontrado."] })
            return;
        }

        if(username){
            user.username = username;
        }

        if(email){
            user.email = email;
        }

        if(password){
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            user.password = passwordHash;
        }

        const updateUser = await userModel.findByIdAndUpdate(id, user) as any;

        if(!updateUser){
            res.status(204).json({ msg: ["Usuário não encontrado."] })
        }

        res.status(200).json({
            id: id,
            token: generateToken(id),
            msg: "O usuário atualizado com sucesso!"
        });
    },

    getCurrentUser: async(req: customRequest, res: Response): Promise<void> => {
        const user = req.user;

        if(!user){
            res.status(401).json({ msg: ["Usuário não autenticado."] });
            return;
        }

        res.status(200).json({
            user,
            msg: "Acessado!"
        });
    },
}
export default userController;