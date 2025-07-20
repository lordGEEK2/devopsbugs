import React, { useState } from 'react';
import Loader from './Loader';

const BugForm = ({ onSubmit, loading = false, predictedPriority = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    module: '',
    frequency: '',
    logs: '',
    user_type: ''
  });

  const [errors, setErrors] = useState({});

  const moduleOptions = [
    'Authentication',
    'Database',
    'API',
    'Frontend',
    'Backend',
    'Payment',
    'Notification',
    'Other'
  ];

  const frequencyOptions = [
    'Always',
    'Often',
    'Sometimes',
    'Rarely',
    'Once'
  ];

  const userTypeOptions = [
    'End User',
    'Developer',
    'Admin',
    'Tester',
    'Support'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.module.trim()) {
      newErrors.module = 'Module is required';
    }

    if (!formData.frequency.trim()) {
      newErrors.frequency = 'Frequency is required';
    }

    if (!formData.user_type.trim()) {
      newErrors.user_type = 'User type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      module: '',
      frequency: '',
      logs: '',
      user_type: ''
    });
    setErrors({});
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="form-label">
            Bug Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`form-input ${errors.title ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
            placeholder="Brief description of the issue"
            disabled={loading}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="form-label">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={`form-input ${errors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
            placeholder="Detailed description of the bug, steps to reproduce, expected vs actual behavior"
            disabled={loading}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Module */}
          <div>
            <label htmlFor="module" className="form-label">
              Module *
            </label>
            <select
              id="module"
              name="module"
              value={formData.module}
              onChange={handleInputChange}
              className={`form-input ${errors.module ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              disabled={loading}
            >
              <option value="">Select module</option>
              {moduleOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.module && (
              <p className="mt-1 text-sm text-red-600">{errors.module}</p>
            )}
          </div>

          {/* Frequency */}
          <div>
            <label htmlFor="frequency" className="form-label">
              Frequency *
            </label>
            <select
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleInputChange}
              className={`form-input ${errors.frequency ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              disabled={loading}
            >
              <option value="">Select frequency</option>
              {frequencyOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.frequency && (
              <p className="mt-1 text-sm text-red-600">{errors.frequency}</p>
            )}
          </div>
        </div>

        {/* User Type */}
        <div>
          <label htmlFor="user_type" className="form-label">
            User Type *
          </label>
          <select
            id="user_type"
            name="user_type"
            value={formData.user_type}
            onChange={handleInputChange}
            className={`form-input ${errors.user_type ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
            disabled={loading}
          >
            <option value="">Select user type</option>
            {userTypeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.user_type && (
            <p className="mt-1 text-sm text-red-600">{errors.user_type}</p>
          )}
        </div>

        {/* Logs */}
        <div>
          <label htmlFor="logs" className="form-label">
            Error Logs (Optional)
          </label>
          <textarea
            id="logs"
            name="logs"
            value={formData.logs}
            onChange={handleInputChange}
            rows={3}
            className="form-input"
            placeholder="Relevant error logs, stack traces, or console outputs"
            disabled={loading}
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={resetForm}
            className="btn-secondary"
            disabled={loading}
          >
            Reset Form
          </button>
          
          <button
            type="submit"
            className="btn-primary flex items-center gap-2"
            disabled={loading}
          >
            {loading && <Loader size="small" text="" />}
            {loading ? 'Analyzing...' : 'Submit Bug Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BugForm;