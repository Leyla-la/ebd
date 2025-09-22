"use client";

import { EmployeeForm } from "@/app/(dashboard)/employees/components/employee-form";
import { employeeFormSchema } from "@/lib/validators/employee";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import * as z from "zod";
import { Skeleton } from "@/components/ui/skeleton";

// Mock function to get employee data
const getEmployeeById = async (id: string) => {
  console.log(`Fetching employee ${id}`);
  // In a real app, you would fetch this from your API
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Return mock data for now
  return {
    name: "John Doe (Fetched)",
    email: "john.doe@example.com",
    position: "Software Engineer",
    role: "EMPLOYEE" as const,
    status: "ACTIVE" as const,
    employeeCode: `EMP-${id}`,
    hireDate: new Date(),
  };
};

export default function EditEmployeePage({
  params,
}: {
  params: { id: string };
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employee, setEmployee] = useState<z.infer<
    typeof employeeFormSchema
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchEmployee = async () => {
      setIsLoading(true);
      const data = await getEmployeeById(params.id);
      setEmployee(data);
      setIsLoading(false);
    };
    fetchEmployee();
  }, [params.id]);

  const handleSubmit = async (data: z.infer<typeof employeeFormSchema>) => {
    setIsSubmitting(true);
    console.log("Updating employee:", params.id, data);
    // Here you would typically make an API call to your backend
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Employee Updated",
      description: `Employee ${data.name} has been successfully updated.`,
    });

    setIsSubmitting(false);
    router.push("/employees");
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="mt-2 h-4 w-2/3" />
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex justify-end gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Employee</h1>
        <p className="text-muted-foreground">
          Update the details for {employee?.name}.
        </p>
      </div>
      <EmployeeForm
        initialData={employee}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
