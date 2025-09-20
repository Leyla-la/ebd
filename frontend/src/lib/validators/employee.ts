import * as z from "zod";

// Enums from the Prisma schema
export const EmployeeStatus = z.enum(["ACTIVE", "ON_LEAVE", "TERMINATED"]);
export const Role = z.enum(["EMPLOYEE", "ADMIN"]);
export const Gender = z.enum(["MALE", "FEMALE", "OTHER"]);
export const MaritalStatus = z.enum([
  "SINGLE",
  "MARRIED",
  "DIVORCED",
  "WIDOWED",
]);

export const emergencyContactSchema = z.object({
  name: z.string().min(2, "Name is required."),
  relationship: z.string().min(2, "Relationship is required."),
  phoneNumber: z.string().min(10, "Phone number is required."),
  email: z.string().email().optional().nullable(),
  address: z.string().optional().nullable(),
});

// Zod schema for validating the complete employee form.
// This schema includes fields for both the User and Employee models.
export const employeeFormSchema = z.object({
  // User model fields
  email: z.string().email("Please enter a valid email address."),
  role: Role,

  // Employee model fields
  employeeCode: z.string().min(1, "Employee code is required."),
  name: z.string().min(2, "Name must be at least 2 characters."),
  personalEmail: z
    .string()
    .email("Please enter a valid email address.")
    .optional()
    .nullable(),
  phoneNumber: z.string().optional().nullable(),
  gender: Gender.optional().nullable(),
  dateOfBirth: z.date().optional().nullable(),
  maritalStatus: MaritalStatus.optional().nullable(),
  nationality: z.string().optional().nullable(),
  religion: z.string().optional().nullable(),
  placeOfBirth: z.string().optional().nullable(),
  address: z.any().optional().nullable(), // Prisma Json type can be mapped to `any`
  bankAccountNumber: z.string().optional().nullable(),
  bankName: z.string().optional().nullable(),
  position: z.string().min(2, "Position must be at least 2 characters."),
  departmentId: z.string().optional().nullable(),
  hireDate: z.date({
    message: "A hire date is required.",
  }),
  endDate: z.date().optional().nullable(),
  avatarUrl: z.string().url("Must be a valid URL.").optional().nullable(),
  avatarFile: z.any().optional().nullable(),
  status: EmployeeStatus,
  emergencyContacts: z
    .array(emergencyContactSchema)
    .max(5, "You can add a maximum of 5 emergency contacts.")
    .optional(),
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
  personalEmail: string | null;
  phoneNumber: string | null;
  gender: z.infer<typeof Gender> | null;
  dateOfBirth: Date | null;
  maritalStatus: z.infer<typeof MaritalStatus> | null;
  nationality: string | null;
  religion: string | null;
  placeOfBirth: string | null;
  address: any; // Prisma Json type
  bankAccountNumber: string | null;
  bankName: string | null;
  position: string;
  department: { id: string; name: string } | null;
  hireDate: Date;
  endDate: Date | null;
  avatarUrl: string | null;
  avatarFile: any; // For file uploads
  status: z.infer<typeof EmployeeStatus>;
  role: z.infer<typeof Role>;
  lastClockIn?: Date | null;
  contracts?: any[]; // Define more specific types if needed
  emergencyContacts?: any[]; // Define more specific types if needed
};

