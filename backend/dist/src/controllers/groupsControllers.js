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
const usersControllers_1 = __importDefault(require("../controllers/usersControllers"));
//createGroup - create
//getGroupById - get
//getAllGroups - get
//updateGroup - update
//findGroup - get
const groupsController = {
    createGroup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const currentUser = yield usersControllers_1.default.getCurrentUser(req, res);
            const createGroup = yield group_1.default.create({
                name,
                description,
                type,
                creator: {
                    id: currentUser._id,
                    username: currentUser.username
                }
            });
            res.status(201).json({
                createGroup,
                msg: `Groupo criado com sucesso!`
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }),
    getGroup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const selectGroup = yield group_1.default.findOne(id || name);
            if (!selectGroup) {
                res.status(204).json({ msg: ["Grupo não encontrado."] });
            }
            ;
            res.status(201).json({ selectGroup });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }),
    getAllGroups: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const groups = yield group_1.default.find();
            res.status(201).json({
                groups
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }),
    updateGroupByID: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    }),
    deleteGroupById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    })
};
exports.default = groupsController;
//# sourceMappingURL=groupsControllers.js.map