/**
 * API Service for DebugBear Dashboard
 * Handles all backend communication
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL
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
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            console.error(`API request failed: ${endpoint}`, error)
            throw error
        }
    }

    // System health check
    async checkHealth() {
        return this.request('/health')
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
}

export const apiService = new ApiService()