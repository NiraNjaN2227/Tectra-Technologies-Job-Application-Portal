import { prisma } from './src/lib/prisma';

async function main() {
  try {
    const jobs = await prisma.job.findMany();
    console.log('Success, jobs found:', jobs.length);
  } catch (e) {
    console.error('Error fetching jobs:', e);
  }
}
main();
