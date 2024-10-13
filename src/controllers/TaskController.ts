import { Handler, Request, Response } from "express";
import { Task } from "../models/Task";
import { z } from "zod";
import { HttpError } from "../errors/HttpError";

// req.body { title, description, status, priority }
const StoreRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["todo", "doing", "done"]),
  priority: z.enum(["low", "medium", "high"]),
});

const UpdateRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "doing", "done"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

export class TaskController {
  // GET /api/tasks
  index: Handler = (req, res) => {
    const tasks = Task.findAll();
    res.status(200).json(tasks);
  };

  // POST /api/tasks
  store = (req: Request, res: Response) => {
    const parseBody = StoreRequestSchema.parse(req.body);
    const newTask = Task.create(parseBody);
    res.status(201).json(newTask);
  };

  // GET /api/tasks/:id
  show: Handler = (req, res) => {
    const id = req.params.id;
    const task = Task.findById(+id);
    if (!task) throw new HttpError(404, "Task not found");
    res.json(task);
  };

  // PUT /api/tasks/:id
  update: Handler = (req, res) => {
    const id = req.params.id;
    const parseBody = UpdateRequestSchema.parse(req.body);
    const updateTask = Task.update(+id, parseBody);
    if (!updateTask) throw new HttpError(404, "Task not found");
    res.json(updateTask);
  };

  // DELETE /api/tasks/:id
  delete: Handler = (req, res) => {
    const id = req.params.id;
    const deleteTask = Task.delete(+id);
    if (!deleteTask)  throw new HttpError(404, "Task not found");
    res.status(204).json(deleteTask);
  }
}
