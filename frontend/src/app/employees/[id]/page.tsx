"use client";

import Navbar from "@/components/layout/Navbar";
import { Employee, Gender, MaritalStatus } from "@/lib/validators/employee";
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

// Comprehensive mock data based on the new schema
const getEmployeeById = async (id: string): Promise<Employee> => {
  console.log(`Fetching employee ${id}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockEmployee: Employee = {
    id: "user-123",
    employeeId: `emp-${id.substring(0, 4)}`,
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
    department: { id: "dept-1", name: "Magic & Wonder" },
    hireDate: new Date("2022-08-25"),
    endDate: null,
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    avatarFile: null,
    status: "ACTIVE",
    role: "ADMIN",
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

function EmployeeDetail({ params }: { params: { id: string } }) {
  const [employee, setEmployee] = React.useState<Employee | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { toast } = useToast();

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
              <Badge variant={statusVariant}>
                {toTitleCase(employee.status)}
              </Badge>
              <Badge variant="outline">{toTitleCase(employee.role)}</Badge>
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
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="contract">Contract</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
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
                      employee.lastClockIn
                        ? format(new Date(employee.lastClockIn), "PPp")
                        : "N/A"
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Contract Tab */}
        <TabsContent value="contract" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
            </CardHeader>
            <CardContent>
              {employee.contracts && employee.contracts.length > 0 ? (
                employee.contracts.map((contract, index) => (
                  <React.Fragment key={contract.id}>
                    {index > 0 && <Separator className="my-6" />}
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3">
                      <InfoItem
                        icon={Hash}
                        label="Contract Number"
                        value={contract.contractNumber}
                      />
                      <InfoItem
                        icon={FileText}
                        label="Contract Type"
                        value={toTitleCase(contract.contractType)}
                      />
                      <InfoItem
                        icon={Shield}
                        label="Status"
                        value={
                          <Badge
                            variant={
                              contract.status === "ACTIVE"
                                ? "success"
                                : "destructive"
                            }
                          >
                            {toTitleCase(contract.status)}
                          </Badge>
                        }
                      />
                      <InfoItem
                        icon={CalendarDays}
                        label="Start Date"
                        value={format(new Date(contract.startDate), "PPP")}
                      />
                      <InfoItem
                        icon={CalendarDays}
                        label="End Date"
                        value={
                          contract.endDate
                            ? format(new Date(contract.endDate), "PPP")
                            : "Ongoing"
                        }
                      />
                      <InfoItem
                        icon={Briefcase}
                        label="Job Title"
                        value={contract.jobTitle}
                      />
                      <InfoItem
                        icon={DollarSign}
                        label="Salary"
                        value={`${contract.salary.toLocaleString()} ${
                          contract.salaryCurrency
                        }`}
                      />
                    </div>
                    <div className="mt-6">
                      <a
                        href={contract.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button>
                          <FileText className="mr-2 h-4 w-4" /> View Contract
                          File
                        </Button>
                      </a>
                    </div>
                  </React.Fragment>
                ))
              ) : (
                <p>No contract information available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payroll Tab */}
        <TabsContent value="payroll" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payroll History</CardTitle>
              <CardDescription>
                This is a placeholder for payroll history.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Payroll details will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>
                This is a placeholder for employee behavior tracking, policy
                violations, and timelines.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Activity log details will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Emergency Contacts Tab */}
        <TabsContent value="emergency" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              {employee.emergencyContacts &&
              employee.emergencyContacts.length > 0 ? (
                employee.emergencyContacts.map((contact, index) => (
                  <React.Fragment key={contact.id}>
                    {index > 0 && <Separator className="my-6" />}
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                      <InfoItem
                        icon={User}
                        label="Name"
                        value={contact.name}
                      />
                      <InfoItem
                        icon={Users}
                        label="Relationship"
                        value={contact.relationship}
                      />
                      <InfoItem
                        icon={Phone}
                        label="Phone Number"
                        value={contact.phoneNumber}
                      />
                      <InfoItem
                        icon={Mail}
                        label="Email"
                        value={contact.email ?? "N/A"}
                      />
                    </div>
                  </React.Fragment>
                ))
              ) : (
                <p>No emergency contact information available.</p>
              )}
            </CardContent>
          </Card>
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

