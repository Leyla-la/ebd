"use client";

import Navbar from "@/components/layout/Navbar";
import { Employee } from "@/lib/validators/employee";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Mock function to get employee data
const getEmployeeById = async (id: string): Promise<Employee> => {
  console.log(`Fetching employee ${id}`);
  // In a real app, you would fetch this from your API
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Return mock data for now, ensuring it matches the Employee type
  return {
    id,
    employeeId: `EMP-ID-${id}`, // Added missing property
    employeeCode: `EMP${id}`,
    name: "John Doe (Fetched)",
    email: "john.doe@example.com",
    position: "Software Engineer",
    role: "EMPLOYEE" as const,
    status: "ACTIVE" as const,
    department: "Technology",
    hireDate: new Date("2023-01-15"), // Use Date object
    endDate: null, // Added missing property
    dateOfBirth: new Date("1990-05-20"), // Added missing property
    avatarUrl: null, // Added missing property
  };
};

function EmployeeDetailSkeleton() {
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="mb-6">
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="overflow-hidden rounded-lg border">
        <div className="flex flex-col items-center gap-4 bg-muted/40 p-6 text-center sm:flex-row sm:text-left">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="grid gap-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
        <div className="space-y-6 p-6">
          <Skeleton className="h-6 w-1/3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-5 w-40" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmployeeDetail({ params }: { params: { id: string } }) {
  const [employee, setEmployee] = React.useState<Employee | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    if (params.id) {
      setLoading(true);
      getEmployeeById(params.id).then((data) => {
        setEmployee(data);
        setLoading(false);
      });
    }
  }, [params.id]);

  if (loading) {
    return <EmployeeDetailSkeleton />;
  }

  if (!employee) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p>Employee not found.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{employee.name}</CardTitle>
          <CardDescription>
            Details for employee ID: {employee.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{employee.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Position
              </p>
              <p>{employee.position}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Role</p>
              <Badge
                variant={
                  employee.role.toLowerCase() === "admin"
                    ? "default"
                    : "outline"
                }
              >
                {employee.role}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Status
              </p>
              <p>{employee.status}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Department
              </p>
              <p>{employee.department}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Hire Date
              </p>
              <p>{employee.hireDate.toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function EmployeeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<EmployeeDetailSkeleton />}>
        <ErrorBoundary fallback={<p>Could not load employee details.</p>}>
          <EmployeeDetail params={params} />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

