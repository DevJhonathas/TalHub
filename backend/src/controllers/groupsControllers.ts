import groupsModel from "../models/group";
import {Response, Request} from "express";


//createGroup - create
//getUserGroup - get
//findGroup - get

const groupsController = {
    createGroup: async(req: Request, res: Response): Promise<void> => {
        const {name, description, type, creator} = req.body;
        const id = req.params.id;

        try {
            const existingGroupById =  await groupsModel.findOne({id}) as any;
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
                msg: "Groupo criado com sucesso!"
            });

        } catch (error) {
            console.log(error);
        }
    }
};

export default groupsController;