// This file has been removed completely to eliminate all duplicate and stray code.
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
import { Hash, Send, User, Cake, Venus as VenusMars, Heart, Flag, BookOpen, Home, MapPin, Map, Mail, Phone, Briefcase, Building, CalendarDays, Clock } from "lucide-react";
import { format } from "date-fns";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
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
  const { data: employee, isLoading, isError } = useGetEmployeeQuery(params.id as string);
  const { toast } = useToast();

  if (isLoading) return <EmployeeDetailSkeleton />;
  if (isError || !employee) {
    toast({ title: "Error", description: "Could not load employee details." });
    return <div className="p-8">Could not load employee details.</div>;
  }

  const addressString = [
    employee.addressLine1,
    employee.addressLine2,
    employee.city,
    employee.state,
    employee.country,
    employee.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  const statusVariant = employee.status === "active" ? "success" : "secondary";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!", description: text });
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <Card>
        <CardHeader className="flex flex-col items-center gap-4 bg-muted/20 p-6 text-center sm:flex-row sm:text-left">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={employee.avatarUrl ?? undefined} alt={employee.name} />
            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 gap-1">
            <CardTitle className="text-2xl">{employee.name}</CardTitle>
            <CardDescription>{employee.position}</CardDescription>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-2 sm:justify-start">
              <Badge color={statusVariant}>{toTitleCase(employee.status)}</Badge>
              <Badge color="outline">{toTitleCase(employee.role)}</Badge>
              <div className="flex items-center text-sm text-muted-foreground cursor-pointer" onClick={() => handleCopy(employee.employeeCode)}>
                <Hash className="mr-1 h-4 w-4" /> {employee.employeeCode}
              </div>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <a href={`mailto:${employee.email}`}>
              <Button variant="outline">
                <Send className="mr-2 h-4 w-4" />
                Send Email
              </Button>
            </a>
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
                  <InfoItem icon={User} label="Full Name" value={employee.name} />
                  <InfoItem icon={Cake} label="Date of Birth" value={employee.dateOfBirth ? format(employee.dateOfBirth, "PPP") : "N/A"} />
                  <InfoItem icon={VenusMars} label="Gender" value={toTitleCase(employee.gender)} />
                  <InfoItem icon={Heart} label="Marital Status" value={toTitleCase(employee.maritalStatus)} />
                  <InfoItem icon={Flag} label="Nationality" value={employee.nationality ?? "N/A"} />
                  <InfoItem icon={BookOpen} label="Religion" value={employee.religion ?? "N/A"} />
                  <InfoItem icon={Home} label="Place of Birth" value={employee.placeOfBirth ?? "N/A"} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                </CardHeader>
                <CardContent className="flex items-start justify-between">
                  <InfoItem icon={MapPin} label="Full Address" value={addressString} />
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressString)}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Map className="mr-2 h-4 w-4" />
                      View on Map
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <InfoItem icon={Mail} label="Work Email" value={employee.email} />
                  <InfoItem icon={Mail} label="Personal Email" value={employee.personalEmail ?? "N/A"} />
                  <InfoItem icon={Phone} label="Phone Number" value={employee.phoneNumber ?? "N/A"} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Employment Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <InfoItem icon={Briefcase} label="Position" value={employee.position} />
                  <InfoItem icon={Building} label="Department" value={employee.department?.name ?? "N/A"} />
                  <InfoItem icon={CalendarDays} label="Hire Date" value={format(employee.hireDate, "PPP")} />
                  {employee.endDate && (
                    <InfoItem icon={CalendarDays} label="End Date" value={format(employee.endDate, "PPP")} />
                  )}
                  <InfoItem icon={Clock} label="Last Clock In" value={employee.lastClockIn ? format(new Date(employee.lastClockIn), "PPp") : "N/A"} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contract" className="mt-6">
          <EmployeeContractsTab contracts={employee.contracts ?? []} isAdmin={true} />
        </TabsContent>

        <TabsContent value="payroll" className="mt-6">
          <EmployeePayrollTab payrolls={employee.payrolls ?? []} isAdmin={true} />
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <EmployeeTasksTab tasks={employee.tasks ?? []} isAdmin={true} />
        </TabsContent>

        <TabsContent value="ebdlogs" className="mt-6">
          <EmployeeEbdLogsTab ebdLogs={employee.ebdLogs ?? []} isAdmin={true} />
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <EmployeeNotificationsTab notifications={employee.notifications ?? []} isAdmin={true} />
        </TabsContent>

        <TabsContent value="emergency" className="mt-6">
          <EmployeeEmergencyContactsTab emergencyContacts={employee.emergencyContacts ?? []} isAdmin={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function EmployeeDetailPage() {
  return (
    <div>
      <Suspense fallback={<EmployeeDetailSkeleton />}>
        <ErrorBoundary fallback={<p>Could not load employee details.</p>}>
          <EmployeeDetail />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
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
import { Hash, Send, User, Cake, Venus as VenusMars, Heart, Flag, BookOpen, Home, MapPin, Map, Mail, Phone, Briefcase, Building, CalendarDays, Clock } from "lucide-react";
import { format } from "date-fns";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
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
      <div>
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
    </div>
  );
}

function EmployeeDetail() {
  const params = useParams();
  const { data: employee, isLoading, isError } = useGetEmployeeQuery(params.id as string);
  const { toast } = useToast();

  if (isLoading) return <EmployeeDetailSkeleton />;
  if (isError || !employee) {
    toast({ title: "Error", description: "Could not load employee details." });
    return <div className="p-8">Could not load employee details.</div>;
  }

  const addressString = [
    employee.addressLine1,
    employee.addressLine2,
    employee.city,
    employee.state,
    employee.country,
    employee.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  const statusVariant = employee.status === "active" ? "success" : "secondary";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!", description: text });
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div>
        <Card>
          <CardHeader className="flex flex-col items-center gap-4 bg-muted/20 p-6 text-center sm:flex-row sm:text-left">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={employee.avatarUrl ?? undefined} alt={employee.name} />
              <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 gap-1">
              <CardTitle className="text-2xl">{employee.name}</CardTitle>
              <CardDescription>{employee.position}</CardDescription>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-2 sm:justify-start">
                <Badge color={statusVariant}>{toTitleCase(employee.status)}</Badge>
                <Badge color="outline">{toTitleCase(employee.role)}</Badge>
                <div className="flex items-center text-sm text-muted-foreground cursor-pointer" onClick={() => handleCopy(employee.employeeCode)}>
                  <Hash className="mr-1 h-4 w-4" /> {employee.employeeCode}
                </div>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <a href={`mailto:${employee.email}`}>
                <Button variant="outline">
                  <Send className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
              </a>
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
                    <InfoItem icon={User} label="Full Name" value={employee.name} />
                    <InfoItem icon={Cake} label="Date of Birth" value={employee.dateOfBirth ? format(employee.dateOfBirth, "PPP") : "N/A"} />
                    <InfoItem icon={VenusMars} label="Gender" value={toTitleCase(employee.gender)} />
                    <InfoItem icon={Heart} label="Marital Status" value={toTitleCase(employee.maritalStatus)} />
                    <InfoItem icon={Flag} label="Nationality" value={employee.nationality ?? "N/A"} />
                    <InfoItem icon={BookOpen} label="Religion" value={employee.religion ?? "N/A"} />
                    <InfoItem icon={Home} label="Place of Birth" value={employee.placeOfBirth ?? "N/A"} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Address Information</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-start justify-between">
                    <InfoItem icon={MapPin} label="Full Address" value={addressString} />
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressString)}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Map className="mr-2 h-4 w-4" />
                        View on Map
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <InfoItem icon={Mail} label="Work Email" value={employee.email} />
                    <InfoItem icon={Mail} label="Personal Email" value={employee.personalEmail ?? "N/A"} />
                    <InfoItem icon={Phone} label="Phone Number" value={employee.phoneNumber ?? "N/A"} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Employment Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <InfoItem icon={Briefcase} label="Position" value={employee.position} />
                    <InfoItem icon={Building} label="Department" value={employee.department?.name ?? "N/A"} />
                    <InfoItem icon={CalendarDays} label="Hire Date" value={format(employee.hireDate, "PPP")} />
                    {employee.endDate && (
                      <InfoItem icon={CalendarDays} label="End Date" value={format(employee.endDate, "PPP")} />
                    )}
                    <InfoItem icon={Clock} label="Last Clock In" value={employee.lastClockIn ? format(new Date(employee.lastClockIn), "PPp") : "N/A"} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contract" className="mt-6">
            <EmployeeContractsTab contracts={employee.contracts ?? []} isAdmin={true} />
          </TabsContent>

          <TabsContent value="payroll" className="mt-6">
            <EmployeePayrollTab payrolls={employee.payrolls ?? []} isAdmin={true} />
          </TabsContent>

          <TabsContent value="tasks" className="mt-6">
            <EmployeeTasksTab tasks={employee.tasks ?? []} isAdmin={true} />
          </TabsContent>

          <TabsContent value="ebdlogs" className="mt-6">
            <EmployeeEbdLogsTab ebdLogs={employee.ebdLogs ?? []} isAdmin={true} />
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <EmployeeNotificationsTab notifications={employee.notifications ?? []} isAdmin={true} />
          </TabsContent>

          <TabsContent value="emergency" className="mt-6">
            <EmployeeEmergencyContactsTab emergencyContacts={employee.emergencyContacts ?? []} isAdmin={true} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function EmployeeDetailPage() {
  return (
    <div>
      <Suspense fallback={<EmployeeDetailSkeleton />}>
        <ErrorBoundary fallback={<p>Could not load employee details.</p>}>
          <EmployeeDetail />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

import { Employee } from "@/types/prismaTypes";
import EmployeePayrollTab, { PayrollItem } from "@/components/employee/employee-payroll-tab";
import EmployeeTasksTab, { TaskItem } from "@/components/employee/employee-tasks-tab";
import EmployeeEbdLogsTab, { EbdLogItem } from "@/components/employee/employee-ebd-logs-tab";
import EmployeeNotificationsTab, { NotificationItem } from "@/components/employee/employee-notifications-tab";
import EmployeeContractsTab, { ContractItem } from "@/components/employee/employee-contracts-tab";
import EmployeeEmergencyContactsTab, { EmergencyContactItem } from "@/components/employee/employee-emergency-contacts-tab";
import { useGetEmployeeQuery } from "@/state/api";

export default function EmployeeDetailPage() {
  return (
    <div>
      <Suspense fallback={<EmployeeDetailSkeleton />}>
        <ErrorBoundary fallback={<p>Could not load employee details.</p>}>
          <EmployeeDetail />
        </ErrorBoundary>
      </Suspense>
    </div>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <InfoItem icon={User} label="Full Name" value={employee.name} />
                  <InfoItem
                    icon={Cake}
                    label="Date of Birth"
                    value={
                      employee.dateOfBirth
                        ? format(employee.dateOfBirth, "PPP")
                        : "N/A"
                    }
                  />
                  <InfoItem
                    icon={VenusMars}
                    label="Gender"
                    value={toTitleCase(employee.gender)}
                  />
                  <InfoItem
                    icon={Heart}
                    label="Marital Status"
                    value={toTitleCase(employee.maritalStatus)}
                  />
                  <InfoItem
                    icon={Flag}
                    label="Nationality"
                    value={employee.nationality ?? "N/A"}
                  />
                  <InfoItem
                    icon={BookOpen}
                    label="Religion"
                    value={employee.religion ?? "N/A"}
                  />
                  <InfoItem
                    icon={Home}
                    label="Place of Birth"
                    value={employee.placeOfBirth ?? "N/A"}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                </CardHeader>
                <CardContent className="flex items-start justify-between">
                  <InfoItem
                    icon={MapPin}
                    label="Full Address"
                    value={addressString}
                  />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      addressString
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <Map className="mr-2 h-4 w-4" />
                      View on Map
                    </Button>
                  </a>
                </CardContent>
              </Card>
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
                  <InfoItem
                    icon={Briefcase}
                    label="Position"
                    value={employee.position}
                  />
                  <InfoItem
                    icon={Building}
                    label="Department"
                    value={employee.department?.name ?? "N/A"}
                  />
                  <InfoItem
                    icon={CalendarDays}
                    label="Hire Date"
                    value={format(employee.hireDate, "PPP")}
                  />
                  {employee.endDate && (
                    <InfoItem
                      icon={CalendarDays}
                      label="End Date"
                      value={format(employee.endDate, "PPP")}
                    />
                  )}
                  <InfoItem
                    icon={Clock}
                    label="Last Clock In"
                    value={
                      employee.lastClockIn ? format(new Date(employee.lastClockIn), "PPp") : "N/A"
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Contract Tab */}
        <TabsContent value="contract" className="mt-6">
          <EmployeeContractsTab contracts={[]} isAdmin={true} />
        </TabsContent>

        {/* Payroll Tab */}
        <TabsContent value="payroll" className="mt-6">
          <EmployeePayrollTab payrolls={[]} isAdmin={true} />
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="mt-6">
          <EmployeeTasksTab tasks={[]} isAdmin={true} />
        </TabsContent>

        {/* EBD Logs Tab */}
        <TabsContent value="ebdlogs" className="mt-6">
          <EmployeeEbdLogsTab ebdLogs={[]} isAdmin={true} />
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6">
          <EmployeeNotificationsTab notifications={[]} isAdmin={true} />
        </TabsContent>

        {/* Emergency Contacts Tab */}
        <TabsContent value="emergency" className="mt-6">
          <EmployeeEmergencyContactsTab emergencyContacts={[]} isAdmin={true} />
        </TabsContent>
      </Tabs>
    </div>
  );

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

export default function EmployeeDetailPage() {
  return (
    <div>
      <Suspense fallback={<EmployeeDetailSkeleton />}>
        <ErrorBoundary fallback={<p>Could not load employee details.</p>}>
          <EmployeeDetail />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}



