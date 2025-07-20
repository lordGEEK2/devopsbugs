import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BugTable from '../components/BugTable';
import { bugAPI } from '../api/bugAPI';

const Home = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  });

  // Load bugs on component mount
  useEffect(() => {
    loadBugs();
  }, []);

  const loadBugs = async () => {
    setLoading(true);
    try {
      const response = await bugAPI.getAllBugs();
      
      // Handle case where response might be an array or object with data property
      const bugData = Array.isArray(response) ? response : response.bugs || [];
      setBugs(bugData);
      
      // Calculate stats
      const newStats = {
        total: bugData.length,
        critical: bugData.filter(bug => bug.priority?.toLowerCase() === 'critical').length,
        high: bugData.filter(bug => bug.priority?.toLowerCase() === 'high').length,
        medium: bugData.filter(bug => bug.priority?.toLowerCase() === 'medium').length,
        low: bugData.filter(bug => bug.priority?.toLowerCase() === 'low').length
      };
      setStats(newStats);
      
    } catch (error) {
      console.error('Error loading bugs:', error);
      // If API fails, show with mock data for demo
      if (error.message.includes('Failed to fetch')) {
        const mockBugs = [
          {
            id: 1,
            title: "Login button not responding on mobile",
            description: "Users are unable to tap the login button on iOS Safari. The button appears to be unresponsive to touch events.",
            module: "Authentication",
            frequency: "Often",
            user_type: "End User",
            priority: "high",
            logs: "TypeError: Cannot read property 'addEventListener' of null"
          },
          {
            id: 2,
            title: "Database connection timeout",
            description: "Random database connection timeouts causing 500 errors during peak hours. Affects approximately 15% of requests.",
            module: "Database",
            frequency: "Sometimes",
            user_type: "Developer",
            priority: "critical",
            logs: "Connection timeout after 30s"
          },
          {
            id: 3,
            title: "Minor UI alignment issue in sidebar",
            description: "The sidebar navigation menu has a slight alignment issue on screens smaller than 1024px width.",
            module: "Frontend",
            frequency: "Always",
            user_type: "End User",
            priority: "low",
            logs: ""
          }
        ];
        
        setBugs(mockBugs);
        setStats({
          total: 3,
          critical: 1,
          high: 1,
          medium: 0,
          low: 1
        });
        
        toast.info('Using demo data - API connection failed');
      } else {
        toast.error('Failed to load bug reports');
      }
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, color, bgColor }) => (
    <div className={`${bgColor} rounded-lg p-6`}>
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                DevOps Bug Prioritizer
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                AI-powered bug tracking and priority assessment
              </p>
            </div>
            <Link
              to="/report"
              className="btn-primary"
            >
              + Report New Bug
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <StatCard
            title="Total Bugs"
            value={stats.total}
            color="text-gray-900"
            bgColor="bg-white"
          />
          <StatCard
            title="Critical"
            value={stats.critical}
            color="text-red-600"
            bgColor="bg-red-50"
          />
          <StatCard
            title="High"
            value={stats.high}
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
          <StatCard
            title="Medium"
            value={stats.medium}
            color="text-yellow-600"
            bgColor="bg-yellow-50"
          />
          <StatCard
            title="Low"
            value={stats.low}
            color="text-green-600"
            bgColor="bg-green-50"
          />
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Bug Reports
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={loadBugs}
              className="btn-secondary flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
              ) : (
                <span>🔄</span>
              )}
              Refresh
            </button>
          </div>
        </div>

        {/* Bug Table */}
        <BugTable bugs={bugs} loading={loading} />

        {/* Empty State */}
        {!loading && bugs.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No bug reports yet
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by reporting your first bug to see AI-powered priority predictions.
            </p>
            <Link
              to="/report"
              className="btn-primary"
            >
              Report Your First Bug
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            DevOps Bug Prioritizer uses AI to automatically assess bug priority based on 
            title, description, module, frequency, and user type.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;