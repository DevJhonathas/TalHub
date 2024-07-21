import express,{Request, Response}  from "express";
const router = express.Router();

import userController from "../controllers/usersControllers";

router.route("/register")
  .post((req: Request, res: Response) => userController.createUser(req, res));

router.route("/login")
  .post((req: Request, res: Response) => userController.signLogin(req, res));

router.route("/login")
  .get((req: Request, res: Response) => userController.getAllLogin(req, res));

router.route("/login/:id")
  .get((req: Request, res: Response) => userController.getLogin(req, res));
  
router.route("/profile")
  .get((req: Request, res: Response) => userController.getCurrentUser(req, res));

router.route("/login/:id")
  .put((req: Request, res: Response) => userController.updateLogin(req, res));

export default router;