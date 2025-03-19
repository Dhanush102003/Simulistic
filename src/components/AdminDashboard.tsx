import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Application {
  id: string;
  role: string;
  name: string;
  gender: string;
  employment_type: string;
  source: string;
  resume_path: string;
  application_date: string;
}

const AdminDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('application_date', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('resumes')
        .download(path);
      
      if (error) throw error;

      // Create a download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = path.split('/').pop() || 'resume';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume');
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(applications.map(app => ({
      Name: app.name,
      Role: app.role,
      Gender: app.gender,
      'Employment Type': app.employment_type,
      Source: app.source,
      'Application Date': new Date(app.application_date).toLocaleDateString()
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Applications');
    XLSX.writeFile(workbook, 'applications.xlsx');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Job Applications</h1>
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Export to Excel
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white/10 rounded-lg overflow-hidden">
            <thead className="bg-white/20">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Gender</th>
                <th className="px-6 py-3 text-left">Employment Type</th>
                <th className="px-6 py-3 text-left">Source</th>
                <th className="px-6 py-3 text-left">Application Date</th>
                <th className="px-6 py-3 text-left">Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4">{application.name}</td>
                  <td className="px-6 py-4">{application.role}</td>
                  <td className="px-6 py-4">{application.gender}</td>
                  <td className="px-6 py-4">{application.employment_type}</td>
                  <td className="px-6 py-4">{application.source}</td>
                  <td className="px-6 py-4">
                    {new Date(application.application_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => downloadResume(application.resume_path)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Download size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {applications.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No applications found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;