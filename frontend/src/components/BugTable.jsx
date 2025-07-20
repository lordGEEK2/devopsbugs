import React, { useState, useMemo } from 'react';
import PriorityTag from './PriorityTag';

const BugTable = ({ bugs = [], loading = false }) => {
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterText, setFilterText] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Filter and sort bugs
  const filteredAndSortedBugs = useMemo(() => {
    let filtered = bugs.filter(bug => {
      const matchesText = !filterText || 
        bug.title?.toLowerCase().includes(filterText.toLowerCase()) ||
        bug.description?.toLowerCase().includes(filterText.toLowerCase()) ||
        bug.module?.toLowerCase().includes(filterText.toLowerCase());
      
      const matchesPriority = !priorityFilter || 
        bug.priority?.toLowerCase() === priorityFilter.toLowerCase();
      
      return matchesText && matchesPriority;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aVal = a[sortField] || '';
        let bVal = b[sortField] || '';
        
        // Special handling for priority sorting
        if (sortField === 'priority') {
          const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
          aVal = priorityOrder[aVal?.toLowerCase()] || 0;
          bVal = priorityOrder[bVal?.toLowerCase()] || 0;
        }
        
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        
        if (sortDirection === 'asc') {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [bugs, filterText, priorityFilter, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return '↕️';
    }
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading bug reports...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Filters */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by title, description, or module..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="md:w-48">
            <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Priority
            </label>
            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="form-input"
            >
              <option value="">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAndSortedBugs.length} of {bugs.length} bug reports
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                onClick={() => handleSort('title')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Title</span>
                  <span className="text-gray-400">{getSortIcon('title')}</span>
                </div>
              </th>
              <th 
                onClick={() => handleSort('module')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Module</span>
                  <span className="text-gray-400">{getSortIcon('module')}</span>
                </div>
              </th>
              <th 
                onClick={() => handleSort('frequency')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Frequency</span>
                  <span className="text-gray-400">{getSortIcon('frequency')}</span>
                </div>
              </th>
              <th 
                onClick={() => handleSort('user_type')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>User Type</span>
                  <span className="text-gray-400">{getSortIcon('user_type')}</span>
                </div>
              </th>
              <th 
                onClick={() => handleSort('priority')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>Priority</span>
                  <span className="text-gray-400">{getSortIcon('priority')}</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedBugs.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                  {bugs.length === 0 
                    ? "No bug reports found. Start by reporting your first bug!" 
                    : "No bugs match your current filters."
                  }
                </td>
              </tr>
            ) : (
              filteredAndSortedBugs.map((bug, index) => (
                <tr key={bug.id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {bug.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {bug.module}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bug.frequency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bug.user_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PriorityTag priority={bug.priority} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                    <div title={bug.description}>
                      {truncateText(bug.description)}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BugTable;