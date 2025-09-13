import React from 'react'

function ProjectsList({ projects, selectedProject, onSelectProject }) {
    return (
        <div className="glass-container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>
                    <i className="fas fa-folder me-2"></i>
                    Projects
                </h3>
                <span className="badge bg-primary">
                    {projects.length}
                </span>
            </div>
            
            {projects.length === 0 ? (
                <div className="text-center py-4">
                    <i className="fas fa-folder-open text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                    <p className="text-muted mb-3">No projects found</p>
                    <button className="btn btn-primary btn-sm">
                        <i className="fas fa-plus me-2"></i>
                        Add Project
                    </button>
                </div>
            ) : (
                <div className="list-group list-group-flush">
                    {projects.map((project, index) => (
                        <button
                            key={project.id || index}
                            className={`list-group-item list-group-item-action border-0 ${
                                selectedProject?.id === project.id ? 'active' : ''
                            }`}
                            onClick={() => onSelectProject(project)}
                        >
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="flex-grow-1">
                                    <h6 className="mb-1 fw-bold">
                                        {project.name || `Project ${index + 1}`}
                                    </h6>
                                    <p className="mb-1 small text-muted">
                                        {project.url || 'No URL specified'}
                                    </p>
                                    {project.created_at && (
                                        <small className="text-muted">
                                            Created: {new Date(project.created_at).toLocaleDateString()}
                                        </small>
                                    )}
                                </div>
                                <div className="ms-2">
                                    <i className="fas fa-chevron-right text-muted"></i>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
            
            <div className="mt-3 pt-3 border-top">
                <button className="btn btn-outline-primary btn-sm w-100">
                    <i className="fas fa-sync-alt me-2"></i>
                    Refresh Projects
                </button>
            </div>
        </div>
    )
}

export default ProjectsList