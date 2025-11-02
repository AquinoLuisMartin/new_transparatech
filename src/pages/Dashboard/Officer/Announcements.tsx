import React, { useState } from 'react';
import PageMeta from '../../../components/common/PageMeta';

const Announcements: React.FC = () => {
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const announcements = [
    {
      id: 1,
      title: "New Document Submission Guidelines Effective November 1, 2024",
      content: "Please note that starting November 1, 2024, all financial reports must include digital signatures and be submitted in PDF format only. Excel files will no longer be accepted for financial documents. Additionally, all expense reports must include scanned copies of original receipts. For assistance with digital signatures, please contact the IT support team.",
      category: "Policy Update",
      priority: "urgent",
      author: "Admin Department",
      publishedDate: "2024-10-30T10:00:00Z",
      readBy: 156,
      totalRecipients: 200,
      tags: ["policy", "documents", "financial"],
      attachments: [
        "Document_Submission_Guidelines_v2.pdf",
        "Digital_Signature_Tutorial.pdf"
      ],
      isPinned: true
    },
    {
      id: 2,
      title: "System Maintenance Scheduled for November 3, 2024",
      content: "The TransparaTech system will undergo scheduled maintenance on November 3, 2024, from 2:00 AM to 6:00 AM PST. During this time, the system will be unavailable. Please plan your submissions accordingly and ensure all urgent documents are submitted before the maintenance window. We apologize for any inconvenience this may cause.",
      category: "System Notice",
      priority: "high",
      author: "IT Department",
      publishedDate: "2024-10-29T14:30:00Z",
      readBy: 142,
      totalRecipients: 200,
      tags: ["maintenance", "system", "downtime"],
      attachments: [],
      isPinned: true
    },
    {
      id: 3,
      title: "Q4 Budget Planning Documents Now Available",
      content: "The Q4 budget planning templates and guidelines are now available for download. All departments are required to submit their budget proposals by November 15, 2024. The templates include sections for personnel costs, operational expenses, and capital expenditures. Training sessions on the new budget format will be held next week.",
      category: "Finance",
      priority: "high",
      author: "Finance Department",
      publishedDate: "2024-10-28T09:15:00Z",
      readBy: 89,
      totalRecipients: 200,
      tags: ["budget", "planning", "finance", "Q4"],
      attachments: [
        "Q4_Budget_Template.xlsx",
        "Budget_Planning_Guidelines.pdf"
      ],
      isPinned: false
    },
    {
      id: 4,
      title: "New User Training Sessions Available",
      content: "We are pleased to announce new user training sessions for the TransparaTech platform. These sessions will cover document submission best practices, system navigation, and advanced features. Sessions are available every Tuesday and Thursday at 2:00 PM in the training room. To register, please contact the training coordinator.",
      category: "Training",
      priority: "medium",
      author: "Training Department",
      publishedDate: "2024-10-27T11:00:00Z",
      readBy: 67,
      totalRecipients: 200,
      tags: ["training", "education", "sessions"],
      attachments: [
        "Training_Schedule.pdf"
      ],
      isPinned: false
    },
    {
      id: 5,
      title: "Updated Contact Information for Support Services",
      content: "Please note that our support team contact information has been updated. For technical issues, please email support@pupsmb-tech.edu.ph or call (02) 8123-4567. For document-related queries, contact documents@pupsmb-tech.edu.ph. Our support hours are Monday to Friday, 8:00 AM to 5:00 PM.",
      category: "Contact Update",
      priority: "medium",
      author: "Admin Department",
      publishedDate: "2024-10-25T16:45:00Z",
      readBy: 134,
      totalRecipients: 200,
      tags: ["contact", "support", "information"],
      attachments: [],
      isPinned: false
    },
    {
      id: 6,
      title: "Reminder: Monthly Report Submission Deadline",
      content: "This is a reminder that all monthly reports for October 2024 are due by October 31, 2024, 11:59 PM. Late submissions will require approval from department heads. Please ensure all supporting documents are included with your submissions.",
      category: "Reminder",
      priority: "medium",
      author: "Admin Department",
      publishedDate: "2024-10-24T08:30:00Z",
      readBy: 178,
      totalRecipients: 200,
      tags: ["deadline", "reports", "monthly"],
      attachments: [],
      isPinned: false
    },
    {
      id: 7,
      title: "Security Enhancement: Two-Factor Authentication",
      content: "As part of our ongoing security improvements, two-factor authentication (2FA) will be mandatory for all users starting December 1, 2024. Setup instructions will be provided next week. Users are encouraged to set up 2FA early to ensure smooth transition.",
      category: "Security",
      priority: "high",
      author: "IT Security Team",
      publishedDate: "2024-10-22T13:20:00Z",
      readBy: 98,
      totalRecipients: 200,
      tags: ["security", "2FA", "authentication"],
      attachments: [
        "2FA_Setup_Guide.pdf"
      ],
      isPinned: false
    },
    {
      id: 8,
      title: "Holiday Schedule and System Availability",
      content: "Please be informed of the upcoming holiday schedule. The system will remain operational during holidays, but support services will have limited availability. Emergency contact information will be provided for urgent matters during holiday periods.",
      category: "Holiday Notice",
      priority: "low",
      author: "HR Department",
      publishedDate: "2024-10-20T15:10:00Z",
      readBy: 145,
      totalRecipients: 200,
      tags: ["holiday", "schedule", "availability"],
      attachments: [
        "Holiday_Schedule_2024.pdf"
      ],
      isPinned: false
    }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Policy Update', label: 'Policy Update' },
    { value: 'System Notice', label: 'System Notice' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Training', label: 'Training' },
    { value: 'Contact Update', label: 'Contact Update' },
    { value: 'Reminder', label: 'Reminder' },
    { value: 'Security', label: 'Security' },
    { value: 'Holiday Notice', label: 'Holiday Notice' }
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesPriority = filterPriority === 'all' || announcement.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || announcement.category === filterCategory;
    return matchesPriority && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return (
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'high':
        return (
          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'medium':
        return (
          <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
          </svg>
        );
      case 'low':
        return (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReadPercentage = (readBy: number, total: number) => {
    return Math.round((readBy / total) * 100);
  };

  // Separate pinned and regular announcements
  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.isPinned);
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.isPinned);

  return (
    <>
      <PageMeta 
        title="Announcements | PUPSMB TransparaTech" 
        description="Stay updated with the latest announcements and important information"
      />
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Announcements
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay updated with important news and system updates
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority
              </label>
              <select
                id="priority-filter"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                id="category-filter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pinned Announcements */}
        {pinnedAnnouncements.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Pinned Announcements
              </h2>
            </div>
            
            <div className="space-y-6">
              {pinnedAnnouncements.map((announcement) => (
                <div 
                  key={announcement.id} 
                  className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {announcement.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(announcement.priority)}`}>
                          <div className="flex items-center gap-1">
                            {getPriorityIcon(announcement.priority)}
                            {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                          </div>
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                          {announcement.category}
                        </span>
                        <span>By {announcement.author}</span>
                        <span>•</span>
                        <span>{formatDate(announcement.publishedDate)}</span>
                      </div>
                    </div>
                    
                    <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {announcement.content}
                  </p>
                  
                  {announcement.attachments.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Attachments:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {announcement.attachments.map((file, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm rounded-lg"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            {file}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {announcement.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {announcement.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{announcement.readBy} of {announcement.totalRecipients} read</span>
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${getReadPercentage(announcement.readBy, announcement.totalRecipients)}%` }}
                        ></div>
                      </div>
                      <span>{getReadPercentage(announcement.readBy, announcement.totalRecipients)}%</span>
                    </div>
                    
                    <button className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded transition-colors">
                      Mark as Read
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Announcements */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              All Announcements ({filteredAnnouncements.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {regularAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {announcement.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(announcement.priority)}`}>
                        <div className="flex items-center gap-1">
                          {getPriorityIcon(announcement.priority)}
                          {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                        </div>
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                        {announcement.category}
                      </span>
                      <span>By {announcement.author}</span>
                      <span>•</span>
                      <span>{formatDate(announcement.publishedDate)}</span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {announcement.content}
                    </p>
                    
                    {announcement.attachments.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-2">
                          {announcement.attachments.map((file, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                              </svg>
                              {file}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {announcement.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {announcement.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{announcement.readBy} of {announcement.totalRecipients} read</span>
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${getReadPercentage(announcement.readBy, announcement.totalRecipients)}%` }}
                      ></div>
                    </div>
                    <span>{getReadPercentage(announcement.readBy, announcement.totalRecipients)}%</span>
                  </div>
                  
                  <button className="px-3 py-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded transition-colors text-sm">
                    Mark as Read
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredAnnouncements.length === 0 && (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1h-1v11a3 3 0 01-3 3H7a3 3 0 01-3-3V7H3a1 1 0 01-1-1V5a1 1 0 011-1h4z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No announcements found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No announcements match your current filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Announcements;