# 💰 Expense Tracker – Full Stack MERN App

A full-stack **Expense Tracker** application built using the **MERN stack** that helps users track daily expenses, analyze spending patterns, and manage monthly budgets with visual insights.

🔗 **Live Demo**  
Frontend: https:expense-tracker-three-ashy-28.vercel.app

---

## 🚀 Features

### 🧾 Expense Management
- Add, edit, and delete expenses
- Categorize expenses (Food, Travel, Shopping, Bills, etc.)
- Real-time updates

### 📊 Analytics & Insights
- Category-wise expense distribution (Pie Chart)
- Monthly spending trends
- Smart insights (top category, spending behavior)
- Advanced insights (monthly comparison, projected spend)

### 💡 Budget Tracking
- User-defined monthly budget
- Visual progress bar
- Budget exceeded alerts

### 🎨 UI/UX
- Clean, responsive dashboard
- Animated transitions (Framer Motion)
- Sidebar navigation
- Dark mode toggle

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Recharts
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS
- dotenv

---

## 🏗 Project Structure

```text
expense-tracker/
│
├── frontend/        # React frontend
│   ├── src/
│   └── package.json
│
├── backend/         # Express backend
│   ├── routes/
│   ├── models/
│   ├── server.js
│   └── package.json
│
└── README.md

```

## ⚙️ Environment Variables
Backend (backend/.env)
MONGO_URI=your_mongodb_connection_string
PORT=5000

Frontend (frontend/.env)
REACT_APP_API_URL=https://your-backend-url/api

---
🧪 Run Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm start
---
🌍 Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

---
👤 Author
Vivek Kumar
B.Tech CSE
