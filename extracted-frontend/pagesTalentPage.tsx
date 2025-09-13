import React, { useState } from 'react';
import PageShell from '../components/PageShell';
import Button from '../components/Button';

// The backend URL for the deployed Render.com service
const BACKEND_URL = 'https://wedonet-backend.onrender.com';

const TalentPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolio: '',
    specialty: '',
  });
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong.');
      }

      setFormState('success');
      setFormData({ name: '', email: '', portfolio: '', specialty: '' }); // Clear form
    } catch (error: any) {
      setFormState('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className="bg-brand-dark-blue text-white">
        <PageShell className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Join an Elite Network of Professionals</h1>
          <p className="text-lg md:text-xl text-brand-steel-blue max-w-3xl mx-auto">
            Access prestigious global projects, secure payments, and become part of a community that values quality and professionalism.
          </p>
        </PageShell>
      </div>
      
      <div className="bg-gray-100">
        <PageShell>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-dark-blue">Why Join Wedonet?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-brand-accent mb-2">Prestigious Projects</h3>
              <p className="text-brand-shadow-blue">Work with high-profile international clients like the UN and Al Jazeera on meaningful projects that make an impact.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-brand-accent mb-2">Secure & Timely Payments</h3>
              <p className="text-brand-shadow-blue">Focus on your work without worrying about invoices or payments. We handle the financials and guarantee you get paid on time.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-brand-accent mb-2">Professional Growth</h3>
              <p className="text-brand-shadow-blue">Enhance your portfolio, develop new skills, and collaborate with other top professionals in your field.</p>
            </div>
          </div>
        </PageShell>
      </div>

      <div className="bg-white">
        <PageShell>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://picsum.photos/id/1062/800/600" alt="Professional collaborating" className="rounded-lg shadow-xl"/>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-brand-dark-blue mb-4">Our Vetting Process</h2>
              <p className="text-brand-shadow-blue mb-6">We maintain a high standard of quality. Our four-step vetting process ensures that only the most skilled and professional talent joins our network.</p>
              <ul className="space-y-4">
                <li className="flex items-start"><span className="text-brand-accent font-bold text-2xl mr-4">1.</span> <div><strong className="text-brand-gunmetal">Application Review:</strong> We assess your portfolio, experience, and professional background.</div></li>
                <li className="flex items-start"><span className="text-brand-accent font-bold text-2xl mr-4">2.</span> <div><strong className="text-brand-gunmetal">Skills Assessment:</strong> A technical or practical test relevant to your area of expertise.</div></li>
                <li className="flex items-start"><span className="text-brand-accent font-bold text-2xl mr-4">3.</span> <div><strong className="text-brand-gunmetal">Live Interview:</strong> A one-on-one interview to evaluate communication skills, professionalism, and problem-solving abilities.</div></li>
                <li className="flex items-start"><span className="text-brand-accent font-bold text-2xl mr-4">4.</span> <div><strong className="text-brand-gunmetal">Trial Project:</strong> A small, paid project to assess real-world performance and reliability.</div></li>
              </ul>
            </div>
          </div>
        </PageShell>
      </div>

      <PageShell>
        <div className="max-w-4xl mx-auto bg-brand-dark-blue p-8 md:p-12 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-bold text-white text-center mb-2">Apply to Join Our Network</h2>
          <p className="text-center text-brand-steel-blue mb-8">If you are a top professional in your field, we invite you to apply.</p>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-brand-steel-blue mb-2">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 rounded-md bg-brand-shadow-blue text-white border-brand-steel-blue focus:ring-brand-accent focus:border-brand-accent placeholder:text-gray-300" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-brand-steel-blue mb-2">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 rounded-md bg-brand-shadow-blue text-white border-brand-steel-blue focus:ring-brand-accent focus:border-brand-accent placeholder:text-gray-300" />
            </div>
            <div>
              <label htmlFor="portfolio" className="block text-brand-steel-blue mb-2">Portfolio/Website Link</label>
              <input type="url" id="portfolio" name="portfolio" value={formData.portfolio} onChange={handleChange} className="w-full p-3 rounded-md bg-brand-shadow-blue text-white border-brand-steel-blue focus:ring-brand-accent focus:border-brand-accent placeholder:text-gray-300" />
            </div>
            <div>
              <label htmlFor="specialty" className="block text-brand-steel-blue mb-2">Primary Specialty</label>
              <input type="text" id="specialty" name="specialty" value={formData.specialty} onChange={handleChange} placeholder="e.g., Web Development" className="w-full p-3 rounded-md bg-brand-shadow-blue text-white border-brand-steel-blue focus:ring-brand-accent focus:border-brand-accent placeholder:text-gray-300" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" variant="primary" className="w-full" disabled={formState === 'submitting'}>
                {formState === 'submitting' ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
             {formState === 'success' && <p className="text-green-400 md:col-span-2 text-center">Application received. Thank you!</p>}
             {formState === 'error' && <p className="text-red-400 md:col-span-2 text-center">{errorMessage}</p>}
          </form>
        </div>
      </PageShell>
    </>
  );
};

export default TalentPage;