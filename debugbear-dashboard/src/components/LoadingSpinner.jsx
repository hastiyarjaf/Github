import React from 'react'

function LoadingSpinner() {
    return (
        <div className="loading-container">
            <div className="text-center">
                <div className="spinner mb-3"></div>
                <h4 className="text-white">Loading Performance Data...</h4>
                <p className="text-white opacity-75">Analyzing your website performance with AI</p>
            </div>
        </div>
    )
}

export default LoadingSpinner