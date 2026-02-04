import React, { useState } from 'react';
import { Briefcase, Search, Building2, Users, TrendingUp, Award, MessageCircle, BookOpen, Moon, Sun, Bell, User, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CompanyInsights() {
  const [isDark, setIsDark] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('Google');
  const [searchTerm, setSearchTerm] = useState('');

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

  const companies = [
    { name: 'Google', logo: 'G', color: 'from-blue-500 to-green-500' },
    { name: 'Microsoft', logo: 'M', color: 'from-blue-600 to-cyan-500' },
    { name: 'Amazon', logo: 'A', color: 'from-orange-500 to-yellow-500' },
    { name: 'Meta', logo: 'M', color: 'from-blue-500 to-purple-500' },
    { name: 'Apple', logo: 'A', color: 'from-gray-700 to-gray-500' },
    { name: 'Netflix', logo: 'N', color: 'from-red-600 to-red-500' }
  ];

  const companyData = {
    Google: {
      name: 'Google LLC',
      ceo: 'Sundar Pichai',
      founded: '1998',
      employees: '190,000+',
      mission: 'To organize the world\'s information and make it universally accessible and useful.',
      about: 'Google is a multinational technology company specializing in Internet-related services and products, including online advertising technologies, search engine, cloud computing, software, and hardware.',
      ppoRate: '85%',
      avgStipend: '$8,000/month',
      faqs: [
        {
          question: 'What is the interview process like?',
          answer: 'Google\'s interview process typically includes: 1) Initial phone screen, 2) Technical phone interviews (2 rounds), 3) Onsite interviews (4-5 rounds including coding, system design, and behavioral), 4) Final review by hiring committee.'
        },
        {
          question: 'What coding languages should I know?',
          answer: 'Google primarily uses C++, Java, Python, and Go. For interviews, you can code in any language you\'re comfortable with, but Python, Java, and C++ are most common.'
        },
        {
          question: 'How long does the hiring process take?',
          answer: 'The entire process typically takes 6-8 weeks from initial application to offer, though it can vary based on role and team availability.'
        },
        {
          question: 'What is the dress code for interviews?',
          answer: 'Google has a casual dress code. Business casual or smart casual is appropriate for interviews. Comfort is key - wear what makes you confident.'
        }
      ],
      interviewRounds: [
        { round: 'Resume Screening', duration: '1-2 weeks', tips: 'Highlight relevant projects, quantify achievements, use keywords from job description' },
        { round: 'Phone Screen', duration: '45 min', tips: 'Review data structures, practice coding problems, prepare questions about the role' },
        { round: 'Technical Interview 1', duration: '1 hour', tips: 'Focus on algorithms, explain your thought process, write clean code' },
        { round: 'Technical Interview 2', duration: '1 hour', tips: 'System design basics, scalability concepts, communication is key' },
        { round: 'Onsite Rounds', duration: '4-5 hours', tips: 'Coding, system design, behavioral - prepare stories using STAR method' },
        { round: 'Hiring Committee', duration: '1-2 weeks', tips: 'All feedback reviewed, strong performance in most rounds needed' }
      ],
      requiredSkills: [
        { skill: 'Data Structures & Algorithms', level: 'Expert' },
        { skill: 'System Design', level: 'Advanced' },
        { skill: 'Programming (Python/Java/C++)', level: 'Expert' },
        { skill: 'Problem Solving', level: 'Expert' },
        { skill: 'Communication', level: 'Advanced' }
      ],
      preparation: [
        { resource: 'LeetCode', type: 'Practice', priority: 'High' },
        { resource: 'Cracking the Coding Interview', type: 'Book', priority: 'High' },
        { resource: 'System Design Primer', type: 'Guide', priority: 'Medium' },
        { resource: 'Google Interview Warmup', type: 'Tool', priority: 'High' }
      ]
    }
  };

  const currentCompany = companyData[selectedCompany];

  return (
<div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300 pb-20`}>      <nav className={`${theme.card} border-b ${theme.border} sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold">InternIQ</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className={`p-2 rounded-lg hover:${theme.card}`}>
                <Bell className="w-5 h-5" />
              </button>
              <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-lg hover:${theme.card}`}>
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Company Insights</h1>
          <p className={theme.textSecondary}>Learn about companies, interview processes, and prepare effectively</p>
        </div>

        <div className={`${theme.card} border ${theme.border} rounded-xl p-4 mb-6`}>
          <div className={`flex items-center ${theme.bg} border ${theme.border} rounded-lg px-4 py-2`}>
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`flex-1 bg-transparent outline-none ${theme.text}`}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className={`${theme.card} border ${theme.border} rounded-xl p-4`}>
            <h3 className="font-semibold mb-4">Top Companies</h3>
            <div className="space-y-2">
              {companies.map((company) => (
                <button
                  key={company.name}
                  onClick={() => setSelectedCompany(company.name)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                    selectedCompany === company.name
                      ? 'bg-blue-500 text-white'
                      : `hover:bg-gray-100 dark:hover:bg-gray-800 ${theme.text}`
                  }`}
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${company.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                    {company.logo}
                  </div>
                  <span className="font-medium">{company.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 space-y-6">
            <div className={`${theme.card} border ${theme.border} rounded-xl p-6`}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl`}>
                    G
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{currentCompany.name}</h2>
                    <p className={theme.textSecondary}>Founded {currentCompany.founded} • {currentCompany.employees} employees</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className={`p-4 border ${theme.border} rounded-lg`}>
                  <Users className="w-6 h-6 text-blue-500 mb-2" />
                  <p className={`text-sm ${theme.textSecondary} mb-1`}>CEO</p>
                  <p className="font-semibold">{currentCompany.ceo}</p>
                </div>
                <div className={`p-4 border ${theme.border} rounded-lg`}>
                  <TrendingUp className="w-6 h-6 text-green-500 mb-2" />
                  <p className={`text-sm ${theme.textSecondary} mb-1`}>PPO Rate</p>
                  <p className="font-semibold text-green-500">{currentCompany.ppoRate}</p>
                </div>
                <div className={`p-4 border ${theme.border} rounded-lg`}>
                  <Award className="w-6 h-6 text-purple-500 mb-2" />
                  <p className={`text-sm ${theme.textSecondary} mb-1`}>Avg Stipend</p>
                  <p className="font-semibold text-purple-500">{currentCompany.avgStipend}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-blue-500" />
                  <span>Mission</span>
                </h3>
                <p className={theme.textSecondary}>{currentCompany.mission}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">About</h3>
                <p className={theme.textSecondary}>{currentCompany.about}</p>
              </div>
            </div>

            <div className={`${theme.card} border ${theme.border} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <MessageCircle className="w-6 h-6 text-blue-500" />
                <span>Interview Process</span>
              </h3>
              <div className="space-y-4">
                {currentCompany.interviewRounds.map((round, idx) => (
                  <div key={idx} className={`p-4 border ${theme.border} rounded-lg`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{round.round}</h4>
                      <span className={`text-sm px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full`}>
                        {round.duration}
                      </span>
                    </div>
                    <p className={`text-sm ${theme.textSecondary}`}>💡 {round.tips}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${theme.card} border ${theme.border} rounded-xl p-6`}>
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-purple-500" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="space-y-4">
                {currentCompany.faqs.map((faq, idx) => (
                  <details key={idx} className={`p-4 border ${theme.border} rounded-lg group`}>
                    <summary className="font-semibold cursor-pointer flex items-center justify-between">
                      {faq.question}
                      <ChevronRight className="w-5 h-5 group-open:rotate-90 transition" />
                    </summary>
                    <p className={`mt-3 ${theme.textSecondary} text-sm`}>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className={`${theme.card} border ${theme.border} rounded-xl p-6`}>
                <h3 className="font-semibold mb-4">Required Skills</h3>
                <div className="space-y-3">
                  {currentCompany.requiredSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span>{skill.skill}</span>
                      <span className={`text-sm px-3 py-1 ${
                        skill.level === 'Expert' ? 'bg-red-50 text-red-600 dark:bg-red-900 dark:text-red-300' :
                        'bg-orange-50 text-orange-600 dark:bg-orange-900 dark:text-orange-300'
                      } rounded-full`}>
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${theme.card} border ${theme.border} rounded-xl p-6`}>
                <h3 className="font-semibold mb-4">Preparation Resources</h3>
                <div className="space-y-3">
                  {currentCompany.preparation.map((prep, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{prep.resource}</p>
                        <p className={`text-sm ${theme.textSecondary}`}>{prep.type}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 ${
                        prep.priority === 'High' ? 'bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-300' :
                        'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                      } rounded-full`}>
                        {prep.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}