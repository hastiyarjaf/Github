/**
 * Demo Mode Service
 * Provides realistic mock data for demonstration purposes
 */

class DemoService {
    constructor() {
        this.isDemoMode = true // Set to true for demo purposes
        this.mockProjects = [
            {
                id: 'demo-1',
                name: 'E-commerce Store',
                url: 'https://example-store.com',
                created_at: '2024-01-15T10:30:00Z'
            },
            {
                id: 'demo-2', 
                name: 'Corporate Website',
                url: 'https://company-site.com',
                created_at: '2024-02-01T14:20:00Z'
            },
            {
                id: 'demo-3',
                name: 'Blog Platform',
                url: 'https://awesome-blog.com',
                created_at: '2024-02-15T09:45:00Z'
            }
        ]
    }

    async getDemoProjects() {
        return {
            projects: this.mockProjects,
            insights: "Your portfolio shows good diversity with 3 different types of websites. The e-commerce store needs the most attention for performance optimization.",
            timestamp: new Date().toISOString()
        }
    }

    async getDemoMetrics(projectId) {
        const variations = {
            'demo-1': { // E-commerce - needs improvement
                loadTime: 3200,
                firstContentfulPaint: 1800,
                largestContentfulPaint: 2800,
                totalBlockingTime: 180,
                cumulativeLayoutShift: 0.15,
                speedIndex: 3100
            },
            'demo-2': { // Corporate - good performance
                loadTime: 2100,
                firstContentfulPaint: 1200,
                largestContentfulPaint: 2000,
                totalBlockingTime: 80,
                cumulativeLayoutShift: 0.08,
                speedIndex: 2300
            },
            'demo-3': { // Blog - excellent performance
                loadTime: 1600,
                firstContentfulPaint: 900,
                largestContentfulPaint: 1500,
                totalBlockingTime: 45,
                cumulativeLayoutShift: 0.05,
                speedIndex: 1800
            }
        }

        const performance = variations[projectId] || variations['demo-2']
        
        return {
            projectId,
            performance,
            aiRecommendations: this.generateMockRecommendations(performance),
            timestamp: new Date().toISOString()
        }
    }

    generateMockRecommendations(performance) {
        const recommendations = []
        
        if (performance.loadTime > 2500) {
            recommendations.push({
                priority: 'high',
                issue: 'Slow page load time',
                recommendation: 'Optimize images and enable compression. Consider implementing a CDN.',
                estimatedImpact: '1.2s faster load time',
                complexity: 'medium'
            })
        }

        if (performance.largestContentfulPaint > 2500) {
            recommendations.push({
                priority: 'high',
                issue: 'Poor Largest Contentful Paint',
                recommendation: 'Optimize the largest image or text block. Use modern image formats like WebP.',
                estimatedImpact: '0.8s improvement in LCP',
                complexity: 'medium'
            })
        }

        if (performance.cumulativeLayoutShift > 0.1) {
            recommendations.push({
                priority: 'medium',
                issue: 'Layout shift detected',
                recommendation: 'Add dimensions to images and reserve space for dynamic content.',
                estimatedImpact: '50% reduction in CLS',
                complexity: 'low'
            })
        }

        if (performance.totalBlockingTime > 100) {
            recommendations.push({
                priority: 'medium',
                issue: 'Main thread blocking',
                recommendation: 'Split JavaScript bundles and defer non-critical scripts.',
                estimatedImpact: '0.3s faster interactivity',
                complexity: 'high'
            })
        }

        return recommendations
    }

    async getDemoAIAnalysis(metrics, projectName) {
        // Calculate performance score
        const scores = {
            lcp: this.scoreLCP(metrics.largestContentfulPaint),
            cls: this.scoreCLS(metrics.cumulativeLayoutShift),
            fcp: this.scoreFCP(metrics.firstContentfulPaint),
            tbt: this.scoreTBT(metrics.totalBlockingTime),
            si: this.scoreSpeedIndex(metrics.speedIndex)
        }

        const performanceScore = Math.round(
            (scores.lcp * 0.25) + 
            (scores.cls * 0.25) + 
            (scores.fcp * 0.15) + 
            (scores.tbt * 0.15) +
            (scores.si * 0.2)
        )

        const criticalIssues = []
        const recommendations = this.generateMockRecommendations(metrics)

        if (performanceScore < 50) {
            criticalIssues.push('Site performance is significantly below average')
            criticalIssues.push('User experience may be severely impacted')
        } else if (performanceScore < 70) {
            criticalIssues.push('Several optimization opportunities available')
        }

        return {
            analysis: {
                performanceScore,
                assessment: this.getAssessment(performanceScore, projectName),
                criticalIssues,
                recommendations,
                summary: this.getSummary(performanceScore)
            },
            model: 'demo-ai-engine',
            analysisType: 'comprehensive',
            timestamp: new Date().toISOString()
        }
    }

    // Scoring functions
    scoreLCP(lcp) {
        if (lcp <= 2500) return 100
        if (lcp <= 4000) return Math.round(100 - ((lcp - 2500) / 1500) * 50)
        return 0
    }

    scoreCLS(cls) {
        if (cls <= 0.1) return 100
        if (cls <= 0.25) return Math.round(100 - ((cls - 0.1) / 0.15) * 50)
        return 0
    }

    scoreFCP(fcp) {
        if (fcp <= 1800) return 100
        if (fcp <= 3000) return Math.round(100 - ((fcp - 1800) / 1200) * 50)
        return 0
    }

    scoreTBT(tbt) {
        if (tbt <= 200) return 100
        if (tbt <= 600) return Math.round(100 - ((tbt - 200) / 400) * 50)
        return 0
    }

    scoreSpeedIndex(si) {
        if (si <= 3400) return 100
        if (si <= 5800) return Math.round(100 - ((si - 3400) / 2400) * 50)
        return 0
    }

    getAssessment(score, projectName) {
        if (score >= 90) {
            return `${projectName} demonstrates exceptional performance with optimized loading patterns and excellent user experience metrics.`
        } else if (score >= 70) {
            return `${projectName} shows good performance characteristics with some areas for optimization to achieve peak performance.`
        } else if (score >= 50) {
            return `${projectName} has moderate performance that would benefit from focused optimization efforts, particularly in Core Web Vitals.`
        } else {
            return `${projectName} requires immediate performance attention. Current metrics indicate significant user experience impact that should be addressed urgently.`
        }
    }

    getSummary(score) {
        if (score >= 90) return "Excellent performance with minimal optimization needs."
        if (score >= 70) return "Good foundation with targeted improvements recommended."
        if (score >= 50) return "Moderate performance requiring focused optimization efforts."
        return "Poor performance needing comprehensive optimization strategy."
    }

    async getDemoRealtimeData(projectId) {
        return {
            projectId,
            timestamp: new Date().toISOString(),
            cpu: Math.random() * 60 + 20,
            memory: Math.random() * 70 + 15,
            responseTime: Math.random() * 500 + 800,
            errorRate: Math.random() * 2,
            activeUsers: Math.floor(Math.random() * 150 + 20),
            requestsPerMinute: Math.floor(Math.random() * 1000 + 200)
        }
    }
}

export const demoService = new DemoService()