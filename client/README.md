# InternIQ

InternIQ is an early-stage full-stack internship management platform built with the MERN stack, focused on intuitive UI/UX and smooth navigation. Currently, it includes user authentication screens and responsive page navigation with demo internship data. Planned features include resume analysis, internship tracking, performance analytics, and personalized growth recommendations to help students improve their applications and career growth.

## Features

- User Authentication (Login/Signup)
- Page Navigation & Responsive UI
- Demo Internship Data
- **Planned Features:**
  - Resume Analyzer
  - Internship Tracking
  - Performance Analytics & Growth Recommendations
  - 
## Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (planned)  
- **Other:** MERN Stack, REST APIs

## Installation

1. Clone the repository:
git clone https://github.com/your-username/internIQ.git

2. Navigate into the project folder:
cd internIQ

3.Install dependencies:
# For server
cd server
npm install
# Go back to root
cd ..
# For client
cd client
npm install

4. Run the project:
# In server folder
cd server
npm start

# In a new terminal, run client
cd ../client
npm start

##Project Structure
internIQ/
├─ client/                 # React frontend
│   ├─ public/             # Static files like index.html
│   └─ src/                # React components, pages, and styles
├─ server/                 # Node.js backend
│   ├─ routes/             # API routes for users, internships, resumes
│   ├─ models/             # Database models (planned)
│   ├─ seedData.js         # Demo data for testing
│   └─ server.js           # Entry point for backend server
├─ .gitignore              # Git ignore rules
├─ README.md               # Project documentation
└─ package.json            # Project metadata & dependencies

##Future Features
Real Internship Data Integration: Connect with live internship APIs or databases
Resume Analyzer: AI-powered suggestions for optimized resumes
Internship Tracking: Track applications, shortlistings, and selections
Performance Analytics: Provide insights and recommendations based on user performance
Growth Recommendations: Personalized guidance to improve employability skills
Mentorship & Learning Resources: Suggest courses or tutorials based on career goals
