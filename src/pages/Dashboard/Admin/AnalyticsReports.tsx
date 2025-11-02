import { useState } from 'react';
import { 
  DocsIcon,
  UserIcon,
  GroupIcon,
  BoxIconLine,
  PieChartIcon
} from '../../../icons';

interface AnalyticsData {
  period: string;
  totalSubmissions: number;
  approvedSubmissions: number;
  pendingSubmissions: number;
  rejectedSubmissions: number;
  totalUsers: number;
  activeUsers: number;
  organizationActivity: number;
}

interface OrganizationStats {
  name: string;
  acronym: string;
  submissions: number;
  approvalRate: number;
  avgProcessingTime: number;
  lastActivity: string;
}

const AnalyticsReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedReport, setSelectedReport] = useState<'overview' | 'submissions' | 'users' | 'organizations'>('overview');

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    period: selectedPeriod,
    totalSubmissions: 156,
    approvedSubmissions: 134,
    pendingSubmissions: 15,
    rejectedSubmissions: 7,
    totalUsers: 1247,
    activeUsers: 892,
    organizationActivity: 87
  };

  const organizationStats: OrganizationStats[] = [
    {
      name: 'Alliance of Computer Engineering Students',
      acronym: 'ACES',
      submissions: 28,
      approvalRate: 92.8,
      avgProcessingTime: 2.3,
      lastActivity: '2025-11-02'
    },
    {
      name: 'Integrated Students in IT Education',
      acronym: 'iSITE',
      submissions: 35,
      approvalRate: 88.6,
      avgProcessingTime: 1.8,
      lastActivity: '2025-11-01'
    },
    {
      name: 'Association of Future Teachers',
      acronym: 'AFT',
      submissions: 22,
      approvalRate: 95.5,
      avgProcessingTime: 2.1,
      lastActivity: '2025-10-30'
    },
    {
      name: 'Chamber of Entrepreneurs and Managers',
      acronym: 'CEM',
      submissions: 31,
      approvalRate: 87.1,
      avgProcessingTime: 2.8,
      lastActivity: '2025-11-02'
    }
  ];

  const submissionTrends = [
    { month: 'Jul', submissions: 42, approved: 38, rejected: 4 },
    { month: 'Aug', submissions: 56, approved: 48, rejected: 8 },
    { month: 'Sep', submissions: 38, approved: 35, rejected: 3 },
    { month: 'Oct', submissions: 67, approved: 58, rejected: 9 },
    { month: 'Nov', submissions: 45, approved: 41, rejected: 4 }
  ];

  const approvalRate = (analyticsData.approvedSubmissions / analyticsData.totalSubmissions * 100).toFixed(1);
  const rejectionRate = (analyticsData.rejectedSubmissions / analyticsData.totalSubmissions * 100).toFixed(1);
  const pendingRate = (analyticsData.pendingSubmissions / analyticsData.totalSubmissions * 100).toFixed(1);

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    // Mock export functionality
    alert(`Exporting ${selectedReport} report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics & Reports
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive transparency reporting and system analytics
        </p>
      </div>

      {/* Controls */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as typeof selectedPeriod)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Report Type
              </label>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value as typeof selectedReport)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="overview">Overview</option>
                <option value="submissions">Submissions</option>
                <option value="users">Users</option>
                <option value="organizations">Organizations</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => exportReport('pdf')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Export PDF
            </button>
            <button
              onClick={() => exportReport('excel')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Export Excel
            </button>
            <button
              onClick={() => exportReport('csv')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center">
            <DocsIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Submissions</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{analyticsData.totalSubmissions}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center">
            <BoxIconLine className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Approval Rate</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{approvalRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center">
            <UserIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Active Users</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{analyticsData.activeUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center">
            <GroupIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Org Activity</p>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{analyticsData.organizationActivity}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Submission Status Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Submission Status Distribution
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Approved</span>
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {analyticsData.approvedSubmissions} ({approvalRate}%)
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Pending</span>
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {analyticsData.pendingSubmissions} ({pendingRate}%)
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Rejected</span>
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {analyticsData.rejectedSubmissions} ({rejectionRate}%)
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Submission Trends */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Submission Trends
          </h3>
          <div className="space-y-3">
            {submissionTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{trend.month}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-green-600 dark:text-green-400">✓ {trend.approved}</span>
                  <span className="text-sm text-red-600 dark:text-red-400">✗ {trend.rejected}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{trend.submissions}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Organization Performance Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Organization Performance
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Detailed submission and approval statistics by organization
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Submissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Approval Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Avg Processing Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {organizationStats.map((org, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {org.acronym}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {org.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {org.submissions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      org.approvalRate >= 90 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : org.approvalRate >= 80
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {org.approvalRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {org.avgProcessingTime} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(org.lastActivity).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div 
                          className={`h-2 rounded-full ${
                            org.approvalRate >= 90 ? 'bg-green-600' : 
                            org.approvalRate >= 80 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${org.approvalRate}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {org.approvalRate >= 90 ? 'Excellent' : 
                         org.approvalRate >= 80 ? 'Good' : 'Needs Improvement'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transparency Metrics */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center mb-4">
          <PieChartIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Transparency Metrics
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {((analyticsData.approvedSubmissions + analyticsData.rejectedSubmissions) / analyticsData.totalSubmissions * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Processing Completion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">2.3</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Average Processing Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">98.2%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">System Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;