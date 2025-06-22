// src/lib/types.ts
/* 
What's this?
This is a TypeScript interface. It tells us what a Job object should look like — like a recipe.
*/


export type JobStatus = 'Applied' | 'Interviewing' | 'Rejected' | 'Offer';

export interface Job {
  id: number;
  title: string;
  company: string;
  link: string;
  status: JobStatus;
}

