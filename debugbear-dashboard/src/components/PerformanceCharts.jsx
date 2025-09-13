import React, { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export const PerformanceCharts = ({ metrics, realtimeData, selectedProject }) => {
    if (!metrics || !metrics.performance) {
        return (
            <div className="row mt-4">
                <div className="col-12">
                    <div className="glass-container">
                        <h3>
                            <i className="fas fa-chart-area me-2"></i>
                            Performance Charts
                        </h3>
                        <div className="text-center py-5">
                            <i className="fas fa-chart-line text-muted mb-3" style={{ fontSize: '4rem' }}></i>
                            <p className="text-muted">Select a project to view performance charts</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const performance = metrics.performance

    // Core Web Vitals Chart Data
    const coreWebVitalsData = {
        labels: ['FCP', 'LCP', 'CLS', 'TBT', 'SI'],
        datasets: [
            {
                label: 'Current Performance',
                data: [
                    performance.firstContentfulPaint / 1000,
                    performance.largestContentfulPaint / 1000,
                    performance.cumulativeLayoutShift * 1000, // Scale CLS for visibility
                    performance.totalBlockingTime,
                    performance.speedIndex / 1000
                ],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgb(99, 102, 241)',
                    'rgb(236, 72, 153)',
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)',
                    'rgb(239, 68, 68)'
                ],
                borderWidth: 2
            }
        ]
    }

    // Performance Timeline Data (simulated)
    const timelineLabels = Array.from({ length: 24 }, (_, i) => {
        const date = new Date()
        date.setHours(date.getHours() - (23 - i))
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    })

    const performanceTimelineData = {
        labels: timelineLabels,
        datasets: [
            {
                label: 'Load Time (s)',
                data: timelineLabels.map(() => (Math.random() * 2 + 1).toFixed(2)),
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'FCP (s)',
                data: timelineLabels.map(() => (Math.random() * 1.5 + 0.5).toFixed(2)),
                borderColor: 'rgb(236, 72, 153)',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    }

    // Performance Score Breakdown
    const scoreBreakdownData = {
        labels: ['Performance', 'Accessibility', 'Best Practices', 'SEO'],
        datasets: [
            {
                data: [85, 92, 88, 94],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(59, 130, 246, 0.8)'
                ],
                borderColor: [
                    'rgb(99, 102, 241)',
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)',
                    'rgb(59, 130, 246)'
                ],
                borderWidth: 2
            }
        ]
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12,
                        family: 'Inter'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 0.6)',
                    font: {
                        size: 11
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: 'rgba(0, 0, 0, 0.6)',
                    font: {
                        size: 11
                    }
                }
            }
        }
    }

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12,
                        family: 'Inter'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                callbacks: {
                    label: function(context) {
                        return context.label + ': ' + context.parsed + '%'
                    }
                }
            }
        },
        cutout: '60%'
    }

    return (
        <div className="row mt-4">
            <div className="col-12 mb-4">
                <div className="glass-container">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3>
                            <i className="fas fa-chart-area me-2"></i>
                            Performance Analytics
                        </h3>
                        {selectedProject && (
                            <div className="d-flex align-items-center">
                                <span className="badge bg-primary me-2">
                                    {selectedProject.name}
                                </span>
                                {realtimeData && (
                                    <span className="badge bg-success">
                                        <i className="fas fa-wifi me-1"></i>
                                        Live Data
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                    
                    {/* Core Web Vitals Bar Chart */}
                    <div className="row">
                        <div className="col-lg-8 mb-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="mb-0">
                                        <i className="fas fa-chart-bar me-2"></i>
                                        Core Web Vitals
                                    </h5>
                                    <small className="text-muted">Current performance metrics</small>
                                </div>
                                <div className="card-body">
                                    <div style={{ height: '300px' }}>
                                        <Bar data={coreWebVitalsData} options={chartOptions} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Performance Score Doughnut */}
                        <div className="col-lg-4 mb-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="mb-0">
                                        <i className="fas fa-chart-pie me-2"></i>
                                        Lighthouse Scores
                                    </h5>
                                    <small className="text-muted">Overall performance breakdown</small>
                                </div>
                                <div className="card-body">
                                    <div style={{ height: '300px' }}>
                                        <Doughnut data={scoreBreakdownData} options={doughnutOptions} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Performance Timeline */}
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">
                                            <i className="fas fa-chart-line me-2"></i>
                                            Performance Timeline
                                        </h5>
                                        <small className="text-muted">24-hour performance trend</small>
                                    </div>
                                    <div className="btn-group btn-group-sm" role="group">
                                        <button type="button" className="btn btn-outline-primary active">24h</button>
                                        <button type="button" className="btn btn-outline-primary">7d</button>
                                        <button type="button" className="btn btn-outline-primary">30d</button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div style={{ height: '350px' }}>
                                        <Line data={performanceTimelineData} options={chartOptions} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}