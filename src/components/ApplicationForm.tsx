'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

interface ApplicationFormProps {
  jobId?: string;
}

export function ApplicationForm({ jobId }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function submitAction(formData: FormData) {
    setError('');
    setIsSubmitting(true);

    // Concatenate phone code and number
    const phoneCode = formData.get('phoneCode') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    formData.set('phone', `${phoneCode} ${phoneNumber}`);
    formData.delete('phoneCode');
    formData.delete('phoneNumber');

    const resumeFile = formData.get('resume') as File;

    if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
      toast.error('Resume file must be less than 5MB.');
      setIsSubmitting(false);
      return;
    }

    try {
      if (jobId) {
        formData.append('jobId', jobId);
      }

      const res = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess(true);
      toast.success('Application submitted successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <h4 className="mb-3 text-2xl font-light text-green-700 font-heading">Application Submitted!</h4>
        <p className="text-green-600 font-sans">
          Thank you for applying. We'll review your application and get back to you soon.
        </p>
      </div>
    );
  }

  const inputClasses = "rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand font-sans transition-colors";
  const labelClasses = "font-medium text-neutral-700 font-sans text-sm";

  return (
    <form action={submitAction} className="flex flex-col gap-6 text-sm">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className={labelClasses}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input type="text" id="fullName" name="fullName" required pattern="^[a-zA-Z\s]+$" title="Only letters and spaces allowed" className={inputClasses} placeholder="Jane Doe" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClasses}>
            Email <span className="text-red-500">*</span>
          </label>
          <input type="email" id="email" name="email" required pattern="[a-zA-Z0-9._%+-]+@gmail\.com$" title="Must be a valid @gmail.com email address" className={inputClasses} placeholder="jane@gmail.com" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phoneNumber" className={labelClasses}>
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <select name="phoneCode" required className={`${inputClasses} w-1/3 px-2`}>
              <option value="+91">+91 (IN)</option>
              <option value="+1">+1 (US/CA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (AU)</option>
              <option value="+81">+81 (JP)</option>
              <option value="+49">+49 (DE)</option>
            </select>
            <input type="tel" id="phoneNumber" name="phoneNumber" required pattern="[0-9]{10}" maxLength={10} title="Please enter exactly 10 digits" className={`${inputClasses} w-2/3`} placeholder="1234567890" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="currentLocation" className={labelClasses}>
            Current Location <span className="text-red-500">*</span>
          </label>
          <input type="text" id="currentLocation" name="currentLocation" required className={inputClasses} placeholder="e.g. Chennai, Remote" />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="portfolioUrl" className={labelClasses}>
            LinkedIn Profile / Portfolio URL
          </label>
          <input type="url" id="portfolioUrl" name="portfolioUrl" className={inputClasses} placeholder="https://..." />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="highestDegree" className={labelClasses}>
            Highest/Current Degree <span className="text-red-500">*</span>
          </label>
          <input type="text" id="highestDegree" name="highestDegree" required className={inputClasses} placeholder="e.g. B.Tech, M.S." />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="collegeName" className={labelClasses}>
            College/University Name <span className="text-red-500">*</span>
          </label>
          <input type="text" id="collegeName" name="collegeName" required className={inputClasses} placeholder="e.g. Anna University" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="graduationYear" className={labelClasses}>
            Graduation Year <span className="text-red-500">*</span>
          </label>
          <input type="number" id="graduationYear" name="graduationYear" min="1950" max="2030" required className={inputClasses} placeholder="e.g. 2024" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="cgpa" className={labelClasses}>
            CGPA/Percentage <span className="text-red-500">*</span>
          </label>
          <input type="number" id="cgpa" name="cgpa" step="0.01" min="0" max="100" required className={inputClasses} placeholder="e.g. 8.5 or 85" />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="specialization" className={labelClasses}>
            Relevant Specialization/Major <span className="text-red-500">*</span>
          </label>
          <input type="text" id="specialization" name="specialization" required className={inputClasses} placeholder="e.g. Computer Science" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="startDate" className={labelClasses}>
            When can you start? <span className="text-red-500">*</span>
          </label>
          <input type="date" id="startDate" name="startDate" required className={inputClasses} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="onSitePreference" className={labelClasses}>
            Are you okay with working on-site (Chennai)? <span className="text-red-500">*</span>
          </label>
          <select id="onSitePreference" name="onSitePreference" required className={inputClasses}>
            <option value="">Select option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="resume" className={labelClasses}>
            Resume/CV (PDF, DOC, DOCX up to 5MB) <span className="text-red-500">*</span>
          </label>
          <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required className={`rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 file:mr-4 file:rounded-full file:border-0 file:bg-neutral-100 file:px-4 file:py-1.5 file:text-xs file:font-medium file:text-neutral-700 hover:file:bg-neutral-200 focus:outline-none transition-colors`} />
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="coverNote" className={labelClasses}>
            Cover Note
          </label>
          <textarea id="coverNote" name="coverNote" rows={4} className={inputClasses} placeholder="Tell us briefly why you are a good fit..." />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white hover:bg-neutral-800 rounded-full mt-4 w-full disabled:opacity-70 py-4 text-base font-medium transition-colors shadow-lg shadow-black/20"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}