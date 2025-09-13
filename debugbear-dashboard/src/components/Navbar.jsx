import React from 'react'

function Navbar({ connected, systemHealth, onRefresh }) {
    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <i className="fas fa-chart-line me-2"></i>
                    DebugBear AI
                </a>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <i className="fas fa-tachometer-alt me-1"></i>
                                Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="fas fa-chart-bar me-1"></i>
                                Analytics
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="fas fa-brain me-1"></i>
                                AI Insights
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="fas fa-cog me-1"></i>
                                Settings
                            </a>
                        </li>
                    </ul>
                    
                    <div className="navbar-nav ms-auto d-flex align-items-center">
                        <button 
                            className="btn btn-outline me-2" 
                            onClick={onRefresh}
                            title="Refresh Data"
                        >
                            <i className="fas fa-sync-alt"></i>
                        </button>
                        
                        <div className="d-flex align-items-center gap-3">
                            <span className={`status-indicator ${connected ? 'online' : 'offline'}`}>
                                {connected ? 'Connected' : 'Offline'}
                            </span>
                            
                            {systemHealth && (
                                <div className="dropdown">
                                    <button 
                                        className="btn btn-outline dropdown-toggle" 
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="fas fa-heartbeat me-1"></i>
                                        Health
                                    </button>
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item-text">
                                            <small className="text-muted">Services Status</small>
                                            <div className="mt-1">
                                                <div className={`text-${systemHealth.services?.debugBear ? 'success' : 'danger'}`}>
                                                    <i className={`fas fa-${systemHealth.services?.debugBear ? 'check' : 'times'} me-1`}></i>
                                                    DebugBear API
                                                </div>
                                                <div className={`text-${systemHealth.services?.openAI ? 'success' : 'warning'}`}>
                                                    <i className={`fas fa-${systemHealth.services?.openAI ? 'check' : 'exclamation-triangle'} me-1`}></i>
                                                    AI Features
                                                </div>
                                                <div className="text-success">
                                                    <i className="fas fa-check me-1"></i>
                                                    WebSocket ({systemHealth.services?.websocket || 0} clients)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar