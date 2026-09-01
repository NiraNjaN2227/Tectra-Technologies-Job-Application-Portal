import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ApplicationForm } from '@/components/ApplicationForm';

export const metadata = {
  title: 'General Application - Tectra Technologies',
  description: 'Submit a general application to join Tectra Technologies.',
};

export default function GeneralApplicationPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 md:px-8">
      <div className="mb-8">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to open roles
        </Link>
      </div>

      <div className="mb-12 border-b border-white/10 pb-12">
        <h1 className="mb-6 text-3xl font-light tracking-tight text-white md:text-5xl">
          General Application
        </h1>
        <p className="text-lg text-text-muted">
          Don't see a role that fits your skills? Send us your details anyway. We're always looking for great talent.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-surface p-6 md:p-10">
        <ApplicationForm />
      </div>
    </div>
  );
}
