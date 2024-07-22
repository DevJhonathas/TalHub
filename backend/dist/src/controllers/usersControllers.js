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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const jwtSecret = process.env.JWT_SECRET;
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};
;
const userController = {
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, email, password, profileImage } = req.body;
        try {
            //check if user already exists
            const existingUser = yield user_1.default.findOne({ email });
            if (existingUser) {
                res.status(409).json({ msg: ["Usuário já existe!"] });
                return;
            }
            const salt = yield bcryptjs_1.default.genSalt();
            const passwordHash = yield bcryptjs_1.default.hash(password, salt);
            const newUser = new user_1.default({
                username,
                email,
                password: passwordHash,
                profileImage,
                role: "usuario"
            });
            const savedUser = yield newUser.save();
            const userPassword = savedUser._id;
            res.status(201).json({
                user: savedUser,
                token: generateToken(userPassword.toString()),
                msg: "Usuário criado com sucesso!"
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    signLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrado."] });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(422).json({ errors: ["Senhas não são iguais."] });
            return;
        }
        const userPassword = user._id;
        res.status(201).json({
            email: email,
            token: generateToken(userPassword.toString()),
            msg: "O login está feito!"
        });
    }),
    getAllLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const login = yield user_1.default.find();
            res.json(login);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const login = yield user_1.default.findById(new mongoose_1.default.Types.ObjectId(id)).select("-password");
            if (!login) {
                res.status(204).json({ msg: ["Usuário não encontrado."] });
            }
            ;
            res.status(200).json(login);
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        const { id } = req.params;
        const user = yield user_1.default.findById(id).select("-password");
        if (!user) {
            res.status(204).json({ msg: ["Usuário não encontrado."] });
            return;
        }
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            const salt = yield bcryptjs_1.default.genSalt();
            const passwordHash = yield bcryptjs_1.default.hash(password, salt);
            user.password = passwordHash;
        }
        const updateUser = yield user_1.default.findByIdAndUpdate(id, user);
        if (!updateUser) {
            res.status(204).json({ msg: ["Usuário não encontrado."] });
        }
        res.status(200).json({
            id: id,
            token: generateToken(id),
            msg: "O usuário atualizado com sucesso!"
        });
    }),
    getCurrentUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        if (!user) {
            res.status(401).json({ msg: ["Usuário não autenticado."] });
            return;
        }
        res.status(200).json({
            user,
            msg: "Acessado!"
        });
    }),
};
exports.default = userController;
//# sourceMappingURL=usersControllers.js.map