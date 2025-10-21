import { PrismaClient, UserRole } from '@prisma/client';
import express from 'express';
import jwt from 'jsonwebtoken';

type Request = express.Request;
type Response = express.Response;

const prisma = new PrismaClient();

const findOrCreateUser = async (payload: any): Promise<any> => {
  const cognitoId = payload.sub;
  if (!cognitoId) {
    throw new Error('Cognito ID (sub) is missing from the token payload.');
  }

  let user = await prisma.user.findUnique({
    where: { cognitoId },
  });

  if (user) {
    console.log(`[findOrCreateUser] Found existing user with cognitoId: ${cognitoId}`);
    return user;
  }

  console.log(`[findOrCreateUser] No user found with cognitoId: ${cognitoId}. Creating new user.`);
  
  const userCognitoGroups = payload['cognito:groups'] || [];
  let role: UserRole = UserRole.EMPLOYEE; // Default role

  if (userCognitoGroups.includes('SuperAdmins')) {
    role = UserRole.ADMIN;
  }

  const newUser = await prisma.user.create({
    data: {
      cognitoId: cognitoId,
      email: payload.email,
      name: payload.name || payload.username || 'Default Name',
      role: role,
      isActive: true,
      isSuperuser: role === UserRole.ADMIN,
      avatar: payload.picture || null,
    },
  });

  console.log(`[findOrCreateUser] Successfully created new user with cognitoId: ${cognitoId}`);
  return newUser;
};

export const getUserByCognitoId = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header is missing.' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token is missing from Authorization header.' });
    }

    const payload = jwt.decode(token);
    if (!payload || typeof payload === 'string') {
      return res.status(400).json({ error: 'Invalid token payload.' });
    }

    const user = await findOrCreateUser(payload);
    res.json(user);
  } catch (error: any) {
    console.error('[getUserByCognitoId] Failed to find or create user:', error);
    res.status(500).json({ error: 'Failed to process user authentication.', details: error.message });
  }
};

// GET /users (admin only)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const roles = req.user?.roles || [];
    if (!roles.includes('SuperAdmins') && !roles.includes('admin')) {
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
    const roles = req.user?.roles || [];
    if (!roles.includes('SuperAdmins') && !roles.includes('admin') && req.user?.id !== id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const user = await prisma.user.findUnique({ where: { id: id as string } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
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
    const roles = req.user?.roles || [];
    if (!roles.includes('SuperAdmins') && !roles.includes('admin') && req.user?.id !== id) {
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
    const roles = req.user?.roles || [];
    if (!roles.includes('SuperAdmins') && !roles.includes('admin')) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await prisma.user.delete({ where: { id: id as string } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user', details: error });
  }
};
