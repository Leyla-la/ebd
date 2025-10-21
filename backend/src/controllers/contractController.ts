import { PrismaClient } from '@prisma/client';
import express from 'express';
type Request = express.Request;
type Response = express.Response;

const prisma = new PrismaClient();

// GET /contracts
export const getAllContracts = async (req: Request, res: Response) => {
  try {
    const roles = req.user?.roles || [];
    if (roles.includes("admin")) {
      // Admin: get all contracts
      const contracts = await prisma.contract.findMany({ include: { employee: true } });
      return res.json(contracts);
    } else {
      // Employee: only own contracts
      const userId = req.user?.id;
      if (!userId) return res.json([]);
      const employee = await prisma.employee.findFirst({ where: { userId: userId as string } });
      if (!employee) return res.json([]);
      const contracts = await prisma.contract.findMany({ where: { employeeId: employee.id }, include: { employee: true } });
      return res.json(contracts);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contracts', details: error });
  }
};

// GET /contracts/:id
export const getContractById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const contract = await prisma.contract.findUnique({ where: { id: id as string }, include: { employee: true } });
    if (!contract) return res.status(404).json({ error: "Not found" });
    const roles = req.user?.roles || [];
    if (roles.includes("admin")) return res.json(contract);
    // Employee: only own
    const userId = req.user?.id;
    if (!userId) return res.status(403).json({ error: "Forbidden" });
    const employee = await prisma.employee.findFirst({ where: { userId: userId as string } });
    if (employee && contract.employeeId === employee.id) return res.json(contract);
    return res.status(403).json({ error: "Forbidden" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contract', details: error });
  }
};

// POST /contracts
export const createContract = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const contract = await prisma.contract.create({ data });
    res.status(201).json(contract);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contract', details: error });
  }
};

// PUT /contracts/:id
export const updateContract = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const data = req.body;
    const contract = await prisma.contract.update({ where: { id: id as string }, data });
    res.json(contract);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contract', details: error });
  }
};

// DELETE /contracts/:id
export const deleteContract = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    await prisma.contract.delete({ where: { id: id as string } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contract', details: error });
  }
};
