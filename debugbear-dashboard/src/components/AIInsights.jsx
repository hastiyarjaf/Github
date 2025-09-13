import React, { useState } from 'react'

export const AIInsights = ({ insights, onAnalyze, onQuickAnalyze }) => {
    const [analyzing, setAnalyzing] = useState(false)
    const [analysisType, setAnalysisType] = useState(null)

    const handleAnalyze = async (type) => {
        setAnalyzing(true)
        setAnalysisType(type)
        
        try {
            if (type === 'quick' && onQuickAnalyze) {
                await onQuickAnalyze()
            } else if (onAnalyze) {
                await onAnalyze()
            }
        } finally {
            setAnalyzing(false)
            setAnalysisType(null)
        }
    }

    const renderInsights = () => {
        if (typeof insights === 'string') {
            return (
                <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    {insights}
                </div>
            )
        }

        if (insights && insights.analysis) {
            const analysis = insights.analysis
            
            return (
                <div>
                    {/* Performance Score */}
                    {analysis.performanceScore && (
                        <div className="card mb-3">
                            <div className="card-body text-center">
                                <div className="row align-items-center">
                                    <div className="col-md-4">
                                        <div className="performance-score">
                                            <div className={`score-circle ${getScoreClass(analysis.performanceScore)}`}>
                                                <span className="score-value">{analysis.performanceScore}</span>
                                                <small>/ 100</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8 text-start">
                                        <h5 className="mb-2">Performance Score</h5>
                                        <p className="text-muted mb-0">
                                            {analysis.assessment || getScoreDescription(analysis.performanceScore)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Critical Issues */}
                    {analysis.criticalIssues && analysis.criticalIssues.length > 0 && (
                        <div className="card mb-3">
                            <div className="card-header">
                                <h6 className="mb-0">
                                    <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                                    Critical Issues
                                </h6>
                            </div>
                            <div className="card-body">
                                <ul className="list-unstyled mb-0">
                                    {analysis.criticalIssues.map((issue, index) => (
                                        <li key={index} className="mb-2">
                                            <i className="fas fa-times-circle text-danger me-2"></i>
                                            {issue}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Recommendations */}
                    {analysis.recommendations && analysis.recommendations.length > 0 && (
                        <div className="card mb-3">
                            <div className="card-header">
                                <h6 className="mb-0">
                                    <i className="fas fa-lightbulb text-primary me-2"></i>
                                    AI Recommendations
                                </h6>
                            </div>
                            <div className="card-body">
                                {analysis.recommendations.map((rec, index) => (
                                    <div key={index} className="recommendation-item mb-3 p-3 border rounded">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h6 className="mb-1">
                                                <span className={`badge badge-${rec.priority === 'high' ? 'danger' : rec.priority === 'medium' ? 'warning' : 'success'} me-2`}>
                                                    {rec.priority?.toUpperCase() || 'MEDIUM'}
                                                </span>
                                                {rec.issue}
                                            </h6>
                                            {rec.complexity && (
                                                <small className="text-muted">
                                                    Complexity: {rec.complexity}
                                                </small>
                                            )}
                                        </div>
                                        <p className="mb-2">{rec.recommendation}</p>
                                        {rec.estimatedImpact && (
                                            <small className="text-muted">
                                                <i className="fas fa-chart-line me-1"></i>
                                                Impact: {rec.estimatedImpact}
                                            </small>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Summary */}
                    {analysis.summary && (
                        <div className="alert alert-light">
                            <h6>
                                <i className="fas fa-chart-pie me-2"></i>
                                Summary
                            </h6>
                            <p className="mb-0">{analysis.summary}</p>
                        </div>
                    )}
                </div>
            )
        }

        return null
    }

    const getScoreClass = (score) => {
        if (score >= 90) return 'excellent'
        if (score >= 70) return 'good'
        if (score >= 50) return 'needs-improvement'
        return 'poor'
    }

    const getScoreDescription = (score) => {
        if (score >= 90) return 'Excellent performance! Your site is well optimized.'
        if (score >= 70) return 'Good performance with room for improvement.'
        if (score >= 50) return 'Needs improvement. Several optimization opportunities available.'
        return 'Poor performance. Immediate attention required.'
    }

    return (
        <div className="glass-container mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>
                    <i className="fas fa-brain me-2"></i>
                    AI Performance Insights
                </h3>
                <div>
                    {onQuickAnalyze && (
                        <button 
                            className="btn btn-outline-primary btn-sm me-2" 
                            onClick={() => handleAnalyze('quick')}
                            disabled={analyzing}
                        >
                            {analyzing && analysisType === 'quick' ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-bolt me-1"></i>
                                    Quick Analysis
                                </>
                            )}
                        </button>
                    )}
                    {onAnalyze && (
                        <button 
                            className="btn btn-primary btn-sm" 
                            onClick={() => handleAnalyze('comprehensive')}
                            disabled={analyzing}
                        >
                            {analyzing && analysisType === 'comprehensive' ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Deep Analyzing...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-microscope me-1"></i>
                                    Deep Analysis
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>

            <div className="insights-content">
                {insights ? (
                    renderInsights()
                ) : (
                    <div className="text-center py-5">
                        <div className="mb-4">
                            <i className="fas fa-robot text-muted mb-3" style={{ fontSize: '4rem', opacity: 0.3 }}></i>
                        </div>
                        <h5 className="text-muted mb-3">AI-Powered Performance Analysis</h5>
                        <p className="text-muted mb-4">
                            Get intelligent insights about your website's performance with advanced AI analysis. 
                            Our AI will examine your metrics and provide actionable recommendations.
                        </p>
                        <div className="d-flex justify-content-center gap-2">
                            <div className="feature-item text-center me-4">
                                <i className="fas fa-bolt text-primary mb-2" style={{ fontSize: '1.5rem' }}></i>
                                <div><small className="text-muted">Quick Analysis</small></div>
                                <div><small className="text-muted">~30 seconds</small></div>
                            </div>
                            <div className="feature-item text-center">
                                <i className="fas fa-microscope text-primary mb-2" style={{ fontSize: '1.5rem' }}></i>
                                <div><small className="text-muted">Deep Analysis</small></div>
                                <div><small className="text-muted">~2 minutes</small></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}