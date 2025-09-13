import React, { useState } from 'react';
import PageShell from '../components/PageShell';
import Button from '../components/Button';

// The backend URL for the deployed Render.com service
const BACKEND_URL = 'https://wedonet-backend.onrender.com';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
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
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } catch (error: any) {
      setFormState('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className="bg-brand-dark-blue text-white">
        <PageShell className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Get in Touch</h1>
          <p className="text-lg md:text-xl text-brand-steel-blue max-w-3xl mx-auto">
            Whether you're a client with a project in mind or a talented professional, we'd love to hear from you.
          </p>
        </PageShell>
      </div>

      <PageShell>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-brand-dark-blue mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-brand-gunmetal mb-1 font-medium">Full Name</label>
                <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 rounded-md border border-gray-300 focus:ring-brand-accent focus:border-brand-accent" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-brand-gunmetal mb-1 font-medium">Email Address</label>
                <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 rounded-md border border-gray-300 focus:ring-brand-accent focus:border-brand-accent" />
              </div>
               <div>
                <label htmlFor="contact-subject" className="block text-brand-gunmetal mb-1 font-medium">Subject</label>
                <input type="text" id="contact-subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full p-3 rounded-md border border-gray-300 focus:ring-brand-accent focus:border-brand-accent" />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-brand-gunmetal mb-1 font-medium">Message</label>
                <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full p-3 rounded-md border border-gray-300 focus:ring-brand-accent focus:border-brand-accent"></textarea>
              </div>
              <div>
                <Button type="submit" variant="primary" className="w-full" disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? 'Sending...' : 'Submit'}
                </Button>
              </div>
               {formState === 'success' && <p className="text-green-600 text-center">Message sent successfully! We'll be in touch soon.</p>}
               {formState === 'error' && <p className="text-red-600 text-center">{errorMessage}</p>}
            </form>
          </div>

          <div>
             <h2 className="text-3xl font-bold text-brand-dark-blue mb-6">Contact Information</h2>
             <div className="space-y-4 text-brand-shadow-blue text-lg">
                <p><strong>Address:</strong> Erbil, Kurdistan Region, Iraq</p>
                <p><strong>Email:</strong> <a href="mailto:info@wedonet.krd" className="text-brand-accent hover:text-blue-600">info@wedonet.krd</a></p>
                <p><strong>Phone:</strong> <a href="tel:+9647501234567" className="text-brand-accent hover:text-blue-600">+964 750 123 4567</a></p>
             </div>
             <div className="mt-8">
                <h3 className="text-2xl font-bold text-brand-dark-blue mb-4">Office Hours</h3>
                <p className="text-brand-shadow-blue">Sunday - Thursday: 9:00 AM - 5:00 PM</p>
                <p className="text-brand-shadow-blue">Friday - Saturday: Closed</p>
             </div>
          </div>

        </div>
      </PageShell>
    </>
  );
};

export default ContactPage;