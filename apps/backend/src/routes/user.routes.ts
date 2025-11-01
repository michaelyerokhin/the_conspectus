import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  getUserById,
  listUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/", authenticateToken, listUsers);
router.get("/:id", authenticateToken, getUserById);
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

export default router;
