import { PrismaClient } from '@prisma/client';
import express from 'express';
type Request = express.Request;
type Response = express.Response;

const prisma = new PrismaClient();

// GET /users (admin only)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const roles = req.user?.role || [];
    if (!roles.includes('admin')) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', details: error });
  }
};

// GET /users/:id (admin or self)
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Missing id' });
    const roles = req.user?.role || [];
    if (!roles.includes('admin') && req.user?.id !== id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const user = await prisma.user.findUnique({ where: { id: id as string } });
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user', details: error });
  }
};

// PATCH /users/:id (admin or self)
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Missing id' });
    const roles = req.user?.role || [];
    if (!roles.includes('admin') && req.user?.id !== id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const data = req.body;
    const user = await prisma.user.update({ where: { id: id as string }, data });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user', details: error });
  }
};

// DELETE /users/:id (admin only)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Missing id' });
    const roles = req.user?.role || [];
    if (!roles.includes('admin')) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await prisma.user.delete({ where: { id: id as string } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user', details: error });
  }
};
