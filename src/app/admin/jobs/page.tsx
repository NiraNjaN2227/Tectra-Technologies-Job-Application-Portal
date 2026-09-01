import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { JobActions } from './JobActions';

export default async function AdminJobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="font-sans">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-light text-neutral-900 font-heading">Job Postings</h1>
        <Link href="/admin/jobs/new" className="btn-primary">
          <Plus className="h-4 w-4" /> New Job
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-neutral-600">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase text-neutral-500">
            <tr>
              <th className="px-6 py-4 font-semibold tracking-wider">Title</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Category</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Type</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Deadline</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
              <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 font-medium text-neutral-900">{job.title}</td>
                <td className="px-6 py-4 text-neutral-500">{job.category}</td>
                <td className="px-6 py-4 text-neutral-500">{job.type}</td>
                <td className="px-6 py-4 text-neutral-500">
                  {job.deadline ? new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${job.status === 'open' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <JobActions jobId={job.id} currentStatus={job.status} />
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-neutral-400">No jobs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
