import React, { useState, useEffect } from 'react'
import { apiService } from '../services/apiService'

export const RealTimeMonitor = ({ data, projectId }) => {
    const [realtimeMetrics, setRealtimeMetrics] = useState(data || null)
    const [isLive, setIsLive] = useState(false)

    useEffect(() => {
        let interval = null
        
        if (projectId) {
            setIsLive(true)
            // Simulate real-time data updates
            interval = setInterval(async () => {
                try {
                    const demoData = await apiService.getDemoRealtimeData(projectId)
                    setRealtimeMetrics(demoData)
                } catch (error) {
                    console.error('Error fetching realtime data:', error)
                }
            }, 5000) // Update every 5 seconds
        }

        return () => {
            if (interval) {
                clearInterval(interval)
                setIsLive(false)
            }
        }
    }, [projectId])

    useEffect(() => {
        if (data) {
            setRealtimeMetrics(data)
        }
    }, [data])

    if (!realtimeMetrics) {
        return (
            <div className="glass-container mb-4">
                <h3>
                    <i className="fas fa-wifi me-2"></i>
                    Real-time Monitor
                </h3>
                <div className="text-center py-5">
                    <i className="fas fa-satellite-dish text-muted mb-3" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
                    <p className="text-muted">No real-time data available</p>
                    <small className="text-muted">Select a project to start monitoring</small>
                </div>
            </div>
        )
    }

    const getStatusClass = (value, thresholds) => {
        if (value <= thresholds.good) return 'success'
        if (value <= thresholds.warning) return 'warning'
        return 'danger'
    }

    const metrics = [
        {
            label: 'Response Time',
            value: `${Math.round(realtimeMetrics.responseTime)}ms`,
            icon: 'fa-clock',
            status: getStatusClass(realtimeMetrics.responseTime, { good: 1000, warning: 2000 }),
            trend: Math.random() > 0.5 ? 'up' : 'down'
        },
        {
            label: 'CPU Usage',
            value: `${Math.round(realtimeMetrics.cpu)}%`,
            icon: 'fa-microchip',
            status: getStatusClass(realtimeMetrics.cpu, { good: 50, warning: 80 }),
            trend: Math.random() > 0.5 ? 'up' : 'down'
        },
        {
            label: 'Memory Usage',
            value: `${Math.round(realtimeMetrics.memory)}%`,
            icon: 'fa-memory',
            status: getStatusClass(realtimeMetrics.memory, { good: 60, warning: 85 }),
            trend: Math.random() > 0.5 ? 'up' : 'down'
        },
        {
            label: 'Error Rate',
            value: `${realtimeMetrics.errorRate.toFixed(2)}%`,
            icon: 'fa-exclamation-triangle',
            status: getStatusClass(realtimeMetrics.errorRate, { good: 1, warning: 5 }),
            trend: Math.random() > 0.5 ? 'up' : 'down'
        }
    ]

    return (
        <div className="glass-container mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>
                    <i className="fas fa-wifi me-2"></i>
                    Real-time Monitor
                </h3>
                <div className="d-flex align-items-center gap-2">
                    {isLive && (
                        <span className="badge bg-success">
                            <i className="fas fa-circle me-1 blink"></i>
                            Live
                        </span>
                    )}
                    <small className="text-muted">
                        Updated: {new Date(realtimeMetrics.timestamp).toLocaleTimeString()}
                    </small>
                </div>
            </div>

            <div className="row">
                {metrics.map((metric, index) => (
                    <div key={index} className="col-md-6 col-xl-3 mb-3">
                        <div className={`realtime-metric-card bg-${metric.status}`}>
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <div className="metric-label">{metric.label}</div>
                                    <div className="metric-value">{metric.value}</div>
                                </div>
                                <div className="metric-icon">
                                    <i className={`fas ${metric.icon}`}></i>
                                    <div className={`trend-indicator trend-${metric.trend}`}>
                                        <i className={`fas fa-caret-${metric.trend}`}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Stats */}
            {realtimeMetrics.activeUsers !== undefined && (
                <div className="row mt-3">
                    <div className="col-md-6">
                        <div className="stats-card">
                            <div className="stats-icon">
                                <i className="fas fa-users text-primary"></i>
                            </div>
                            <div className="stats-content">
                                <div className="stats-value">{realtimeMetrics.activeUsers}</div>
                                <div className="stats-label">Active Users</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="stats-card">
                            <div className="stats-icon">
                                <i className="fas fa-chart-line text-info"></i>
                            </div>
                            <div className="stats-content">
                                <div className="stats-value">{realtimeMetrics.requestsPerMinute}</div>
                                <div className="stats-label">Requests/min</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* System Status */}
            <div className="row mt-3">
                <div className="col-12">
                    <div className="system-status">
                        <h6>
                            <i className="fas fa-server me-2"></i>
                            System Status
                        </h6>
                        <div className="status-indicators d-flex gap-3 flex-wrap">
                            <div className="status-item">
                                <div className="status-dot bg-success"></div>
                                <span>Database</span>
                            </div>
                            <div className="status-item">
                                <div className="status-dot bg-success"></div>
                                <span>API</span>
                            </div>
                            <div className="status-item">
                                <div className="status-dot bg-warning"></div>
                                <span>Cache</span>
                            </div>
                            <div className="status-item">
                                <div className="status-dot bg-success"></div>
                                <span>CDN</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}