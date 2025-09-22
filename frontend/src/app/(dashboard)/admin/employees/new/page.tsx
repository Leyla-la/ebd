"use client";

import { EmployeeForm } from "@/app/(dashboard)/employees/components/employee-form";
import { employeeFormSchema } from "@/lib/validators/employee";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";

export default function NewEmployeePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof employeeFormSchema>) => {
    setIsSubmitting(true);
    // This is where you would typically make an API call to your backend.
    // We'll simulate it with a delay.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Employee Created",
      description: `A new employee, ${data.name}, has been successfully created.`,
    });

    setIsSubmitting(false);
    router.push("/employees");
    router.refresh(); // This will re-fetch the data on the employees page
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create New Employee</h1>
        <p className="text-muted-foreground">
          Fill out the form below to add a new employee to the system.
        </p>
      </div>
      <EmployeeForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}

