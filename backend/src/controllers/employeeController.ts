import express from 'express';
type Request = express.Request;
type Response = express.Response;

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });

    // Ensure user and roles are available
    if (!req.user || !req.user.roles) {
      return res.status(403).json({ error: "Forbidden: User roles not available." });
    }

    const { roles, id: userId } = req.user;
    console.log(`[getEmployeeById] User roles: ${JSON.stringify(roles)}, User ID: ${userId}, Requesting employee ID: ${id}`);

    // Allow access if user is a SuperAdmin, admin, or is requesting their own data
    if (roles.includes("SuperAdmins") || roles.includes("admin") || userId === id) {
      console.log("[getEmployeeById] Access granted.");
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
      return res.json(employee);
    }

    console.log('[getEmployeeById] Access denied.');
    return res.status(403).json({ error: "Forbidden" });

  } catch (error) {
    console.error(`[getEmployeeById] Error fetching employee ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch employee', details: error });
  }
};

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    // Ensure user and roles are available
    if (!req.user || !req.user.roles) {
      return res.status(403).json({ error: "Forbidden: User roles not available." });
    }

    const { roles } = req.user;
    console.log(`[getAllEmployees] User roles: ${JSON.stringify(roles)}`);

    // Check if user has 'SuperAdmins' or 'admin' role
    if (!roles.includes("SuperAdmins") && !roles.includes("admin")) {
      console.log("[getAllEmployees] Access denied: User is not a SuperAdmin or admin.");
      return res.status(403).json({ error: "Forbidden: You don't have the required permissions." });
    }

    console.log("[getAllEmployees] Access granted. Fetching all employees.");
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
    console.error("[getAllEmployees] Error fetching employees:", error);
    res.status(500).json({ error: 'Failed to fetch employees', details: error });
  }
};
