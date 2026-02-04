import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, MapPin, Building2, Clock, DollarSign, Bookmark, BookmarkCheck, Filter, ChevronDown, User as UserIcon } from 'lucide-react';

export default function JobsPage() {
  const [isDark, setIsDark] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  const [filters, setFilters] = useState({
    type: 'All',
    location: 'All',
    field: 'All',
    experienceLevel: 'All',
    sortBy: 'Latest'
  });
  const [showFilters, setShowFilters] = useState({
    type: false,
    location: false,
    field: false,
    experienceLevel: false,
    sortBy: false
  });

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const theme = isDark ? {
    bg: 'bg-slate-950',
    card: 'bg-slate-900',
    text: 'text-gray-100',
    textSecondary: 'text-gray-400',
    border: 'border-slate-800'
  } : {
    bg: 'bg-slate-50',
    card: 'bg-white',
    text: 'text-slate-900',
    textSecondary: 'text-slate-600',
    border: 'border-slate-200'
  };

  const filterOptions = {
    type: ['All', 'Internship', 'Full-Time', 'Part-Time', 'Contract'],
    location: ['All', 'United States', 'India', 'United Kingdom', 'Canada', 'Remote'],
    field: ['All', 'Software Development', 'Data Science', 'Product Management', 'Design', 'Marketing', 'Finance'],
    experienceLevel: ['All', 'Student', 'Entry Level', 'Mid Level'],
    sortBy: ['Latest', 'Most Relevant', 'Highest Stipend', 'Least Applicants']
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [filters, searchTerm, jobs]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await API.get('/jobs');
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = () => {
    let result = [...jobs];

    // Apply search
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      result = result.filter(job => 
        job.title?.toLowerCase().includes(search) ||
        job.company?.toLowerCase().includes(search) ||
        job.skills?.some(skill => skill.toLowerCase().includes(search)) ||
        job.location?.toLowerCase().includes(search)
      );
    }

    // Apply type filter
    if (filters.type !== 'All') {
      result = result.filter(job => job.type === filters.type);
    }

    // Apply location filter
    if (filters.location !== 'All') {
      result = result.filter(job => job.location?.includes(filters.location) || filters.location === 'Remote');
    }

    // Apply field filter
    if (filters.field !== 'All') {
      result = result.filter(job => job.field === filters.field);
    }

    // Apply sorting
    if (filters.sortBy === 'Latest') {
      result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (filters.sortBy === 'Highest Stipend') {
      result.sort((a, b) => {
        const aStipend = parseInt(a.stipend?.replace(/[^0-9]/g, '')) || 0;
        const bStipend = parseInt(b.stipend?.replace(/[^0-9]/g, '')) || 0;
        return bStipend - aStipend;
      });
    } else if (filters.sortBy === 'Least Applicants') {
      result.sort((a, b) => (a.applicants || 0) - (b.applicants || 0));
    }

    setFilteredJobs(result);
  };

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const handleApply = async (jobId) => {
    try {
      const response = await API.post('/applications', { 
        jobId, 
        isGoalCompany: false 
      });
      
      if (response.data.success) {
        alert('✅ Application submitted successfully!');
        // Refresh jobs to update applicant count
        fetchJobs();
      }
    } catch (error) {
      console.error('Error applying:', error);
      const message = error.response?.data?.message || 'Failed to apply';
      alert('❌ ' + message);
    }
  };

  const toggleFilterDropdown = (filterName) => {
    setShowFilters(prev => ({
      type: false,
      location: false,
      field: false,
      experienceLevel: false,
      sortBy: false,
      [filterName]: !prev[filterName]
    }));
  };

  const selectFilter = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setShowFilters(prev => ({
      ...prev,
      [filterName]: false
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300 pb-20`}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      {/* Search Bar */}
      <div className={`${theme.card} border-b ${theme.border} sticky top-16 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className={`flex items-center ${isDark ? 'bg-slate-800' : 'bg-slate-100'} border ${theme.border} rounded-xl px-4 py-3`}>
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search by job title, company, or skills..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`flex-1 bg-transparent outline-none ${theme.text}`}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters Bar */}
<div className={`${theme.card} border-b ${theme.border} sticky top-32 z-30`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">

      {/* Job Type */}
      <select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} text-sm`}
      >
        <option value="All">Job Type</option>
        <option value="All">All</option>
        <option value="Internship">Internship</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Contract">Contract</option>
      </select>

      {/* Location */}
      <select
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} text-sm`}
      >
        <option value="All">Location</option>
        <option value="All">All</option>
        <option value="India">India</option>
        <option value="United States">United States</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="Remote">Remote</option>
      </select>

      {/* Field */}
      <select
        value={filters.field}
        onChange={(e) => setFilters({ ...filters, field: e.target.value })}
        className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} text-sm`}
      >
        <option value="All">Field</option>
        <option value="All">All</option>
        <option value="Software Development">Software Development</option>
        <option value="Data Science">Data Science</option>
        <option value="Product Management">Product Management</option>
        <option value="Design">Design</option>
      </select>

      {/* Experience */}
      <select
        value={filters.experienceLevel}
        onChange={(e) => setFilters({ ...filters, experienceLevel: e.target.value })}
        className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} text-sm`}
      >
        <option value="All">Experience</option>
        <option value="All">All</option>
        <option value="Student">Student</option>
        <option value="Entry Level">Entry Level</option>
      </select>

      {/* Sort By */}
      <select
        value={filters.sortBy}
        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} text-sm`}
      >
        <option value="Latest">Sort By</option>
        <option value="Latest">Latest</option>
        <option value="Highest Stipend">Highest Stipend</option>
        <option value="Least Applicants">Least Applicants</option>
      </select>

    </div>
  </div>
</div>



      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Available Opportunities</h1>
            <p className={theme.textSecondary}>
              {filteredJobs.length} {filteredJobs.length === 1 ? 'internship' : 'internships'} found
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className={`mt-4 ${theme.textSecondary}`}>Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className={`${theme.card} border ${theme.border} rounded-xl p-12 text-center`}>
            <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
            <p className={theme.textSecondary}>
              {searchTerm ? `Try adjusting your search or filters` : `No internships match your criteria`}
            </p>
            {(searchTerm || filters.type !== 'All' || filters.location !== 'All' || filters.field !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilters({
                    type: 'All',
                    location: 'All',
                    field: 'All',
                    experienceLevel: 'All',
                    sortBy: 'Latest'
                  });
                }}
                className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <div key={job._id} className={`${theme.card} border ${theme.border} rounded-xl p-6 hover:shadow-xl transition`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {job.company?.[0] || 'C'}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                      <div className="flex items-center flex-wrap gap-3 text-sm mb-3">
                        <div className="flex items-center space-x-1">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold">{job.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className={theme.textSecondary}>{job.location}</span>
                        </div>
                      </div>

                      {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map((skill, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center flex-wrap gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="font-semibold text-green-500">{job.stipend}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className={theme.textSecondary}>
                            {Math.floor((new Date() - new Date(job.postedDate)) / (1000 * 60 * 60 * 24))} days ago
                          </span>
                        </div>
                        <div className={`flex items-center space-x-1 ${theme.textSecondary}`}>
                          <UserIcon className="w-4 h-4" />
                          <span>{job.applicants || 0} applicants</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <button
                      onClick={() => toggleSaveJob(job._id)}
                      className={`p-2 rounded-lg ${savedJobs.includes(job._id) ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'} transition`}
                    >
                      {savedJobs.includes(job._id) ? <BookmarkCheck className="w-6 h-6" /> : <Bookmark className="w-6 h-6" />}
                    </button>
                    <button 
                      onClick={() => handleApply(job._id)}
                      className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition shadow-md hover:shadow-lg"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer isDark={isDark} />
    </div>
  );
}