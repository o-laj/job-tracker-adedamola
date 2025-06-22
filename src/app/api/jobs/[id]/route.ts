// This API route handles PUT and DELETE for a single job entry by ID

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { Job } from '@/lib/types';

// Get the full path to our jobs.json file
const filePath = path.join(process.cwd(), 'data', 'jobs.json');

// Read all jobs from the JSON file
const readJobs = (): Job[] => {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (err) {
    return [];
  }
};

// Write updated jobs back to the JSON file
const writeJobs = (jobs: Job[]) => {
  fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));
};

// Handle PUT and DELETE for a specific job
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const jobId = parseInt(params.id);
  const updatedJobData = await req.json();

  const jobs = readJobs();
  const jobIndex = jobs.findIndex(job => job.id === jobId);

  if (jobIndex === -1) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  jobs[jobIndex] = { ...jobs[jobIndex], ...updatedJobData };
  writeJobs(jobs);

  return NextResponse.json(jobs[jobIndex]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const jobId = parseInt(params.id);

  const jobs = readJobs();
  const filteredJobs = jobs.filter(job => job.id !== jobId);

  if (filteredJobs.length === jobs.length) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  writeJobs(filteredJobs);

  return NextResponse.json({ message: 'Job deleted' });
}
