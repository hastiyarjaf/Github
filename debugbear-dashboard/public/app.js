/**
 * DebugBear Performance Dashboard - React Frontend
 * Modern, AI-powered performance monitoring interface
 */

const { useState, useEffect, useRef } = React;
const API_BASE_URL = 'http://localhost:5000/api';

// Main App Component
function App() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [metrics, setMetrics] = useState(null);
    const [aiInsights, setAiInsights] = useState(null);
    const [realtimeData, setRealtimeData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [connected, setConnected] = useState(false);
    const socketRef = useRef(null);

    // Initialize WebSocket connection
    useEffect(() => {
        socketRef.current = io('http://localhost:5000');
        
        socketRef.current.on('connect', () => {
            console.log('WebSocket connected');
            setConnected(true);
        });
        
        socketRef.current.on('disconnect', () => {
            console.log('WebSocket disconnected');
            setConnected(false);
        });
        
        socketRef.current.on('metrics', (data) => {
            setRealtimeData(prev => ({
                ...prev,
                [data.projectId]: data
            }));
        });
        
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    // Fetch projects on component mount
    useEffect(() => {
        fetchProjects();
        checkHealth();
    }, []);

    const checkHealth = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            const data = await response.json();
            console.log('System health:', data);
        } catch (error) {
            console.error('Health check failed:', error);
        }
    };

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/projects`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch projects');
            }
            
            const data = await response.json();
            setProjects(data.projects || []);
            setAiInsights(data.insights);
            setError(null);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProjectMetrics = async (projectId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/projects/${projectId}/metrics`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch metrics');
            }
            
            const data = await response.json();
            setMetrics(data);
            
            // Subscribe to real-time updates for this project
            socketRef.current.emit('subscribe', projectId);
        } catch (error) {
            console.error('Error fetching metrics:', error);
        }
    };

    const analyzeWithAI = async () => {
        if (!metrics || !selectedProject) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/ai/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    metrics: metrics.performance,
                    url: selectedProject.url || 'https://example.com'
                })
            });
            
            const data = await response.json();
            setAiInsights(data.analysis);
        } catch (error) {
            console.error('Error in AI analysis:', error);
        }
    };

    const handleProjectSelect = (project) => {
        setSelectedProject(project);
        if (project && project.id) {
            fetchProjectMetrics(project.id);
        }
    };

    return (
        <div className="app">
            <Navbar connected={connected} />
            
            <div className="hero-section">
                <div className="container">
                    <h1 className="hero-title">Performance Dashboard</h1>
                    <p className="hero-subtitle">AI-Powered Web Performance Analytics & Real-Time Monitoring</p>
                </div>
            </div>
            
            <div className="container">
                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <ErrorMessage message={error} onRetry={fetchProjects} />
                ) : (
                    <>
                        <MetricsOverview metrics={metrics} />
                        
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
                                        <ProjectDetails project={selectedProject} />
                                        <PerformanceMetrics metrics={metrics} />
                                        <AIInsights 
                                            insights={aiInsights}
                                            onAnalyze={analyzeWithAI}
                                        />
                                        <RealTimeMonitor 
                                            data={realtimeData[selectedProject.id]}
                                        />
                                    </>
                                ) : (
                                    <EmptyState />
                                )}
                            </div>
                        </div>
                        
                        <PerformanceCharts metrics={metrics} />
                    </>
                )}
            </div>
        </div>
    );
}

// Navbar Component
function Navbar({ connected }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <i className="fas fa-chart-line me-2"></i>
                    DebugBear
                </a>
                
                <div className="navbar-nav ms-auto">
                    <a className="nav-link active" href="#">Dashboard</a>
                    <a className="nav-link" href="#">Analytics</a>
                    <a className="nav-link" href="#">Reports</a>
                    <span className={`status-indicator ${connected ? 'online' : 'offline'} ms-3`}>
                        {connected ? 'Connected' : 'Offline'}
                    </span>
                </div>
            </div>
        </nav>
    );
}

// Metrics Overview Component
function MetricsOverview({ metrics }) {
    if (!metrics) return null;
    
    const cards = [
        {
            title: 'Load Time',
            value: `${(metrics.performance?.loadTime / 1000).toFixed(2)}s`,
            icon: 'fa-clock',
            change: '-12%',
            positive: true
        },
        {
            title: 'First Contentful Paint',
            value: `${(metrics.performance?.firstContentfulPaint / 1000).toFixed(2)}s`,
            icon: 'fa-palette',
            change: '-8%',
            positive: true
        },
        {
            title: 'Speed Index',
            value: `${(metrics.performance?.speedIndex / 1000).toFixed(2)}s`,
            icon: 'fa-tachometer-alt',
            change: '+5%',
            positive: false
        },
        {
            title: 'Cumulative Layout Shift',
            value: metrics.performance?.cumulativeLayoutShift?.toFixed(3) || '0.000',
            icon: 'fa-arrows-alt',
            change: '-20%',
            positive: true
        }
    ];
    
    return (
        <div className="row mt-4">
            {cards.map((card, index) => (
                <div key={index} className="col-md-3 mb-3">
                    <div className="dashboard-card">
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <h3>{card.title}</h3>
                                <div className="value">{card.value}</div>
                                <div className={`change ${card.positive ? 'positive' : 'negative'}`}>
                                    <i className={`fas fa-${card.positive ? 'arrow-down' : 'arrow-up'} me-1`}></i>
                                    {card.change}
                                </div>
                            </div>
                            <i className={`fas ${card.icon} text-muted`} style={{ fontSize: '2rem' }}></i>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Projects List Component
function ProjectsList({ projects, selectedProject, onSelectProject }) {
    return (
        <div className="glass-container">
            <h3 className="mb-3">
                <i className="fas fa-folder me-2"></i>
                Projects
            </h3>
            
            {projects.length === 0 ? (
                <p className="text-muted">No projects found</p>
            ) : (
                <div className="list-group">
                    {projects.map((project) => (
                        <button
                            key={project.id || Math.random()}
                            className={`list-group-item list-group-item-action ${
                                selectedProject?.id === project.id ? 'active' : ''
                            }`}
                            onClick={() => onSelectProject(project)}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="mb-1">{project.name || 'Unnamed Project'}</h6>
                                    <small className="text-muted">{project.url || 'No URL'}</small>
                                </div>
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// Project Details Component
function ProjectDetails({ project }) {
    return (
        <div className="dashboard-card mb-3">
            <h4 className="mb-3">
                <i className="fas fa-info-circle me-2"></i>
                Project Details
            </h4>
            
            <div className="row">
                <div className="col-md-6">
                    <p><strong>Name:</strong> {project.name || 'N/A'}</p>
                    <p><strong>URL:</strong> {project.url || 'N/A'}</p>
                </div>
                <div className="col-md-6">
                    <p><strong>ID:</strong> {project.id || 'N/A'}</p>
                    <p><strong>Created:</strong> {project.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

// Performance Metrics Component
function PerformanceMetrics({ metrics }) {
    if (!metrics || !metrics.performance) return null;
    
    const performanceData = [
        { label: 'Load Time', value: metrics.performance.loadTime, unit: 'ms', icon: 'fa-clock' },
        { label: 'FCP', value: metrics.performance.firstContentfulPaint, unit: 'ms', icon: 'fa-paint-brush' },
        { label: 'LCP', value: metrics.performance.largestContentfulPaint, unit: 'ms', icon: 'fa-expand' },
        { label: 'TBT', value: metrics.performance.totalBlockingTime, unit: 'ms', icon: 'fa-ban' },
        { label: 'CLS', value: metrics.performance.cumulativeLayoutShift, unit: '', icon: 'fa-arrows-alt' },
        { label: 'Speed Index', value: metrics.performance.speedIndex, unit: 'ms', icon: 'fa-tachometer-alt' }
    ];
    
    return (
        <div className="row mb-3">
            {performanceData.map((metric, index) => (
                <div key={index} className="col-md-4 mb-3">
                    <div className="metric-card">
                        <i className={`fas ${metric.icon} metric-icon`}></i>
                        <div className="metric-value">
                            {typeof metric.value === 'number' ? 
                                (metric.unit === 'ms' ? (metric.value / 1000).toFixed(2) + 's' : metric.value.toFixed(3)) 
                                : 'N/A'}
                        </div>
                        <div className="metric-label">{metric.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// AI Insights Component
function AIInsights({ insights, onAnalyze }) {
    return (
        <div className="ai-insights">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <span className="ai-badge">
                        <i className="fas fa-robot me-2"></i>
                        AI Powered
                    </span>
                    <h4 className="mt-2">Performance Insights</h4>
                </div>
                <button className="btn-gradient" onClick={onAnalyze}>
                    <i className="fas fa-sync-alt me-2"></i>
                    Analyze
                </button>
            </div>
            
            {insights ? (
                typeof insights === 'string' ? (
                    <p>{insights}</p>
                ) : (
                    <div>
                        {insights.recommendations?.map((rec, index) => (
                            <div key={index} className="ai-recommendation">
                                <h6>
                                    <span className="badge bg-primary me-2">{rec.priority || index + 1}</span>
                                    {rec.issue}
                                </h6>
                                <p className="mb-0">{rec.recommendation}</p>
                            </div>
                        )) || (
                            <div className="ai-recommendation">
                                <p>{JSON.stringify(insights)}</p>
                            </div>
                        )}
                    </div>
                )
            ) : (
                <p className="text-muted">Click "Analyze" to get AI-powered recommendations</p>
            )}
        </div>
    );
}

// Real-Time Monitor Component
function RealTimeMonitor({ data }) {
    if (!data) return null;
    
    return (
        <div className="realtime-monitor">
            <h4 className="text-white mb-3">
                <i className="fas fa-satellite-dish me-2"></i>
                Real-Time Monitoring
            </h4>
            
            <div className="monitor-grid">
                <div className="monitor-item">
                    <div className="monitor-value">{data.cpu?.toFixed(1) || '0'}%</div>
                    <div className="monitor-label">CPU Usage</div>
                </div>
                <div className="monitor-item">
                    <div className="monitor-value">{data.memory?.toFixed(1) || '0'}%</div>
                    <div className="monitor-label">Memory</div>
                </div>
                <div className="monitor-item">
                    <div className="monitor-value">{data.responseTime?.toFixed(0) || '0'}ms</div>
                    <div className="monitor-label">Response Time</div>
                </div>
                <div className="monitor-item">
                    <div className="monitor-value">{data.errorRate?.toFixed(2) || '0'}%</div>
                    <div className="monitor-label">Error Rate</div>
                </div>
            </div>
            
            <small className="text-white-50 mt-2 d-block">
                Last updated: {data.timestamp ? new Date(data.timestamp).toLocaleTimeString() : 'Never'}
            </small>
        </div>
    );
}

// Performance Charts Component
function PerformanceCharts({ metrics }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    
    useEffect(() => {
        if (!metrics || !chartRef.current) return;
        
        const ctx = chartRef.current.getContext('2d');
        
        // Destroy existing chart
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        
        // Create new chart
        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Load Time', 'FCP', 'LCP', 'TBT', 'Speed Index'],
                datasets: [{
                    label: 'Performance Metrics (ms)',
                    data: [
                        metrics.performance?.loadTime || 0,
                        metrics.performance?.firstContentfulPaint || 0,
                        metrics.performance?.largestContentfulPaint || 0,
                        metrics.performance?.totalBlockingTime || 0,
                        metrics.performance?.speedIndex || 0
                    ],
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(118, 75, 162, 0.8)',
                        'rgba(240, 147, 251, 0.8)',
                        'rgba(245, 87, 108, 0.8)',
                        'rgba(19, 194, 194, 0.8)'
                    ],
                    borderColor: [
                        'rgba(102, 126, 234, 1)',
                        'rgba(118, 75, 162, 1)',
                        'rgba(240, 147, 251, 1)',
                        'rgba(245, 87, 108, 1)',
                        'rgba(19, 194, 194, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + (context.parsed.y / 1000).toFixed(2) + 's';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return (value / 1000).toFixed(1) + 's';
                            }
                        }
                    }
                }
            }
        });
        
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [metrics]);
    
    if (!metrics) return null;
    
    return (
        <div className="chart-container">
            <div className="chart-header">
                <h4 className="chart-title">Performance Overview</h4>
                <div className="chart-controls">
                    <button className="chart-control-btn active">Day</button>
                    <button className="chart-control-btn">Week</button>
                    <button className="chart-control-btn">Month</button>
                </div>
            </div>
            <div style={{ height: '300px' }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

// Loading Spinner Component
function LoadingSpinner() {
    return (
        <div className="text-center py-5">
            <div className="spinner"></div>
            <p className="mt-3 text-white">Loading performance data...</p>
        </div>
    );
}

// Error Message Component
function ErrorMessage({ message, onRetry }) {
    return (
        <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
            <div>
                <i className="fas fa-exclamation-triangle me-2"></i>
                {message}
            </div>
            <button className="btn btn-sm btn-outline-danger" onClick={onRetry}>
                <i className="fas fa-redo me-1"></i>
                Retry
            </button>
        </div>
    );
}

// Empty State Component
function EmptyState() {
    return (
        <div className="text-center py-5 glass-container">
            <i className="fas fa-chart-area" style={{ fontSize: '4rem', opacity: 0.5 }}></i>
            <h4 className="mt-3">Select a Project</h4>
            <p className="text-muted">Choose a project from the list to view its performance metrics</p>
        </div>
    );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
