import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import { CandidatePipeline } from '@/components/admin/CandidatePipeline';

export const metadata = {
  title: 'Admin Dashboard - Tectra Technologies',
};

export default async function AdminDashboard() {
  const [totalJobs, openJobs, totalApplications, newApplications, allApplications] = await Promise.all([
    prisma.job.count(),
    prisma.job.count({ where: { status: 'open' } }),
    prisma.application.count(),
    prisma.application.count({ where: { status: 'new' } }),
    prisma.application.findMany({
      include: { job: true },
    })
  ]);

  // Aggregate Category Data and Pipeline Counts
  const categoryMap: Record<string, number> = {};
  const pipelineCounts = {
    applied: 0,
    screening: 0,
    shortlisted: 0,
    interview: 0,
    selected: 0,
    rejected: 0,
    hired: 0,
  };

  allApplications.forEach((app) => {
    // Categories
    const category = app.job?.category || 'General';
    categoryMap[category] = (categoryMap[category] || 0) + 1;
    
    // Pipeline (Normalize legacy 'new' and 'reviewed')
    const status = app.status === 'new' ? 'applied' : app.status === 'reviewed' ? 'screening' : app.status;
    if (status in pipelineCounts) {
      pipelineCounts[status as keyof typeof pipelineCounts]++;
    }
  });
  const categoryData = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key],
  }));

  // Aggregate Time Series Data (Last 30 Days)
  const timeSeriesMap: Record<string, number> = {};
  const today = new Date();
  // Initialize last 30 days with 0
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    timeSeriesMap[dateStr] = 0;
  }
  
  allApplications.forEach((app) => {
    const dateStr = app.submittedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (timeSeriesMap[dateStr] !== undefined) {
      timeSeriesMap[dateStr]++;
    }
  });
  
  const timeSeriesData = Object.keys(timeSeriesMap).map(date => ({
    date,
    applications: timeSeriesMap[date],
  }));

  return (
    <div>
      <h1 className="mb-8 text-3xl font-light text-neutral-900 font-heading">Dashboard Overview</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm font-medium text-neutral-500">Total Jobs</p>
          <p className="mt-2 text-4xl font-light text-neutral-900">{totalJobs}</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm font-medium text-neutral-500">Open Jobs</p>
          <p className="mt-2 text-4xl font-light text-brand">{openJobs}</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm font-medium text-neutral-500">Total Applications</p>
          <p className="mt-2 text-4xl font-light text-neutral-900">{totalApplications}</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm font-medium text-neutral-500">New Applications</p>
          <p className="mt-2 text-4xl font-light text-green-500">{newApplications}</p>
        </div>
      </div>

      <DashboardCharts data={{ timeSeriesData, categoryData }} />

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <CandidatePipeline counts={pipelineCounts} />
      </div>

    </div>
  );
}
