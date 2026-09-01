'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';

export function JobActions({ jobId, currentStatus }: { jobId: string; currentStatus: string }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);



  const deleteJob = async () => {
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) return;
    
    setIsProcessing(true);
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete job');
      
      toast.success('Job deleted successfully');
      router.refresh();
    } catch (error) {
      toast.error('Failed to delete job');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-3">

      <Link 
        href={`/admin/jobs/${jobId}/edit`}
        className="text-neutral-500 hover:text-neutral-900 transition-colors" 
        title="Edit"
      >
        <Edit className="h-4 w-4" />
      </Link>

      <button 
        onClick={deleteJob}
        disabled={isProcessing}
        className="text-red-500 hover:text-red-600 transition-colors" 
        title="Delete"
      >
        <Trash className="h-4 w-4" />
      </button>
    </div>
  );
}
