# ConnectAlum — Full Stack Alumni Network Platform

A full-stack alumni networking platform built with **React + Vite** (frontend) and **Express + Node.js + MongoDB** (backend).

ConnectAlum is designed to bridge the gap between students and alumni through mentorship, professional networking, career opportunities, communities, resources, and direct communication.

---

## 🚀 Features

### 🏠 Home Page

- Modern responsive landing page
- Hero section with call-to-action
- Student / Alumni portal selection
- Platform features and statistics
- Career-focused call-to-action section
- Responsive design
- Light / Dark mode

### 🎓 Student Portal

- Browse alumni mentors
- Search mentors by name, company, and expertise
- Discover career opportunities
- Browse jobs and internships
- Connect with alumni
- Access educational and career resources
- Participate in communities
- Direct messaging

### 🏆 Alumni Portal

- Alumni profile management
- Register as a mentor
- Connect with students
- Post jobs and internships
- Share resources
- Participate in communities
- Communicate with students and other alumni

### 🤝 Mentorship

- Discover alumni mentors
- Search and filter mentors
- View mentor information and expertise
- Send connection requests
- Manage professional connections

### 💼 Jobs & Opportunities

- Browse jobs and internships
- Search and filter opportunities
- Alumni can post job opportunities
- View job details
- Apply to opportunities
- Track posted opportunities

### 📚 Resources

- Share educational and career resources
- Browse resources by category
- Search resources
- Resource descriptions and external links
- Like and interact with resources

### 👥 Communities

- Discover professional communities
- Search communities
- Create communities
- Public and private communities
- Join communities
- Community discussions and posts
- Like and interact with posts

### 💬 Messaging

- Direct messaging between users
- Conversation inbox
- Search users for new conversations
- Message history
- Responsive messaging interface

### 💬 Community Chat

- Real-time chat using Socket.IO
- Multiple chat rooms
- General discussions
- Jobs & Careers
- Tech Talk
- Events

### 👤 Profile

- View profile
- Edit personal information
- Update skills
- Update college and department
- Update professional information
- Role-based profile information

### 🔐 Authentication & Security

- User registration and login
- JWT authentication
- Password hashing with bcrypt
- Role-based access
- Protected routes
- Environment variables for sensitive credentials

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router |
| Backend | Node.js, Express 4 |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcrypt |
| Realtime | Socket.IO |
| Styling | Pure CSS + CSS Variables |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Version Control | Git + GitHub |

---

## 🏗️ Architecture

```text
                         CONNECTALUM
                              │
                 ┌────────────┴────────────┐
                 │                         │
             Students                   Alumni
                 │                         │
                 └────────────┬────────────┘
                              │
                              ▼
                       React + Vite
                         Frontend
                              │
                              │ REST API
                              ▼
                       Node + Express
                          Backend
                              │
                  ┌───────────┴───────────┐
                  │                       │
                  ▼                       ▼
               MongoDB                Socket.IO
               Database              Real-time Chat
📂 Project Structure
connectalum/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Mentor.js
│   │   ├── Event.js
│   │   └── Registration.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── jobController.js
│   │   ├── mentorController.js
│   │   └── eventController.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── routes/
│   │   ├── userRoute.js
│   │   ├── jobRoute.js
│   │   ├── mentorRoute.js
│   │   ├── eventRoutes.js
│   │   └── chatRoute.js
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── PortalSelector/
│   │   │   ├── Hero/
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   ├── LoginSignup/
│   │   │   ├── Jobs/
│   │   │   ├── Events/
│   │   │   ├── Mentors/
│   │   │   ├── MentorForm/
│   │   │   ├── Profile/
│   │   │   └── Chatroom/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Student/
│   │   │   ├── Alumni/
│   │   │   ├── Resources/
│   │   │   ├── Communities/
│   │   │   ├── Connections/
│   │   │   ├── Messages/
│   │   │   └── Chat/
│   │   │
│   │   ├── context/
│   │   │   └── StoreContext.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── .gitignore
└── README.md
⚙️ Setup & Running
Prerequisites
Node.js 18+
npm
MongoDB or MongoDB Atlas
Git
1. Clone the Repository
git clone https://github.com/Tannu15392/ConnectAlum.git
cd ConnectAlum
2. Backend Setup
cd backend
npm install

Create a .env file inside backend/:

PORT=4000
MONGO_URI=mongodb://localhost:27017/connectalum
JWT_SECRET=your_secret_key_here
ALLOWED_ORIGINS=http://localhost:5173

Start the backend:

npm run dev

For production:

npm start

Backend runs on:

http://localhost:4000
3. Frontend Setup

Open another terminal:

cd frontend
npm install

Create a .env file inside frontend/:

VITE_API_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000

Start the frontend:

npm run dev

Frontend runs on:

http://localhost:5173
🔐 Environment Variables
Backend
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ALLOWED_ORIGINS=http://localhost:5173
Frontend
VITE_API_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000

Never commit .env files, database credentials, JWT secrets, or API keys to GitHub.

🔌 API Endpoints
Authentication & Users
Method	Endpoint	Description
POST	/api/user/register	Register new user
POST	/api/user/login	Login
GET	/api/user/me	Get own profile
PUT	/api/user/profile	Update profile
GET	/api/user/alumni	List alumni
Jobs
Method	Endpoint	Description
GET	/api/jobs	Get all jobs
POST	/api/jobs/create	Post a job
GET	/api/jobs/myjobs	Get user's posted jobs
DELETE	/api/jobs/:id	Delete a job
Mentors
Method	Endpoint	Description
GET	/api/mentors	Get all mentors
POST	/api/mentors/add	Register as mentor
Events
Method	Endpoint	Description
GET	/api/events	Get all events
POST	/api/events/create	Create an event
POST	/api/events/register	Register for event
GET	/api/events/:id	Get event by ID
💬 Socket.IO Events
Event	Description
join_room	Join a chat room
send_message	Send / broadcast a message
receive_message	Receive messages
chat_history	Receive previous chat history
🗄️ MongoDB Atlas

For cloud deployment, replace the local MongoDB URI with a MongoDB Atlas connection string:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/connectalum?retryWrites=true&w=majority
🔒 Security

ConnectAlum implements:

JWT-based authentication
Password hashing with bcrypt
Protected API routes
Role-based access control
Environment-based configuration
.gitignore protection for secrets
🌐 Deployment

Production deployment architecture:

                   GitHub
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
   Render Static Site     Render Web Service
          │                     │
          │ React/Vite          │ Node/Express
          │                     │
          └──────────┬──────────┘
                     │
                     ▼
                MongoDB Atlas
📸 Screenshots
Home Page

Add screenshot here.

Student Portal

Add screenshot here.

Alumni Portal

Add screenshot here.

Mentors

Add screenshot here.

Jobs

Add screenshot here.

Resources

Add screenshot here.

Communities

Add screenshot here.

Messaging

Add screenshot here.

🚀 Future Improvements
Real-time notifications
Email notifications
Advanced mentor recommendation system
AI-powered mentor matching
Advanced job recommendations
Alumni verification
Analytics dashboard
Mobile application
Enhanced recommendation engine
👨‍💻 Author
Tannu Chandola

B.Tech Computer Science
Graphic Era Hill University

⭐ ConnectAlum

Connecting Students, Alumni, and Opportunities.


### Then save it

Press:

```text
Ctrl + S

Then run:

git add README.md
git commit -m "Update project README"