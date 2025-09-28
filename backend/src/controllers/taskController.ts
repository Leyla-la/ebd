import { PrismaClient } from '@prisma/client';
import express from 'express';
type Request = express.Request;
type Response = express.Response;

const prisma = new PrismaClient();

// GET /tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const roles = req.user?.role || [];
    if (roles.includes("admin")) {
      // Admin: get all tasks
      const tasks = await prisma.task.findMany({ include: { assignedTo: true, assignedBy: true } });
      return res.json(tasks);
    } else {
      // Employee: only assigned tasks
      const userId = req.user?.id;
      if (!userId) return res.json([]);
      const employee = await prisma.employee.findFirst({ where: { userId: userId as string } });
      if (!employee) return res.json([]);
      const tasks = await prisma.task.findMany({ where: { assignedToId: employee.id }, include: { assignedTo: true, assignedBy: true } });
      return res.json(tasks);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: error });
  }
};

// GET /tasks/:id
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const task = await prisma.task.findUnique({ where: { id: id as string }, include: { assignedTo: true, assignedBy: true } });
    if (!task) return res.status(404).json({ error: "Not found" });
    const roles = req.user?.role || [];
    if (roles.includes("admin")) return res.json(task);
    // Employee: only assigned
    const userId = req.user?.id;
    if (!userId) return res.status(403).json({ error: "Forbidden" });
    const employee = await prisma.employee.findFirst({ where: { userId: userId as string } });
    if (employee && task.assignedToId === employee.id) return res.json(task);
    return res.status(403).json({ error: "Forbidden" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task', details: error });
  }
};

// POST /tasks
export const createTask = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const task = await prisma.task.create({ data });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task', details: error });
  }
};

// PUT /tasks/:id
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const data = req.body;
    const task = await prisma.task.update({ where: { id: id as string }, data });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task', details: error });
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    await prisma.task.delete({ where: { id: id as string } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task', details: error });
  }
};
