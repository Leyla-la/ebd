import { PrismaClient } from '@prisma/client';
import express from 'express';
type Request = express.Request;
type Response = express.Response;

const prisma = new PrismaClient();

// GET /ebd-logs
export const getAllEbdLogs = async (req: Request, res: Response) => {
  try {
    const roles = req.user?.roles || [];
    if (roles.includes("admin")) {
      // Admin: get all logs
      const logs = await prisma.ebdLog.findMany({ include: { employee: true } });
      return res.json(logs);
    } else {
      // Employee: only own logs
      const userId = req.user?.id;
      if (!userId) return res.json([]);
      const employee = await prisma.employee.findFirst({ where: { userId: userId as string } });
      if (!employee) return res.json([]);
      const logs = await prisma.ebdLog.findMany({ where: { employeeId: employee.id }, include: { employee: true } });
      return res.json(logs);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch EBD logs', details: error });
  }
};

// GET /ebd-logs/:id
export const getEbdLogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const log = await prisma.ebdLog.findUnique({ where: { id: id as string }, include: { employee: true } });
    if (!log) return res.status(404).json({ error: "Not found" });
    const roles = req.user?.roles || [];
    if (roles.includes("admin")) return res.json(log);
    // Employee: only own
    const userId = req.user?.id;
    if (!userId) return res.status(403).json({ error: "Forbidden" });
    const employee = await prisma.employee.findFirst({ where: { userId: userId as string } });
    if (employee && log.employeeId === employee.id) return res.json(log);
    return res.status(403).json({ error: "Forbidden" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch EBD log', details: error });
  }
};

// POST /ebd-logs
export const createEbdLog = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const log = await prisma.ebdLog.create({ data });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create EBD log', details: error });
  }
};

// PUT /ebd-logs/:id
export const updateEbdLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const data = req.body;
    const log = await prisma.ebdLog.update({ where: { id: id as string }, data });
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update EBD log', details: error });
  }
};

// DELETE /ebd-logs/:id
export const deleteEbdLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    await prisma.ebdLog.delete({ where: { id: id as string } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete EBD log', details: error });
  }
};
