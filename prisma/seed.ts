import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import bcrypt from 'bcryptjs'

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || 'file:./dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  const jobs = [
    {
      title: 'Full Stack Developer Intern',
      slug: 'full-stack-developer-intern',
      category: 'Engineering',
      type: 'Internship',
      level: 'Entry Level',
      duration: '3 Months',
      description: 'We are looking for a Full Stack Developer Intern to join our Engineering team and build robust web applications.',
      requirements: 'Experience with React, Node.js, and a willingness to learn.',
    },
    {
      title: 'UI/UX Developer Intern',
      slug: 'ui-ux-developer-intern',
      category: 'Design',
      type: 'Internship',
      level: 'Entry Level',
      duration: '3 Months',
      description: 'We are looking for a UI/UX Developer Intern to join our Design team and create intuitive user experiences.',
      requirements: 'Figma proficiency and understanding of UX principles.',
    },
    {
      title: 'Social Media Intern',
      slug: 'social-media-intern',
      category: 'Marketing & Business',
      type: 'Internship',
      level: 'Entry Level',
      duration: '3 Months',
      description: 'We are looking for a Social Media Intern to join our Marketing team and grow our online presence.',
      requirements: 'Experience with Instagram, X (Twitter), and LinkedIn.',
    },
    {
      title: 'Business Development Intern',
      slug: 'business-development-intern',
      category: 'Marketing & Business',
      type: 'Internship',
      level: 'Entry Level',
      duration: '3 Months',
      description: 'We are looking for a Business Development Intern to join our Business team and identify new opportunities.',
      requirements: 'Strong communication skills and interest in B2B sales.',
    },
    {
      title: 'Data Analyst Intern',
      slug: 'data-analyst-intern',
      category: 'Engineering',
      type: 'Internship',
      level: 'Entry Level',
      duration: '3 Months',
      description: 'We are looking for a Data Analyst Intern to join our Engineering team and extract insights from our data.',
      requirements: 'SQL and Python or R proficiency.',
    },
    {
      title: 'Graphic Designer Intern',
      slug: 'graphic-designer-intern',
      category: 'Design',
      type: 'Internship',
      level: 'Entry Level',
      duration: '3 Months',
      description: 'We are looking for a Graphic Designer Intern to join our Design team and produce compelling visual content.',
      requirements: 'Proficiency in Adobe Creative Suite.',
    },
  ]

  for (const job of jobs) {
    await prisma.job.upsert({
      where: { slug: job.slug },
      update: {},
      create: job,
    })
  }

  // Create initial admin user
  const adminEmail = 'tectratechnologiesadmin@gmail.com';
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('TectraTechAdmin@876', 10);
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        passwordHash: hashedPassword,
        role: 'admin',
      }
    });
    console.log(`Created initial admin user: ${adminEmail}`);
  } else {
    console.log(`Admin user ${adminEmail} already exists.`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
