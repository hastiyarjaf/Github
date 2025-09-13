/**
 * DebugBear Performance Dashboard - Backend Server
 * A modern, AI-powered performance monitoring system
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');
const { DebugBear } = require('debugbear');
const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Configuration
const PORT = process.env.PORT || 5000;
const config = {
    debugBearApiKey: process.env.DEBUGBEAR_API_KEY,
    openAiApiKey: process.env.OPENAI_API_KEY,
    geminiApiKey: process.env.GEMINI_API_KEY,
    isDevelopment: process.env.NODE_ENV === 'development'
};

// Initialize clients
let debugBearClient;
let openAiClient;
let geminiClient;

try {
    if (config.debugBearApiKey && config.debugBearApiKey !== 'your_actual_api_key_here') {
        debugBearClient = new DebugBear(config.debugBearApiKey);
        console.log('✅ DebugBear client initialized');
    } else {
        console.warn('⚠️ DebugBear API key not configured');
    }
    
    if (config.openAiApiKey && config.openAiApiKey !== 'your_openai_api_key_here') {
        openAiClient = new OpenAI({ apiKey: config.openAiApiKey });
        console.log('✅ OpenAI client initialized');
    } else {
        console.warn('⚠️ OpenAI API key not configured');
    }

    if (config.geminiApiKey && config.geminiApiKey !== 'your_gemini_api_key_here') {
        geminiClient = new GoogleGenerativeAI(config.geminiApiKey);
        console.log('✅ Google AI (Gemini) client initialized');
    } else {
        console.warn('⚠️ Google AI API key not configured');
    }
} catch (error) {
    console.error('❌ Error initializing clients:', error.message);
}

// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // We'll configure this properly for production
}));
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Static files (for frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
            debugBear: !!debugBearClient,
            openAI: !!openAiClient,
            gemini: !!geminiClient,
            websocket: io.engine.clientsCount
        },
        version: '2.0.0',
        features: {
            aiAnalysis: !!(openAiClient || geminiClient),
            realTimeMonitoring: true,
            performanceTracking: !!debugBearClient
        }
    });
});

// API Routes

/**
 * Get all projects
 */
app.get('/api/projects', async (req, res) => {
    try {
        if (!debugBearClient) {
            return res.status(503).json({
                error: 'DebugBear service not configured',
                message: 'Please configure your DebugBear API key'
            });
        }

        const projects = await debugBearClient.projects.list();
        
        // Enhance with AI insights if available
        if (openAiClient && projects.length > 0) {
            const insights = await generateProjectInsights(projects);
            return res.json({
                projects,
                insights,
                timestamp: new Date().toISOString()
            });
        }
        
        res.json({
            projects,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            error: 'Failed to fetch projects',
            message: error.message
        });
    }
});

/**
 * Get project details by ID
 */
app.get('/api/projects/:id', async (req, res) => {
    try {
        if (!debugBearClient) {
            return res.status(503).json({
                error: 'DebugBear service not configured'
            });
        }

        const { id } = req.params;
        // Note: Adjust this based on actual DebugBear API
        const project = await debugBearClient.projects.get(id);
        
        res.json({
            project,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({
            error: 'Failed to fetch project',
            message: error.message
        });
    }
});

/**
 * Get performance metrics for a project
 */
app.get('/api/projects/:id/metrics', async (req, res) => {
    try {
        if (!debugBearClient) {
            return res.status(503).json({
                error: 'DebugBear service not configured'
            });
        }

        const { id } = req.params;
        // Fetch metrics (adjust based on actual DebugBear API)
        // This is a placeholder - actual implementation depends on DebugBear API
        const metrics = {
            projectId: id,
            performance: {
                loadTime: Math.random() * 3000 + 1000,
                firstContentfulPaint: Math.random() * 1500 + 500,
                largestContentfulPaint: Math.random() * 2500 + 1000,
                totalBlockingTime: Math.random() * 300 + 50,
                cumulativeLayoutShift: Math.random() * 0.3,
                speedIndex: Math.random() * 3000 + 1000
            },
            timestamp: new Date().toISOString()
        };
        
        // Generate AI recommendations if available
        if (openAiClient) {
            metrics.aiRecommendations = await generatePerformanceRecommendations(metrics.performance);
        }
        
        res.json(metrics);
    } catch (error) {
        console.error('Error fetching metrics:', error);
        res.status(500).json({
            error: 'Failed to fetch metrics',
            message: error.message
        });
    }
});

/**
 * Enhanced AI-powered performance analysis endpoint with Gemini support
 */
app.post('/api/ai/analyze', async (req, res) => {
    try {
        if (!openAiClient && !geminiClient) {
            return res.status(503).json({
                error: 'AI service not configured',
                message: 'Please configure your OpenAI or Google AI API key for AI features'
            });
        }

        const { metrics, url, analysisType = 'comprehensive' } = req.body;
        
        let analysis;
        
        // Prefer Gemini for comprehensive analysis, OpenAI for quick analysis
        if (analysisType === 'comprehensive' && geminiClient) {
            analysis = await analyzeWithGemini(metrics, url);
        } else if (openAiClient) {
            analysis = await analyzePerformanceWithAI(metrics, url);
        } else if (geminiClient) {
            analysis = await analyzeWithGemini(metrics, url);
        }
        
        res.json({
            analysis,
            model: geminiClient && analysisType === 'comprehensive' ? 'gemini-1.5-pro' : 'gpt-3.5-turbo',
            analysisType,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error in AI analysis:', error);
        res.status(500).json({
            error: 'Failed to analyze performance',
            message: error.message
        });
    }
});

/**
 * Generate comprehensive project insights using AI
 */
app.post('/api/ai/project-insights', async (req, res) => {
    try {
        const { projects, model = 'gemini-1.5-flash' } = req.body;
        
        let insights;
        if (model.includes('gemini') && geminiClient) {
            insights = await generateProjectInsightsWithGemini(projects);
        } else if (openAiClient) {
            insights = await generateProjectInsights(projects);
        } else {
            throw new Error('No AI service available');
        }
        
        res.json({
            insights,
            model,
            projectCount: projects.length,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error generating project insights:', error);
        res.status(500).json({
            error: 'Failed to generate insights',
            message: error.message
        });
    }
});

/**
 * Generate AI recommendations
 */
app.post('/api/ai/recommendations', async (req, res) => {
    try {
        const { prompt, model = 'gpt-3.5-turbo' } = req.body;
        
        let recommendations;
        if (model.includes('gemini') && geminiClient) {
            recommendations = await generateRecommendationsWithGemini(prompt);
        } else if (openAiClient) {
            recommendations = await generateRecommendationsWithOpenAI(prompt);
        } else {
            throw new Error('No AI service available');
        }
        
        res.json({
            recommendations,
            model,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).json({
            error: 'Failed to generate recommendations',
            message: error.message
        });
    }
});

/**
 * Real-time monitoring websocket endpoint
 */
app.get('/api/monitor/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params;
        
        // Start monitoring
        startRealTimeMonitoring(projectId);
        
        res.json({
            status: 'monitoring_started',
            projectId,
            websocket: '/ws'
        });
    } catch (error) {
        console.error('Error starting monitoring:', error);
        res.status(500).json({
            error: 'Failed to start monitoring',
            message: error.message
        });
    }
});

// Enhanced AI Helper Functions with Google Gemini Support

/**
 * Analyze performance using Google Gemini
 */
async function analyzeWithGemini(metrics, url) {
    if (!geminiClient) return null;
    
    try {
        const model = geminiClient.getGenerativeModel({ model: "gemini-1.5-pro" });
        
        const prompt = `As a senior web performance engineer, analyze these performance metrics for ${url}:

Performance Metrics:
${JSON.stringify(metrics, null, 2)}

Please provide a comprehensive analysis including:
1. Overall performance assessment (score 0-100)
2. Critical issues identified
3. Specific optimization recommendations with priority levels
4. Estimated performance impact of each recommendation
5. Implementation complexity assessment

Format your response as structured JSON with the following schema:
{
  "performanceScore": number,
  "assessment": "string",
  "criticalIssues": ["string"],
  "recommendations": [
    {
      "priority": "high|medium|low",
      "issue": "string",
      "recommendation": "string",
      "estimatedImpact": "string",
      "complexity": "low|medium|high"
    }
  ],
  "summary": "string"
}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        try {
            return JSON.parse(text);
        } catch {
            return { analysis: text, source: 'gemini-1.5-pro' };
        }
    } catch (error) {
        console.error('Error with Gemini analysis:', error);
        return null;
    }
}

/**
 * Generate project insights using Gemini
 */
async function generateProjectInsightsWithGemini(projects) {
    if (!geminiClient) return null;
    
    try {
        const model = geminiClient.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `Analyze these web performance monitoring projects and provide actionable insights:

Projects:
${projects.map(p => `- ${p.name}: ${p.url}`).join('\n')}

Provide insights about:
1. Overall portfolio health
2. Common performance patterns
3. Strategic recommendations
4. Priority areas for optimization
5. Resource allocation suggestions

Keep insights concise and actionable.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        return {
            insights: response.text(),
            source: 'gemini-1.5-flash',
            projectCount: projects.length
        };
    } catch (error) {
        console.error('Error generating Gemini insights:', error);
        return null;
    }
}

/**
 * Generate recommendations using Gemini
 */
async function generateRecommendationsWithGemini(prompt) {
    if (!geminiClient) return null;
    
    try {
        const model = geminiClient.getGenerativeModel({ model: "gemini-1.5-pro" });
        
        const enhancedPrompt = `${prompt}

Please provide specific, actionable recommendations in JSON format:
[
  {
    "priority": "high|medium|low",
    "category": "string",
    "recommendation": "string",
    "implementation": "string",
    "estimatedImpact": "string",
    "timeToImplement": "string"
  }
]`;

        const result = await model.generateContent(enhancedPrompt);
        const response = await result.response;
        const text = response.text();
        
        try {
            return JSON.parse(text);
        } catch {
            return [{ 
                priority: 'medium',
                category: 'General',
                recommendation: text,
                source: 'gemini-1.5-pro'
            }];
        }
    } catch (error) {
        console.error('Error generating Gemini recommendations:', error);
        return null;
    }
}

/**
 * Generate recommendations using OpenAI
 */
async function generateRecommendationsWithOpenAI(prompt) {
    if (!openAiClient) return null;
    
    try {
        const completion = await openAiClient.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a web performance expert. Provide specific, technical recommendations in JSON format."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 500
        });
        
        try {
            return JSON.parse(completion.choices[0].message.content);
        } catch {
            return [{ 
                recommendation: completion.choices[0].message.content,
                source: 'gpt-3.5-turbo'
            }];
        }
    } catch (error) {
        console.error('Error generating OpenAI recommendations:', error);
        return null;
    }
}

/**
 * Generate AI insights for projects
 */
async function generateProjectInsights(projects) {
    if (!openAiClient) return null;
    
    try {
        const prompt = `Analyze these web performance monitoring projects and provide brief insights:
        ${JSON.stringify(projects.map(p => ({ name: p.name, url: p.url })))}
        
        Provide a brief summary of potential optimization opportunities.`;
        
        const completion = await openAiClient.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a web performance expert. Provide concise, actionable insights."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 200
        });
        
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error generating insights:', error);
        return null;
    }
}

/**
 * Generate performance recommendations using AI
 */
async function generatePerformanceRecommendations(metrics) {
    if (!openAiClient) return null;
    
    try {
        const prompt = `Based on these web performance metrics, provide 3 specific recommendations:
        - Load Time: ${metrics.loadTime}ms
        - FCP: ${metrics.firstContentfulPaint}ms
        - LCP: ${metrics.largestContentfulPaint}ms
        - TBT: ${metrics.totalBlockingTime}ms
        - CLS: ${metrics.cumulativeLayoutShift}
        - Speed Index: ${metrics.speedIndex}ms
        
        Format as a JSON array with 'priority', 'issue', and 'recommendation' fields.`;
        
        const completion = await openAiClient.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a web performance expert. Provide specific, technical recommendations in JSON format."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 300
        });
        
        try {
            return JSON.parse(completion.choices[0].message.content);
        } catch {
            return completion.choices[0].message.content;
        }
    } catch (error) {
        console.error('Error generating recommendations:', error);
        return null;
    }
}

/**
 * Comprehensive AI performance analysis
 */
async function analyzePerformanceWithAI(metrics, url) {
    if (!openAiClient) return null;
    
    try {
        const prompt = `Perform a comprehensive performance analysis for ${url} with these metrics:
        ${JSON.stringify(metrics, null, 2)}
        
        Provide:
        1. Overall performance score (0-100)
        2. Key issues identified
        3. Top 5 actionable recommendations
        4. Estimated impact of improvements
        
        Format as structured JSON.`;
        
        const completion = await openAiClient.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a senior web performance engineer. Provide detailed, technical analysis."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 500
        });
        
        try {
            return JSON.parse(completion.choices[0].message.content);
        } catch {
            return { analysis: completion.choices[0].message.content };
        }
    } catch (error) {
        console.error('Error in AI analysis:', error);
        return null;
    }
}

// WebSocket handling for real-time monitoring
function startRealTimeMonitoring(projectId) {
    // Simulate real-time metrics
    const interval = setInterval(() => {
        const metrics = {
            projectId,
            timestamp: new Date().toISOString(),
            cpu: Math.random() * 100,
            memory: Math.random() * 100,
            responseTime: Math.random() * 1000 + 100,
            errorRate: Math.random() * 5
        };
        
        io.emit('metrics', metrics);
    }, 5000);
    
    // Clean up after 1 hour
    setTimeout(() => {
        clearInterval(interval);
    }, 3600000);
}

// WebSocket connection handling
io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);
    
    socket.on('subscribe', (projectId) => {
        socket.join(`project-${projectId}`);
        console.log(`Client ${socket.id} subscribed to project ${projectId}`);
    });
    
    socket.on('disconnect', () => {
        console.log('🔌 Client disconnected:', socket.id);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: config.isDevelopment ? err.message : 'Something went wrong'
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`
    🚀 DebugBear Performance Dashboard Server
    =====================================
    🌐 Server running on: http://localhost:${PORT}
    📡 WebSocket enabled
    🤖 AI Features: ${openAiClient ? 'Enabled' : 'Disabled'}
    🔍 DebugBear: ${debugBearClient ? 'Connected' : 'Not configured'}
    🛡️  Environment: ${process.env.NODE_ENV || 'development'}
    `);
});

module.exports = { app, server, io };
