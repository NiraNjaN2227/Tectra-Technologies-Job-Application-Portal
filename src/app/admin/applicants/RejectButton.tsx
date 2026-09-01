'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';

export function RejectButton({ applicationId }: { applicationId: string }) {
  const router = useRouter();
  const [isRejecting, setIsRejecting] = useState(false);

  const handleReject = async () => {
    if (!confirm('Are you sure you want to reject this applicant? A rejection email will be sent.')) {
      return;
    }

    setIsRejecting(true);
    try {
      const res = await fetch(`/api/applications/${applicationId}/reject`, {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Failed to reject application');
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert('An error occurred while rejecting the application.');
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <button
      onClick={handleReject}
      disabled={isRejecting}
      className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-500/20 disabled:opacity-50"
      title="Reject and Send Email"
    >
      <XCircle className="h-3.5 w-3.5" />
      {isRejecting ? 'Rejecting...' : 'Reject'}
    </button>
  );
}
