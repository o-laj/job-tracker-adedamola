// This API route handles GET and POST requests for job applications.
// It reads from and writes to a local jobs.json file (no database needed).

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { Job } from '@/lib/types';

// Get the full path to our local JSON file that stores jobs
const filePath = path.join(process.cwd(), 'data', 'jobs.json');

// Helper function: read all jobs from the JSON file
const readJobs = (): Job[] => {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (err) {
    return []; // If file doesn't exist or has error, return an empty array
  }
};

// Helper function: write jobs array back to the JSON file
const writeJobs = (jobs: Job[]) => {
  fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));
};

// Handle GET (fetch all jobs) and POST (add a new job)
export async function GET(req: NextRequest) {
  const jobs = readJobs();
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const body = await req.json(); // Get job data from request body
  const jobs = readJobs();       // Read exjobs.json isting jobs

  // Create a new job object with a unique ID (timestamp)
  const newJob: Job = {
    id: Date.now(),
    ...body,
  };

  jobs.push(newJob);      // Add to job list
  writeJobs(jobs);        // Save updated list to file

  return NextResponse.json(newJob, { status: 201 }); // Return new job
}
