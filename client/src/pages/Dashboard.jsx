import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Briefcase, Target, TrendingUp, FileText, Users, Search, Filter, Upload } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [applications, setApplications] = useState([]);
  const [resume, setResume] = useState(null);
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

  useEffect(() => {
    fetchApplications();
    fetchResume();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await API.get('/applications');
      setApplications(response.data.applications || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchResume = async () => {
    try {
      const response = await API.get('/resume');
      setResume(response.data.resume);
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

  const statusColors = {
    'Applied': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    'Resume Shortlisted': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    'OA Cleared': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
    'Technical': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    'HR': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    'Selected': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    'Rejected': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  };

  const progressData = [
    { month: 'Jan', applications: applications.length, shortlisted: applications.filter(a => a.status !== 'Applied').length, selected: applications.filter(a => a.status === 'Selected').length },
  ];

  const statusDistribution = [
    { name: 'Applied', value: applications.filter(a => a.status === 'Applied').length, color: '#3B82F6' },
    { name: 'Shortlisted', value: applications.filter(a => a.status === 'Resume Shortlisted').length, color: '#8B5CF6' },
    { name: 'OA Cleared', value: applications.filter(a => a.status === 'OA Cleared').length, color: '#6366F1' },
    { name: 'Interview', value: applications.filter(a => a.status === 'Technical' || a.status === 'HR').length, color: '#F97316' },
    { name: 'Selected', value: applications.filter(a => a.status === 'Selected').length, color: '#10B981' },
    { name: 'Rejected', value: applications.filter(a => a.status === 'Rejected').length, color: '#EF4444' },
  ];

  const stats = [
    { label: 'Total Applications', value: applications.length.toString(), icon: <Briefcase className="w-5 h-5" />, color: 'text-blue-500' },
    { label: 'Goal Companies', value: applications.filter(a => a.isGoalCompany).length.toString(), icon: <Target className="w-5 h-5" />, color: 'text-purple-500' },
    { label: 'Success Rate', value: applications.length > 0 ? `${Math.round((applications.filter(a => a.status === 'Selected').length / applications.length) * 100)}%` : '0%', icon: <TrendingUp className="w-5 h-5" />, color: 'text-green-500' },
    { label: 'Resume Score', value: resume ? `${resume.atsScore}/100` : 'N/A', icon: <FileText className="w-5 h-5" />, color: 'text-orange-500' },
  ];

  return (
      <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300 pb-20`}>      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Student'}!</h1>
          <p className={theme.textSecondary}>Track your internship applications and improve your success rate</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className={`${theme.card} border ${theme.border} rounded-xl p-6 hover:shadow-lg transition`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
              <p className={theme.textSecondary}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className={`${theme.card} border ${theme.border} rounded-xl mb-6`}>
          <div className="flex border-b ${theme.border} overflow-x-auto">
            {['overview', 'tracker', 'analytics', 'recommendations'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 capitalize whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : theme.textSecondary}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'tracker' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Application Tracker</h2>
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center ${theme.card} border ${theme.border} rounded-lg px-3 py-2`}>
                      <Search className="w-4 h-4 mr-2" />
                      <input type="text" placeholder="Search..." className="bg-transparent outline-none w-32" />
                    </div>
                    <button className={`p-2 border ${theme.border} rounded-lg`}>
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {applications.length === 0 ? (
                    <p className={theme.textSecondary}>No applications yet. Start applying to internships!</p>
                  ) : (
                    applications.map(app => (
                      <div key={app._id} className={`border ${theme.border} rounded-lg p-4 hover:shadow-md transition`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                              {app.jobId?.company?.[0] || 'J'}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{app.jobId?.company || 'Company'}</h3>
                                {app.isGoalCompany && (
                                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 text-xs rounded-full">
                                    ⭐ Goal
                                  </span>
                                )}
                              </div>
                              <p className={theme.textSecondary}>{app.jobId?.title || 'Position'}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[app.status]}`}>
                              {app.status}
                            </span>
                            <p className={`text-xs ${theme.textSecondary} mt-1`}>
                              Applied: {new Date(app.appliedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Application Progress</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                        <XAxis dataKey="month" stroke={isDark ? '#94a3b8' : '#64748b'} />
                        <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
                        <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#ffffff', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}` }} />
                        <Legend />
                        <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
                        <Line type="monotone" dataKey="shortlisted" stroke="#8B5CF6" strokeWidth={2} />
                        <Line type="monotone" dataKey="selected" stroke="#10B981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie data={statusDistribution.filter(s => s.value > 0)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                          {statusDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#ffffff', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}` }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {applications.slice(0, 3).map((app, idx) => (
                      <div key={idx} className={`border ${theme.border} rounded-lg p-4`}>
                        <p className={theme.textSecondary}>
                          Applied to <span className="font-semibold text-blue-500">{app.jobId?.company} - {app.jobId?.title}</span>
                        </p>
                        <p className="text-sm text-gray-500">{new Date(app.appliedAt).toLocaleDateString()}</p>
                      </div>
                    ))}
                    {applications.length === 0 && (
                      <p className={theme.textSecondary}>No recent activity</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button 
                      onClick={() => navigate('/resume')}
                      className={`${theme.card} border ${theme.border} rounded-lg p-4 hover:shadow-lg transition text-left`}
                    >
                      <Upload className="w-6 h-6 text-blue-500 mb-2" />
                      <h4 className="font-semibold mb-1">Upload Resume</h4>
                      <p className={`text-sm ${theme.textSecondary}`}>Get ATS score & tips</p>
                    </button>
                    <button 
                      onClick={() => navigate('/jobs')}
                      className={`${theme.card} border ${theme.border} rounded-lg p-4 hover:shadow-lg transition text-left`}
                    >
                      <Search className="w-6 h-6 text-purple-500 mb-2" />
                      <h4 className="font-semibold mb-1">Find Internships</h4>
                      <p className={`text-sm ${theme.textSecondary}`}>Browse opportunities</p>
                    </button>
                    <button className={`${theme.card} border ${theme.border} rounded-lg p-4 hover:shadow-lg transition text-left`}>
                      <Users className="w-6 h-6 text-green-500 mb-2" />
                      <h4 className="font-semibold mb-1">Peer Benchmark</h4>
                      <p className={`text-sm ${theme.textSecondary}`}>Compare progress</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'recommendations' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Recommended for You</h3>
                  <p className={theme.textSecondary}>Apply to more jobs to get personalized recommendations!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer isDark={isDark} />
    </div>
  );
}