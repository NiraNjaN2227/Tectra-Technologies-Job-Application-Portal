'use client';

import { useState } from 'react';
import { ApplicantListCard } from './ApplicantListCard';
import { ApplicantDetails } from './ApplicantDetails';
import { ChevronDown } from 'lucide-react';

const STAGES = [
  { id: 'applied', label: 'Applied' },
  { id: 'screening', label: 'Screening' },
  { id: 'shortlisted', label: 'Shortlisted' },
  { id: 'interview', label: 'Interview' },
  { id: 'selected', label: 'Selected' },
  { id: 'hired', label: 'Hired' },
  { id: 'rejected', label: 'Rejected' },
];

export function ApplicantsClient({ initialApplications }: { initialApplications: any[] }) {
  const [activeTab, setActiveTab] = useState('applied');
  const [selectedJob, setSelectedJob] = useState('all');
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null);

  // Extract unique jobs for the dropdown
  const uniqueJobs = Array.from(new Set(initialApplications.map(app => app.job?.title || 'General Application')));

  // Filter applications by Job
  const jobFilteredApps = selectedJob === 'all' 
    ? initialApplications 
    : initialApplications.filter(app => (app.job?.title || 'General Application') === selectedJob);

  // Filter applications by Stage
  const filteredApplications = jobFilteredApps.filter(app => {
    const normalizedStatus = app.status === 'new' ? 'applied' : app.status === 'reviewed' ? 'screening' : app.status;
    return normalizedStatus === activeTab;
  });

  const selectedApplicant = initialApplications.find(app => app.id === selectedApplicantId) || null;

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] font-sans">
      
      {/* Top Controls: Job Filter & Pipeline Tabs */}
      <div className="mb-4 flex flex-col gap-4">
        
        {/* Job Filter */}
        <div className="w-fit flex items-center gap-3 bg-white border border-neutral-200 shadow-sm rounded-xl px-3 py-1.5">
          <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium pl-1">Filter Role:</span>
          <div className="relative flex items-center">
            <select 
              value={selectedJob}
              onChange={(e) => {
                setSelectedJob(e.target.value);
                setSelectedApplicantId(null);
              }}
              className="appearance-none bg-transparent text-sm text-neutral-900 font-medium focus:outline-none py-1 pl-1 pr-6 min-w-[180px] max-w-[250px] truncate cursor-pointer"
            >
              <option value="all">All Roles</option>
              {uniqueJobs.map(job => (
                <option key={job} value={job}>{job}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-1 pointer-events-none" />
          </div>
        </div>

        {/* Pipeline Tabs */}
        <div className="flex gap-2 border-b border-neutral-200 overflow-x-auto">
          {STAGES.map(stage => {
            const count = jobFilteredApps.filter(app => {
              const norm = app.status === 'new' ? 'applied' : app.status === 'reviewed' ? 'screening' : app.status;
              return norm === stage.id;
            }).length;

            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveTab(stage.id);
                  setSelectedApplicantId(null); // Reset selection on tab change
                }}
                className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === stage.id 
                    ? 'border-brand text-brand' 
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'
                }`}
              >
                {stage.label}
                <span className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs ${
                  activeTab === stage.id ? 'bg-brand/10 text-brand' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        
      </div>

      {/* Split View Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* Left: Applicant List */}
        <div className="md:col-span-4 lg:col-span-3 bg-white shadow-sm border border-neutral-200 rounded-2xl overflow-y-auto flex flex-col">
          {filteredApplications.length > 0 ? (
            <div className="flex flex-col">
              {filteredApplications.map(app => (
                <ApplicantListCard 
                  key={app.id}
                  app={app}
                  jobTitle={app.job?.title || 'General Application'}
                  isSelected={selectedApplicantId === app.id}
                  onClick={() => setSelectedApplicantId(app.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-neutral-400 text-sm">
              No applicants found in this stage.
            </div>
          )}
        </div>

        {/* Right: Applicant Details */}
        <div className="md:col-span-8 lg:col-span-9 min-h-0">
          <ApplicantDetails 
            app={selectedApplicant} 
            jobTitle={selectedApplicant?.job?.title || 'General Application'} 
          />
        </div>

      </div>

    </div>
  );
}
