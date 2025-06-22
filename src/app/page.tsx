'use client';

import { useState } from 'react';
import AddJobForm from '@/components/AddJobForm';
import JobTable from '@/components/JobTable';
import AnalyzeJob from '@/components/AnalyzeJob';

export default function HomePage() {
  const [refresh, setRefresh] = useState(false);
  const [activeTab, setActiveTab] = useState<'view' | 'add' | 'analyze'>('view');

  const handleRefresh = () => setRefresh(prev => !prev);

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-2">
      {/* Navbar */}
      <nav className="bg-black navbar rounded-full shadow-md my-10 ">
        <span
          className="text-white walton text-xl font-bold tracking-wide"
          style={{ fontFamily: 'Walton' }}
        >
          Job Tracker
        </span>
      </nav>


      <div className="max-w-3xl mx-auto">
          {/* Tabs */}
          <div className="w-full overflow-x-auto mb-6">
            <div className="inline-flex flex-nowrap space-x-4 px-4">
              {/** each button must not shrink below its content width **/}
              <button
                onClick={() => setActiveTab('view')}
                className={`flex-shrink-0 h-12 px-5 whitespace-nowrap rounded-full ${
                  activeTab === 'view'
                    ? 'bg-black text-white'
                    : 'bg-white text-black border'
                }`}
              >
                View Jobs
              </button>

              <button
                onClick={() => setActiveTab('add')}
                className={`flex-shrink-0 h-12 px-5 whitespace-nowrap rounded-full ${
                  activeTab === 'add'
                    ? 'bg-black text-white'
                    : 'bg-white text-black border'
                }`}
              >
                Add Job
              </button>

              <button
                onClick={() => setActiveTab('analyze')}
                className={`flex-shrink-0 h-12 px-5 whitespace-nowrap rounded-full ${
                  activeTab === 'analyze'
                    ? 'bg-black text-white'
                    : 'bg-white text-black border'
                }`}
              >
                Analyze Job Description
              </button>
            </div>
          </div>



          {/* Tab Content */}
          <div className=" bg-white shadow-md rounded-lg p-6">
            {activeTab === 'view' && <JobTable refreshTrigger={refresh} />}
            {activeTab === 'add' && <AddJobForm onJobAdded={handleRefresh} />}
            {activeTab === 'analyze' && <AnalyzeJob />}
          </div>
      </div>
    </main>
  );
}
