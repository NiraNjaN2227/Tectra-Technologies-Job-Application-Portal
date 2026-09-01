'use client';

import { StatusDropdown } from './StatusDropdown';

export function ApplicantDetails({ app, jobTitle }: { app: any; jobTitle: string }) {
  if (!app) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-400 p-8 font-sans">
        Select an applicant to view details
      </div>
    );
  }

  const normalizedStatus = app.status === 'new' ? 'applied' : app.status === 'reviewed' ? 'screening' : app.status;

  return (
    <div className="flex flex-col h-full bg-white border border-neutral-200 shadow-sm rounded-2xl overflow-hidden font-sans">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-neutral-50 p-6 flex flex-col md:flex-row items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-1">{app.fullName}</h2>
          <div className="text-brand font-medium mb-4 text-sm">{jobTitle}</div>
          
          <div className="flex flex-wrap gap-6 text-sm text-neutral-600">
            <div>
              <span className="block text-neutral-400 text-[10px] uppercase tracking-widest font-semibold mb-1">Email</span>
              {app.email}
            </div>
            <div>
              <span className="block text-neutral-400 text-[10px] uppercase tracking-widest font-semibold mb-1">Phone</span>
              {app.phone}
            </div>
            {app.portfolioUrl && (
              <div>
                <span className="block text-neutral-400 text-[10px] uppercase tracking-widest font-semibold mb-1">Portfolio</span>
                <a href={app.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-medium">
                  View Portfolio
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className="flex items-center gap-3 bg-white border border-neutral-200 px-3 py-1.5 rounded-xl shadow-sm">
            <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider pl-1">Stage:</span>
            <StatusDropdown applicationId={app.id} currentStatus={app.status} />
          </div>
          <a 
            href={app.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary py-2.5 px-6 text-sm shadow-sm"
          >
            View Resume
          </a>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="p-8 overflow-y-auto flex-1">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* Section 1 */}
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-5 font-heading">Education & Experience</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500 font-medium">Highest Degree</span>
                <span className="text-neutral-900 text-right font-medium">{app.highestDegree || '-'}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500 font-medium">College</span>
                <span className="text-neutral-900 text-right font-medium">{app.collegeName || '-'}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500 font-medium">Graduation Year</span>
                <span className="text-neutral-900 text-right font-medium">{app.graduationYear || '-'}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500 font-medium">CGPA / Percentage</span>
                <span className="text-neutral-900 text-right font-medium">{app.cgpa || '-'}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500 font-medium">Specialization</span>
                <span className="text-neutral-900 text-right font-medium">{app.specialization || '-'}</span>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-5 font-heading">Logistics</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500 font-medium">Current Location</span>
                <span className="text-neutral-900 text-right font-medium">{app.currentLocation || '-'}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500 font-medium">On-site Preference</span>
                <span className="text-neutral-900 text-right font-medium">{app.onSitePreference || '-'}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500 font-medium">Start Date</span>
                <span className="text-neutral-900 text-right font-medium">{app.startDate || '-'}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500 font-medium">Applied Date</span>
                <span className="text-neutral-900 text-right font-medium">
                  {new Date(app.submittedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {app.coverNote && (
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-5 font-heading">Cover Note</h3>
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 text-sm text-neutral-700 whitespace-pre-wrap leading-relaxed shadow-sm">
              {app.coverNote}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
