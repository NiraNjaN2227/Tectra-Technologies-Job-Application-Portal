'use client';

import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export function SignOutButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-text-muted hover:bg-red-500/10 hover:text-red-500 transition-colors"
      >
        <LogOut className="h-4 w-4" /> Sign Out
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          
          {/* Modal Card */}
          <div className="w-full max-w-sm bg-surface border border-white/10 rounded-2xl p-6 shadow-2xl transform transition-all">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Sign Out</h3>
              <p className="text-sm text-white/70">
                Are you sure you want to sign out? You will need to log in again to access the admin dashboard.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-red-500/90 hover:bg-red-500 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
          
        </div>
      )}
    </>
  );
}
