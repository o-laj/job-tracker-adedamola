'use client';

import { useState } from 'react';
import { Job } from '@/lib/types';

type Props = {
  onJobAdded: () => void;
};

const AddJobForm = ({ onJobAdded }: Props) => {
  const [form, setForm] = useState<Omit<Job, 'id'>>({
    title: '',
    company: '',
    link: '',
    status: 'Applied',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const errors: Partial<Record<keyof typeof form, string>> = {};

    if (!form.title.trim()) errors.title = 'Job title is required.';
    if (!form.company.trim()) errors.company = 'Company name is required.';
    if (!form.link.trim()) {
      errors.link = 'Application link is required.';
    } else if (!/^https?:\/\/.+\..+/.test(form.link.trim())) {
      errors.link = 'Please enter a valid link (e.g., https://...)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts fixing
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    onJobAdded();
    setForm({ title: '', company: '', link: '', status: 'Applied' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div>
      <h1 className='walton'>
        Add A New Job
      </h1>
      {showSuccess && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded">
           Job added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title */}
        {formErrors.title && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {formErrors.title}
          </div>
        )}
        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 bg-[#fafafa] transition duration-200 focus:border-black hover:border-black outline-none"
        />

        {/* Company */}
        {formErrors.company && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {formErrors.company}
          </div>
        )}
        <input
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 bg-[#fafafa] transition duration-200 focus:border-black hover:border-black outline-none"
        />

        {/* Link */}
        {formErrors.link && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {formErrors.link}
          </div>
        )}
        <input
          name="link"
          placeholder="Application Link"
          value={form.link}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 bg-[#fafafa] transition duration-200 focus:border-black hover:border-black outline-none"
        />

        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 bg-[#fafafa] transition duration-200 focus:border-black hover:border-black outline-none"
        >
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          className="submit-button text-center bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJobForm;
