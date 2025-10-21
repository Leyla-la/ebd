// Mock employees for admin/employees table
export const mockEmployees = [
  {
    id: "user-123",
    cognitoId: "emp-1234",
    employeeCode: "EBD-1234",
    name: "Ghibli Totoro",
    email: "totoro@ghibli.com",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    department: { name: "Magic & Wonder" },
    createdAt: new Date("2022-08-25"),
    updatedAt: new Date("2025-08-28"),
    personalEmail: "myneighbortotoro@gmail.com",
    phoneNumber: "+1 (555) 123-4567",
    gender: "OTHER",
    dateOfBirth: new Date("1988-04-16"),
    maritalStatus: "SINGLE",
    nationality: "Japanese",
    religion: "Shinto",
    placeOfBirth: "Forest near Matsugō",
    address: {
      street: "123 Forest Path",
      city: "Tokorozawa",
      state: "Saitama",
      zip: "359-0026",
      country: "Japan",
    },
    bankAccountNumber: "1234567890",
    bankName: "Forest Bank",
    position: "Forest Spirit & Mascot",
    hireDate: new Date("2022-08-25"),
    endDate: null,
    status: "ACTIVE",
    role: "ADMIN",
    lastClockIn: "2025-08-28T08:00:00Z",
    emergencyContacts: [],
  },
  {
    id: "user-456",
    cognitoId: "emp-4567",
    employeeCode: "EBD-4567",
    name: "Kiki Witch",
    email: "kiki@delivery.com",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
    department: { name: "Delivery" },
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2025-08-28"),
    personalEmail: "kiki@witchmail.com",
    phoneNumber: "+1 (555) 987-6543",
    gender: "FEMALE",
    dateOfBirth: new Date("1990-07-29"),
    maritalStatus: "SINGLE",
    nationality: "Japanese",
    religion: "None",
    placeOfBirth: "Koriko",
    address: {
      street: "456 Broomstick Ave",
      city: "Koriko",
      state: "Kiki Prefecture",
      zip: "123-4567",
      country: "Japan",
    },
    bankAccountNumber: "9876543210",
    bankName: "Witch Bank",
    position: "Delivery Witch",
    hireDate: new Date("2023-01-10"),
    endDate: null,
    status: "ON_LEAVE",
    role: "EMPLOYEE",
    lastClockIn: "2025-08-27T09:00:00Z",
    emergencyContacts: [],
  },
];
// Mock data cho tất cả các tab employee

import { PayrollItem } from "./employee-payroll-tab";
import { TaskItem } from "./employee-tasks-tab";
import { EbdLogItem } from "./employee-ebd-logs-tab";
import { NotificationItem } from "./employee-notifications-tab";
import { ContractItem } from "./employee-contracts-tab";
import { EmergencyContactItem } from "./employee-emergency-contacts-tab";

export const mockPayrolls: PayrollItem[] = [
  {
    id: "payroll-1",
    employeeId: "user-123",
    month: "08",
    year: 2025,
    baseSalary: 15000000,
    allowance: 2000000,
    bonus: 1000000,
    deduction: 500000,
    tax: 1200000,
    kpiAttendance: 98,
    kpiBehaviour: 95,
    kpiPerformance: 90,
    kpiTotal: 94,
    bonusByKPI: 500000,
    penaltyByBehaviour: 100000,
    netSalary: 17000000,
    paymentStatus: "PAID",
    paymentDate: "2025-08-31T10:00:00Z",
    autoDeducted: true,
    payrollFileUrl: "https://example.com/payroll-1.pdf"
  }
];

export const mockTasks: TaskItem[] = [
  {
    id: "task-1",
    title: "Báo cáo tuần",
    description: "Nộp báo cáo công việc tuần này.",
    type: "BUSINESS",
    status: "COMPLETED",
    deadline: "2025-08-28T17:00:00Z",
    completedAt: "2025-08-28T16:30:00Z",
    assignedBy: "Admin",
    createdAt: "2025-08-21T09:00:00Z",
    updatedAt: "2025-08-28T16:30:00Z",
    history: [
      { status: "PENDING", changedBy: "Admin", changedAt: "2025-08-21T09:00:00Z" },
      { status: "IN_PROGRESS", changedBy: "Employee", changedAt: "2025-08-25T10:00:00Z" },
      { status: "COMPLETED", changedBy: "Employee", changedAt: "2025-08-28T16:30:00Z" }
    ]
  }
];

export const mockEbdLogs: EbdLogItem[] = [
  {
    id: "ebd-1",
    timestamp: "2025-08-28T08:10:00Z",
    eventType: "LATE",
    value: 10,
    description: "Đi muộn 10 phút",
    severity: "LOW"
  },
  {
    id: "ebd-2",
    timestamp: "2025-08-28T10:30:00Z",
    eventType: "PHONE_USAGE",
    value: 15,
    description: "Dùng điện thoại 15 phút",
    severity: "MEDIUM"
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: "noti-1",
    type: "PAYROLL",
    title: "Phiếu lương tháng 8 đã được trả",
    content: "Bạn đã nhận được lương tháng 8.",
    sentAt: "2025-08-31T10:05:00Z",
    read: true
  },
  {
    id: "noti-2",
    type: "TASK",
    title: "Có task mới",
    content: "Bạn được giao task Báo cáo tuần.",
    sentAt: "2025-08-21T09:01:00Z",
    read: true
  }
];

export const mockContracts: ContractItem[] = [
  {
    id: "contract-1",
    contractNumber: "C-2025-001",
    contractType: "FULL_TIME",
    status: "ACTIVE",
    startDate: "2025-01-01T00:00:00Z",
    endDate: "2025-12-31T00:00:00Z",
    jobTitle: "Nhân viên IT",
    salary: 15000000,
    salaryCurrency: "VND",
    filePath: "https://example.com/contract-1.pdf"
  }
];

export const mockEmergencyContacts: EmergencyContactItem[] = [
  {
    id: "ec-1",
    name: "Nguyễn Văn A",
    relationship: "Bố",
    phoneNumber: "0901234567",
    email: "bonguyenvana@example.com",
    address: "123 Đường ABC, Quận 1, TP.HCM"
  },
  {
    id: "ec-2",
    name: "Trần Thị B",
    relationship: "Mẹ",
    phoneNumber: "0907654321",
    email: "metranthib@example.com",
    address: "123 Đường ABC, Quận 1, TP.HCM"
  }
];
