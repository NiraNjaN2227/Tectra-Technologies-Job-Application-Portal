import { JobForm } from '@/components/admin/JobForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl font-sans">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/jobs" className="text-neutral-500 hover:text-neutral-900 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-light text-neutral-900 font-heading">Edit Job</h1>
      </div>
      
      <JobForm initialData={job} />
    </div>
  );
}
