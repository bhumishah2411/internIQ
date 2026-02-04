const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const Company = require('./models/Company');

dotenv.config();

const sampleJobs = [
  {
    title: 'Software Engineering Intern',
    company: 'Google',
    location: 'Mountain View, CA',
    type: 'Internship',
    field: 'Software Development',
    stipend: '$8,000/month',
    skills: ['React', 'Node.js', 'Python'],
    description: 'Work on cutting-edge projects with Google engineers',
    requirements: ['CS student', 'Strong coding skills', 'Team player'],
    applicants: 234,
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Data Science Intern',
    company: 'Microsoft',
    location: 'Redmond, WA',
    type: 'Internship',
field: 'Data Science',
stipend: '$7,500/month',
skills: ['Python', 'ML', 'SQL'],
description: 'Analyze large datasets and build ML models',
requirements: ['Statistics background', 'Python experience'],
applicants: 189,
postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
},
{
title: 'Product Management Intern',
company: 'Amazon',
location: 'Seattle, WA',
type: 'Internship',
field: 'Product Management',
stipend: '$7,000/month',
skills: ['Product Strategy', 'Analytics', 'User Research'],
description: 'Define product roadmaps and work with engineering teams',
requirements: ['Strong analytical skills', 'Communication skills'],
applicants: 312,
postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
},
{
title: 'Frontend Developer Intern',
company: 'Meta',
location: 'Menlo Park, CA',
type: 'Internship',
field: 'Software Development',
stipend: '$8,500/month',
skills: ['React', 'JavaScript', 'CSS'],
description: 'Build user interfaces for Facebook products',
requirements: ['React experience', 'Portfolio of projects'],
applicants: 156,
postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
},
{
title: 'UI/UX Design Intern',
company: 'Apple',
location: 'Cupertino, CA',
type: 'Internship',
field: 'Design',
stipend: '$9,000/month',
skills: ['Figma', 'User Research', 'Prototyping'],
description: 'Design beautiful and intuitive user experiences',
requirements: ['Design portfolio', 'Figma experience'],
applicants: 89,
postedDate: new Date(Date.now() - 4 * 60 * 60 * 1000)
},
{
title: 'Backend Engineering Intern',
company: 'Netflix',
location: 'Los Gatos, CA',
type: 'Internship',
field: 'Software Development',
stipend: '$8,200/month',
skills: ['Java', 'Spring Boot', 'AWS'],
description: 'Build scalable backend systems',
requirements: ['Java experience', 'Database knowledge'],
applicants: 278,
postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
}
];
const sampleCompanies = [
{
name: 'Google',
ceo: 'Sundar Pichai',
founded: '1998',
employees: '190,000+',
mission: 'To organize the worlds information and make it universally accessible and useful',
about: 'Google is a multinational technology company specializing in Internet-related services and products',
ppoRate: '85%',
avgStipend: '$8,000/month',
faqs: [
{
question: 'What is the interview process like?',
answer: 'Google interview includes phone screen, technical interviews (2 rounds), and onsite interviews (4-5 rounds) covering coding, system design, and behavioral questions.'
},
{
question: 'What coding languages should I know?',
answer: 'Google primarily uses C++, Java, Python, and Go. You can code in any language during interviews, but these are most common.'
},
{
question: 'How long does the hiring process take?',
answer: 'The entire process typically takes 6-8 weeks from initial application to offer.'
}
],
interviewRounds: [
{ round: 'Phone Screen', duration: '30-45 min', tips: 'Review data structures and algorithms basics' },
{ round: 'Technical Round 1', duration: '45-60 min', tips: 'Practice coding problems on LeetCode (Medium level)' },
{ round: 'Technical Round 2', duration: '45-60 min', tips: 'Focus on explaining your thought process clearly' },
{ round: 'Onsite', duration: '4-5 hours', tips: 'Prepare for coding, system design, and behavioral questions' }
],
requiredSkills: [
{ skill: 'Data Structures & Algorithms', level: 'Expert' },
{ skill: 'System Design', level: 'Advanced' },
{ skill: 'Programming', level: 'Expert' }
],
preparation: [
{ resource: 'LeetCode', type: 'Practice', priority: 'High' },
{ resource: 'Cracking the Coding Interview', type: 'Book', priority: 'High' },
{ resource: 'System Design Primer', type: 'Guide', priority: 'Medium' }
]
},
{
name: 'Microsoft',
ceo: 'Satya Nadella',
founded: '1975',
employees: '220,000+',
mission: 'To empower every person and organization on the planet to achieve more',
about: 'Microsoft develops, manufactures, licenses, supports and sells computer software, consumer electronics, and personal computers',
ppoRate: '80%',
avgStipend: '$7,500/month',
faqs: [
{
question: 'What is the interview process?',
answer: 'Typically includes a recruiter call, technical phone screen (2 rounds), and final round interviews (4-5 rounds).'
}
],
interviewRounds: [
{ round: 'Recruiter Screen', duration: '30 min', tips: 'Be ready to discuss your projects and interests' },
{ round: 'Technical Phone Screen', duration: '1 hour', tips: 'Focus on problem-solving and clean code' }
],
requiredSkills: [
{ skill: 'C# or Java', level: 'Advanced' },
{ skill: 'Cloud (Azure)', level: 'Intermediate' }
]
}
];
const seedDB = async () => {
try {
console.log('Connecting to MongoDB...');
await mongoose.connect(process.env.MONGO_URI);
console.log('✅ Connected! Clearing old data...');
await Job.deleteMany({});
await Company.deleteMany({});

console.log('📝 Inserting sample data...');
await Job.insertMany(sampleJobs);
await Company.insertMany(sampleCompanies);

console.log('✅ Database seeded successfully!');
console.log(`📝 Added ${sampleJobs.length} jobs`);
console.log(`🏢 Added ${sampleCompanies.length} companies`);

process.exit(0);
} catch (error) {
console.error('❌ Error seeding database:', error);
process.exit(1);
}
};
seedDB();