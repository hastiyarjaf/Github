import React from 'react';
import { CLIENT_LOGOS } from '../constants';

const ClientLogos: React.FC = () => {
  // Duplicate the logos array to create a seamless scrolling effect
  const extendedLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-bold text-brand-dark-blue mb-16">
          Our <span className="text-brand-accent">Clients</span>
        </h2>
        <div
          className="relative w-full overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="flex w-max animate-slide hover:[animation-play-state:paused]">
            {extendedLogos.map((client, index) => (
              <div key={index} className="flex-shrink-0 w-56 mx-4 flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg h-36 transition-shadow hover:shadow-xl">
                <img
                  className="max-h-full max-w-full object-contain"
                  src={client.logo}
                  alt={client.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;