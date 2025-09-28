import { cookies } from 'next/headers';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Navbar } from '@/components/navbar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value !== 'false';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className='relative flex min-h-screen flex-col'>
        <Navbar />
        <div className='flex-1' style={{ paddingTop: '60px' }}>
          <div className='flex h-full'>
            <AppSidebar />
            <main className='flex-1 overflow-y-auto p-8'>
              {children}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
