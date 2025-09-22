import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EBD Corp',
  description: 'Employee Behavior Detection System',
};

export default function NonDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
