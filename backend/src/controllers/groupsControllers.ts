import groupsModel from "../models/group";
import {Response, Request} from "express";
import mongoose from "mongoose";


//createGroup - create
//getGroupById - get
//getAllGroups - get
//updateGroup - update
//findGroup - get

const groupsController = {
    createGroup: async(req: Request, res: Response): Promise<void> => {
        const {name, description, type, creator} = req.body;
        const id = req.params.id;

        try {
            const existingGroupById =  await groupsModel.findById({id}) as any;
            if(existingGroupById){
                res.status(409).json({ msg: ["Grupo já existente!"] });
                return;
            };

            const newGroup = new groupsModel({
                name,
                description,
                type,
                creator
            });

            const savedGroup = await newGroup.save();
            res.status(201).json({
                group: savedGroup,
                msg: `Groupo ${name} criado com sucesso!`
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