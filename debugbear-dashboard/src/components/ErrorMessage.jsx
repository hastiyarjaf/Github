import React from 'react'

function ErrorMessage({ message, onRetry }) {
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card border-danger">
                        <div className="card-body text-center">
                            <div className="text-danger mb-3">
                                <i className="fas fa-exclamation-triangle" style={{ fontSize: '3rem' }}></i>
                            </div>
                            <h4 className="card-title text-danger">Connection Error</h4>
                            <p className="card-text text-muted mb-4">
                                {message}
                            </p>
                            <div className="d-flex gap-2 justify-content-center">
                                <button 
                                    className="btn btn-primary" 
                                    onClick={onRetry}
                                >
                                    <i className="fas fa-redo me-2"></i>
                                    Try Again
                                </button>
                                <button className="btn btn-outline-secondary">
                                    <i className="fas fa-cog me-2"></i>
                                    Settings
                                </button>
                            </div>
                            <div className="mt-4">
                                <small className="text-muted">
                                    <strong>Common solutions:</strong><br/>
                                    • Check your API keys in the .env file<br/>
                                    • Ensure the backend server is running<br/>
                                    • Verify your internet connection
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorMessage