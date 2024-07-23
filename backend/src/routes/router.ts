import express from "express";
const router = express.Router();

router.use("/users", require("./usersRoutes"));
router.use("/group", require("./groupRoutes"));
export default router;