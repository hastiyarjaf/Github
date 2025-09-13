/**
 * AI Service for Advanced Analytics
 * Handles AI-powered analysis and insights
 */

import { apiService } from './apiService'

class AIService {
    constructor() {
        this.models = {
            performance: 'gemini-1.5-pro',
            insights: 'gemini-1.5-flash',
            recommendations: 'gpt-3.5-turbo'
        }
    }

    /**
     * Analyze performance metrics with AI
     * @param {Object} data - Performance data to analyze
     * @returns {Promise<Object>} AI analysis results
     */
    async analyzePerformance(data) {
        try {
            const analysis = await apiService.analyzeWithAI({
                ...data,
                model: this.models.performance
            })
            
            return {
                ...analysis,
                timestamp: new Date().toISOString(),
                confidence: this.calculateConfidence(analysis)
            }
        } catch (error) {
            console.error('AI performance analysis failed:', error)
            return this.getFallbackAnalysis(data)
        }
    }

    /**
     * Generate comprehensive insights for projects
     * @param {Array} projects - Project data
     * @returns {Promise<Object>} AI-generated insights
     */
    async generateProjectInsights(projects) {
        try {
            const insights = await apiService.request('/ai/project-insights', {
                method: 'POST',
                body: JSON.stringify({ 
                    projects,
                    model: this.models.insights
                })
            })

            return this.enhanceInsights(insights)
        } catch (error) {
            console.error('Failed to generate project insights:', error)
            return this.getDefaultInsights(projects)
        }
    }

    /**
     * Generate performance recommendations
     * @param {Object} metrics - Performance metrics
     * @param {Object} context - Additional context
     * @returns {Promise<Array>} AI recommendations
     */
    async generateRecommendations(metrics, context = {}) {
        try {
            const prompt = this.buildRecommendationPrompt(metrics, context)
            const recommendations = await apiService.request('/ai/recommendations', {
                method: 'POST',
                body: JSON.stringify({ 
                    prompt,
                    model: this.models.recommendations
                })
            })

            return this.prioritizeRecommendations(recommendations)
        } catch (error) {
            console.error('Failed to generate recommendations:', error)
            return this.getDefaultRecommendations(metrics)
        }
    }

    /**
     * Generate a comprehensive AI report
     * @param {Object} data - Report data
     * @returns {Promise<Object>} Generated report
     */
    async generateReport(data) {
        try {
            const analysis = await this.analyzePerformance({
                metrics: data.metrics,
                url: data.project.url
            })

            const recommendations = await this.generateRecommendations(data.metrics, {
                projectName: data.project.name,
                url: data.project.url
            })

            return {
                project: data.project,
                generatedAt: new Date().toISOString(),
                summary: this.generateSummary(data.metrics),
                analysis,
                recommendations,
                actionItems: this.extractActionItems(recommendations),
                performanceScore: this.calculatePerformanceScore(data.metrics),
                trends: data.realtimeData ? this.analyzeTrends(data.realtimeData) : null
            }
        } catch (error) {
            console.error('Failed to generate AI report:', error)
            throw error
        }
    }

    /**
     * Predict performance trends
     * @param {Array} historicalData - Historical performance data
     * @returns {Promise<Object>} Trend predictions
     */
    async predictTrends(historicalData) {
        try {
            const prediction = await apiService.request('/ai/predict-trends', {
                method: 'POST',
                body: JSON.stringify({ 
                    data: historicalData,
                    horizon: '7d' // Predict next 7 days
                })
            })

            return {
                ...prediction,
                confidence: this.calculatePredictionConfidence(historicalData),
                recommendations: this.getTrendRecommendations(prediction)
            }
        } catch (error) {
            console.error('Failed to predict trends:', error)
            return this.getDefaultTrendPrediction()
        }
    }

    // Helper methods
    calculateConfidence(analysis) {
        // Simple confidence calculation based on data completeness
        const factors = [
            analysis.dataPoints > 10,
            analysis.timespan > 3600000, // 1 hour
            analysis.metrics && Object.keys(analysis.metrics).length > 3
        ]
        
        return factors.filter(Boolean).length / factors.length
    }

    enhanceInsights(insights) {
        return {
            ...insights,
            priority: this.categorizePriority(insights),
            actionable: this.extractActionableItems(insights),
            estimated_impact: this.estimateImpact(insights)
        }
    }

    buildRecommendationPrompt(metrics, context) {
        return `
            Analyze these performance metrics for ${context.projectName || 'a web application'}:
            - Load Time: ${metrics.loadTime}ms
            - First Contentful Paint: ${metrics.firstContentfulPaint}ms
            - Largest Contentful Paint: ${metrics.largestContentfulPaint}ms
            - Total Blocking Time: ${metrics.totalBlockingTime}ms
            - Cumulative Layout Shift: ${metrics.cumulativeLayoutShift}
            - Speed Index: ${metrics.speedIndex}ms
            
            URL: ${context.url || 'Not specified'}
            
            Provide specific, actionable recommendations with estimated impact and implementation difficulty.
        `
    }

    prioritizeRecommendations(recommendations) {
        return recommendations
            .map(rec => ({
                ...rec,
                priority: this.calculatePriority(rec),
                effort: this.estimateEffort(rec)
            }))
            .sort((a, b) => b.priority - a.priority)
    }

    calculatePerformanceScore(metrics) {
        if (!metrics) return 0

        // Scoring based on Core Web Vitals and other metrics
        const scores = {
            lcp: this.scoreLCP(metrics.largestContentfulPaint),
            fid: 100, // Assuming good FID since we don't have TBT threshold
            cls: this.scoreCLS(metrics.cumulativeLayoutShift),
            fcp: this.scoreFCP(metrics.firstContentfulPaint),
            si: this.scoreSpeedIndex(metrics.speedIndex)
        }

        const weights = { lcp: 0.25, fid: 0.25, cls: 0.25, fcp: 0.125, si: 0.125 }
        
        return Object.entries(scores).reduce((total, [metric, score]) => {
            return total + (score * weights[metric])
        }, 0)
    }

    scoreLCP(lcp) {
        if (lcp <= 2500) return 100
        if (lcp <= 4000) return 50
        return 0
    }

    scoreCLS(cls) {
        if (cls <= 0.1) return 100
        if (cls <= 0.25) return 50
        return 0
    }

    scoreFCP(fcp) {
        if (fcp <= 1800) return 100
        if (fcp <= 3000) return 50
        return 0
    }

    scoreSpeedIndex(si) {
        if (si <= 3400) return 100
        if (si <= 5800) return 50
        return 0
    }

    generateSummary(metrics) {
        const score = this.calculatePerformanceScore(metrics)
        
        if (score >= 90) return "Excellent performance with room for minor optimizations."
        if (score >= 70) return "Good performance with some areas for improvement."
        if (score >= 50) return "Average performance needing attention in key areas."
        return "Poor performance requiring immediate optimization efforts."
    }

    // Fallback methods for when AI services are unavailable
    getFallbackAnalysis(data) {
        return {
            analysis: "AI analysis unavailable. Using fallback assessment.",
            score: this.calculatePerformanceScore(data.metrics),
            recommendations: this.getDefaultRecommendations(data.metrics),
            confidence: 0.5
        }
    }

    getDefaultRecommendations(metrics) {
        const recommendations = []
        
        if (metrics.loadTime > 3000) {
            recommendations.push({
                priority: 'high',
                issue: 'Slow page load time',
                recommendation: 'Optimize images, minify CSS/JS, enable compression',
                impact: 'high'
            })
        }
        
        if (metrics.largestContentfulPaint > 2500) {
            recommendations.push({
                priority: 'high',
                issue: 'Poor Largest Contentful Paint',
                recommendation: 'Optimize largest image or text block loading',
                impact: 'high'
            })
        }
        
        return recommendations
    }

    getDefaultInsights(projects) {
        return {
            overview: `Managing ${projects.length} project${projects.length !== 1 ? 's' : ''}`,
            suggestions: [
                "Regular performance monitoring helps identify issues early",
                "Consider implementing performance budgets",
                "Monitor Core Web Vitals for better user experience"
            ]
        }
    }

    // Additional utility methods
    categorizePriority(insights) {
        // Logic to categorize insights by priority
        return 'medium'
    }

    extractActionableItems(insights) {
        // Extract actionable items from insights
        return []
    }

    estimateImpact(insights) {
        // Estimate the impact of implementing insights
        return 'medium'
    }

    calculatePriority(recommendation) {
        // Calculate priority score for recommendations
        return Math.random() * 100 // Placeholder
    }

    estimateEffort(recommendation) {
        // Estimate implementation effort
        const efforts = ['low', 'medium', 'high']
        return efforts[Math.floor(Math.random() * efforts.length)]
    }

    extractActionItems(recommendations) {
        return recommendations.slice(0, 5).map(rec => ({
            action: rec.recommendation,
            priority: rec.priority,
            estimatedTime: this.estimateImplementationTime(rec)
        }))
    }

    estimateImplementationTime(recommendation) {
        const timeEstimates = {
            low: '1-2 hours',
            medium: '4-8 hours',
            high: '1-3 days'
        }
        return timeEstimates[recommendation.effort] || '2-4 hours'
    }

    analyzeTrends(realtimeData) {
        // Analyze trends from real-time data
        return {
            direction: 'improving',
            confidence: 0.8,
            keyChanges: []
        }
    }

    calculatePredictionConfidence(historicalData) {
        return Math.min(historicalData.length / 100, 0.95)
    }

    getTrendRecommendations(prediction) {
        return [
            "Monitor the predicted changes closely",
            "Consider proactive optimizations",
            "Set up alerts for threshold breaches"
        ]
    }

    getDefaultTrendPrediction() {
        return {
            trend: 'stable',
            confidence: 0.6,
            recommendations: this.getTrendRecommendations({})
        }
    }
}

export const aiService = new AIService()