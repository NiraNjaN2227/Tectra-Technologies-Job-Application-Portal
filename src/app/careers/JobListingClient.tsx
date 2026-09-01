'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Job } from '@prisma/client';
import { ArrowRight, Search, ChevronDown } from 'lucide-react';

export function JobListingClient({ jobs }: { jobs: Job[] }) {
  const [filter, setFilter] = useState<string>('All Categories');
  const [search, setSearch] = useState<string>('');
  
  const categories = ['All Categories', ...Array.from(new Set(jobs.map((j) => j.category)))];

  const filteredJobs = jobs.filter((j) => {
    const matchesCategory = filter === 'All Categories' || j.category === filter;
    const matchesSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-between -mt-20 relative z-20">
        <div></div> {/* Spacer */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <select 
              className="appearance-none w-full md:w-auto pl-6 pr-12 py-3.5 rounded-2xl border border-neutral-200 bg-white text-neutral-500 font-sans text-sm focus:outline-none focus:border-neutral-300 cursor-pointer transition-colors shadow-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full md:w-64 pl-12 pr-6 py-3.5 rounded-2xl border border-neutral-200 bg-white text-neutral-500 font-sans text-sm focus:outline-none focus:border-neutral-300 transition-colors shadow-sm placeholder:text-neutral-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="p-6 rounded-3xl border border-neutral-200 bg-white hover:border-neutral-300 transition-colors flex flex-col justify-between min-h-[180px] shadow-sm">
              <div className="flex flex-col gap-4">
                <h3 className="text-neutral-900 text-2xl font-light font-heading">{job.title}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium font-sans border border-neutral-200">{job.type}</span>
                  <span className="px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium font-sans border border-neutral-200">{job.level}</span>
                  <span className="px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium font-sans border border-neutral-200">{job.duration}</span>
                  {job.deadline && (
                    <span className="px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-xs font-medium font-sans border border-orange-200">
                      Apply by {new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-end pt-5">
                <Link
                  href={`/careers/${job.slug}`}
                  className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 font-medium font-sans text-sm transition-colors"
                >
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-neutral-500 font-sans">
            No open roles found matching your criteria.
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-4">
        <div className="text-neutral-500 font-sans font-normal text-sm">Showing {filteredJobs.length} of {jobs.length} Open Roles</div>
      </div>

      {/* Fallback CTA */}
      <div className="w-full rounded-[32px] bg-white shadow-sm border border-neutral-200 relative overflow-hidden flex flex-col mt-8">
        <div className="p-8 md:p-14 lg:p-16 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl text-neutral-950 font-normal tracking-tight font-heading">Can't Find the Right Opportunity?</h2>
            <p className="text-neutral-500 text-base font-sans leading-relaxed">
              We're always excited to meet talented individuals. If you believe you'd be a great fit for Tectra Technologies, send us your resume. We'll contact you when a relevant opportunity opens up.
            </p>
          </div>
          <Link href="/careers/general-application" className="inline-flex w-full md:w-auto justify-center items-center gap-4 px-6 py-3.5 md:px-8 md:py-4 bg-black text-white rounded-full hover:opacity-80 transition-opacity shrink-0 font-sans text-sm font-medium">
            Submit General Application <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
