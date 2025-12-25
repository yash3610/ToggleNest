# ToggleNest - Team Task & Workflow Management Platform

A complete full-stack MERN project for managing team tasks and workflows with Kanban board functionality.

## 🚀 Tech Stack

**Frontend:**
- React JS (Functional components + Hooks)
- React Router DOM
- React Beautiful DnD (Drag & Drop)
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

## 📁 Project Structure

```
ToggleNest/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── Frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── utils/
    │   ├── App.jsx
    │   └── index.js
    ├── .env
    ├── package.json
    └── tailwind.config.js
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to Backend folder:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/togglenest
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start MongoDB (if using local):
```bash
mongod
```

5. Start backend server:
```bash
npm run dev
```

Backend will run on: `http://localhost:5000`

### Frontend Setup

1. Navigate to Frontend folder:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start frontend development server:
```bash
npm start
```

Frontend will run on: `http://localhost:3000`

## 📖 Features

### Authentication
- ✅ User Registration (Name, Email, Password, Role)
- ✅ User Login with JWT
- ✅ Password hashing using bcryptjs
- ✅ Protected routes
- ✅ Role-based access (Admin / Team Member)

### Project Management
- ✅ Create, View, Edit, Delete projects (Admin only for edit/delete)
- ✅ Assign team members to projects
- ✅ Project deadlines

### Task Management (Kanban Board)
- ✅ Three columns: To Do, In Progress, Done
- ✅ Drag & Drop functionality
- ✅ Task properties: Title, Description, Priority, Due Date, Assigned User
- ✅ Auto status update on drag
- ✅ Create, Edit, Delete tasks

### Dashboard
- ✅ Total projects count
- ✅ Completed tasks count
- ✅ Pending tasks count
- ✅ Completion percentage
- ✅ Recent activity log

### Activity Logging
- ✅ Task created, moved, completed
- ✅ Project created, updated, deleted
- ✅ User assignment changes

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `GET /api/auth/users` - Get all users (Protected)

### Projects
- `GET /api/projects` - Get all projects (Protected)
- `GET /api/projects/:id` - Get single project (Protected)
- `POST /api/projects` - Create project (Protected)
- `PUT /api/projects/:id` - Update project (Protected, Admin only)
- `DELETE /api/projects/:id` - Delete project (Protected, Admin only)

### Tasks
- `GET /api/tasks?project=projectId` - Get tasks (Protected)
- `GET /api/tasks/:id` - Get single task (Protected)
- `POST /api/tasks` - Create task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)

### Activities
- `GET /api/activities?project=projectId` - Get activity logs (Protected)

## 👤 Default Test Users

You need to register users through the app. First user can be Admin.

Example registration:
```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "admin123",
  "role": "Admin"
}
```

## 🎨 UI Screenshots

The application features:
- Clean and modern design with Tailwind CSS
- Smooth transitions and hover effects
- Responsive layout
- Intuitive drag-and-drop Kanban board
- Real-time activity logging

## 📝 Usage Flow

1. **Register/Login** - Create an account or login
2. **Dashboard** - View overview statistics
3. **Create Project** - Admin creates a project and assigns team members
4. **Task Board** - Click on a project to access its Kanban board
5. **Manage Tasks** - Create tasks and drag them between columns
6. **Track Activity** - View all activities in the activity log

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Role-based authorization
- Token verification middleware

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| React | Frontend framework |
| React Router | Client-side routing |
| React Beautiful DnD | Drag and drop |
| Tailwind CSS | Styling |
| Axios | HTTP requests |
| Node.js | Backend runtime |
| Express | Backend framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |

## 📦 NPM Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGO_URI in .env file

**CORS Error:**
- Backend has CORS enabled by default
- Check if ports match in .env files

**Token Error:**
- Clear localStorage in browser
- Re-login to get new token

## 📄 License

This project is created for portfolio and educational purposes.

## 👨‍💻 Author

Built with ❤️ as a MERN Stack demonstration project

---

**Happy Coding! 🚀**
