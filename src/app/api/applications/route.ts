import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const jobId = formData.get('jobId') as string | null;
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const portfolioUrl = formData.get('portfolioUrl') as string | null;
    const currentLocation = formData.get('currentLocation') as string | null;
    const highestDegree = formData.get('highestDegree') as string | null;
    const collegeName = formData.get('collegeName') as string | null;
    const graduationYear = formData.get('graduationYear') as string | null;
    const cgpa = formData.get('cgpa') as string | null;
    const specialization = formData.get('specialization') as string | null;
    const startDate = formData.get('startDate') as string | null;
    const onSitePreference = formData.get('onSitePreference') as string | null;
    const coverNote = formData.get('coverNote') as string | null;
    const resume = formData.get('resume') as File | null;

    if (!fullName || !email || !phone || !resume) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // 1. Save Resume (Local storage for dev)
    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uniqueFilename = `${Date.now()}-${resume.name.replace(/\s+/g, '-')}`;
    const filepath = path.join(uploadsDir, uniqueFilename);
    fs.writeFileSync(filepath, buffer);
    
    const resumeUrl = `/uploads/${uniqueFilename}`;

    // 2. Save Application to DB
    const application = await prisma.application.create({
      data: {
        jobId: jobId || null,
        fullName,
        email,
        phone,
        portfolioUrl,
        currentLocation,
        highestDegree,
        collegeName,
        graduationYear,
        cgpa,
        specialization,
        startDate,
        onSitePreference,
        coverNote,
        resumeUrl,
        status: 'new',
      }
    });

    // 3. (Mock) Send emails to applicant and to careers@tectratechnologies.com
    console.log(`[Email Mock] Application received for ${email}. Triggering email to careers@tectratechnologies.com`);

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
