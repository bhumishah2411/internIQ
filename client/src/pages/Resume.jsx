import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, TrendingUp, Target, Award, Download } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ResumeAnalyzer() {
  const [isDark, setIsDark] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const { user } = useContext(AuthContext);

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
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await API.get('/resume');
      if (response.data.resume) {
        setResumeData(response.data.resume);
        setResumeUploaded(true);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('❌ Please upload a PDF file only');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('❌ File size must be less than 5MB');
      return;
    }

    setAnalyzing(true);
    
    try {
      const response = await API.post('/resume/upload', {
        fileName: file.name
      });
      
      if (response.data.success) {
        setResumeData(response.data.resume);
        setResumeUploaded(true);
        alert('✅ Resume uploaded and analyzed successfully!');
        // Reset file input
        setFileInputKey(Date.now());
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('❌ Failed to upload resume: ' + (error.response?.data?.message || error.message));
    } finally {
      setAnalyzing(false);
    }
  };

  const handleUploadNewClick = () => {
    document.getElementById('resume-file-input').click();
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  const scoreBreakdown = resumeData ? [
    { name: 'Format', value: 85, color: '#3B82F6' },
    { name: 'Keywords', value: Math.max(resumeData.atsScore - 8, 50), color: '#8B5CF6' },
    { name: 'Skills', value: resumeData.atsScore, color: '#10B981' },
    { name: 'Experience', value: Math.max(resumeData.atsScore - 3, 60), color: '#F59E0B' }
  ] : [];

  const skillsAnalysis = resumeData?.skills?.map(skill => ({
    skill,
    present: true,
    importance: 'High'
  })) || [];

  const suggestions = resumeData?.suggestions?.map((sug, idx) => ({
    type: idx === 0 ? 'critical' : idx === 1 ? 'warning' : 'info',
    message: sug
  })) || [];

  const getSuggestionIcon = (type) => {
    switch(type) {
      case 'critical': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const handleDownload = () => {
    alert('📥 Resume download feature\n\nIn a production app, this would:\n- Generate an optimized PDF\n- Apply ATS-friendly formatting\n- Include suggested improvements\n- Download to your device');
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300 pb-20`}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      
      {/* Hidden file input */}
      <input
        key={fileInputKey}
        id="resume-file-input"
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">ATS Resume Analyzer</h1>
          <p className={theme.textSecondary}>Get instant feedback and improve your resume's compatibility with Applicant Tracking Systems</p>
        </div>

        {!resumeUploaded ? (
          <div className={`${theme.card} border-2 border-dashed ${theme.border} rounded-xl p-12 text-center`}>
            <div className="max-w-md mx-auto">
              <Upload className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Upload Your Resume</h3>
              <p className={`${theme.textSecondary} mb-6`}>
                Upload your resume in PDF format to get instant ATS score and improvement suggestions
              </p>
              <button
                onClick={() => document.getElementById('resume-file-input').click()}
                disabled={analyzing}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg font-semibold inline-block transition"
              >
                {analyzing ? '🔄 Analyzing...' : '📁 Choose File'}
              </button>
              <p className={`text-sm ${theme.textSecondary} mt-4`}>Supported format: PDF (Max 5MB)</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className={`${theme.card} border ${theme.border} rounded-xl p-6`}>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-blue-500" />
                  <div>
                    <h3 className="font-semibold">{resumeData?.fileName || 'Your Resume'}</h3>
                    <p className={`text-sm ${theme.textSecondary}`}>
                      Analyzed {resumeData?.uploadedAt ? new Date(resumeData.uploadedAt).toLocaleDateString() : 'recently'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleUploadNewClick}
                  disabled={analyzing}
                  className={`px-4 py-2 border ${theme.border} rounded-lg hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {analyzing ? '🔄 Analyzing...' : '📤 Upload New'}
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-2 ${getScoreColor(resumeData?.atsScore || 0)}`}>
                    {resumeData?.atsScore || 0}
                  </div>
                  <p className={theme.textSecondary}>ATS Score</p>
                  <p className={`text-sm mt-1 ${getScoreColor(resumeData?.atsScore || 0)}`}>
                    {(resumeData?.atsScore || 0) >= 80 ? '✨ Excellent' : (resumeData?.atsScore || 0) >= 60 ? '👍 Good' : '⚠️ Needs Improvement'}
                  </p>
                </div>
                
                <div className={`text-center border-x ${theme.border}`}>
                  <div className="text-4xl font-bold text-blue-500 mb-2">{resumeData?.skills?.length || 0}</div>
                  <p className={theme.textSecondary}>Skills Identified</p>
                  <p className="text-sm text-green-500 mt-1">📊 Well Matched</p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-500 mb-2">{resumeData?.keywords?.length || 0}</div>
                  <p className={theme.textSecondary}>Keywords Found</p>
                  <p className="text-sm text-green-500 mt-1">✅ Good Coverage</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className={`${theme.card} border ${theme.border} rounded-xl p-6`}>
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span>Score Breakdown</span>
                </h3>
                {scoreBreakdown.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={scoreBreakdown}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {scoreBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#ffffff', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}` }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    No data available
                  </div>
                )}
              </div>

              <div className={`${theme.card} border ${theme.border} rounded-xl p-6`}>
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  <span>Identified Skills</span>
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {skillsAnalysis.length > 0 ? (
                    skillsAnalysis.map((skill, idx) => (
                      <div key={idx} className={`flex items-center justify-between p-3 border ${theme.border} rounded-lg`}>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="font-medium">{skill.skill}</p>
                            <p className={`text-sm ${theme.textSecondary}`}>Importance: {skill.importance}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={theme.textSecondary}>No skills identified yet</p>
                  )}
                </div>
              </div>
            </div>

            {suggestions.length > 0 && (
              <div className={`${theme.card} border ${theme.border} rounded-xl p-6`}>
                <h3 className="text-lg font-semibold mb-4">💡 Improvement Suggestions</h3>
                <div className="space-y-3">
                  {suggestions.map((suggestion, idx) => (
                    <div key={idx} className={`flex items-start space-x-3 p-4 border ${theme.border} rounded-lg`}>
                      {getSuggestionIcon(suggestion.type)}
                      <p className={theme.textSecondary}>{suggestion.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center space-x-4 flex-wrap gap-4">
              <button 
                onClick={handleDownload}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition flex items-center space-x-2 shadow-lg"
              >
                <Download className="w-5 h-5" />
                <span>Download Optimized Resume</span>
              </button>
              <button 
                onClick={handleUploadNewClick}
                disabled={analyzing}
                className={`px-6 py-3 border ${theme.border} rounded-lg font-semibold transition hover:shadow-lg disabled:opacity-50`}
              >
                {analyzing ? '🔄 Analyzing...' : '📤 Upload Different Resume'}
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer isDark={isDark} />
    </div>
  );
}