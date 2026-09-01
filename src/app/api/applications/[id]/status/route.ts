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
    const { status } = body;

    if (!['applied', 'screening', 'shortlisted', 'interview', 'selected', 'rejected', 'hired', 'new', 'reviewed'].includes(status)) {
      return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    const application = await prisma.application.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('Failed to update application status:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
