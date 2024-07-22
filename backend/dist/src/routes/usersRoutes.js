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
router.route("/login")
    .post((req, res) => usersControllers_1.default.signLogin(req, res));
router.route("/login")
    .get((req, res) => usersControllers_1.default.getAllLogin(req, res));
router.route("/login/:id")
    .get((req, res) => usersControllers_1.default.getLogin(req, res));
router.route("/profile")
    .get((req, res) => usersControllers_1.default.getCurrentUser(req, res));
router.route("/login/:id")
    .put((req, res) => usersControllers_1.default.updateLogin(req, res));
exports.default = router;
//# sourceMappingURL=usersRoutes.js.map