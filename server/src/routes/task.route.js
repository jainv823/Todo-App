import { Router } from "express";
import {
  addTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controller/task.controller.js";

const router = Router();

router.route("/").get(getAllTasks);
router.route("/add").post(addTask);
router.route("/update/:id").put(updateTask);
router.route("/delete/:id").delete(deleteTask);

export default router;
