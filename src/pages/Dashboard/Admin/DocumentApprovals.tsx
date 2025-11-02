import React, { useState } from 'react';
import PageMeta from '../../../components/common/PageMeta';

const DocumentApprovals: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('pending');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const submissions = [
    {
      id: 1,
      title: "Monthly Budget Report - October 2024",
      description: "Comprehensive monthly budget analysis including variance reports and Q4 projections for Student Council operations.",
      officer: "John Doe",
      organization: "Student Council",
      category: "Financial Report",
      submittedDate: "2024-11-01T10:30:00Z",
      priority: "high",
      status: "pending",
      files: ["budget_report_oct.pdf", "supporting_data.xlsx", "variance_analysis.docx"],
      estimatedReviewTime: "2-3 hours",
      comments: []
    },
    {
      id: 2,
      title: "Equipment Purchase Receipt - Laptops",
      description: "Purchase receipt and warranty documentation for 5 new laptops acquired for the Engineering Club development team.",
      officer: "Jane Smith",
      organization: "Engineering Club", 
      category: "Purchase Receipt",
      submittedDate: "2024-10-31T14:15:00Z",
      priority: "medium",
      status: "pending",
      files: ["laptop_receipt.pdf", "warranty_docs.pdf"],
      estimatedReviewTime: "30-45 minutes",
      comments: []
    },
    {
      id: 3,
      title: "Event Expense Report - Cultural Festival",
      description: "Complete expense breakdown for the annual cultural festival including vendor payments, equipment rental, and logistics costs.",
      officer: "Mike Johnson",
      organization: "Drama Society",
      category: "Event Expense",
      submittedDate: "2024-10-30T16:45:00Z",
      priority: "low",
      status: "pending",
      files: ["festival_expenses.pdf", "vendor_receipts.zip"],
      estimatedReviewTime: "1-2 hours",
      comments: []
    },
    {
      id: 4,
      title: "Training Workshop Receipt",
      description: "Receipt and documentation for leadership training workshop attended by organization officers.",
      officer: "Sarah Wilson",
      organization: "Student Government",
      category: "Training Expense",
      submittedDate: "2024-10-29T09:20:00Z",
      priority: "medium",
      status: "approved",
      files: ["training_receipt.pdf", "certificate.pdf"],
      estimatedReviewTime: "30 minutes",
      reviewedBy: "Admin Team",
      reviewedDate: "2024-10-30T11:00:00Z",
      comments: [
        {
          id: 1,
          author: "Admin Team",
          content: "All documentation complete. Training aligns with organizational development goals.",
          timestamp: "2024-10-30T11:00:00Z"
        }
      ]
    },
    {
      id: 5,
      title: "Office Supplies Purchase Order",
      description: "Purchase order for standard office supplies including stationery, printer cartridges, and organizational materials.",
      officer: "David Brown",
      organization: "Environmental Club",
      category: "Office Supplies",
      submittedDate: "2024-10-28T13:30:00Z",
      priority: "low",
      status: "rejected",
      files: ["purchase_order.pdf"],
      estimatedReviewTime: "15-20 minutes",
      reviewedBy: "Finance Admin",
      reviewedDate: "2024-10-29T10:15:00Z",
      rejectionReason: "Vendor not in approved supplier list. Please resubmit with approved vendor.",
      comments: [
        {
          id: 1,
          author: "Finance Admin",
          content: "Please use one of our pre-approved office supply vendors. Contact procurement for the approved vendor list.",
          timestamp: "2024-10-29T10:15:00Z"
        }
      ]
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const filteredSubmissions = submissions.filter(submission => {
    const matchesStatus = filterStatus === 'all' || submission.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || submission.priority === filterPriority;
    const matchesSearch = submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.officer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleApprove = (submissionId: number) => {
    console.log('Approving submission:', submissionId);
    // Here you would implement the approval logic
  };

  const handleReject = (submissionId: number) => {
    console.log('Rejecting submission:', submissionId);
    // Here you would implement the rejection logic
  };

  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const approvedCount = submissions.filter(s => s.status === 'approved').length;
  const rejectedCount = submissions.filter(s => s.status === 'rejected').length;

  return (
    <>
      <PageMeta 
        title="Document Queue / Approvals | PUPSMB TransparaTech" 
        description="Review and approve document submissions from officers"
      />
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Document Queue / Approvals
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review, approve, or reject document submissions from officers
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Approved</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{approvedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Rejected</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{rejectedCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search submissions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
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

            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Submissions ({filteredSubmissions.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredSubmissions.map((submission) => (
              <div key={submission.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {submission.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(submission.status)}`}>
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(submission.priority)}`}>
                        {submission.priority.charAt(0).toUpperCase() + submission.priority.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {submission.description}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div>
                        <span className="font-medium">Officer:</span>
                        <br />
                        {submission.officer}
                      </div>
                      <div>
                        <span className="font-medium">Organization:</span>
                        <br />
                        {submission.organization}
                      </div>
                      <div>
                        <span className="font-medium">Category:</span>
                        <br />
                        {submission.category}
                      </div>
                      <div>
                        <span className="font-medium">Est. Review Time:</span>
                        <br />
                        {submission.estimatedReviewTime}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span>Submitted: {formatDate(submission.submittedDate)}</span>
                      {submission.reviewedDate && (
                        <>
                          <span>•</span>
                          <span>Reviewed: {formatDate(submission.reviewedDate)}</span>
                          <span>•</span>
                          <span>By: {submission.reviewedBy}</span>
                        </>
                      )}
                    </div>

                    {submission.rejectionReason && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-3">
                        <p className="text-sm text-red-800 dark:text-red-200">
                          <strong>Rejection Reason:</strong> {submission.rejectionReason}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-3">
                      {submission.files.map((file, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800"
                        >
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          {file}
                        </span>
                      ))}
                    </div>

                    {submission.comments.length > 0 && (
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Comments:
                        </h4>
                        {submission.comments.map((comment) => (
                          <div key={comment.id} className="mb-2 last:mb-0">
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                              <span className="font-medium">{comment.author}</span>
                              <span>•</span>
                              <span>{formatDate(comment.timestamp)}</span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-6">
                    <button className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded transition-colors text-sm border border-blue-200 dark:border-blue-800">
                      View Details
                    </button>
                    {submission.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleApprove(submission.id)}
                          className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded transition-colors text-sm"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleReject(submission.id)}
                          className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded transition-colors text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSubmissions.length === 0 && (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No submissions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No submissions match your current filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DocumentApprovals;