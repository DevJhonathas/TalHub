import express from "express";
const router = express.Router();

router.use("/users", require("./usersRoutes").default);

router.use("/group", require("./groupRoutes").default);

export default router;