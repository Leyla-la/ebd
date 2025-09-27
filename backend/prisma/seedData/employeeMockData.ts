
// Add more mock employees and admins
export const mockEmployees = [
  { id: "emp-001", name: "Nguyen Van A", email: "a@example.com" },
  { id: "emp-002", name: "Tran Thi B", email: "b@example.com" },
  { id: "emp-003", name: "Le Van C", email: "c@example.com" }
];
export const mockAdmins = [
  { id: "admin-001", name: "Admin One", email: "admin1@example.com" },
  { id: "admin-002", name: "Admin Two", email: "admin2@example.com" }
];

export const mockPayrolls = [
  {
    id: "payroll-1",
    employeeId: "emp-001",
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
  },
  {
    id: "payroll-2",
    employeeId: "emp-002",
    month: "08",
    year: 2025,
    baseSalary: 12000000,
    allowance: 1500000,
    bonus: 800000,
    deduction: 400000,
    tax: 1000000,
    kpiAttendance: 95,
    kpiBehaviour: 90,
    kpiPerformance: 88,
    kpiTotal: 91,
    bonusByKPI: 400000,
    penaltyByBehaviour: 80000,
    netSalary: 13500000,
    paymentStatus: "PAID",
    paymentDate: "2025-08-31T10:00:00Z",
    autoDeducted: true,
    payrollFileUrl: "https://example.com/payroll-2.pdf"
  }
];

export const mockTasks = [
  {
    id: "task-1",
    title: "Báo cáo tuần",
    description: "Nộp báo cáo công việc tuần này.",
    type: "BUSINESS",
    status: "COMPLETED",
    deadline: "2025-08-28T17:00:00Z",
    completedAt: "2025-08-28T16:30:00Z",
    assignedToId: "emp-001",
    assignedById: "admin-001",
    createdAt: "2025-08-21T09:00:00Z",
    updatedAt: "2025-08-28T16:30:00Z",
    history: [
      { status: "PENDING", changedBy: "admin-001", changedAt: "2025-08-21T09:00:00Z" },
      { status: "IN_PROGRESS", changedBy: "emp-001", changedAt: "2025-08-25T10:00:00Z" },
      { status: "COMPLETED", changedBy: "emp-001", changedAt: "2025-08-28T16:30:00Z" }
    ]
  },
  {
    id: "task-2",
    title: "Kiểm tra hệ thống",
    description: "Kiểm tra hệ thống server tuần này.",
    type: "IT",
    status: "PENDING",
    deadline: "2025-09-01T17:00:00Z",
    completedAt: null,
    assignedToId: "emp-002",
    assignedById: "admin-002",
    createdAt: "2025-08-25T09:00:00Z",
    updatedAt: "2025-08-25T09:00:00Z",
    history: [
      { status: "PENDING", changedBy: "admin-002", changedAt: "2025-08-25T09:00:00Z" }
    ]
  }
];

export const mockEbdLogs = [
  {
    id: "ebd-1",
    employeeId: "emp-001",
    timestamp: "2025-08-28T08:10:00Z",
    eventType: "LATE",
    value: 10,
    description: "Đi muộn 10 phút",
    severity: "LOW"
  },
  {
    id: "ebd-2",
    employeeId: "emp-002",
    timestamp: "2025-08-28T10:30:00Z",
    eventType: "PHONE_USAGE",
    value: 15,
    description: "Dùng điện thoại 15 phút",
    severity: "MEDIUM"
  },
  {
    id: "ebd-3",
    employeeId: "emp-003",
    timestamp: "2025-08-29T09:00:00Z",
    eventType: "ABSENT",
    value: 1,
    description: "Vắng mặt 1 ngày",
    severity: "HIGH"
  }
];

export const mockNotifications = [
  // Employee notifications
  {
    id: "noti-1",
    employeeId: "emp-001",
    adminId: null,
    type: "PAYROLL",
    title: "Phiếu lương tháng 8 đã được trả",
    content: "Bạn đã nhận được lương tháng 8.",
    sentAt: "2025-08-31T10:05:00Z",
    read: true
  },
  {
    id: "noti-2",
    employeeId: "emp-001",
    adminId: null,
    type: "TASK",
    title: "Có task mới",
    content: "Bạn được giao task Báo cáo tuần.",
    sentAt: "2025-08-21T09:01:00Z",
    read: true
  },
  {
    id: "noti-3",
    employeeId: "emp-002",
    adminId: null,
    type: "LEAVE",
    title: "Đơn xin nghỉ phép đã được duyệt",
    content: "Đơn xin nghỉ phép của bạn đã được duyệt.",
    sentAt: "2025-08-30T08:00:00Z",
    read: false
  },
  // Admin notifications
  {
    id: "noti-4",
    employeeId: null,
    adminId: "admin-001",
    type: "SYSTEM",
    title: "Báo cáo hệ thống mới",
    content: "Có một báo cáo hệ thống mới cần kiểm tra.",
    sentAt: "2025-08-31T11:00:00Z",
    read: false
  },
  {
    id: "noti-5",
    employeeId: null,
    adminId: "admin-002",
    type: "USER",
    title: "Yêu cầu hỗ trợ từ nhân viên",
    content: "Nhân viên emp-003 vừa gửi yêu cầu hỗ trợ.",
    sentAt: "2025-08-31T12:00:00Z",
    read: false
  },
  {
    id: "noti-6",
    employeeId: null,
    adminId: "admin-001",
    type: "TASK",
    title: "Task mới cần duyệt",
    content: "Có một task mới cần bạn duyệt.",
    sentAt: "2025-08-31T13:00:00Z",
    read: false
  }
];

export const mockContracts = [
  {
    id: "contract-1",
    employeeId: "emp-001",
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

export const mockEmergencyContacts = [
  {
    id: "ec-1",
    employeeId: "emp-001",
    name: "Nguyễn Văn A",
    relationship: "Bố",
    phoneNumber: "0901234567",
    email: "bonguyenvana@example.com",
    address: "123 Đường ABC, Quận 1, TP.HCM"
  },
  {
    id: "ec-2",
    employeeId: "emp-001",
    name: "Trần Thị B",
    relationship: "Mẹ",
    phoneNumber: "0907654321",
    email: "metranthib@example.com",
    address: "123 Đường ABC, Quận 1, TP.HCM"
  }
];
