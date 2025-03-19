import React, { useState } from "react";
import { useContestStore } from "../stores/useContestStore";
import { Calendar, Clock, ExternalLink, Youtube, Moon, Sun } from "lucide-react";

const AdminContestCard = ({ contest }) => {
  const { updateSolutionLink } = useContestStore();
  const [newLink, setNewLink] = useState("");
  const [showInput, setShowInput] = useState(false);
  const id = contest._id;
  
  const handleAddLink = async (e) => {
    e.preventDefault();
    const data = { id, newLink };
    setNewLink("");
    setShowInput(false);
    await updateSolutionLink(data);
  };

  // Format duration to hours and minutes
  const formatDuration = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl p-6 m-4 max-w-md border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{contest.title}</h2>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
          {contest.platform}
        </span>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            contest.status === "Upcoming" 
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" 
              : contest.status === "Ongoing"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}>
            {contest.status}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(contest.rawStartTime).toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}</span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Clock className="w-4 h-4 mr-2" />
          <span>{new Date(contest.rawStartTime).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
          })} • {formatDuration(contest.rawDuration)}</span>
        </div>
      </div>
      
      <div className="flex flex-col space-y-3">
        <a 
          href={contest.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Contest
        </a>
        
        {contest.solutionLink ? (
          <a 
            href={contest.solutionLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
          >
            <Youtube className="w-4 h-4 mr-2" />
            View Solution
          </a>
        ) : (
          <div className="mt-2">
            <button
              onClick={() => setShowInput(!showInput)}
              className="flex items-center justify-center w-full px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-700 dark:hover:border-green-700 rounded-lg transition-colors duration-200"
            >
              <Youtube className="w-4 h-4 mr-2" />
              {showInput ? "Cancel" : "Add Solution Link"}
            </button>
            
            {showInput && (
              <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <input
                  type="text"
                  placeholder="Enter YouTube Solution Link"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddLink}
                  disabled={!newLink}
                  className={`w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
                    newLink 
                      ? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white" 
                      : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Submit Link
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContestCard;