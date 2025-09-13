import React from 'react';
import PageShell from '../components/PageShell';
import { TEAM_MEMBERS } from '../constants';

const AboutPage: React.FC = () => {
  return (
    <>
      <div className="bg-brand-dark-blue text-white">
        <PageShell className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Empowering Talent, Delivering Excellence</h1>
          <p className="text-lg md:text-xl text-brand-steel-blue max-w-3xl mx-auto">
            We are a mission-driven company dedicated to showcasing the incredible skill of Iraqi & Kurdish professionals on the global stage.
          </p>
        </PageShell>
      </div>

      <PageShell>
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-brand-dark-blue mb-4">Our Mission</h2>
            <p className="text-lg text-brand-shadow-blue">
                Our mission is to be the premier bridge between elite regional talent and top-tier international clients. We operate as a high-trust Prime Contractor, guaranteeing quality, managing projects to completion, and fostering economic opportunity. We're not just building a business; we're building a reputation for excellence.
            </p>
        </div>
      </PageShell>

      <div className="bg-gray-100">
        <PageShell>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark-blue">Meet Our Leadership</h2>
            <p className="text-brand-shadow-blue mt-2">The experienced team guiding our mission.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TEAM_MEMBERS.map(member => (
              <div key={member.name} className="text-center bg-white p-6 rounded-lg shadow-lg">
                <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-brand-accent"/>
                <h3 className="text-xl font-bold text-brand-dark-blue">{member.name}</h3>
                <p className="text-brand-accent font-semibold mb-2">{member.role}</p>
                <p className="text-brand-shadow-blue text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </PageShell>
      </div>
    </>
  );
};

export default AboutPage;