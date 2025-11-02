import React from 'react';
import PageMeta from '../../../components/common/PageMeta';

const TransparencyReportViewer: React.FC = () => {
  const reports = [
    {
      id: 1,
      title: "Annual Transparency Report 2024",
      period: "January - December 2024",
      publishDate: "2024-01-30",
      status: "Published",
      summary: "Comprehensive annual report covering all transparency initiatives and accountability measures implemented throughout 2024.",
      downloads: 1247,
      size: "4.2 MB"
    },
    {
      id: 2,
      title: "Q4 2023 Transparency Update",
      period: "October - December 2023",
      publishDate: "2024-01-15",
      status: "Published",
      summary: "Quarterly transparency report highlighting key developments, policy changes, and public engagement activities.",
      downloads: 892,
      size: "2.8 MB"
    },
    {
      id: 3,
      title: "Q3 2023 Transparency Update",
      period: "July - September 2023",
      publishDate: "2023-10-15",
      status: "Published",
      summary: "Third quarter report detailing transparency measures, public consultation outcomes, and operational improvements.",
      downloads: 756,
      size: "2.4 MB"
    }
  ];

  const metrics = [
    {
      title: "Total Reports Published",
      value: "24",
      change: "+12%",
      changeType: "increase",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Public Requests Processed",
      value: "156",
      change: "+18%",
      changeType: "increase",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Average Response Time",
      value: "3.2 days",
      change: "-24%",
      changeType: "decrease",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Transparency Score",
      value: "94%",
      change: "+6%",
      changeType: "increase",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <PageMeta 
        title="Transparency Reports | PUPSMB TransparaTech" 
        description="Access comprehensive transparency reports and accountability metrics from PUPSMB TransparaTech"
      />
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Transparency Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive reports on transparency initiatives and accountability measures
          </p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {metric.icon}
                  </div>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  metric.changeType === 'increase' 
                    ? 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900' 
                    : 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {metric.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {metric.title}
              </p>
            </div>
          ))}
        </div>

        {/* Featured Report */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Latest Transparency Report</h2>
              <p className="text-blue-100 mb-4">
                Annual Transparency Report 2024 - Our most comprehensive report to date
              </p>
              <div className="flex items-center gap-4 text-sm text-blue-100">
                <span>Published: January 30, 2024</span>
                <span>•</span>
                <span>1,247 downloads</span>
                <span>•</span>
                <span>4.2 MB</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                View Report
              </button>
              <button className="border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              All Transparency Reports
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {reports.map((report) => (
              <div key={report.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {report.title}
                      </h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium rounded-full">
                        {report.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {report.summary}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                      <span>Period: {report.period}</span>
                      <span>Published: {report.publishDate}</span>
                      <span>{report.downloads} downloads</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 ml-6">
                    <button className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg transition-colors">
                      Preview
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Information Panel */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
                About Transparency Reports
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                Our transparency reports provide comprehensive insights into our organization's accountability measures, 
                public engagement activities, and commitment to open governance. These reports are published quarterly 
                and annually to ensure stakeholders have access to timely and accurate information about our operations, 
                decision-making processes, and performance metrics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransparencyReportViewer;