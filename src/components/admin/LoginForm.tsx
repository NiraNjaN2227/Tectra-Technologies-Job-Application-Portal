'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid credentials');
    } else {
      router.replace('/admin');
    }
  };

  return (
    <div className="w-full max-w-[380px] rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl">
      <h1 className="mb-6 text-center text-3xl font-light text-neutral-900 font-heading">Admin Login</h1>
      
      {error && <p className="mb-4 text-center text-red-500 font-medium text-sm">{error}</p>}
      
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
        />
        <button type="submit" className="bg-black text-white hover:bg-neutral-800 rounded-full mt-4 w-full py-3.5 text-sm font-medium transition-colors shadow-lg shadow-black/10">
          Sign In
        </button>
      </form>
    </div>
  );
}
