import express,{Request, Response}  from "express";
const router = express.Router();

import userController from "../controllers/usersControllers";

router.route("/register")
  .post((req: Request, res: Response) => userController.createUser(req, res));

export default router;