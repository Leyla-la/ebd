import { createAndNotify } from '../services/notificationService.ts';
import { PrismaClient } from '@prisma/client';
import express from 'express';
type Request = express.Request;
type Response = express.Response;

const prisma = new PrismaClient();

// GET /notifications
export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const roles = req.user?.role || [];
    if (roles.includes("admin")) {
      // Admin: get all notifications
      const notifications = await prisma.notification.findMany({ include: { employee: true } });
      return res.json(notifications);
    } else {
      // Employee: only own notifications
      const userId = req.user?.id;
      if (!userId) return res.json([]);
      const employee = await prisma.employee.findFirst({ where: { userId: userId as string } });
      if (!employee) return res.json([]);
      const notifications = await prisma.notification.findMany({ where: { employeeId: employee.id }, include: { employee: true } });
      return res.json(notifications);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications', details: error });
  }
};

// GET /notifications/:id
export const getNotificationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const notification = await prisma.notification.findUnique({ where: { id: id as string }, include: { employee: true } });
    if (!notification) return res.status(404).json({ error: "Not found" });
    const roles = req.user?.role || [];
    if (roles.includes("admin")) return res.json(notification);
    // Employee: only own
    const userId = req.user?.id;
    if (!userId) return res.status(403).json({ error: "Forbidden" });
    const employee = await prisma.employee.findFirst({ where: { userId: userId as string } });
    if (employee && notification.employeeId === employee.id) return res.json(notification);
    return res.status(403).json({ error: "Forbidden" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notification', details: error });
  }
};

// POST /notifications
export const createNotification = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const io = req.app.locals.io;
    const notification = await createAndNotify({ data, io });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create notification', details: error });
  }
};

// PUT /notifications/:id
export const updateNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    const data = req.body;
    const notification = await prisma.notification.update({ where: { id: id as string }, data });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update notification', details: error });
  }
};

// DELETE /notifications/:id
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });
    await prisma.notification.delete({ where: { id: id as string } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete notification', details: error });
  }
};
