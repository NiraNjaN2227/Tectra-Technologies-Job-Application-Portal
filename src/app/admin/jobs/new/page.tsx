import { JobForm } from '@/components/admin/JobForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewJobPage() {
  return (
    <div className="mx-auto max-w-4xl font-sans">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/jobs" className="text-neutral-500 hover:text-neutral-900 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-light text-neutral-900 font-heading">Create New Job</h1>
      </div>
      
      <JobForm />
    </div>
  );
}
