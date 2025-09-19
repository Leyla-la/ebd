"use client";

import Navbar from "@/components/layout/Navbar";
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
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [
    {
      id: "EMP001",
      name: "John Doe",
      position: "Software Engineer",
      email: "john.doe@example.com",
      role: "employee",
      status: "active",
    },
    {
      id: "EMP002",
      name: "Jane Smith",
      position: "Project Manager",
      email: "jane.smith@example.com",
      role: "manager",
      status: "on_leave",
    },
    {
      id: "EMP003",
      name: "Peter Jones",
      position: "UI/UX Designer",
      email: "peter.jones@example.com",
      role: "admin",
      status: "inactive",
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
    <div>
      <Navbar />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Employee Management</h1>
        <Suspense fallback={<EmployeeTableSkeleton />}>
          <ErrorBoundary fallback={<p>Could not fetch employees.</p>}>
            <EmployeesList />
          </ErrorBoundary>
        </Suspense>
      </div>
    </div>
  );
}
