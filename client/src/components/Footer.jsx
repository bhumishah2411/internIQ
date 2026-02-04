import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, FileText, User, Building2 } from 'lucide-react';

export default function Footer({ isDark }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
    { name: 'Resume', path: '/resume', icon: FileText },
    { name: 'Profile', path: '/dashboard', icon: User },
    { name: 'Companies', path: '/companyinsights', icon: Building2 }
  ];

  const isActive = (path) => location.pathname === path;

  const theme = isDark ? {
    bg: 'bg-slate-900',
    border: 'border-slate-800',
    text: 'text-gray-100',
    activeText: 'text-blue-400'
  } : {
    bg: 'bg-white',
    border: 'border-slate-200',
    text: 'text-gray-600',
    activeText: 'text-blue-500'
  };

  return (
    <div className={`${theme.bg} border-t ${theme.border} fixed bottom-0 left-0 right-0 z-50 shadow-lg`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-around items-center h-16 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive(item.path) ? theme.activeText : theme.text
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1 font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}