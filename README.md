# WeDoNet Platform 🚀

A secure, AI-powered talent management and real-time collaboration platform built with modern web technologies and security-first principles.

## 🌟 Features

### Security & Privacy First
- ✅ **OWASP Top 10 Compliance**: Comprehensive security measures against common vulnerabilities
- ✅ **JWT Authentication**: Short-lived access tokens with secure refresh token rotation
- ✅ **Input Validation**: Multi-layer validation using express-validator and Joi
- ✅ **Rate Limiting**: Protection against DDoS and brute force attacks
- ✅ **Security Headers**: Helmet.js with CSP, HSTS, and XSS protection
- ✅ **Password Security**: bcrypt with configurable rounds
- ✅ **Role-Based Access Control (RBAC)**: Fine-grained permissions system

### Modern Architecture
- ✅ **Service Layer Architecture**: Clear separation of concerns
- ✅ **Zustand State Management**: Lightweight and performant state management
- ✅ **Real-time Communication**: WebSocket support with Socket.IO
- ✅ **Comprehensive Logging**: Winston with security event tracking
- ✅ **Error Monitoring**: Sentry integration for production monitoring

### AI-Powered Features
- 🔄 **LLM Integration**: OpenAI GPT integration for intelligent features
- 🔄 **Background Processing**: BullMQ with Redis for asynchronous tasks
- 🔄 **Smart Recommendations**: AI-powered suggestions and insights

### Real-time Collaboration
- 🔄 **Live Chat**: Real-time messaging system
- 🔄 **Interactive Maps**: Leaflet integration for location features
- 🔄 **Live Updates**: WebSocket-based real-time updates
- 🔄 **Notifications**: Push notifications system

### Production Ready
- ✅ **Comprehensive Testing**: Unit, Integration, and E2E tests
- ✅ **CI/CD Pipeline**: GitHub Actions with automated testing and deployment
- ✅ **Docker Support**: Containerized development and production environments
- ✅ **Monitoring**: Health checks, metrics, and performance monitoring

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Frontend      │───▶│    Backend      │───▶│    Database     │
│   (React)       │    │   (Express)     │    │   (SQLite)      │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   WebSocket     │    │     Redis       │    │    Services     │
│   (Socket.IO)   │    │   (Sessions)    │    │   (User/AI)     │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **npm** 9+
- **Docker** and **Docker Compose** (recommended)
- **Git**

### Option 1: Docker (Recommended)

1. **Clone and setup:**
   ```bash
   git clone https://github.com/hastiyarjaf/Github.git wedonet-platform
   cd wedonet-platform
   cp .env.example .env
   ```

2. **Start with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Database Admin: http://localhost:8080 (run with `--profile admin`)

### Option 2: Local Development

1. **Clone and setup:**
   ```bash
   git clone https://github.com/hastiyarjaf/Github.git wedonet-platform
   cd wedonet-platform
   npm run setup
   ```

2. **Start Redis (required):**
   ```bash
   redis-server
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
wedonet-platform/
├── 🎨 wedonet-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── stores/              # Zustand state stores
│   │   ├── services/            # API service layer
│   │   ├── hooks/               # Custom React hooks
│   │   └── utils/               # Utility functions
│   └── tests/                   # Frontend tests
├── ⚙️  wedonet-backend/           # Express.js backend API
│   ├── src/
│   │   ├── controllers/         # Route controllers
│   │   ├── services/            # Business logic layer
│   │   ├── middleware/          # Express middleware
│   │   ├── models/              # Database models
│   │   ├── routes/              # API routes
│   │   ├── utils/               # Utility functions
│   │   └── config/              # Configuration management
│   └── tests/                   # Backend tests
├── 📊 debugbear-dashboard/       # Performance monitoring dashboard
├── 🧪 tests/                     # E2E tests (Playwright)
├── 🐳 docker-compose.yml         # Docker services configuration
├── 🔧 .github/workflows/         # CI/CD pipeline
└── 📚 docs/                      # Documentation
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Security (CHANGE IN PRODUCTION!)
JWT_ACCESS_SECRET=your-super-secure-access-secret-key
JWT_REFRESH_SECRET=your-super-secure-refresh-secret-key
ADMIN_PASSWORD=YourSecurePassword123!

# Database
DB_FILENAME=./database.db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# API Keys (Optional)
OPENAI_API_KEY=your-openai-api-key
SENTRY_DSN=your-sentry-dsn

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Admin Access

Default admin credentials:
- **Username:** `admin`
- **Password:** `AdminPassword123!` (change in production)

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Backend Tests
```bash
cd wedonet-backend
npm test                    # Run tests
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report
```

### Frontend Tests
```bash
cd wedonet-frontend
npm test                    # Run tests
npm run test:coverage       # Coverage report
```

### E2E Tests
```bash
npx playwright test         # Run E2E tests
npx playwright test --ui    # Interactive mode
npx playwright test --debug # Debug mode
```

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication with refresh token rotation
- Password hashing with bcrypt (configurable rounds)
- Session management with secure cookies
- Role-based access control (RBAC)
- Account lockout after failed attempts

### Input Validation & Sanitization
- Multi-layer input validation (client + server)
- SQL injection prevention with prepared statements
- XSS protection with input sanitization
- CSRF protection with tokens

### Security Headers & Policies
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

### Rate Limiting & DDoS Protection
- Global rate limiting (100 requests/15 minutes)
- Auth endpoint limiting (5 attempts/15 minutes)
- IP-based request throttling

### Monitoring & Logging
- Comprehensive security event logging
- Winston logger with log rotation
- Sentry error tracking integration
- Real-time security alerts

## 📊 Monitoring & Observability

### Health Checks
```bash
# Backend health
curl http://localhost:3001/health

# Response
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "services": {
    "database": true,
    "redis": true,
    "websocket": 0
  }
}
```

### Logging
- **Application logs:** `wedonet-backend/logs/app.log`
- **Error logs:** `wedonet-backend/logs/error.log`
- **Security logs:** `wedonet-backend/logs/security.log`

### Metrics
- Request/response times
- Error rates and types
- Authentication events
- Security events
- Performance metrics

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Environment-specific Configs
- **Development:** Local development with hot reload
- **Staging:** Pre-production testing environment
- **Production:** Optimized production build

## 🤝 Contributing

### Code Standards
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **Conventional Commits**: Commit message format

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Pre-commit Hooks
- Code linting (ESLint)
- Security audit (npm audit)
- Test execution
- Type checking

## 📈 Performance

### Frontend Optimization
- Code splitting with React.lazy()
- Image optimization and lazy loading
- Bundle size monitoring
- Performance metrics with Web Vitals

### Backend Optimization
- Database query optimization
- Response compression (gzip)
- Connection pooling
- Memory usage monitoring

### Caching Strategy
- Redis for session storage
- In-memory caching for frequently accessed data
- CDN for static assets

## 🔧 API Documentation

### Authentication Endpoints
```http
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me
```

### Public Endpoints
```http
POST /api/apply      # Submit application
POST /api/contact    # Send contact message
GET  /health         # Health check
```

### Protected Endpoints
```http
GET  /api/admin/applications  # List applications (Admin)
GET  /api/admin/messages      # List messages (Admin)
```

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
lsof -ti:3000 | xargs kill -9  # Kill process on port 3000
lsof -ti:3001 | xargs kill -9  # Kill process on port 3001
```

**Database locked:**
```bash
rm wedonet-backend/database.db  # Remove database file
npm run dev                     # Restart to recreate
```

**Redis connection failed:**
```bash
redis-server                    # Start Redis server
# Or use Docker:
docker run -d -p 6379:6379 redis:alpine
```

**Tests failing:**
```bash
npm run test:clean              # Clean test cache
npm test                        # Run tests again
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OWASP** for security guidelines
- **React Team** for the amazing framework
- **Express.js** for the robust backend framework
- **JWT.io** for token standards
- **All contributors** who help make this project better

---

<div align="center">
  <strong>Built with ❤️ by the WeDoNet Team</strong>
  <br />
  <sub>Secure • Scalable • Modern</sub>
</div>