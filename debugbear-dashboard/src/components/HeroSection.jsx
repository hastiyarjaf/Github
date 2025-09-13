import React from 'react'

function HeroSection() {
    return (
        <div className="hero-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h1 className="hero-title fade-in">
                            AI-Powered Performance Dashboard
                        </h1>
                        <p className="hero-subtitle slide-up">
                            Advanced web performance monitoring with intelligent insights, 
                            real-time analytics, and predictive recommendations powered by cutting-edge AI
                        </p>
                        <div className="mt-4">
                            <div className="d-flex justify-content-center gap-3 flex-wrap">
                                <div className="d-flex align-items-center text-white opacity-75">
                                    <i className="fas fa-brain me-2"></i>
                                    <span>Google AI Studio</span>
                                </div>
                                <div className="d-flex align-items-center text-white opacity-75">
                                    <i className="fas fa-chart-line me-2"></i>
                                    <span>Real-time Analytics</span>
                                </div>
                                <div className="d-flex align-items-center text-white opacity-75">
                                    <i className="fas fa-robot me-2"></i>
                                    <span>Predictive Insights</span>
                                </div>
                                <div className="d-flex align-items-center text-white opacity-75">
                                    <i className="fas fa-bolt me-2"></i>
                                    <span>Performance Optimization</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection