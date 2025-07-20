import React, { useState } from 'react';
import { toast } from 'react-toastify';
import BugForm from '../components/BugForm';
import PriorityTag from '../components/PriorityTag';
import { bugAPI } from '../api/bugAPI';

const ReportBug = () => {
  const [loading, setLoading] = useState(false);
  const [predictedPriority, setPredictedPriority] = useState(null);
  const [lastSubmittedBug, setLastSubmittedBug] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setPredictedPriority(null);
    
    try {
      const response = await bugAPI.predictBugPriority(formData);
      
      // Store the submitted bug data with prediction
      const bugWithPriority = {
        ...formData,
        priority: response.priority,
        confidence: response.confidence,
        timestamp: new Date().toISOString()
      };
      
      setLastSubmittedBug(bugWithPriority);
      setPredictedPriority(response.priority);
      
      toast.success('Bug report submitted successfully!');
      
      // Show additional info based on priority
      if (response.priority === 'critical') {
        toast.warn('Critical priority detected! This issue needs immediate attention.');
      }
      
    } catch (error) {
      console.error('Error submitting bug:', error);
      toast.error(error.message || 'Failed to submit bug report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnother = () => {
    setPredictedPriority(null);
    setLastSubmittedBug(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Report a Bug
          </h1>
          <p className="text-lg text-gray-600">
            Submit a detailed bug report and get an AI-powered priority assessment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Bug Details
              </h2>
              <BugForm 
                onSubmit={handleSubmit} 
                loading={loading}
                predictedPriority={predictedPriority}
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Priority Result */}
            {predictedPriority && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Priority Assessment
                </h3>
                <div className="text-center">
                  <PriorityTag priority={predictedPriority} size="large" />
                  <p className="text-sm text-gray-600 mt-3">
                    AI-predicted priority based on the provided information
                  </p>
                </div>
                
                {lastSubmittedBug?.confidence && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Confidence:</strong> {Math.round(lastSubmittedBug.confidence * 100)}%
                    </p>
                  </div>
                )}

                <button
                  onClick={handleSubmitAnother}
                  className="w-full mt-4 btn-secondary"
                >
                  Submit Another Bug
                </button>
              </div>
            )}

            {/* Guidelines */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Reporting Guidelines
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-900">Critical Issues:</h4>
                  <p>System crashes, data loss, security vulnerabilities</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">High Priority:</h4>
                  <p>Major functionality broken, affects many users</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Medium Priority:</h4>
                  <p>Feature issues, minor functionality problems</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Low Priority:</h4>
                  <p>Cosmetic issues, enhancement requests</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                💡 Tips for Better Reports
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Be specific and descriptive in your title</li>
                <li>• Include steps to reproduce the issue</li>
                <li>• Mention expected vs actual behavior</li>
                <li>• Provide error logs when available</li>
                <li>• Select the most accurate module and frequency</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Submission Summary */}
        {lastSubmittedBug && (
          <div className="mt-8 card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
               Successfully Submitted
            </h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-green-900">{lastSubmittedBug.title}</h4>
                  <p className="text-sm text-green-700 mt-1">
                    {lastSubmittedBug.module} • {lastSubmittedBug.frequency} • {lastSubmittedBug.user_type}
                  </p>
                </div>
                <PriorityTag priority={lastSubmittedBug.priority} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportBug;