'use client';

import { Users, Search, CheckCircle, Video, Star, Ban, Briefcase } from 'lucide-react';

interface PipelineCounts {
  applied: number;
  screening: number;
  shortlisted: number;
  interview: number;
  selected: number;
  rejected: number;
  hired: number;
}

const PIPELINE_STAGES = [
  { id: 'applied', label: 'Applied', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'screening', label: 'Screening', icon: Search, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'shortlisted', label: 'Shortlisted', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { id: 'interview', label: 'Interview', icon: Video, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'selected', label: 'Selected', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  { id: 'hired', label: 'Hired', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'rejected', label: 'Rejected', icon: Ban, color: 'text-red-600', bg: 'bg-red-50' },
];

export function CandidatePipeline({ counts }: { counts: PipelineCounts }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium text-neutral-900 font-heading">Candidate Pipeline</h2>
          <p className="text-sm text-neutral-500 mt-1 font-sans">Applicant Tracking System (ATS)</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-medium text-neutral-500 font-sans">
          <span className="flex items-center gap-1 text-neutral-900">Applied</span> &rarr;
          <span className="flex items-center gap-1">Screening</span> &rarr;
          <span className="flex items-center gap-1">Shortlisted</span> &rarr;
          <span className="flex items-center gap-1">Interview</span> &rarr;
          <span className="flex items-center gap-1 text-brand">Hired</span>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-1 font-sans">
        {PIPELINE_STAGES.map((stage) => {
          const count = counts[stage.id as keyof PipelineCounts] || 0;
          return (
            <div key={stage.id} className="flex items-center justify-between rounded-xl bg-neutral-50 border border-neutral-100 p-4 hover:bg-neutral-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stage.bg} ${stage.color}`}>
                  <stage.icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-neutral-900">{stage.label}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-medium text-neutral-900">{count}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
