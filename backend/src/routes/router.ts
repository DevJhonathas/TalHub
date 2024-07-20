import express from "express";
const router = express.Router();

router.use("/users", require("./usersRoutes").default);

export default router;