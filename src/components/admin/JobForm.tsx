'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Job } from '@prisma/client';
import { RichTextEditor } from './RichTextEditor';

export function JobForm({ initialData }: { initialData?: Job }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState(initialData?.description || '');
  const [requirements, setRequirements] = useState(initialData?.requirements || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const url = initialData ? `/api/jobs/${initialData.id}` : '/api/jobs';
      const method = initialData ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to save job');

      toast.success(initialData ? 'Job updated successfully!' : 'Job created successfully!');
      router.push('/admin/jobs');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Failed to save job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 font-sans">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="title" className="text-sm font-medium text-neutral-900">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={initialData?.title}
            required
            className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="category" className="text-sm font-medium text-neutral-900">Category</label>
          <select
            id="category"
            name="category"
            defaultValue={initialData?.category || ""}
            required
            className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors"
          >
            <option value="" disabled className="bg-white text-neutral-900">Select Category</option>
            <option value="Engineering" className="bg-white text-neutral-900">Engineering</option>
            <option value="Design" className="bg-white text-neutral-900">Design</option>
            <option value="Marketing & Business" className="bg-white text-neutral-900">Marketing & Business</option>
            <option value="Product" className="bg-white text-neutral-900">Product</option>
            <option value="Sales" className="bg-white text-neutral-900">Sales</option>
            <option value="Operations" className="bg-white text-neutral-900">Operations</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="type" className="text-sm font-medium text-neutral-900">Type</label>
          <select
            id="type"
            name="type"
            defaultValue={initialData?.type || ""}
            required
            className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors"
          >
            <option value="" disabled className="bg-white text-neutral-900">Select Type</option>
            <option value="Full-time" className="bg-white text-neutral-900">Full-time</option>
            <option value="Part-time" className="bg-white text-neutral-900">Part-time</option>
            <option value="Internship" className="bg-white text-neutral-900">Internship</option>
            <option value="Contract" className="bg-white text-neutral-900">Contract</option>
            <option value="Freelance" className="bg-white text-neutral-900">Freelance</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="level" className="text-sm font-medium text-neutral-900">Experience Level</label>
          <select
            id="level"
            name="level"
            defaultValue={initialData?.level || ""}
            required
            className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors"
          >
            <option value="" disabled className="bg-white text-neutral-900">Select Experience Level</option>
            <option value="Entry Level" className="bg-white text-neutral-900">Entry Level</option>
            <option value="Senior" className="bg-white text-neutral-900">Senior</option>
            <option value="Lead" className="bg-white text-neutral-900">Lead</option>
            <option value="Director" className="bg-white text-neutral-900">Director</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="duration" className="text-sm font-medium text-neutral-900">Duration</label>
          <select
            id="duration"
            name="duration"
            defaultValue={initialData?.duration || ""}
            required
            className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors"
          >
            <option value="" disabled className="bg-white text-neutral-900">Select Duration</option>
            <option value="Permanent" className="bg-white text-neutral-900">Permanent</option>
            <option value="3 Months" className="bg-white text-neutral-900">3 Months</option>
            <option value="6 Months" className="bg-white text-neutral-900">6 Months</option>
            <option value="12 Months" className="bg-white text-neutral-900">12 Months</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="experience" className="text-sm font-medium text-neutral-900">Experience (Years)</label>
          <select
            id="experience"
            name="experience"
            defaultValue={initialData?.experience || ""}
            required
            className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors"
          >
            <option value="" disabled className="bg-white text-neutral-900">Select Experience</option>
            <option value="0-1" className="bg-white text-neutral-900">0-1 Years</option>
            <option value="1-2" className="bg-white text-neutral-900">1-2 Years</option>
            <option value="3-5" className="bg-white text-neutral-900">3-5 Years</option>
            <option value="5-7" className="bg-white text-neutral-900">5-7 Years</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="deadline" className="text-sm font-medium text-neutral-900">Application Deadline (Optional)</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            defaultValue={initialData?.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : ''}
            className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-neutral-900">Description</label>
        <input type="hidden" name="description" value={description} />
        <RichTextEditor value={description} onChange={setDescription} placeholder="Write the job description..." />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="requirements" className="text-sm font-medium text-neutral-900">Requirements</label>
        <input type="hidden" name="requirements" value={requirements} />
        <RichTextEditor value={requirements} onChange={setRequirements} placeholder="List the requirements..." />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={() => router.push('/admin/jobs')}
          className="rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-all shadow-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary disabled:opacity-70 px-8"
        >
          {isSubmitting ? 'Saving...' : (initialData ? 'Update Job' : 'Create Job')}
        </button>
      </div>
    </form>
  );
}
