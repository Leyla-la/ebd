import { PrismaClient } from '@prisma/client';
import express from 'express';
type Request = express.Request;
type Response = express.Response;

const prisma = new PrismaClient();

// GET /emergency-contacts
export const getAllEmergencyContacts = async (req: Request, res: Response) => {
  try {
    const roles = req.user?.role || [];
    if (roles.includes("admin")) {
      // Admin: get all contacts
      const contacts = await prisma.emergencyContact.findMany({ include: { employee: true } });
      return res.json(contacts);
    } else {
      // Employee: only own contacts
      const userId = req.user?.id;
      if (!userId) return res.json([]);
      const employee = await prisma.employee.findFirst({ where: { userId: userId as string } });
      if (!employee) return res.json([]);
      const contacts = await prisma.emergencyContact.findMany({ where: { employeeId: employee.id }, include: { employee: true } });
      return res.json(contacts);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch emergency contacts', details: error });
  }
};

// GET /emergency-contacts/:id
export const getEmergencyContactById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const contact = await prisma.emergencyContact.findUnique({ where: { id: id as string }, include: { employee: true } });
    if (!contact) return res.status(404).json({ error: "Not found" });
    const roles = req.user?.role || [];
    if (roles.includes("admin")) return res.json(contact);
    // Employee: only own
    const userId = req.user?.id;
    if (!userId) return res.status(403).json({ error: "Forbidden" });
    const employee = await prisma.employee.findFirst({ where: { userId: userId as string } });
    if (employee && contact.employeeId === employee.id) return res.json(contact);
    return res.status(403).json({ error: "Forbidden" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch emergency contact', details: error });
  }
};

// POST /emergency-contacts
export const createEmergencyContact = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const contact = await prisma.emergencyContact.create({ data });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create emergency contact', details: error });
  }
};

// PUT /emergency-contacts/:id
export const updateEmergencyContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const data = req.body;
    const contact = await prisma.emergencyContact.update({ where: { id: id as string }, data });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update emergency contact', details: error });
  }
};

// DELETE /emergency-contacts/:id
export const deleteEmergencyContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    await prisma.emergencyContact.delete({ where: { id: id as string } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete emergency contact', details: error });
  }
};
