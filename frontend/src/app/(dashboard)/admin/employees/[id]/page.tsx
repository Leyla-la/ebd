"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Hash,
  Send,
  User,
  Cake,
  Venus as VenusMars,
  Heart,
  Flag,
  BookOpen,
  Home,
  MapPin,
  Map,
  Mail,
  Phone,
  Briefcase,
  Building,
  CalendarDays,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeePayrollTab from "@/components/employee/employee-payroll-tab";
import EmployeeTasksTab from "@/components/employee/employee-tasks-tab";
import EmployeeEbdLogsTab from "@/components/employee/employee-ebd-logs-tab";
import EmployeeNotificationsTab from "@/components/employee/employee-notifications-tab";
import EmployeeContractsTab from "@/components/employee/employee-contracts-tab";
import EmployeeEmergencyContactsTab from "@/components/employee/employee-emergency-contacts-tab";
import { useGetEmployeeQuery } from "@/state/api";

function toTitleCase(str: string) {
  if (!str) return "N/A";
  return str
    .replace(/_/g, " ")
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="mt-1 h-5 w-5 text-muted-foreground" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="text-base font-medium">{value}</div>
      </div>
    </div>
  );
}

function EmployeeDetailSkeleton() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      <Card>
        <CardHeader className="flex flex-col items-center gap-4 bg-muted/20 p-6 text-center sm:flex-row sm:text-left">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="grid flex-1 gap-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-5 w-32" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </CardHeader>
      </Card>
      <Skeleton className="h-10 w-full" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-72 w-full" />
        </div>
      </div>
    </div>
  );
}

function EmployeeDetail() {
  const params = useParams();
  const {
    data: employee,
    isLoading,
    isError,
  } = useGetEmployeeQuery(params.id as string);
  const { toast } = useToast();

  if (isLoading) return <EmployeeDetailSkeleton />;
  if (isError || !employee) {
    toast({ title: "Error", description: "Could not load employee details." });
    return <div className="p-8">Could not load employee details.</div>;
  }

  // Only show status as a colored badge, role as plain text
  let statusColor = "bg-green-500";
  if (employee.status === "ON_LEAVE") statusColor = "bg-yellow-500";
  else if (employee.status === "TERMINATED") statusColor = "bg-red-500";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!", description: text });
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <Card>
        <CardHeader className="flex flex-col items-center gap-4 bg-muted/20 p-6 text-center sm:flex-row sm:text-left">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage
              src={employee.avatarUrl ?? undefined}
              alt={employee.name}
            />
            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 gap-1">
            <CardTitle className="text-2xl">{employee.name}</CardTitle>
            <CardDescription>{employee.position}</CardDescription>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-2 sm:justify-start">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${statusColor}`}>
                {toTitleCase(employee.status)}
              </span>
              {employee.role && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800">
                  {toTitleCase(employee.role)}
                </span>
              )}
              {employee.employeeCode && (
                <div
                  className="flex items-center text-sm text-muted-foreground cursor-pointer"
                  onClick={() => handleCopy(employee.employeeCode)}
                  title="Copy Employee Code"
                >
                  <Hash className="mr-1 h-4 w-4" /> {employee.employeeCode}
                </div>
              )}
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            {employee.email && (
              <a href={`mailto:${employee.email}`}>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none">
                  <Send className="mr-2 h-4 w-4" />
                  Send Email
                </button>
              </a>
            )}
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-7">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="contract">Contracts</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="ebdlogs">EBD Logs</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <InfoItem icon={User} label="Full Name" value={employee.name ?? "N/A"} />
                  <InfoItem icon={Cake} label="Date of Birth" value={employee.dateOfBirth ? format(employee.dateOfBirth, "PPP") : "N/A"} />
                  {/* Add more fields here if they exist on the employee object */}
                </CardContent>
              </Card>
              {/* Address Information card removed because addressString is not defined and address fields are not present on the employee object. Add back if/when address fields exist. */}
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <InfoItem
                    icon={Mail}
                    label="Work Email"
                    value={employee.email}
                  />
                  <InfoItem
                    icon={Mail}
                    label="Personal Email"
                    value={employee.personalEmail ?? "N/A"}
                  />
                  <InfoItem
                    icon={Phone}
                    label="Phone Number"
                    value={employee.phoneNumber ?? "N/A"}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Employment Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <InfoItem icon={Briefcase} label="Position" value={employee.position ?? "N/A"} />
                  <InfoItem icon={CalendarDays} label="Hire Date" value={employee.hireDate ? format(employee.hireDate, "PPP") : "N/A"} />
                  {/* Add more fields here if they exist on the employee object */}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Remove tabs for data that does not exist on the employee object. Add back if/when those fields are present. */}
      </Tabs>
    </div>
  );
}

export default function EmployeeDetailPage() {
  return (
    <Suspense fallback={<EmployeeDetailSkeleton />}>
      <ErrorBoundary fallback={<p>Could not load employee details.</p>}>
        <EmployeeDetail />
      </ErrorBoundary>
    </Suspense>
  );
}
