'use client';

import { useEffect, useState } from 'react';
import { Job } from '@/lib/types';

type Props = {
  refreshTrigger: boolean;
};

const JobTable = ({ refreshTrigger }: Props) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [editForm, setEditForm] = useState<Omit<Job, 'id'>>({
    title: '',
    company: '',
    link: '',
    status: 'Applied',
  });

  const fetchJobs = async () => {
    setLoading(true);
    const res = await fetch('/api/jobs');
    const data = await res.json();
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [refreshTrigger]);

  const deleteJob = async (id: number) => {
    await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
    fetchJobs();
    setSuccessMessage('Job deleted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000); // hide after 3s
  };

  const startEditing = (job: Job) => {
    setEditingJobId(job.id);
    setEditForm({ title: job.title, company: job.company, link: job.link, status: job.status });
  };

  const cancelEdit = () => setEditingJobId(null);

  const saveEdit = async (id: number) => {
    await fetch(`/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    setEditingJobId(null);
    fetchJobs();
    setSuccessMessage('Job edited successfully!');
    setTimeout(() => setSuccessMessage(''), 3000); // hide after 3s
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <p className="text-center text-gray-600">Loading jobs...</p>;
  if (jobs.length === 0) return <p className="text-center text-gray-600">No jobs added yet.</p>;

  return (
    <div className="overflow-x-auto">
         <h1 className='walton'>
        Your Jobs
      </h1>

       {successMessage && (
      <div className="my-4 bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded text-sm">
        {successMessage}
      </div>
    )}
      <table className="min-w-full border rounded-lg shadow-md">
        <thead>
          <tr className="bg-black text-white text-left">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Company</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => {
            const isEven = index % 2 === 0;
            return (
              <tr key={job.id} className={isEven ? 'bg-gray-100' : 'bg-black text-white'}>
                {editingJobId === job.id ? (
                  <>
                    <td className="px-4 py-2">
                      <input
                        name="title"
                        value={editForm.title}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 rounded border"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        name="company"
                        value={editForm.company}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 rounded border"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <select
                        name="status"
                        value={editForm.status}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 rounded border"
                      >
                        <option>Applied</option>
                        <option>Interviewing</option>
                        <option>Rejected</option>
                        <option>Offer</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 space-y-1">
                      <button
                        onClick={() => saveEdit(job.id)}
                        className="w-full bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="w-full bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2">{job.title}</td>
                    <td className="px-4 py-2">{job.company}</td>
                    <td className="px-4 py-2">{job.status}</td>
                    <td className="px-4 py-2">
                        <div className="flex gap-x-2">
                            <button
                            onClick={() => startEditing(job)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                            Edit
                            </button>
                            <button
                            onClick={() => deleteJob(job.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                            Delete
                            </button>
                        </div>
                </td>

                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
