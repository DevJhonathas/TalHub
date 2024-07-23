"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const groupsControllers_1 = __importDefault(require("../controllers/groupsControllers"));
router.route('/register')
    .post((req, res) => groupsControllers_1.default.createGroup(req, res));
router.route('/group')
    .get((req, res) => groupsControllers_1.default.getAllGroups(req, res));
exports.default = router;
//# sourceMappingURL=groupRoutes.js.map