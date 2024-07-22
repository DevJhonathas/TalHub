"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const group_1 = __importDefault(require("../models/group"));
//createGroup - create
//getUserGroup - get
//findGroup - get
const groupsController = {
    createGroup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, description, type, creator } = req.body;
        const id = req.params.id;
        try {
            const existingGroupById = yield group_1.default.findOne({ id });
            if (existingGroupById) {
                res.status(409).json({ msg: ["Grupo já existente!"] });
                return;
            }
            ;
            const newGroup = new group_1.default({
                name,
                description,
                type,
                creator
            });
            const savedGroup = yield newGroup.save();
            res.status(201).json({
                group: savedGroup,
                msg: "Groupo criado com sucesso!"
            });
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.default = groupsController;
//# sourceMappingURL=groupsControllers.js.map