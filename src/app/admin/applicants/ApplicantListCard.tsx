'use client';

export function ApplicantListCard({ 
  app, 
  jobTitle, 
  isSelected, 
  onClick 
}: { 
  app: any; 
  jobTitle: string; 
  isSelected: boolean; 
  onClick: () => void;
}) {
  const normalizedStatus = app.status === 'new' ? 'applied' : app.status === 'reviewed' ? 'screening' : app.status;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-50 text-blue-600 border border-blue-200';
      case 'screening': return 'bg-indigo-50 text-indigo-600 border border-indigo-200';
      case 'shortlisted': return 'bg-yellow-50 text-yellow-600 border border-yellow-200';
      case 'interview': return 'bg-orange-50 text-orange-600 border border-orange-200';
      case 'selected': return 'bg-green-50 text-green-600 border border-green-200';
      case 'rejected': return 'bg-red-50 text-red-600 border border-red-200';
      case 'hired': return 'bg-purple-50 text-purple-600 border border-purple-200';
      default: return 'bg-neutral-100 text-neutral-600 border border-neutral-200';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer border-b border-neutral-100 p-4 transition-colors hover:bg-neutral-50 ${
        isSelected ? 'bg-brand/5 border-l-4 border-l-brand' : 'border-l-4 border-l-transparent bg-white'
      }`}
    >
      <div className="flex items-start justify-between mb-1">
        <h4 className="font-medium text-neutral-900 truncate pr-2 font-sans">{app.fullName}</h4>
        <span className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getStatusColor(normalizedStatus)}`}>
          {normalizedStatus}
        </span>
      </div>
      <div className="text-xs text-neutral-500 mb-2 truncate font-sans">{jobTitle}</div>
      <div className="text-[11px] text-neutral-400 font-sans">
        {new Date(app.submittedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
      </div>
    </div>
  );
}
