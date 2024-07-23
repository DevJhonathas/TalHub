import groupsModel from "../models/group";
import {Response, Request} from "express";
import userController from "../controllers/usersControllers";

//createGroup - create
//getGroupById - get
//getAllGroups - get
//updateGroup - update
//findGroup - get

const groupsController = {
    createGroup: async(req: Request, res: Response): Promise<void> => {
        try {
            const { name, description, type } = req.body;

            if (type !== 'publico' && type !== 'privado') {
                res.status(400).json({ msg: ["Tipo de grupo inválido! Deve ser 'public' ou 'private'."] });
                return;
            }

            if (!name || !description || !type) {
                res.status(422).json({ msg: ["Parâmetros incompletos para criação de grupo."] });
                return;
            }

            const currentUser = await userController.getCurrentUser(req, res) as any;
            
            const createGroup = await groupsModel.create({
                name,
                description,
                type,
                creator:{
                    id: currentUser._id,
                    username: currentUser.username
                }
            })
            res.status(201).json({
                createGroup,
                msg: `Groupo criado com sucesso!`
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    getGroup: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const selectGroup = await groupsModel.findOne(id || name);
            
            if(!selectGroup){
                res.status(204).json({msg: ["Grupo não encontrado."]});
            };
            
            res.status(201).json({selectGroup});
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    getAllGroups: async (req: Request, res: Response) => {
        try {
            const groups = await groupsModel.find();
            res.status(201).json({
                groups
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    updateGroupByID: async (req: Request, res: Response) => {

    },

    deleteGroupById: async (req: Request, res: Response) => {
        
    }
};

export default groupsController;