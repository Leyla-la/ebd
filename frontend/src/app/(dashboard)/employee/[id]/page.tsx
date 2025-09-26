"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeePayrollTab from "@/components/employee/employee-payroll-tab";
import EmployeeTasksTab from "@/components/employee/employee-tasks-tab";
import EmployeeEbdLogsTab from "@/components/employee/employee-ebd-logs-tab";
import EmployeeNotificationsTab from "@/components/employee/employee-notifications-tab";
import EmployeeContractsTab from "@/components/employee/employee-contracts-tab";
import EmployeeEmergencyContactsTab from "@/components/employee/employee-emergency-contacts-tab";
import {
  mockPayrolls,
  mockTasks,
  mockEbdLogs,
  mockNotifications,
  mockContracts,
  mockEmergencyContacts,
} from "@/components/employee/employee-mock-data";

export default function EmployeeDetailPage() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Thông tin nhân viên</CardTitle>
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
        <TabsContent value="contract" className="mt-6">
          <EmployeeContractsTab contracts={mockContracts} />
        </TabsContent>
        <TabsContent value="payroll" className="mt-6">
          <EmployeePayrollTab payrolls={mockPayrolls} />
        </TabsContent>
        <TabsContent value="tasks" className="mt-6">
          <EmployeeTasksTab tasks={mockTasks} />
        </TabsContent>
        <TabsContent value="ebdlogs" className="mt-6">
          <EmployeeEbdLogsTab ebdLogs={mockEbdLogs} />
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          <EmployeeNotificationsTab notifications={mockNotifications} />
        </TabsContent>
        <TabsContent value="emergency" className="mt-6">
          <EmployeeEmergencyContactsTab emergencyContacts={mockEmergencyContacts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
