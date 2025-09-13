import React from 'react';
import Button from '../components/Button';
import ClientLogos from '../components/ClientLogos';
import { PORTFOLIO_PROJECTS, SERVICES_LIST } from '../constants';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-brand-dark-blue text-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Elite Talent, Guaranteed Delivery.
          </h1>
          <p className="text-lg md:text-xl text-brand-steel-blue max-w-3xl mx-auto mb-8">
            We are your Prime Contractor in the freelance market, connecting top-tier international clients with the finest vetted talent from Iraq and Kurdistan.
          </p>
          <div className="flex justify-center space-x-4">
            <Button to="/clients" variant="primary">For Clients</Button>
            <Button to="/talent" variant="outline">For Talent</Button>
          </div>
        </div>
      </div>

      {/* Client Logos */}
      <ClientLogos />

      {/* Services Overview Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-blue mb-4">Our Expertise</h2>
          <p className="text-brand-shadow-blue max-w-2xl mx-auto mb-10">We offer a comprehensive suite of over 30 professional services to meet the demands of any project.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {SERVICES_LIST.slice(0, 10).map((service, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                {service}
              </span>
            ))}
            <Link to="/services" className="bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors">
              + {SERVICES_LIST.length - 10} more
            </Link>
          </div>
        </div>
      </div>

      {/* Why Us Section */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-blue">The Wedonet Advantage</h2>
            <p className="text-brand-shadow-blue max-w-2xl mx-auto mt-4">We're not just a marketplace. We're a managed service partner dedicated to your success.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-brand-accent mb-2">Vetted Elite Talent</h3>
              <p className="text-brand-shadow-blue">Our rigorous screening process ensures you work with only the top 1% of regional professionals.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-brand-accent mb-2">Managed Delivery</h3>
              <p className="text-brand-shadow-blue">As your prime contractor, we oversee the entire project lifecycle, ensuring quality and on-time delivery.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-brand-accent mb-2">Guaranteed Quality</h3>
              <p className="text-brand-shadow-blue">We stand by our work. Your satisfaction is not just a goal; it's our guarantee.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Portfolio */}
       <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-dark-blue mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {PORTFOLIO_PROJECTS.slice(0, 3).map((project, index) => (
              <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-dark-blue mb-2">{project.title}</h3>
                  <p className="text-sm font-semibold text-brand-accent mb-3">{project.client}</p>
                  <p className="text-brand-shadow-blue text-sm mb-4">{project.description.substring(0, 100)}...</p>
                  <Link to="/portfolio" className="font-semibold text-brand-accent hover:text-blue-600">Read More &rarr;</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;