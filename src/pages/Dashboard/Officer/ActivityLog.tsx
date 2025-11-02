import React, { useState } from 'react';
import PageMeta from '../../../components/common/PageMeta';

const ActivityLog: React.FC = () => {
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('7');

  const activities = [
    {
      id: 1,
      type: 'submission',
      title: 'Document Submitted',
      description: 'Monthly Budget Report - October 2024 submitted for review',
      user: 'You',
      timestamp: '2024-10-31T14:30:00Z',
      details: {
        documentTitle: 'Monthly Budget Report - October 2024',
        category: 'Financial Report',
        reviewer: 'Admin Department'
      },
      icon: 'upload',
      color: 'blue'
    },
    {
      id: 2,
      type: 'approval',
      title: 'Document Approved',
      description: 'Equipment Purchase Receipt - Laptops has been approved',
      user: 'Finance Team',
      timestamp: '2024-10-30T16:45:00Z',
      details: {
        documentTitle: 'Equipment Purchase Receipt - Laptops',
        approver: 'Finance Team',
        comments: 'All documentation is complete and accurate.'
      },
      icon: 'check',
      color: 'green'
    },
    {
      id: 3,
      type: 'comment',
      title: 'Review Comment Added',
      description: 'New comment on Monthly Budget Report - October 2024',
      user: 'Admin Department',
      timestamp: '2024-10-30T11:15:00Z',
      details: {
        documentTitle: 'Monthly Budget Report - October 2024',
        comment: 'Please provide additional breakdown for Q4 projections.',
        commenter: 'Admin Department'
      },
      icon: 'message',
      color: 'yellow'
    },
    {
      id: 4,
      type: 'download',
      title: 'Document Downloaded',
      description: 'You downloaded Quarterly Performance Report Q3',
      user: 'You',
      timestamp: '2024-10-29T09:20:00Z',
      details: {
        documentTitle: 'Quarterly Performance Report Q3',
        fileSize: '2.4 MB',
        format: 'PDF'
      },
      icon: 'download',
      color: 'indigo'
    },
    {
      id: 5,
      type: 'rejection',
      title: 'Document Rejected',
      description: 'Travel Expense Report - Conference has been rejected',
      user: 'Accounting',
      timestamp: '2024-10-27T13:30:00Z',
      details: {
        documentTitle: 'Travel Expense Report - Conference',
        rejector: 'Accounting',
        reason: 'Missing required receipts for hotel accommodation'
      },
      icon: 'x',
      color: 'red'
    },
    {
      id: 6,
      type: 'edit',
      title: 'Document Updated',
      description: 'You updated Travel Expense Report - Conference',
      user: 'You',
      timestamp: '2024-10-25T10:45:00Z',
      details: {
        documentTitle: 'Travel Expense Report - Conference',
        changes: 'Added additional receipts and expense breakdown'
      },
      icon: 'edit',
      color: 'purple'
    },
    {
      id: 7,
      type: 'submission',
      title: 'Document Submitted',
      description: 'Travel Expense Report - Conference submitted for review',
      user: 'You',
      timestamp: '2024-10-25T08:00:00Z',
      details: {
        documentTitle: 'Travel Expense Report - Conference',
        category: 'Expense Report',
        reviewer: 'Accounting'
      },
      icon: 'upload',
      color: 'blue'
    },
    {
      id: 8,
      type: 'approval',
      title: 'Document Approved',
      description: 'Quarterly Performance Report Q3 has been approved',
      user: 'Management',
      timestamp: '2024-10-22T15:20:00Z',
      details: {
        documentTitle: 'Quarterly Performance Report Q3',
        approver: 'Management',
        comments: 'Excellent work on meeting all quarterly targets.'
      },
      icon: 'check',
      color: 'green'
    },
    {
      id: 9,
      type: 'comment',
      title: 'Review Comment Added',
      description: 'New comment on Quarterly Performance Report Q3',
      user: 'Management',
      timestamp: '2024-10-21T14:10:00Z',
      details: {
        documentTitle: 'Quarterly Performance Report Q3',
        comment: 'Please clarify the variance in customer satisfaction metrics.',
        commenter: 'Management'
      },
      icon: 'message',
      color: 'yellow'
    },
    {
      id: 10,
      type: 'submission',
      title: 'Document Submitted',
      description: 'Quarterly Performance Report Q3 submitted for review',
      user: 'You',
      timestamp: '2024-10-20T16:30:00Z',
      details: {
        documentTitle: 'Quarterly Performance Report Q3',
        category: 'Performance Report',
        reviewer: 'Management'
      },
      icon: 'upload',
      color: 'blue'
    },
    {
      id: 11,
      type: 'system',
      title: 'Account Settings Updated',
      description: 'You updated your notification preferences',
      user: 'You',
      timestamp: '2024-10-18T12:00:00Z',
      details: {
        setting: 'Notification Preferences',
        changes: 'Enabled email notifications for approvals'
      },
      icon: 'settings',
      color: 'gray'
    },
    {
      id: 12,
      type: 'approval',
      title: 'Document Approved',
      description: 'Annual Audit Report 2024 has been approved',
      user: 'Audit Committee',
      timestamp: '2024-10-17T11:45:00Z',
      details: {
        documentTitle: 'Annual Audit Report 2024',
        approver: 'Audit Committee',
        comments: 'Report is comprehensive and meets all regulatory requirements.'
      },
      icon: 'check',
      color: 'green'
    }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'submission', label: 'Submissions' },
    { value: 'approval', label: 'Approvals' },
    { value: 'rejection', label: 'Rejections' },
    { value: 'comment', label: 'Comments' },
    { value: 'download', label: 'Downloads' },
    { value: 'edit', label: 'Edits' },
    { value: 'system', label: 'System' }
  ];

  const dateRangeOptions = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 3 months' },
    { value: 'all', label: 'All time' }
  ];

  const getFilteredActivities = () => {
    let filtered = activities;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(activity => activity.type === filterType);
    }

    // Filter by date range
    if (dateRange !== 'all') {
      const daysAgo = parseInt(dateRange);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
      
      filtered = filtered.filter(activity => 
        new Date(activity.timestamp) >= cutoffDate
      );
    }

    return filtered;
  };

  const filteredActivities = getFilteredActivities();

  const getActivityIcon = (type: string, color: string) => {
    const iconClass = `w-5 h-5 text-${color}-600`;
    
    switch (type) {
      case 'upload':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      case 'check':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'x':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'message':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'download':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'edit':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case 'settings':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const getActivitySummary = () => {
    const summary = {
      total: filteredActivities.length,
      submissions: filteredActivities.filter(a => a.type === 'submission').length,
      approvals: filteredActivities.filter(a => a.type === 'approval').length,
      rejections: filteredActivities.filter(a => a.type === 'rejection').length,
      comments: filteredActivities.filter(a => a.type === 'comment').length
    };
    return summary;
  };

  const summary = getActivitySummary();

  return (
    <>
      <PageMeta 
        title="Activity Log | PUPSMB TransparaTech" 
        description="View detailed activity log of all document submissions and system interactions"
      />
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Activity Log
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track all your activities and system interactions
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.total}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Activities</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{summary.submissions}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Submissions</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{summary.approvals}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Approvals</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{summary.rejections}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Rejections</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{summary.comments}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Comments</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Activity Type
              </label>
              <select
                id="type-filter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Range
              </label>
              <select
                id="date-range"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Activity Timeline ({filteredActivities.length})
            </h2>
          </div>
          
          <div className="p-6">
            {filteredActivities.length > 0 ? (
              <div className="space-y-6">
                {filteredActivities.map((activity, index) => (
                  <div key={activity.id} className="relative">
                    {/* Timeline line */}
                    {index < filteredActivities.length - 1 && (
                      <div className="absolute left-5 top-12 w-0.5 h-16 bg-gray-200 dark:bg-gray-600"></div>
                    )}
                    
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-10 h-10 bg-${activity.color}-100 dark:bg-${activity.color}-900 rounded-full flex items-center justify-center flex-shrink-0`}>
                        {getActivityIcon(activity.icon, activity.color)}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                              {activity.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                              {activity.description}
                            </p>
                            
                            {/* Activity Details */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-3">
                              {Object.entries(activity.details).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center py-1">
                                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                                  </span>
                                  <span className="text-sm text-gray-900 dark:text-white">
                                    {value}
                                  </span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <span>{activity.user}</span>
                              <span>•</span>
                              <span>{formatTimestamp(activity.timestamp)}</span>
                              <span>•</span>
                              <span className="capitalize">{activity.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No activities found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No activities match your current filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityLog;