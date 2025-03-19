import React, { useEffect, useState } from 'react';
import ContestCard from '../components/ContestCard';
import { useContestStore } from '../stores/useContestStore';
import { Filter, Search, RefreshCw } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider.jsx';  // Import your theme context

const HomePage = () => {
  const { allContests, fetchContests, isfetchingContests, bookmarkContest, isUpdating, triggerBookmark } = useContestStore();
  const [filterstate, setfilterstate] = useState(['upcoming']);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  // Use your global theme context instead of local state
  const { theme } = useTheme();

  useEffect(() => {
    fetchContests();
  }, [triggerBookmark]);

  const handleFilterChange = (newFilter) => {
    setfilterstate((prevfilterstate) =>
      prevfilterstate.includes(newFilter)
        ? prevfilterstate.filter(filter => filter !== newFilter)
        : [...prevfilterstate, newFilter]
    );
  };

  const clearFilters = () => {
    setfilterstate(['upcoming']);
  };

  const filters = [
    { id: 'platforms', title: 'Platforms', items: ['CodeChef', 'CodeForces', 'LeetCode'] },
    { id: 'status', title: 'Status', items: ['upcoming', 'ongoing', 'finished'] },
    { id: 'saved', title: 'Saved', items: ['Bookmarks'] }
  ];

  const filteredContests = allContests
    .filter(contest => {
      // Search filter
      if (searchTerm) {
        return contest.title.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    })
    .filter((contest) => {
      const platformFilters = ['CodeChef', 'CodeForces', 'LeetCode'].filter(platform => filterstate.includes(platform));
      const statusFilters = ['upcoming', 'ongoing', 'finished'].filter(status => filterstate.includes(status));
      
      const platformMatch = platformFilters.length === 0 || platformFilters.some(platform => contest.platform.toLowerCase() === platform.toLowerCase());
      const statusMatch =
        (filterstate.includes('upcoming') && contest.rawStartTime > Date.now()) ||
        (filterstate.includes('ongoing') && contest.rawStartTime <= Date.now() && Date.now() < contest.rawStartTime + contest.rawDuration) ||
        (filterstate.includes('finished') && contest.status === 'finished');
      const bookmarkMatch = filterstate.includes('Bookmarks') && bookmarkContest.includes(contest._id);
      
      if (filterstate.includes('Bookmarks')) {
        return bookmarkMatch;
      }
      if (platformFilters.length && statusFilters.length) {
        return platformMatch && statusMatch;
      }
      return statusFilters.length ? statusMatch : platformMatch;
    });

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-white"} text-gray-800 dark:text-white`}>
      {/* Header */}
      <header className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} shadow-lg py-6 px-8 mb-8`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 md:mb-0">
            Contests Hub
          </h1>
          
          {/* Search and Filter */}
          <div className="flex w-full md:w-auto gap-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search contests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-2 pl-10 rounded-lg ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"} border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            <button 
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className={`flex items-center gap-2 ${theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white px-4 py-2 rounded-lg transition-all duration-200`}
            >
              <Filter size={18} />
              <span className="hidden md:inline">Filters</span>
            </button>
            
            <button 
              onClick={() => fetchContests()}
              className={`flex items-center gap-2 ${theme === "dark" ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-500 hover:bg-purple-600"} text-white px-4 py-2 rounded-lg transition-all duration-200`}
              disabled={isfetchingContests}
            >
              <RefreshCw size={18} className={isfetchingContests ? "animate-spin" : ""} />
              <span className="hidden md:inline">Refresh</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Filter Drawer */}
        {isFilterDrawerOpen && (
          <div className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-xl shadow-xl p-6 mb-8 border`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filter Contests</h2>
              <button 
                onClick={clearFilters}
                className={`text-sm ${theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-500 hover:text-blue-600"}`}
              >
                Reset filters
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filters.map((filterGroup) => (
                <div key={filterGroup.id} className="space-y-3">
                  <h3 className={`font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{filterGroup.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterGroup.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleFilterChange(item)}
                        className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
                          filterstate.includes(item) 
                            ? `${theme === "dark" ? "bg-blue-600" : "bg-blue-500"} text-white font-medium` 
                            : `${theme === "dark" ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {(isfetchingContests || isUpdating) ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Loading contests, please wait...</p>
          </div>
        ) : (
          <>
            {/* Contest Stats */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-2xl font-bold`}>Contest Feed</h2>
                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {filteredContests.length} {filteredContests.length === 1 ? 'contest' : 'contests'} found
                </p>
              </div>
              
              {/* Active Filters */}
              {filterstate.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {filterstate.map((filter) => (
                    <span key={filter} className={`${theme === "dark" ? "bg-blue-900/50 text-blue-200" : "bg-blue-100 text-blue-800"} px-3 py-1 text-sm rounded-full flex items-center gap-1`}>
                      {filter}
                      <button 
                        onClick={() => handleFilterChange(filter)}
                        className={`ml-1 ${theme === "dark" ? "text-blue-300 hover:text-blue-100" : "text-blue-600 hover:text-blue-800"}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Contest Cards */}
            {filteredContests.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredContests.map((contest, index) => (
                  <ContestCard 
                    key={index} 
                    contest={contest} 
                    isBookmarked={bookmarkContest.includes(contest._id)} 
                  />
                ))}
              </div>
            ) : (
              <div className={`${theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-gray-100 border-gray-200"} rounded-xl p-10 text-center border`}>
                <h3 className={`text-xl font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-2`}>No contests found</h3>
                <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Try adjusting your filters or search term</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;