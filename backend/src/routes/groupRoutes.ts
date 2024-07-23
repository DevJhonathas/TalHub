import express,{Request, Response} from "express";
const router = express.Router();

import groupsController from "../controllers/groupsControllers";

router.route("/create")
    .post((req: Request, res: Response) => groupsController.createGroup(req, res));

export default router;