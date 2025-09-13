import React from 'react';
import PageShell from '../components/PageShell';
import { SERVICES_LIST } from '../constants';

const ServicesPage: React.FC = () => {
  return (
    <>
      <div className="bg-brand-dark-blue text-white">
        <PageShell className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Comprehensive Services</h1>
          <p className="text-lg md:text-xl text-brand-steel-blue max-w-3xl mx-auto">
            From technology and design to marketing and consulting, we provide a full spectrum of services to power your projects.
          </p>
        </PageShell>
      </div>
      
      <div className="bg-gray-100">
        <PageShell>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {SERVICES_LIST.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-lg font-bold text-brand-dark-blue">{service}</h3>
              </div>
            ))}
          </div>
        </PageShell>
      </div>
    </>
  );
};

export default ServicesPage;