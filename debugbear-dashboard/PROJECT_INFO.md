# 🚀 DebugBear Performance Dashboard

## Project Overview
A modern, full-stack web application for monitoring website performance with AI-powered insights.

## 📁 Project Structure
```
debugbear-dashboard/
├── server.js           # Express backend server with AI integration
├── debugTest.js        # Original CLI tool for testing DebugBear API
├── public/            
│   ├── index.html     # Main HTML entry point
│   ├── app.js         # React frontend application
│   └── styles.css     # Modern CSS with animations
├── node_modules/      # Dependencies
├── package.json       # Project configuration
├── .env.example       # Environment variables template
├── .env              # Your environment variables (git-ignored)
├── .gitignore        # Git ignore rules
├── README.md         # Detailed documentation
├── start.bat         # Windows batch startup script
├── start.ps1         # PowerShell startup script
└── PROJECT_INFO.md   # This file
```

## 🎯 Quick Start

### Option 1: Using PowerShell
```powershell
.\start.ps1
```

### Option 2: Using Command Prompt
```cmd
start.bat
```

### Option 3: Manual Start
```bash
npm start
```

Then open your browser to: http://localhost:5000

## 🔑 Required API Keys

1. **DebugBear API Key**
   - Get from: https://www.debugbear.com/account/api-keys
   - Add to `.env`: `DEBUGBEAR_API_KEY=your_key_here`

2. **OpenAI API Key** (for AI features)
   - Get from: https://platform.openai.com/api-keys
   - Add to `.env`: `OPENAI_API_KEY=your_key_here`

## ✨ Features

### Backend
- RESTful API with Express.js
- WebSocket real-time communication
- AI integration with OpenAI
- DebugBear API integration
- Security features (Helmet, CORS, rate limiting)
- Compression and optimization

### Frontend
- Modern React components
- Real-time updates via WebSocket
- Beautiful gradient UI with glassmorphism
- Interactive charts with Chart.js
- AI-powered insights display
- Responsive design

### Design
- Gradient backgrounds with animations
- Glass morphism effects
- Modern card-based layout
- Smooth transitions
- Professional color scheme
- Real-time status indicators

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Run Original CLI Tool
```bash
npm run debug
```

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | System health check |
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/:id` | Get project details |
| GET | `/api/projects/:id/metrics` | Get performance metrics |
| POST | `/api/ai/analyze` | AI-powered analysis |
| GET | `/api/monitor/:projectId` | Start real-time monitoring |
| WS | `ws://localhost:5000` | WebSocket connection |

## 🌐 Deployment

### Local Development
The application runs on:
- Backend: http://localhost:5000
- Frontend: Served from backend at same URL

### Production Deployment
Consider deploying to:
- Heroku
- AWS (EC2, Elastic Beanstalk)
- Google Cloud Platform
- Azure
- Vercel (frontend) + Railway (backend)
- DigitalOcean

## 📊 Technology Stack

- **Backend**: Node.js, Express.js, Socket.io
- **Frontend**: React, Bootstrap 5, Chart.js
- **AI**: OpenAI GPT-3.5
- **APIs**: DebugBear Performance API
- **Styling**: CSS3 with animations, Glassmorphism
- **Real-time**: WebSockets

## 🐛 Troubleshooting

### Port Already in Use
Change the port in `.env`:
```
PORT=3001
```

### API Keys Not Working
- Verify keys are correctly copied (no extra spaces)
- Check API key permissions/scopes
- Ensure you have credits/quota available

### Cannot Connect to Server
- Check firewall settings
- Verify Node.js is installed: `node --version`
- Check if server is running: `npm start`

## 📝 License
ISC License

## 👤 Author
Your Name

## 🤝 Support
For issues or questions, please check the README.md or create an issue in the repository.
