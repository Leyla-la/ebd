"use client";

import { DataTable } from "./components/data-table";
import { Employee } from "@/lib/validators/employee";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data fetching function
async function getData(): Promise<Employee[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Mock data with all possible statuses and new fields
  return [
    {
      id: "1",
      employeeId: "EMP001",
      employeeCode: "EBD001",
      name: "John Doe",
      email: "john.doe@example.com",
      personalEmail: "john.d@personal.com",
      phoneNumber: "111-222-3333",
      gender: "MALE",
      dateOfBirth: new Date("1990-05-20"),
      maritalStatus: "SINGLE",
      nationality: "American",
      religion: "N/A",
      placeOfBirth: "New York, USA",
      address: { street: "123 Main St", city: "Anytown", state: "CA", zip: "12345", country: "USA" },
      bankAccountNumber: "111222333",
      bankName: "Bank of Anytown",
      position: "Software Engineer",
      department: { id: "dept-eng", name: "Engineering" },
      hireDate: new Date("2022-01-15"),
      endDate: null,
      avatarUrl: "https://i.pravatar.cc/150?u=emp001",
      avatarFile: null,
      status: "ACTIVE",
      role: "EMPLOYEE",
    },
    {
      id: "2",
      employeeId: "EMP002",
      employeeCode: "EBD002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      personalEmail: "jane.s@personal.com",
      phoneNumber: "444-555-6666",
      gender: "FEMALE",
      dateOfBirth: new Date("1988-11-30"),
      maritalStatus: "MARRIED",
      nationality: "British",
      religion: "N/A",
      placeOfBirth: "London, UK",
      address: { street: "456 Oak Ave", city: "Someville", state: "ON", zip: "L1S 2A4", country: "Canada" },
      bankAccountNumber: "444555666",
      bankName: "Bank of Someville",
      position: "Project Manager",
      department: { id: "dept-mg", name: "Magic" },
      hireDate: new Date("2021-03-20"),
      endDate: null,
      avatarUrl: "https://i.pravatar.cc/150?u=emp002",
      avatarFile: null,
      status: "ON_LEAVE",
      role: "ADMIN",
    },
    {
      id: "3",
      employeeId: "EMP003",
      employeeCode: "EBD003",
      name: "Peter Jones",
      email: "peter.jones@example.com",
      personalEmail: "peter.j@personal.com",
      phoneNumber: "777-888-9999",
      gender: "MALE",
      dateOfBirth: new Date("1995-02-10"),
      maritalStatus: "SINGLE",
      nationality: "Australian",
      religion: "N/A",
      placeOfBirth: "Sydney, Australia",
      address: { street: "789 Pine Ln", city: "Metropolis", state: "NSW", zip: "2000", country: "Australia" },
      bankAccountNumber: "777888999",
      bankName: "Bank of Metropolis",
      position: "UI/UX Designer",
      department: { id: "dept-des", name: "Design" },
      hireDate: new Date("2023-07-01"),
      endDate: new Date("2024-01-01"),
      avatarUrl: "https://i.pravatar.cc/150?u=emp003",
      avatarFile: null,
      status: "TERMINATED",
      role: "EMPLOYEE",
    },
  ];
}

function EmployeeTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-5 w-24" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-32" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-16" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-20" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-16" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}

function EmployeesList() {
  const [data, setData] = React.useState<Employee[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    getData().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <EmployeeTableSkeleton />;
  }

  return <DataTable data={data} />;
}

export default function EmployeesPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Employee Management</h1>
      <Suspense fallback={<EmployeeTableSkeleton />}>
        <ErrorBoundary fallback={<p>Could not fetch employees.</p>}>
          <EmployeesList />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
