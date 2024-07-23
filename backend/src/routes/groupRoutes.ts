import express,{Request, Response} from "express";
const router = express.Router();

import groupsController from "../controllers/groupsControllers";

router.route('/register')
  .post((req: Request, res: Response) => groupsController.createGroup(req, res));

router.route('/group')
  .get((req: Request, res: Response) => groupsController.getAllGroups(req, res));

export default router;