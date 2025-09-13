import React from 'react'

// Create simple placeholder components
export const ProjectDetails = ({ project, onGenerateReport }) => (
    <div className="glass-container mb-4">
        <h3>{project?.name || 'Project Details'}</h3>
        <p>URL: {project?.url}</p>
        {onGenerateReport && (
            <button className="btn btn-primary" onClick={onGenerateReport}>
                <i className="fas fa-file-pdf me-2"></i>
                Generate AI Report
            </button>
        )}
    </div>
)

export const PerformanceMetrics = ({ metrics, realtimeData }) => (
    <div className="glass-container mb-4">
        <h3>Performance Metrics</h3>
        {metrics ? (
            <div>
                <p>Metrics data available</p>
                {realtimeData && <span className="badge bg-success">Real-time active</span>}
            </div>
        ) : (
            <p>No metrics data</p>
        )}
    </div>
)

export const AIInsights = ({ insights, onAnalyze, onQuickAnalyze }) => (
    <div className="glass-container mb-4">
        <div className="d-flex justify-content-between align-items-center">
            <h3>
                <i className="fas fa-brain me-2"></i>
                AI Insights
            </h3>
            <div>
                {onQuickAnalyze && (
                    <button className="btn btn-outline-primary btn-sm me-2" onClick={onQuickAnalyze}>
                        Quick Analysis
                    </button>
                )}
                {onAnalyze && (
                    <button className="btn btn-primary btn-sm" onClick={onAnalyze}>
                        Deep Analysis
                    </button>
                )}
            </div>
        </div>
        {insights ? (
            <div className="mt-3">
                <p>AI insights available</p>
            </div>
        ) : (
            <div className="text-center py-4">
                <i className="fas fa-robot text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                <p className="text-muted">No AI insights yet. Click analyze to get started.</p>
            </div>
        )}
    </div>
)

export const RealTimeMonitor = ({ data, projectId }) => (
    <div className="glass-container mb-4">
        <h3>
            <i className="fas fa-wifi me-2"></i>
            Real-time Monitor
        </h3>
        {data ? (
            <div>
                <span className="badge bg-success">Live Data</span>
                <p className="mt-2">Project: {projectId}</p>
            </div>
        ) : (
            <p className="text-muted">No real-time data available</p>
        )}
    </div>
)

export const PerformanceCharts = ({ metrics, realtimeData, selectedProject }) => (
    <div className="row mt-4">
        <div className="col-12">
            <div className="glass-container">
                <h3>
                    <i className="fas fa-chart-area me-2"></i>
                    Performance Charts
                </h3>
                <div className="text-center py-5">
                    <i className="fas fa-chart-line text-muted mb-3" style={{ fontSize: '4rem' }}></i>
                    <p className="text-muted">Charts will be implemented with Chart.js integration</p>
                    {selectedProject && <p>Selected: {selectedProject.name}</p>}
                </div>
            </div>
        </div>
    </div>
)

export default {
    ProjectDetails,
    PerformanceMetrics,
    AIInsights,
    RealTimeMonitor,
    PerformanceCharts
}