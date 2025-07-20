import React from 'react';

const PriorityTag = ({ priority, size = 'medium' }) => {
  const getPriorityStyles = (priority) => {
    const normalizedPriority = priority?.toLowerCase();
    
    switch (normalizedPriority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case 'small':
        return 'px-2 py-1 text-xs';
      case 'large':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1.5 text-sm';
    }
  };

  if (!priority) {
    return (
      <span className={`inline-flex items-center rounded-full border font-medium bg-gray-100 text-gray-500 border-gray-200 ${getSizeClasses(size)}`}>
        Unknown
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${getPriorityStyles(priority)} ${getSizeClasses(size)}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

export default PriorityTag;