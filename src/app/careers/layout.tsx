import Link from 'next/link';
import Image from 'next/image';

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="fixed top-2 left-0 right-0 z-50 px-4 md:top-4 md:px-8">
        <div className="relative mx-auto w-full max-w-[1200px]">
          <div className="flex h-12 items-center justify-between gap-4 overflow-hidden rounded-full border border-white/10 bg-[#54575E]/70 px-5 py-2 text-[14px] font-normal leading-none text-white shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-xl md:h-[50px] md:px-6">
            <a href="https://www.tectratechnologies.com/" className="flex shrink-0 items-center gap-2">
              <div className="flex items-center text-base tracking-tight text-white">
                <span className="font-bold">Tectra</span>
              </div>
            </a>
            <nav className="hidden min-w-0 flex-1 flex-nowrap items-center justify-end gap-x-4 lg:flex xl:justify-center xl:gap-x-8">
              <Link href="/careers" className="block whitespace-nowrap py-2 text-[14px] text-[#E2E2E2] hover:text-white transition-colors">
                Careers
              </Link>
            </nav>
            <div className="flex shrink-0 items-center gap-4">
              <Link href="/admin" target="_blank" rel="noopener noreferrer" className="block whitespace-nowrap py-2 text-[14px] text-[#E2E2E2] hover:text-white transition-colors">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex w-full flex-col relative z-10 flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-12 px-4 md:px-8 bg-white">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-sm text-neutral-500 font-sans">
            &copy; {new Date().getFullYear()} Tectra Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm text-neutral-500 font-sans">
            <a href="mailto:careers@tectratechnologies.com" className="hover:text-black transition-colors">careers@tectratechnologies.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
