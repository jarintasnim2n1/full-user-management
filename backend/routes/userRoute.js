import express from "express";
import { getStatus, getUserByquery, getUsers , createUser, getUserById, updateUser, deleteUser} from "../controller/userController.js";

const router= express.Router();

router.get("/status",getStatus);
router.get("/search/:query", getUserByquery);
router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id",updateUser);
router.delete("/:id", deleteUser);
export default router