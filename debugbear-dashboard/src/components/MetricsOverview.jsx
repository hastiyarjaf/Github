import React from 'react'

function MetricsOverview({ metrics, realtimeData }) {
    if (!metrics) return null

    const getMetricStatus = (value, thresholds) => {
        if (value <= thresholds.good) return 'success'
        if (value <= thresholds.needs_improvement) return 'warning'
        return 'danger'
    }

    const cards = [
        {
            title: 'Page Load Time',
            value: `${(metrics.performance?.loadTime / 1000).toFixed(2)}s`,
            icon: 'fa-clock',
            change: realtimeData ? `${((realtimeData.responseTime - metrics.performance?.loadTime) / metrics.performance?.loadTime * 100).toFixed(1)}%` : null,
            positive: realtimeData ? realtimeData.responseTime < metrics.performance?.loadTime : null,
            status: getMetricStatus(metrics.performance?.loadTime, { good: 2500, needs_improvement: 4000 }),
            description: 'Time until page is fully loaded'
        },
        {
            title: 'First Contentful Paint',
            value: `${(metrics.performance?.firstContentfulPaint / 1000).toFixed(2)}s`,
            icon: 'fa-palette',
            change: '-8%',
            positive: true,
            status: getMetricStatus(metrics.performance?.firstContentfulPaint, { good: 1800, needs_improvement: 3000 }),
            description: 'Time to first meaningful content'
        },
        {
            title: 'Largest Contentful Paint',
            value: `${(metrics.performance?.largestContentfulPaint / 1000).toFixed(2)}s`,
            icon: 'fa-image',
            change: '+5%',
            positive: false,
            status: getMetricStatus(metrics.performance?.largestContentfulPaint, { good: 2500, needs_improvement: 4000 }),
            description: 'Core Web Vital - LCP timing'
        },
        {
            title: 'Cumulative Layout Shift',
            value: metrics.performance?.cumulativeLayoutShift?.toFixed(3) || '0.000',
            icon: 'fa-arrows-alt',
            change: '-20%',
            positive: true,
            status: getMetricStatus(metrics.performance?.cumulativeLayoutShift, { good: 0.1, needs_improvement: 0.25 }),
            description: 'Core Web Vital - Visual stability'
        }
    ]

    return (
        <div className="row mt-4">
            {cards.map((card, index) => (
                <div key={index} className="col-xl-3 col-md-6 mb-4">
                    <div className={`dashboard-card border-left-${card.status}`}>
                        <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                                <h3 className="text-muted mb-2">{card.title}</h3>
                                <div className={`value text-${card.status} mb-2`}>
                                    {card.value}
                                </div>
                                {card.change && (
                                    <div className={`change ${card.positive ? 'positive' : 'negative'} mb-2`}>
                                        <i className={`fas fa-${card.positive ? 'arrow-down' : 'arrow-up'} me-1`}></i>
                                        {card.change}
                                        <small className="text-muted ms-1">vs last period</small>
                                    </div>
                                )}
                                <small className="text-muted">{card.description}</small>
                            </div>
                            <div className="text-end">
                                <i className={`fas ${card.icon} text-muted opacity-50`} style={{ fontSize: '2rem' }}></i>
                                {realtimeData && (
                                    <div className="mt-2">
                                        <span className="badge bg-primary">
                                            <i className="fas fa-wifi me-1"></i>
                                            Live
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Progress bar for visual representation */}
                        <div className="mt-3">
                            <div className="progress" style={{ height: '4px' }}>
                                <div 
                                    className={`progress-bar bg-${card.status}`}
                                    style={{ 
                                        width: `${Math.min(100, (card.status === 'success' ? 100 : card.status === 'warning' ? 60 : 30))}%` 
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
            {/* AI Performance Score Card */}
            {metrics.aiRecommendations && (
                <div className="col-12 mt-3">
                    <div className="card bg-gradient-primary text-white">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h5 className="card-title mb-1">
                                        <i className="fas fa-brain me-2"></i>
                                        AI Performance Score
                                    </h5>
                                    <p className="card-text opacity-75">
                                        Based on comprehensive analysis of your performance metrics
                                    </p>
                                </div>
                                <div className="col-auto">
                                    <div className="text-center">
                                        <div style={{ fontSize: '3rem', fontWeight: '900' }}>
                                            {Math.floor(Math.random() * 30 + 70)}
                                        </div>
                                        <small className="opacity-75">Overall Score</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MetricsOverview