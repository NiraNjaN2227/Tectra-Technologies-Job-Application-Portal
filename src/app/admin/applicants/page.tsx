import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ApplicantsClient } from './ApplicantsClient';

export default async function AdminApplicantsPage() {
  const applications = await prisma.application.findMany({
    orderBy: { submittedAt: 'desc' },
    include: {
      job: true,
    },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-light text-neutral-900 font-heading">Applicants</h1>
      </div>

      <ApplicantsClient initialApplications={applications} />
    </div>
  );
}
