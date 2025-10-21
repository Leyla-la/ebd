import { id } from "date-fns/locale";
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

// Base User Schema
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: Role,
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Emergency Contact Schema
export const emergencyContactSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name is required."),
  relationship: z.string().min(2, "Relationship is required."),
  phoneNumber: z.string().min(10, "Phone number is required."),
  email: z.string().email().optional().nullable(),
  address: z.string().optional().nullable(),
});

// Employee Schema
export const EmployeeSchema = z.object({
    id: z.string(),
    cognitoId: z.string(),
    name: z.string(),
    email: z.string().email(),
    avatarUrl: z.string().url().optional().nullable(),
    employeeCode: z.string(),
    department: z.object({ name: z.string() }).optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    personalEmail: z.string().email().optional().nullable(),
    phoneNumber: z.string().optional().nullable(),
    gender: Gender.optional().nullable(),
    dateOfBirth: z.date().optional().nullable(),
    maritalStatus: MaritalStatus.optional().nullable(),
    nationality: z.string().optional().nullable(),
    religion: z.string().optional().nullable(),
    placeOfBirth: z.string().optional().nullable(),
    address: z.any().optional().nullable(),
    bankAccountNumber: z.string().optional().nullable(),
    bankName: z.string().optional().nullable(),
    position: z.string(),
    hireDate: z.date(),
    endDate: z.date().optional().nullable(),
    status: EmployeeStatus,
    role: Role.optional().nullable(),
    lastClockIn: z.string().optional().nullable(),
    emergencyContacts: z.array(emergencyContactSchema).optional(),
});

// Admin Schema
export const AdminSchema = z.object({
    id: z.string(),
    cognitoId: z.string(),
    name: z.string(),
    email: z.string().email(),
    image: z.string().url().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Department Schema
export const DepartmentSchema = z.object({
  id: z.string(),
  name: z.string(),
});

// Shift Schema
export const ShiftSchema = z.object({
  id: z.string(),
  name: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

// Contract Schema (simplified for payroll details)
export const ContractSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  contractType: z.string(),
  startDate: z.date(),
  endDate: z.date().nullable(),
  baseSalary: z.number(),
  positionAllowance: z.number().default(0),
  transportationAllowance: z.number().default(0),
  workingHours: z.number().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Warning Schema (simplified for payroll details)
export const WarningSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  title: z.string(),
  description: z.string(),
  deduction: z.number(),
  date: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Kpi Schema (simplified for payroll details)
export const KpiSchema = z.object({
    id: z.string(),
    employeeId: z.string(),
    title: z.string(),
    description: z.string(),
    reward: z.number(),
    month: z.number(),
    year: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Payroll Schema
export const PayrollSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  payPeriodStart: z.date(),
  payPeriodEnd: z.date(),
  payDate: z.date().optional().nullable(),
  grossPay: z.number(),
  netPay: z.number(),
  status: z.enum(['PENDING', 'PAID', 'FAILED']),
});

// Leave Schema
export const LeaveSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  leaveType: z.enum(['ANNUAL', 'SICK', 'UNPAID']),
  startDate: z.date(),
  endDate: z.date(),
  reason: z.string().optional().nullable(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
});

// Camera Schema
export const CameraSchema = z.object({
  id: z.string(),
  name: z.string(),
  source: z.string(),
  location: z.string().optional().nullable(),
  isActive: z.boolean(),
});

// Policy Schema
export const PolicySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  rules: z.any(),
  isActive: z.boolean(),
});

// Zod schema for validating the complete employee form.
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

// Inferred types from Zod schemas
export type Employee = z.infer<typeof EmployeeSchema>;
export type Admin = z.infer<typeof AdminSchema>;
export type User = z.infer<typeof UserSchema>;
export type Department = z.infer<typeof DepartmentSchema>;
export type Shift = z.infer<typeof ShiftSchema>;
export type Payroll = z.infer<typeof PayrollSchema>;
export type Leave = z.infer<typeof LeaveSchema>;
export type Camera = z.infer<typeof CameraSchema>;
export type Policy = z.infer<typeof PolicySchema>;
export type Contract = z.infer<typeof ContractSchema>;
export type Warning = z.infer<typeof WarningSchema>;
export type Kpi = z.infer<typeof KpiSchema>;

// This is a comprehensive type representing the data we'll use throughout the UI.
export type AuthenticatedUser = User & {
  admin: Admin | null;
  employee: Employee | null;
};
