import React from 'react';
import PageShell from '../components/PageShell';
import { PORTFOLIO_PROJECTS } from '../constants';

const PortfolioPage: React.FC = () => {
  return (
    <>
      <div className="bg-brand-dark-blue text-white">
        <PageShell className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Track Record of Success</h1>
          <p className="text-lg md:text-xl text-brand-steel-blue max-w-3xl mx-auto">
            We've had the privilege of working with leading organizations on impactful projects. Explore our case studies.
          </p>
        </PageShell>
      </div>

      <PageShell>
        <div className="space-y-16">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className={` ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
                <img src={project.image} alt={project.title} className="rounded-lg shadow-2xl w-full h-auto object-cover"/>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <p className="text-brand-accent font-semibold mb-2">{project.client}</p>
                <h2 className="text-3xl font-bold text-brand-dark-blue mb-4">{project.title}</h2>
                <p className="text-brand-shadow-blue mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-gray-200 text-brand-gunmetal px-3 py-1 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageShell>
    </>
  );
};

export default PortfolioPage;