import express from 'express';
type Request = express.Request;
type Response = express.Response;

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    // Only allow admin or self
    const roles = req.user?.role || [];
    if (!roles.includes("admin") && req.user?.id !== id) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const employee = await prisma.employee.findUnique({
      where: { id: id as string },
      include: {
        user: true,
        department: true,
        payrolls: true,
        leaves: true,
        notifications: true,
        contracts: true,
        emergencyContacts: true,
        ebdLogs: true,
        assignedTasks: true,
      },
    });
    if (!employee) return res.status(404).json({ error: "Not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employee', details: error });
  }
};

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        user: true,
        department: true,
        payrolls: true,
        leaves: true,
        notifications: true,
        contracts: true,
        emergencyContacts: true,
        ebdLogs: true,
        assignedTasks: true,
      },
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees', details: error });
  }
};
