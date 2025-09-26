"use client";

import { useRouter, useParams } from "next/navigation";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Briefcase,
  Building,
  Calendar,
  Mail,
  User,
  Hash,
  Phone,
  Heart,
  MapPin,
  BookOpen,
  Home,
  FileText,
  Send,
  Users,
  DollarSign,
  Clock,
  Flag,
  Cake,
  Map,
  Shield,
  VenusAndMars as VenusMars,
  CalendarDays,
} from "lucide-react";
import { format } from "date-fns";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Employee } from "@/types/prismaTypes";
import EmployeePayrollTab, { PayrollItem } from "@/components/employee/employee-payroll-tab";
import EmployeeTasksTab, { TaskItem } from "@/components/employee/employee-tasks-tab";
import EmployeeEbdLogsTab, { EbdLogItem } from "@/components/employee/employee-ebd-logs-tab";
import EmployeeNotificationsTab, { NotificationItem } from "@/components/employee/employee-notifications-tab";
import EmployeeContractsTab, { ContractItem } from "@/components/employee/employee-contracts-tab";
import EmployeeEmergencyContactsTab, { EmergencyContactItem } from "@/components/employee/employee-emergency-contacts-tab";
import {
  mockPayrolls,
  mockTasks,
  mockEbdLogs,
  mockNotifications,
  mockContracts,
  mockEmergencyContacts,
} from "@/components/employee/employee-mock-data";

// Comprehensive mock data based on the new schema
const getEmployeeById = async (id: string): Promise<Employee> => {
  console.log(`Fetching employee ${id}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockEmployee: Employee = {
    id: "user-123",
    cognitoId: `emp-${id.substring(0, 4)}`,
    employeeCode: `EBD-${id.substring(0, 4).toUpperCase()}`,
    name: "Ghibli Totoro",
    email: "totoro@ghibli.com",
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
    department: { name: "Magic & Wonder" },
    hireDate: new Date("2022-08-25"),
    endDate: null,
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    status: "ACTIVE",
    role: "ADMIN",
    lastClockIn: "2025-08-28T08:00:00Z",
    contracts: [
      {
        id: "contract-1",
        contractNumber: "C-2022-001",
        contractType: "FULL_TIME",
        status: "ACTIVE",
        startDate: new Date("2022-08-25"),
        endDate: null,
        jobTitle: "Forest Spirit",
        salary: 500000,
        salaryCurrency: "JPY",
        filePath: "/path/to/contract.pdf",
      },
    ],
    emergencyContacts: [
      {
        id: "ec-1",
        name: "Satsuki Kusakabe",
        relationship: "Friend",
        phoneNumber: "+81 90-1234-5678",
        email: "satsuki@example.com",
        address: "Same as employee",
      },
      {
        id: "ec-2",
        name: "Mei Kusakabe",
        relationship: "Friend",
        phoneNumber: "+81 90-8765-4321",
        email: "mei@example.com",
        address: "Same as employee",
      },
    ],
  };
  return mockEmployee;
};

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
  const [employee, setEmployee] = React.useState<Employee | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { toast } = useToast();

  React.useEffect(() => {
    const id = params.id as string;
    if (id) {
      setLoading(true);
      getEmployeeById(id).then((data) => {
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

  const statusVariant =
    employee.status === "ACTIVE"
      ? "success"
      : employee.status === "ON_LEAVE"
      ? "warning"
      : "destructive";

  const toTitleCase = (str: string | undefined | null) => {
    if (!str) return "N/A";
    return str
      .replace(/_/g, " ")
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
  };

  const addressString = employee.address
    ? `${employee.address.street}, ${employee.address.city}, ${employee.address.state} ${employee.address.zip}, ${employee.address.country}`
    : "N/A";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: text,
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header Card */}
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
              <Badge color={statusVariant}>
                {toTitleCase(employee.status)}
              </Badge>
              <Badge color="outline">{toTitleCase(employee.role)}</Badge>
              <div
                className="flex items-center text-sm text-muted-foreground cursor-pointer"
                onClick={() => handleCopy(employee.employeeCode)}
              >
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

      {/* Tabs */}
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

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card>
                <CardHeader>
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
                    value={employee.phoneNumber ?? "N/A"
                    }
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
          <EmployeeContractsTab contracts={mockContracts} isAdmin={true} />
        </TabsContent>

        {/* Payroll Tab */}
        <TabsContent value="payroll" className="mt-6">
          <EmployeePayrollTab payrolls={mockPayrolls} isAdmin={true} />
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="mt-6">
          <EmployeeTasksTab tasks={mockTasks} isAdmin={true} />
        </TabsContent>

        {/* EBD Logs Tab */}
        <TabsContent value="ebdlogs" className="mt-6">
          <EmployeeEbdLogsTab ebdLogs={mockEbdLogs} isAdmin={true} />
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6">
          <EmployeeNotificationsTab notifications={mockNotifications} isAdmin={true} />
        </TabsContent>

        {/* Emergency Contacts Tab */}
        <TabsContent value="emergency" className="mt-6">
          <EmployeeEmergencyContactsTab emergencyContacts={mockEmergencyContacts} isAdmin={true} />
        </TabsContent>
      </Tabs>
    </div>
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

