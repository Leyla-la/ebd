"use client";

import { DataTable } from "./components/data-table";
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
import { Employee } from "@/types/prismaTypes";




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


import { useGetEmployeesQuery } from "@/state/api";

function EmployeesList() {
  const { data, isLoading, isError } = useGetEmployeesQuery();
  if (isLoading) return <EmployeeTableSkeleton />;
  if (isError) return <div className="text-red-500">Failed to load employees.</div>;
  return <DataTable data={data || []} />;
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
