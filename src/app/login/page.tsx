import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/admin/LoginForm';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  // If already logged in, instantly bounce them to admin
  if (session) {
    redirect('/admin');
  }

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-200 via-neutral-100 to-white"></div>
      <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-3xl"></div>
      
      <div className="relative z-20 w-full max-w-[380px]">
        <LoginForm />
      </div>
    </div>
  );
}
