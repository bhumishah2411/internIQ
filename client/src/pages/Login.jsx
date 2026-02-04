import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, Mail, Lock, Eye, EyeOff, Moon, Sun } from 'lucide-react';

export default function Login() {
  const [isDark, setIsDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const theme = isDark ? {
    bg: 'bg-slate-950',
    card: 'bg-slate-900',
    text: 'text-gray-100',
    textSecondary: 'text-gray-400',
    border: 'border-slate-800',
    input: 'bg-slate-800'
  } : {
    bg: 'bg-slate-50',
    card: 'bg-white',
    text: 'text-slate-900',
    textSecondary: 'text-slate-600',
    border: 'border-slate-200',
    input: 'bg-gray-50'
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/jobs');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} flex items-center justify-center p-4 transition-colors duration-300`}>
      <button
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-4 right-4 p-3 ${theme.card} border ${theme.border} rounded-lg shadow-lg z-50`}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <div className="flex items-center space-x-3 mb-6">
            <Briefcase className="w-12 h-12 text-blue-500" />
            <span className="text-4xl font-bold">InternIQ</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Land Your Dream
            <span className="text-blue-500"> Internship</span>
          </h1>
          <p className={`text-xl ${theme.textSecondary} mb-8`}>
            Smart tracking, AI-powered recommendations, and analytics to boost your success rate
          </p>
        </div>

        <div className={`${theme.card} border ${theme.border} rounded-2xl shadow-2xl p-8`}>
          <div className="md:hidden flex items-center justify-center space-x-2 mb-6">
            <Briefcase className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold">InternIQ</span>
          </div>

          <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
          <p className={`${theme.textSecondary} mb-6`}>Login to continue your journey</p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 ${theme.textSecondary}`}>
                Email Address
              </label>
              <div className={`flex items-center ${theme.input} border ${theme.border} rounded-lg px-3 py-2`}>
                <Mail className="w-5 h-5 mr-2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="student@university.edu"
                  className={`flex-1 bg-transparent outline-none ${theme.text}`}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-2 ${theme.textSecondary}`}>
                Password
              </label>
              <div className={`flex items-center ${theme.input} border ${theme.border} rounded-lg px-3 py-2`}>
                <Lock className="w-5 h-5 mr-2 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`flex-1 bg-transparent outline-none ${theme.text}`}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <p className={`text-center mt-6 ${theme.textSecondary}`}>
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}