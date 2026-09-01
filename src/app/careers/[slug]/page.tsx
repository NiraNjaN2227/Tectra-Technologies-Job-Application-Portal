import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ApplicationForm } from '@/components/ApplicationForm';

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-8 mt-12">
      <div className="mb-8">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900 font-sans"
        >
          <ArrowLeft className="h-4 w-4" /> Back to open roles
        </Link>
      </div>

      <div className="mb-12 border-b border-neutral-200 pb-12">
        <h1 className="mb-6 text-3xl font-light tracking-tight text-neutral-900 md:text-5xl font-heading">
          {job.title}
        </h1>
        <div className="flex flex-wrap gap-3">
          <span className="badge">{job.type}</span>
          <span className="badge">{job.level}</span>
          <span className="badge">{job.duration}</span>
          <span className="badge">{job.category}</span>
          {job.deadline && (
            <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700">
              Apply by {new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-16">
        <div className="space-y-8 text-neutral-600 font-sans">
          <section>
            <h2 className="mb-4 text-xl font-medium text-neutral-900 font-heading">About the Role</h2>
            <div 
              className="prose max-w-none prose-p:leading-relaxed prose-li:text-neutral-600 prose-headings:text-neutral-900 prose-a:text-brand" 
              dangerouslySetInnerHTML={{ __html: job.description }} 
            />
          </section>

          <section>
            <h2 className="mb-4 text-xl font-medium text-neutral-900 font-heading">Requirements</h2>
            <div 
              className="prose max-w-none prose-p:leading-relaxed prose-li:text-neutral-600 prose-headings:text-neutral-900 prose-a:text-brand" 
              dangerouslySetInnerHTML={{ __html: job.requirements }} 
            />
          </section>
        </div>

        <div>
          <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm p-8 md:p-12">
            <h3 className="mb-8 text-2xl font-light text-neutral-900 font-heading">Apply for this position</h3>
            <ApplicationForm jobId={job.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
