import React from 'react';
import PageShell from '../components/PageShell';
import Button from '../components/Button';
import { PORTFOLIO_PROJECTS } from '../constants';
import { Link } from 'react-router-dom';

const ProcessStep: React.FC<{ number: number; title: string; description: string }> = ({ number, title, description }) => (
  <div className="flex">
    <div className="flex flex-col items-center mr-4">
      <div>
        <div className="flex items-center justify-center w-10 h-10 border-2 border-brand-accent rounded-full">
          <span className="text-lg font-bold text-brand-accent">{number}</span>
        </div>
      </div>
      <div className="w-px h-full bg-brand-steel-blue"></div>
    </div>
    <div className="pb-8">
      <p className="mb-2 text-xl font-bold text-brand-dark-blue">{title}</p>
      <p className="text-brand-shadow-blue">{description}</p>
    </div>
  </div>
);


const ClientsPage: React.FC = () => {
  return (
    <>
      <div className="bg-brand-dark-blue text-white">
        <PageShell className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Your Strategic Partner for Project Success</h1>
          <p className="text-lg md:text-xl text-brand-steel-blue max-w-3xl mx-auto">
            Leverage our "Prime Contractor" model to eliminate hiring risks, ensure quality, and achieve project goals with confidence.
          </p>
        </PageShell>
      </div>
      
      <PageShell>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-brand-dark-blue mb-4">How Our Process Guarantees Results</h2>
            <p className="text-brand-shadow-blue mb-8">
              We've refined our process to provide a seamless, reliable, and high-quality experience from start to finish. We handle the complexity so you can focus on your mission.
            </p>
            <div>
              <ProcessStep number={1} title="Discovery & Strategy" description="We work with you to understand your project goals, scope, and KPIs to build a comprehensive strategy for success." />
              <ProcessStep number={2} title="Elite Talent Matching" description="We assemble a dedicated team from our vetted network of top-tier professionals, perfectly matched to your project's needs." />
              <ProcessStep number={3} title="Managed Execution" description="Our project managers oversee the entire process, ensuring milestones are met, communication is clear, and quality standards are upheld." />
              <ProcessStep number={4} title="Guaranteed Delivery & Support" description="We deliver the final product on time and on budget, with ongoing support to ensure your long-term satisfaction." />
            </div>
          </div>
          <div className="bg-brand-dark-blue p-8 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-4 text-brand-accent">Why Choose the Prime Contractor Model?</h3>
            <ul className="space-y-4 text-brand-platinum">
              <li className="flex items-start"><span className="text-brand-accent mr-3 mt-1">&#10003;</span> <strong>Single Point of Contact:</strong> Simplify communication and accountability with one dedicated project lead.</li>
              <li className="flex items-start"><span className="text-brand-accent mr-3 mt-1">&#10003;</span> <strong>Risk Mitigation:</strong> We absorb the risks of hiring, management, and quality control.</li>
              <li className="flex items-start"><span className="text-brand-accent mr-3 mt-1">&#10003;</span> <strong>Quality Assurance:</strong> Our reputation is on the line. We guarantee the quality of all deliverables.</li>
              <li className="flex items-start"><span className="text-brand-accent mr-3 mt-1">&#10003;</span> <strong>Access to Vetted Experts:</strong> Instantly tap into a network of specialists without a lengthy recruitment process.</li>
              <li className="flex items-start"><span className="text-brand-accent mr-3 mt-1">&#10003;</span> <strong>Scalability:</strong> Easily scale your team up or down based on project requirements.</li>
            </ul>
          </div>
        </div>
      </PageShell>

      <div className="bg-gray-100">
        <PageShell>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-dark-blue mb-12">Proof of Performance</h2>
           <div className="grid md:grid-cols-3 gap-8">
            {PORTFOLIO_PROJECTS.map((project, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-dark-blue mb-2">{project.title}</h3>
                  <p className="text-sm font-semibold text-brand-accent mb-3">{project.client}</p>
                  <p className="text-brand-shadow-blue text-sm mb-4">{project.description.substring(0, 100)}...</p>
                  <Link to="/portfolio" className="font-semibold text-brand-accent hover:text-blue-600">View Case Study &rarr;</Link>
                </div>
              </div>
            ))}
          </div>
        </PageShell>
      </div>

      <div className="bg-brand-accent">
         <PageShell className="text-center">
            <h2 className="text-3xl font-bold text-brand-dark-blue mb-4">Ready to Start Your Next Project?</h2>
            <p className="text-white max-w-2xl mx-auto mb-8">Let's discuss how Wedonet can help you achieve your goals with our guaranteed, managed freelance services.</p>
            <Button to="/contact" variant="secondary" className="bg-brand-dark-blue text-white hover:bg-black">Get a Quote</Button>
         </PageShell>
      </div>

    </>
  );
};

export default ClientsPage;