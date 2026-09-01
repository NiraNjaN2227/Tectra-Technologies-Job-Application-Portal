import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const { title, description, requirements, category, type, level, duration, status, deadline } = body;

    const job = await prisma.job.update({
      where: { id },
      data: { 
        title, description, requirements, category, type, level, duration, status,
        deadline: deadline ? new Date(deadline) : null
      },
    });

    return NextResponse.json({ success: true, job });
  } catch (error) {
    console.error('Failed to update job:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { id } = await params;

    await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete job:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
