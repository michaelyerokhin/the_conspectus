import { Router } from "express";
import {
  getAllProfiles,
  getProfileById,
  getProfilesByFirstName,
} from "../controllers/profile.controller";

const router = Router();

router.get("/", getProfilesByFirstName);
router.get("/all", getAllProfiles);
router.get("/:id", getProfileById);

export default router;
