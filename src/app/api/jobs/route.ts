import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { title, description, requirements, category, type, level, duration, deadline } = body;

    const job = await prisma.job.create({
      data: {
        title,
        slug: generateSlug(title),
        description,
        requirements,
        category,
        type,
        level,
        duration,
        deadline: deadline ? new Date(deadline) : null,
        status: 'open',
      }
    });

    return NextResponse.json({ success: true, job }, { status: 201 });
  } catch (error) {
    console.error('Failed to create job:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
