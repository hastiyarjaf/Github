import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import './styles/App.css'

// Import components
import Navbar from './components/Navbar'
import MetricsOverview from './components/MetricsOverview'
import ProjectsList from './components/ProjectsList'
import { ProjectDetails } from './components/ProjectDetails'
import { PerformanceMetrics } from './components/PerformanceMetrics'
import { AIInsights } from './components/AIInsights'
import { RealTimeMonitor } from './components/RealTimeMonitor'
import { PerformanceCharts } from './components/PerformanceCharts'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import EmptyState from './components/EmptyState'
import HeroSection from './components/HeroSection'

// Import services
import { apiService } from './services/apiService'
import { aiService } from './services/aiService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:5000'

function App() {
    const [projects, setProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState(null)
    const [metrics, setMetrics] = useState(null)
    const [aiInsights, setAiInsights] = useState(null)
    const [realtimeData, setRealtimeData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [connected, setConnected] = useState(false)
    const [systemHealth, setSystemHealth] = useState(null)
    const socketRef = useRef(null)

    // Initialize WebSocket connection
    useEffect(() => {
        socketRef.current = io(WS_URL)
        
        socketRef.current.on('connect', () => {
            console.log('WebSocket connected')
            setConnected(true)
        })
        
        socketRef.current.on('disconnect', () => {
            console.log('WebSocket disconnected')
            setConnected(false)
        })
        
        socketRef.current.on('metrics', (data) => {
            setRealtimeData(prev => ({
                ...prev,
                [data.projectId]: data
            }))
        })

        socketRef.current.on('ai-insight', (data) => {
            setAiInsights(prev => ({
                ...prev,
                ...data
            }))
        })
        
        return () => {
            socketRef.current.disconnect()
        }
    }, [])

    // Fetch initial data on component mount
    useEffect(() => {
        fetchProjects()
        checkSystemHealth()
    }, [])

    const checkSystemHealth = async () => {
        try {
            const health = await apiService.checkHealth()
            setSystemHealth(health)
            console.log('System health:', health)
        } catch (error) {
            console.error('Health check failed:', error)
        }
    }

    const fetchProjects = async () => {
        try {
            setLoading(true)
            const data = await apiService.fetchProjects()
            setProjects(data.projects || [])
            setAiInsights(data.insights)
            setError(null)
        } catch (error) {
            setError(error.message)
            console.error('Error fetching projects:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchProjectMetrics = async (projectId) => {
        try {
            const data = await apiService.fetchProjectMetrics(projectId)
            setMetrics(data)
            
            // Subscribe to real-time updates for this project
            socketRef.current.emit('subscribe', projectId)
        } catch (error) {
            console.error('Error fetching metrics:', error)
        }
    }

    const analyzeWithAI = async (analysisType = 'comprehensive') => {
        if (!metrics || !selectedProject) return
        
        try {
            const analysis = await aiService.analyzePerformance({
                metrics: metrics.performance,
                url: selectedProject.url || 'https://example.com',
                analysisType
            })
            
            setAiInsights(prev => ({
                ...prev,
                analysis
            }))
        } catch (error) {
            console.error('Error in AI analysis:', error)
        }
    }

    const handleProjectSelect = (project) => {
        setSelectedProject(project)
        if (project && project.id) {
            fetchProjectMetrics(project.id)
        }
    }

    const generateAIReport = async () => {
        if (!selectedProject || !metrics) return
        
        try {
            const report = await aiService.generateReport({
                project: selectedProject,
                metrics: metrics.performance,
                realtimeData: realtimeData[selectedProject.id]
            })
            
            // Create download link for the report
            const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `performance-report-${selectedProject.name}-${new Date().toISOString().split('T')[0]}.json`
            a.click()
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error generating AI report:', error)
        }
    }

    return (
        <div className="app">
            <Navbar 
                connected={connected} 
                systemHealth={systemHealth}
                onRefresh={fetchProjects}
            />
            
            <HeroSection />
            
            <div className="container-fluid px-4">
                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <ErrorMessage message={error} onRetry={fetchProjects} />
                ) : (
                    <>
                        <MetricsOverview 
                            metrics={metrics}
                            realtimeData={selectedProject ? realtimeData[selectedProject.id] : null}
                        />
                        
                        <div className="row mt-4">
                            <div className="col-lg-4">
                                <ProjectsList 
                                    projects={projects}
                                    selectedProject={selectedProject}
                                    onSelectProject={handleProjectSelect}
                                />
                            </div>
                            
                            <div className="col-lg-8">
                                {selectedProject ? (
                                    <>
                                        <ProjectDetails 
                                            project={selectedProject}
                                            onGenerateReport={generateAIReport}
                                        />
                                        
                                        <PerformanceMetrics 
                                            metrics={metrics}
                                            realtimeData={realtimeData[selectedProject.id]}
                                        />
                                        
                                        <AIInsights 
                                            insights={aiInsights}
                                            onAnalyze={() => analyzeWithAI('comprehensive')}
                                            onQuickAnalyze={() => analyzeWithAI('quick')}
                                        />
                                        
                                        <RealTimeMonitor 
                                            data={realtimeData[selectedProject.id]}
                                            projectId={selectedProject.id}
                                        />
                                    </>
                                ) : (
                                    <EmptyState onSelectFirst={() => projects.length > 0 && handleProjectSelect(projects[0])} />
                                )}
                            </div>
                        </div>
                        
                        <PerformanceCharts 
                            metrics={metrics}
                            realtimeData={selectedProject ? realtimeData[selectedProject.id] : null}
                            selectedProject={selectedProject}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default App