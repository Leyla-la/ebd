import { PrismaClient } from '@prisma/client';
import express from 'express';
type Request = express.Request;
type Response = express.Response;

const prisma = new PrismaClient();

// GET /users (admin only)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const roles = req.user?.role || [];
  if (!roles.includes('SuperAdmins')) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', details: error });
  }
};

// GET /users/:id (admin or self)
import jwt from 'jsonwebtoken';
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Missing id' });
    const roles = req.user?.role || [];
    if (!roles.includes('SuperAdmins') && req.user?.id !== id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    console.log('[getUserById] Looking for user with id:', id);
    let user = await prisma.user.findUnique({ where: { id: id as string } });
    if (!user) {
      console.log('[getUserById] User not found, attempting to create from JWT');
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        console.error('[getUserById] No Authorization header');
        return res.status(401).json({ error: 'No Authorization header' });
      }
      const token = authHeader.split(' ')[1];
      let payload: any = null;
      if (!token) {
        console.error('[getUserById] No JWT token found in Authorization header');
        return res.status(400).json({ error: 'No JWT token found in Authorization header' });
      }
      try {
        payload = jwt.decode(token);
      } catch (e) {
        console.error('[getUserById] Invalid JWT', e);
        return res.status(400).json({ error: 'Invalid JWT', details: e });
      }
      if (!payload || !payload.sub || !payload.email) {
        console.error('[getUserById] Invalid JWT payload:', payload);
        return res.status(400).json({ error: 'Invalid JWT payload: missing sub or email' });
      }

      // Determine role from cognito:groups
      let role = 'EMPLOYEE';
      if (payload['cognito:groups'] && Array.isArray(payload['cognito:groups'])) {
        if (payload['cognito:groups'].includes('SuperAdmins')) role = 'ADMIN';
      }

      const newUserData: any = {
        cognitoId: payload.sub,
        email: payload.email,
        name: payload.name || null,
        role: role,
        isActive: true,
        isSuperuser: role === 'ADMIN',
        avatar: payload.picture || null,
      };
      try {
        user = await prisma.user.create({ data: newUserData });
        console.log('[getUserById] User created:', user);
      } catch (e: any) {
        console.error('[getUserById] Error creating user:', e);
        // If user already exists by email or cognitoId, fetch and return it
        if (e.code === 'P2002') {
          user = await prisma.user.findUnique({ where: { email: payload.email } });
          if (!user && payload.sub) {
            user = await prisma.user.findUnique({ where: { cognitoId: payload.sub } });
          }
          if (!user) {
            console.error('[getUserById] User exists but could not be found by email or cognitoId');
            return res.status(500).json({ error: 'User exists but could not be found by email or cognitoId' });
          }
        } else {
          return res.status(500).json({ error: 'Failed to auto-create user', details: e });
        }
      }
    }
    if (!user) {
      console.error('[getUserById] User still not found after all attempts');
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
    const roles = req.user?.role || [];
  if (!roles.includes('SuperAdmins') && req.user?.id !== id) {
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
  if (!roles.includes('SuperAdmins')) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await prisma.user.delete({ where: { id: id as string } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user', details: error });
  }
};
