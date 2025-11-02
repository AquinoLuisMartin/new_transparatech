import React from 'react';
import PageMeta from '../../../components/common/PageMeta';

const AnnouncementsViewer: React.FC = () => {
  const announcements = [
    {
      id: 1,
      title: "New Transparency Portal Launch",
      category: "System Update",
      priority: "high",
      publishDate: "2024-02-01",
      author: "System Administrator",
      content: "We are excited to announce the launch of our new transparency portal. This enhanced platform provides better access to public information, improved search functionality, and a more user-friendly interface for all stakeholders.",
      isSticky: true,
      views: 2341,
      tags: ["Portal", "Enhancement", "Public Access"]
    },
    {
      id: 2,
      title: "Q1 2024 Budget Review Session",
      category: "Meeting",
      priority: "medium",
      publishDate: "2024-01-28",
      author: "Finance Department",
      content: "Join us for the quarterly budget review session scheduled for February 15, 2024. We will discuss budget allocations, performance metrics, and upcoming financial initiatives. Public participation is encouraged.",
      isSticky: false,
      views: 1876,
      tags: ["Budget", "Review", "Public Meeting"]
    },
    {
      id: 3,
      title: "Updated Data Access Procedures",
      category: "Policy",
      priority: "medium",
      publishDate: "2024-01-25",
      author: "Policy Team",
      content: "New procedures for accessing public data have been implemented to ensure faster response times and improved service quality. Please review the updated guidelines in the documents section.",
      isSticky: false,
      views: 1432,
      tags: ["Policy", "Data Access", "Procedures"]
    },
    {
      id: 4,
      title: "Holiday Schedule - February 2024",
      category: "Schedule",
      priority: "low",
      publishDate: "2024-01-22",
      author: "Administration",
      content: "Please note the upcoming holiday schedule for February 2024. Offices will be closed on February 14 (Valentine's Day observed) and February 26 (National Holiday). Emergency services remain available.",
      isSticky: false,
      views: 987,
      tags: ["Holiday", "Schedule", "Office Hours"]
    },
    {
      id: 5,
      title: "Community Feedback Session Results",
      category: "Community",
      priority: "medium",
      publishDate: "2024-01-20",
      author: "Community Engagement",
      content: "Thank you to all participants in our recent community feedback session. We received valuable insights that will help shape our future transparency initiatives. A detailed report is now available in the documents section.",
      isSticky: false,
      views: 1654,
      tags: ["Community", "Feedback", "Engagement"]
    },
    {
      id: 6,
      title: "System Maintenance Notice",
      category: "Technical",
      priority: "high",
      publishDate: "2024-01-18",
      author: "IT Department",
      content: "Scheduled maintenance will be performed on January 22, 2024, from 2:00 AM to 6:00 AM. During this time, the transparency portal may be temporarily unavailable. We apologize for any inconvenience.",
      isSticky: false,
      views: 2103,
      tags: ["Maintenance", "System", "Downtime"]
    }
  ];

  const categories = ["All", "System Update", "Meeting", "Policy", "Schedule", "Community", "Technical"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesCategory = selectedCategory === "All" || announcement.category === selectedCategory;
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const stickyAnnouncements = filteredAnnouncements.filter(a => a.isSticky);
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.isSticky);

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'System Update':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Meeting':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Policy':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      case 'Schedule':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Community':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'Technical':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <>
      <PageMeta 
        title="Announcements & Updates | PUPSMB TransparaTech" 
        description="Stay updated with the latest announcements and news from PUPSMB TransparaTech"
      />
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Announcements & Updates
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay informed with the latest news, updates, and important notices
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
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
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          {/* Category Filter */}
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

        {/* Sticky Announcements */}
        {stickyAnnouncements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Pinned Announcements
            </h2>
            <div className="space-y-4">
              {stickyAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {announcement.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(announcement.category)}`}>
                        {announcement.category}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {announcement.publishDate}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {announcement.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-4">
                      <span>By {announcement.author}</span>
                      <span>{announcement.views} views</span>
                    </div>
                    <div className="flex gap-2">
                      {announcement.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Announcements */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Announcements
          </h2>
          <div className="space-y-4">
            {regularAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {announcement.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(announcement.category)}`}>
                      {announcement.category}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {announcement.publishDate}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {announcement.content}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <span>By {announcement.author}</span>
                    <span>{announcement.views} views</span>
                  </div>
                  <div className="flex gap-2">
                    {announcement.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredAnnouncements.length === 0 && (
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
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No announcements found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No announcements match your current search and filter criteria.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AnnouncementsViewer;