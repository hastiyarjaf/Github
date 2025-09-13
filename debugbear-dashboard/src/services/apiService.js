/**
 * API Service for DebugBear Dashboard
 * Handles all backend communication with fallback to demo mode
 */

import { demoService } from './demoService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL
        this.demoMode = import.meta.env.VITE_DEMO_MODE === 'true'
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        }

        try {
            const response = await fetch(url, config)
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                
                // If API is not configured, switch to demo mode for certain endpoints
                if (response.status === 503 && this.shouldFallbackToDemo(endpoint)) {
                    console.warn(`API not configured for ${endpoint}, using demo data`)
                    return this.getDemoData(endpoint, options)
                }
                
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            console.error(`API request failed: ${endpoint}`, error)
            
            // Fallback to demo mode for network errors on key endpoints
            if (this.shouldFallbackToDemo(endpoint)) {
                console.warn(`Network error for ${endpoint}, using demo data`)
                return this.getDemoData(endpoint, options)
            }
            
            throw error
        }
    }

    shouldFallbackToDemo(endpoint) {
        const demoEndpoints = ['/projects', '/ai/analyze']
        return demoEndpoints.some(demoEndpoint => endpoint.startsWith(demoEndpoint))
    }

    async getDemoData(endpoint, options = {}) {
        if (endpoint === '/projects') {
            return demoService.getDemoProjects()
        }
        
        if (endpoint.startsWith('/projects/') && endpoint.endsWith('/metrics')) {
            const projectId = endpoint.split('/')[2]
            return demoService.getDemoMetrics(projectId)
        }
        
        if (endpoint === '/ai/analyze') {
            const { metrics, url } = JSON.parse(options.body || '{}')
            const projectName = url ? new URL(url).hostname : 'Demo Project'
            return demoService.getDemoAIAnalysis(metrics, projectName)
        }
        
        return { message: 'Demo data not available for this endpoint' }
    }

    // System health check
    async checkHealth() {
        try {
            return await this.request('/health')
        } catch (error) {
            return {
                status: 'demo-mode',
                timestamp: new Date().toISOString(),
                services: {
                    debugBear: false,
                    openAI: false,
                    gemini: false,
                    websocket: 0
                },
                version: '2.0.0-demo',
                features: {
                    aiAnalysis: true,
                    realTimeMonitoring: true,
                    performanceTracking: true
                }
            }
        }
    }

    // Projects
    async fetchProjects() {
        return this.request('/projects')
    }

    async fetchProject(id) {
        return this.request(`/projects/${id}`)
    }

    async fetchProjectMetrics(id) {
        return this.request(`/projects/${id}/metrics`)
    }

    // AI Analysis
    async analyzeWithAI(data) {
        return this.request('/ai/analyze', {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    async generateAIInsights(projectIds) {
        return this.request('/ai/insights', {
            method: 'POST',
            body: JSON.stringify({ projectIds })
        })
    }

    // Monitoring
    async startMonitoring(projectId) {
        return this.request(`/monitor/${projectId}`)
    }

    async getHistoricalData(projectId, timeRange = '24h') {
        return this.request(`/projects/${projectId}/history?range=${timeRange}`)
    }

    // Demo-specific methods
    async getDemoRealtimeData(projectId) {
        return demoService.getDemoRealtimeData(projectId)
    }
}

export const apiService = new ApiService()