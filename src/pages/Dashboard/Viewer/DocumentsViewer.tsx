import React from 'react';
import PageMeta from '../../../components/common/PageMeta';

const DocumentsViewer: React.FC = () => {
  const documents = [
    {
      id: 1,
      title: "Annual Financial Report 2024",
      category: "Financial",
      uploadDate: "2024-01-15",
      size: "2.3 MB",
      type: "PDF",
      description: "Comprehensive financial overview for fiscal year 2024"
    },
    {
      id: 2,
      title: "Budget Allocation Summary",
      category: "Budget",
      uploadDate: "2024-01-10",
      size: "1.8 MB",
      type: "PDF",
      description: "Detailed breakdown of budget allocations across departments"
    },
    {
      id: 3,
      title: "Procurement Guidelines",
      category: "Policy",
      uploadDate: "2024-01-08",
      size: "950 KB",
      type: "PDF",
      description: "Updated procurement policies and procedures"
    },
    {
      id: 4,
      title: "Performance Metrics Q4 2023",
      category: "Performance",
      uploadDate: "2024-01-05",
      size: "1.5 MB",
      type: "PDF",
      description: "Quarterly performance indicators and achievements"
    },
    {
      id: 5,
      title: "Organizational Structure",
      category: "Administrative",
      uploadDate: "2024-01-03",
      size: "720 KB",
      type: "PDF",
      description: "Current organizational chart and reporting structure"
    },
    {
      id: 6,
      title: "Audit Report 2023",
      category: "Audit",
      uploadDate: "2023-12-28",
      size: "3.1 MB",
      type: "PDF",
      description: "Annual audit findings and recommendations"
    }
  ];

  const categories = ["All", "Financial", "Budget", "Policy", "Performance", "Administrative", "Audit"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredDocuments = selectedCategory === "All" 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

  return (
    <>
      <PageMeta 
        title="View Documents | PUPSMB TransparaTech" 
        description="Access and download official documents and reports from PUPSMB TransparaTech"
      />
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Document Library
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Access and download official documents and reports
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <div
              key={document.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-red-600 dark:text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  document.category === 'Financial' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  document.category === 'Budget' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  document.category === 'Policy' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                  document.category === 'Performance' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  document.category === 'Administrative' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {document.category}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {document.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {document.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>{document.uploadDate}</span>
                <span>{document.size}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {document.type}
                </span>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                    View
                  </button>
                  <button className="px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No documents found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No documents match your current filter criteria.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default DocumentsViewer;