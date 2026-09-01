'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = [
  { value: 'applied', label: 'Applied' },
  { value: 'screening', label: 'Screening' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'interview', label: 'Interview' },
  { value: 'selected', label: 'Selected' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'hired', label: 'Hired' },
];

export function StatusDropdown({ applicationId, currentStatus }: { applicationId: string; currentStatus: string }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  // Normalize legacy statuses for the UI
  const normalizedStatus = currentStatus === 'new' ? 'applied' : currentStatus === 'reviewed' ? 'screening' : currentStatus;

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setIsUpdating(true);

    try {
      const res = await fetch(`/api/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');
      
      toast.success(`Applicant status updated to ${newStatus}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update applicant status');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select
      value={normalizedStatus}
      onChange={handleStatusChange}
      disabled={isUpdating}
      className="rounded-lg border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white focus:border-brand focus:outline-none disabled:opacity-50"
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-surface text-white">
          {opt.label}
        </option>
      ))}
    </select>
  );
}
