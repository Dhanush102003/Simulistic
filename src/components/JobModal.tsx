import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { utils, writeFile } from 'xlsx';
import emailjs from '@emailjs/browser';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const jobRoles = [
  'CFD Engineer',
  'Design Engineer',
  'FEA Engineer'
];

const sourceOptions = [
  'LinkedIn',
  'Friends',
  'Job Boards',
  'Company Website',
  'Other'
];

const JobModal = ({ isOpen, onClose }: JobModalProps) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState({
    contact: false,
    roleMatch: false
  });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    const formData = new FormData(formRef.current);
    
    try {
      const resumeFile = formData.get('resume') as File;
      const timestamp = Date.now();
      const fileExt = resumeFile.name.split('.').pop();
      const filePath = `${timestamp}-${resumeFile.name}`;
      
      // Upload resume to Supabase Storage
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, resumeFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Save application data to Supabase
      const { error: insertError } = await supabase
        .from('applications')
        .insert([
          {
            role: formData.get('role'),
            name: formData.get('name'),
            gender: formData.get('gender'),
            employment_type: formData.get('employmentType'),
            source: formData.get('source'),
            resume_path: filePath,
            application_date: new Date().toISOString()
          }
        ]);

      if (insertError) throw insertError;

      // Send email notification
      await emailjs.send(
        'service_7jal3uy',
        'template_sq4wlb7',
        {
          to_email: 'dhanushbalakrishnan1102003@gmail.com',
          from_name: formData.get('name'),
          message: `New application received:
            Position: ${formData.get('role')}
            Type: ${formData.get('employmentType')}
            Name: ${formData.get('name')}`,
        },
        '0sgHDqNUREnhCmp70'
      );

      alert('Application submitted successfully!');
      onClose();
      formRef.current.reset();
      setSelectedRole(null);
      setTermsAccepted({ contact: false, roleMatch: false });
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedRole ? selectedRole : 'Available Positions'}
                </h2>
                <button
                  onClick={() => {
                    onClose();
                    setSelectedRole(null);
                    setTermsAccepted({ contact: false, roleMatch: false });
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {!selectedRole ? (
                <div className="grid gap-4">
                  {jobRoles.map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">{role}</h3>
                    </button>
                  ))}
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="role" value={selectedRole} />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black text-gray-900 placeholder-gray-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      required
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black text-gray-900"
                    >
                      <option value="" className="text-gray-500">Select gender</option>
                      <option value="male" className="text-gray-900">Male</option>
                      <option value="female" className="text-gray-900">Female</option>
                      <option value="other" className="text-gray-900">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Employment Type
                    </label>
                    <select
                      name="employmentType"
                      required
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black text-gray-900"
                    >
                      <option value="" className="text-gray-500">Select type</option>
                      <option value="fulltime" className="text-gray-900">Full Time</option>
                      <option value="parttime" className="text-gray-900">Part Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      How did you hear about us?
                    </label>
                    <select
                      name="source"
                      required
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black text-gray-900"
                    >
                      <option value="" className="text-gray-500">Select source</option>
                      {sourceOptions.map(option => (
                        <option key={option} value={option.toLowerCase()} className="text-gray-900">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Upload CV/Resume (PDF or DOC format only)
                    </label>
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      required
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black text-gray-900"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="contact-consent"
                        checked={termsAccepted.contact}
                        onChange={(e) => setTermsAccepted(prev => ({ ...prev, contact: e.target.checked }))}
                        required
                        className="mt-1 mr-2"
                      />
                      <label htmlFor="contact-consent" className="text-sm text-gray-900">
                        I agree to be contacted by Simulistic via phone or email if my profile matches the requirements
                      </label>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="role-match"
                        checked={termsAccepted.roleMatch}
                        onChange={(e) => setTermsAccepted(prev => ({ ...prev, roleMatch: e.target.checked }))}
                        required
                        className="mt-1 mr-2"
                      />
                      <label htmlFor="role-match" className="text-sm text-gray-900">
                        I understand that I may be considered for other suitable positions based on my resume and qualifications
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !termsAccepted.contact || !termsAccepted.roleMatch}
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobModal;