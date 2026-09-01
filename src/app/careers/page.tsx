import { prisma } from '@/lib/prisma';
import { JobListingClient } from './JobListingClient';

export const metadata = {
  title: 'Careers - Tectra Technologies',
  description: 'Join a small, focused team shipping real products for global clients.',
};

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: { status: 'open' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-[40vh] md:h-[70vh] z-0 bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-[#0000004D] z-10" aria-hidden="true"></div>
      </div>
      
      {/* Hero Section */}
      <section className="w-full px-4 md:px-8 pt-[calc(40vh-7rem)] md:pt-[300px] pb-8 md:pb-10 flex flex-col items-center relative z-10">
        <div className="w-full max-w-[1120px] mx-auto rounded-[34px] bg-black px-6 py-10 md:p-12 relative overflow-hidden flex flex-col items-start gap-5 md:gap-6 min-h-[280px] md:min-h-[300px] justify-center shadow-2xl">
          <div className="flex items-center gap-3 relative z-10">
            <span className="text-white text-xs font-medium font-sans uppercase leading-4">—</span>
            <span className="text-white text-xs font-medium font-sans uppercase leading-4">CAREERS</span>
            <span className="text-white text-xs font-medium font-sans uppercase leading-4">—</span>
          </div>
          <div className="flex flex-col gap-4 md:gap-6 max-w-2xl relative z-10">
            <h1 className="text-white text-4xl md:text-7xl font-light leading-[1.1] tracking-tight font-heading">
              Build Things that actually matters
            </h1>
            <p className="text-white/80 text-lg md:text-lg font-normal font-sans max-w-lg leading-relaxed">
              A small, focused team shipping real products for global clients. No politics — just craft, ownership and meaningful work.
            </p>
          </div>
          <a href="#open-roles" className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full mt-4 hover:bg-neutral-200 transition-colors z-10">
            <span className="text-black text-sm font-medium font-sans">View Open Roles</span>
          </a>
        </div>
      </section>

      {/* Why Join Tectra */}
      <section className="w-full px-4 md:px-8 pt-6 pb-12 bg-white flex flex-col items-center relative z-10">
        <div className="w-full max-w-[1120px] mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="text-neutral-600 text-xs font-medium font-sans uppercase">—</span>
              <span className="text-neutral-600 text-xs font-medium font-sans uppercase">WHY JOIN TECTRA</span>
              <span className="text-neutral-600 text-xs font-medium font-sans uppercase">—</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-neutral-900 font-light font-heading">Great people. Greater impact.</h2>
            <p className="text-neutral-500 text-lg font-normal font-sans max-w-2xl">
              We build digital products that solve real problems and create meaningful impact for businesses and communities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-100 via-pink-50 to-amber-50 border border-neutral-200 flex flex-col gap-4">
              <h3 className="text-neutral-900 text-xl font-medium font-heading">Career Growth</h3>
              <p className="text-neutral-500 text-base font-sans leading-relaxed">We invest in your growth with continuous learning and clear career paths.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-100 via-pink-50 to-amber-50 border border-neutral-200 flex flex-col gap-4">
              <h3 className="text-neutral-900 text-xl font-medium font-heading">Innovation First</h3>
              <p className="text-neutral-500 text-base font-sans leading-relaxed">Work on challenging problems and build solutions that matter.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-100 via-pink-50 to-amber-50 border border-neutral-200 flex flex-col gap-4">
              <h3 className="text-neutral-900 text-xl font-medium font-heading">Collaborative Culture</h3>
              <p className="text-neutral-500 text-base font-sans leading-relaxed">Flat hierarchy, open communication, mutual respect, and collaboration.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-100 via-pink-50 to-amber-50 border border-neutral-200 flex flex-col gap-4">
              <h3 className="text-neutral-900 text-xl font-medium font-heading">Learning Budget</h3>
              <p className="text-neutral-500 text-base font-sans leading-relaxed">Each team member gets an annual budget to learn and grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Life at Tectra */}
      <section className="w-full px-4 md:px-8 py-12 bg-[#0A0A0A] flex flex-col items-center relative z-10">
        <div className="w-full max-w-[1120px] mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-neutral-400 text-xs font-medium font-sans uppercase">—</span>
                <span className="text-neutral-400 text-xs font-medium font-sans uppercase">LIFE AT TECTRA</span>
                <span className="text-neutral-400 text-xs font-medium font-sans uppercase">—</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-light leading-tight font-heading">Where work feels<br className="hidden sm:block"/>meaningful.</h2>
            </div>
            <p className="text-neutral-400 text-lg font-sans max-w-sm text-left">
              We're a close-knit team of builders, thinkers, and dreamers. We celebrate wins, learn from failures, and grow together.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits & Perks */}
      <section className="w-full px-4 md:px-8 py-12 bg-white flex flex-col items-center relative z-10">
        <div className="w-full max-w-[1120px] mx-auto flex flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-3">
              <span className="text-neutral-600 text-xs font-medium font-sans uppercase">—</span>
              <span className="text-neutral-600 text-xs font-medium font-sans uppercase">BENEFITS & PERKS</span>
              <span className="text-neutral-600 text-xs font-medium font-sans uppercase">—</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-neutral-900 font-light font-heading">Invested in your growth</h2>
            <p className="text-neutral-500 text-lg font-sans max-w-2xl">Everything you need to learn, thrive, and build meaningful work.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <div className="p-8 rounded-2xl border border-neutral-200 bg-white shadow-sm flex flex-col gap-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-3">
                <h3 className="text-neutral-900 text-2xl font-light font-heading">Health & Wellness</h3>
                <p className="text-neutral-500 text-sm font-sans leading-relaxed">Access wellness programs and resources that support your physical and mental well-being.</p>
              </div>
            </div>
            <div className="p-8 rounded-2xl border border-neutral-200 bg-white shadow-sm flex flex-col gap-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-3">
                <h3 className="text-neutral-900 text-2xl font-light font-heading">Flexible Work</h3>
                <p className="text-neutral-500 text-sm font-sans leading-relaxed">Hybrid work model with flexible hours that suit Your life.</p>
              </div>
            </div>
            <div className="p-8 rounded-2xl border border-neutral-200 bg-white shadow-sm flex flex-col gap-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-3">
                <h3 className="text-neutral-900 text-2xl font-light font-heading">Learning Support</h3>
                <p className="text-neutral-500 text-sm font-sans leading-relaxed">Courses, conferences, and resources to level up your skills.</p>
              </div>
            </div>
            <div className="p-8 rounded-2xl border border-neutral-200 bg-white shadow-sm flex flex-col gap-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-3">
                <h3 className="text-neutral-900 text-2xl font-light font-heading">Annual Retreats</h3>
                <p className="text-neutral-500 text-sm font-sans leading-relaxed">Team offsites, fun activities, and memories that last.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Listing */}
      <section id="open-roles" className="w-full px-4 md:px-8 pt-10 md:pt-12 pb-12 bg-neutral-100 flex flex-col items-center relative z-10">
        <div className="w-full max-w-[1120px] mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-neutral-600 text-xs font-medium font-sans uppercase">—</span>
                <span className="text-neutral-600 text-xs font-medium font-sans uppercase">OPEN ROLES</span>
                <span className="text-neutral-600 text-xs font-medium font-sans uppercase">—</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-neutral-900 font-light font-heading">Find Your Next Opportunity</h2>
            </div>
          </div>
          <JobListingClient jobs={jobs} />
        </div>
      </section>
    </>
  );
}
