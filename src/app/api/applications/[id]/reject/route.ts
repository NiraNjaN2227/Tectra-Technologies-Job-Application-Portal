import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Update the application status to rejected
    const application = await prisma.application.update({
      where: { id },
      data: { status: 'rejected' },
    });

    // Mock sending email
    console.log(`[Email Mock] Sending rejection email to: ${application.email}`);
    console.log(`
Subject: Update on your application at Tectra Technologies
Hi ${application.fullName},

Thank you for taking the time to apply for a role with us. We appreciate your interest in joining Tectra Technologies.

After careful consideration, we have decided to move forward with other candidates who more closely align with our current needs for this position.

We will keep your resume on file and reach out if a suitable opportunity arises in the future.

Best regards,
The Tectra Technologies Team
    `.trim());

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('Failed to reject application:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
