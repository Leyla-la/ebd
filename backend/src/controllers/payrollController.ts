import { PrismaClient } from '@prisma/client';
import express from 'express';
type Request = express.Request;
type Response = express.Response;

const prisma = new PrismaClient();

// GET /payrolls
export const getAllPayrolls = async (req: Request, res: Response) => {
  try {
    const roles = req.user?.role || [];
    if (roles.includes("admin")) {
      // Admin: get all payrolls
      const payrolls = await prisma.payroll.findMany({ include: { employee: true } });
      return res.json(payrolls);
    } else {
      // Employee: only own payrolls
      const userId = req.user?.id;
      if (!userId) return res.json([]);
      const employee = await prisma.employee.findFirst({ where: { userId: userId as string } });
      if (!employee) return res.json([]);
      const payrolls = await prisma.payroll.findMany({ where: { employeeId: employee.id }, include: { employee: true } });
      return res.json(payrolls);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payrolls', details: error });
  }
};

// GET /payrolls/:id
export const getPayrollById = async (req: Request, res: Response) => {
  try {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Missing id" });
  const payroll = await prisma.payroll.findUnique({ where: { id: id as string }, include: { employee: true } });
  if (!payroll) return res.status(404).json({ error: "Not found" });
  const roles = req.user?.role || [];
  if (roles.includes("admin")) return res.json(payroll);
  // Employee: only own
  const userId = req.user?.id;
  if (!userId) return res.status(403).json({ error: "Forbidden" });
  const employee = await prisma.employee.findFirst({ where: { userId: userId as string } });
  if (employee && payroll.employeeId === employee.id) return res.json(payroll);
  return res.status(403).json({ error: "Forbidden" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payroll', details: error });
  }
};

// POST /payrolls
export const createPayroll = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const payroll = await prisma.payroll.create({ data });
    res.status(201).json(payroll);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payroll', details: error });
  }
};

// PUT /payrolls/:id
export const updatePayroll = async (req: Request, res: Response) => {
  try {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Missing id" });
  const data = req.body;
  const payroll = await prisma.payroll.update({ where: { id: id as string }, data });
  res.json(payroll);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payroll', details: error });
  }
};

// DELETE /payrolls/:id
export const deletePayroll = async (req: Request, res: Response) => {
  try {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Missing id" });
  await prisma.payroll.delete({ where: { id: id as string } });
  res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete payroll', details: error });
  }
};
