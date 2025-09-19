import * as z from "zod";

// Enums from the Prisma schema
export const EmployeeStatus = z.enum(["ACTIVE", "ON_LEAVE", "TERMINATED"]);
export const Role = z.enum(["EMPLOYEE", "ADMIN"]);

// Zod schema for validating the complete employee form.
// This schema includes fields for both the User and Employee models.
export const employeeFormSchema = z.object({
  // User model fields
  email: z.string().email("Please enter a valid email address."),
  role: Role,

  // Employee model fields
  employeeCode: z.string().min(1, "Employee code is required."),
  name: z.string().min(2, "Name must be at least 2 characters."),
  position: z.string().min(2, "Position must be at least 2 characters."),
  department: z.string().optional().nullable(),
  hireDate: z.date({
    message: "A hire date is required.",
  }),
  endDate: z.date().optional().nullable(),
  dateOfBirth: z.date().optional().nullable(),
  avatarUrl: z.string().url("Must be a valid URL.").optional().nullable(),
  status: EmployeeStatus,
});

// Type for the form values, inferred from the Zod schema
export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

// This is a comprehensive type representing the data we'll use throughout the UI.
// It combines fields from both Employee and User models for convenience.
export type Employee = {
  id: string; // User ID
  employeeId: string; // Employee ID
  employeeCode: string;
  name: string;
  email: string;
  position: string;
  department: string | null;
  hireDate: Date;
  endDate: Date | null;
  dateOfBirth: Date | null;
  avatarUrl: string | null;
  status: z.infer<typeof EmployeeStatus>;
  role: z.infer<typeof Role>;
};

