"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const usersControllers_1 = __importDefault(require("../controllers/usersControllers"));
router.route("/register")
    .post((req, res) => usersControllers_1.default.createUser(req, res));
exports.default = router;
