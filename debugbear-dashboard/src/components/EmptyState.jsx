import React from 'react'

function EmptyState({ onSelectFirst }) {
    return (
        <div className="glass-container text-center py-5">
            <div className="mb-4">
                <i className="fas fa-chart-line text-muted" style={{ fontSize: '4rem', opacity: 0.3 }}></i>
            </div>
            <h3 className="mb-3">Select a Project to Get Started</h3>
            <p className="text-muted mb-4">
                Choose a project from the list to view detailed performance metrics, 
                AI-powered insights, and real-time monitoring data.
            </p>
            <div className="d-flex gap-2 justify-content-center">
                {onSelectFirst && (
                    <button className="btn btn-primary" onClick={onSelectFirst}>
                        <i className="fas fa-play me-2"></i>
                        View First Project
                    </button>
                )}
                <button className="btn btn-outline-secondary">
                    <i className="fas fa-plus me-2"></i>
                    Add New Project
                </button>
            </div>
            <div className="mt-5">
                <div className="row text-center">
                    <div className="col-md-4 mb-3">
                        <div className="p-3">
                            <i className="fas fa-tachometer-alt text-primary mb-2" style={{ fontSize: '2rem' }}></i>
                            <h6>Performance Metrics</h6>
                            <small className="text-muted">Core Web Vitals and detailed timing data</small>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="p-3">
                            <i className="fas fa-brain text-primary mb-2" style={{ fontSize: '2rem' }}></i>
                            <h6>AI Insights</h6>
                            <small className="text-muted">Intelligent analysis and recommendations</small>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="p-3">
                            <i className="fas fa-wifi text-primary mb-2" style={{ fontSize: '2rem' }}></i>
                            <h6>Real-time Monitoring</h6>
                            <small className="text-muted">Live performance tracking and alerts</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmptyState