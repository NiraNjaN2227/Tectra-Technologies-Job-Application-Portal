import { getServerSession } from 'next-auth';
import { SignOutButton } from '@/components/admin/SignOutButton';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Briefcase, Users } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const newApplicantsCount = await prisma.application.count({
    where: { 
      status: { in: ['new', 'applied'] } 
    }
  });

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-neutral-200 bg-white flex flex-col sticky top-0 h-screen z-50 shadow-sm">
        <div className="flex h-16 flex-shrink-0 items-center px-6 border-b border-neutral-200">
          <a href="https://www.tectratechnologies.com/" target="_blank" rel="noopener noreferrer" className="text-xl font-bold tracking-tight text-neutral-900 font-heading">
            TECTRA <span className="text-sm font-normal text-brand font-sans">Admin</span>
          </a>
        </div>
        <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          <Link href="/admin/jobs" className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors">
            <Briefcase className="h-4 w-4" /> Jobs
          </Link>
          <Link href="/admin/applicants" className="flex items-center justify-between rounded-lg px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors">
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4" /> Applicants
            </div>
            {newApplicantsCount > 0 && (
              <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand px-1.5 text-[10px] font-medium text-white shadow-sm shadow-brand/20">
                {newApplicantsCount}
              </span>
            )}
          </Link>
        </nav>
        <div className="p-4 flex-shrink-0 border-t border-neutral-200">
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-neutral-50 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
