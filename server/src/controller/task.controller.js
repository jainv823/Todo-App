import logger from "../../logger.js";
import { Task } from "../models/task.model.js";

const addTask = async (req, res) => {
  const { name, completed } = req.body;
  try {
    const newTask = await Task.create({ name, completed });
    if (!newTask) {
      throw new Error("Task not created");
    }
    res.status(201).json(newTask);
    logger.info(`New task added: ${name}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(` Error adding task: ${error.message}`);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      res.status(404).json({ "Tasks not found": "No tasks found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const id = req.params._id;
  const { name, completed } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { name, completed },
      { new: true }
    );
    if (!task) {
      throw new Error("Task not found");
    }
    logger.info(`Task updated successfully: ${task}`);
    res.status(200).json(task);
  } catch (error) {
    logger.error(`Error updating task: ${error}`);
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const  id  = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw new Error("Task not found");
    }
    res.status(200).json(task);
    logger.info(`Task deleted successfully: ${task._id}, ${task.name}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(`Error deleting task: ${error}`);
  }
};

export { addTask, getAllTasks, updateTask, deleteTask };
