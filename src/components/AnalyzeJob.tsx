'use client'; //  This tells Next.js to treat this as a client component (needed for useState, fetch, etc.)

//  React's useState hook for managing form data, loading state, and results
import { useState } from 'react';

const AnalyzeJob = () => {
  //  Job description typed/pasted by the user
  const [desc, setDesc] = useState('');

  //  Result returned by the AI API — contains summary and skills
   const [result, setResult] = useState<{ summary?: string; skills?: string[]; error?: string; message?: string } | null>(null);

  //  Controls the loading state when we are waiting for the API to respond
  const [loading, setLoading] = useState(false);

  //  Function to send the job description to our backend AI endpoint
  const handleAnalyze = async () => {
    setLoading(true);      // Show "Analyzing..." while waiting
    setResult(null);       // Clear old results

    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobDescription: desc }), // Send user input to API
    });

    const data = await res.json(); // Get AI result
    setResult(data);               // Save it to display
    setLoading(false);             // Done loading

    console.log('AI Response:', data); 
    setResult(data);

  };

  return (
    <div className="mt-8">
 <h1 className='walton'>
        Analyze Job Description
      </h1>
  {/* Error Display */}
  {result?.error && (
    <div className="mb-4 bg-red-100 border border-red-400 text-red-800 px-4 py-2 rounded">
      <strong>{result.error}:</strong>
      <p>{result.message}</p>
    </div>
  )}

  {/* Textarea */}
  <textarea
    placeholder="Paste the job description here..."
    value={desc}
    onChange={(e) => setDesc(e.target.value)}
    rows={6}
    className="w-full border border-gray-300 rounded px-4 py-2 bg-[#fafafa] transition duration-200 focus:border-black hover:border-black outline-none"
  />

  {/* Button */}
  <button
    onClick={handleAnalyze}
    disabled={loading || !desc}
    className={`mt-4 bg-black text-white submit-button px-6 py-2 rounded transition duration-200 ${
      loading || !desc ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
    }`}
  >
    {loading ? 'Analyzing...' : 'Analyze'}
  </button>

  {/* Result Display */}
  {!result?.error && result && (
    <div className="mt-6">
      <h3 className="font-medium mb-1">Summary:</h3>
      <p className="mb-4">{result.summary}</p>

      <h3 className="font-medium mb-1">Top 3 Skills:</h3>
      <ul className="list-disc list-inside">
        {Array.isArray(result.skills) &&
          result.skills.map((skill, i) => <li key={i}>{skill}</li>)}
      </ul>
    </div>
  )}
</div>

  );
};

export default AnalyzeJob;
