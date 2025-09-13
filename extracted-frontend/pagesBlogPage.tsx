import React from 'react';
import PageShell from '../components/PageShell';
import { BLOG_POSTS } from '../constants';
import { Link } from 'react-router-dom';

const BlogPage: React.FC = () => {
  return (
    <>
      <div className="bg-brand-gunmetal text-white">
        <PageShell className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Insights & News</h1>
          <p className="text-lg md:text-xl text-brand-steel-blue max-w-3xl mx-auto">
            Stay updated with the latest trends, company news, and thought leadership from the Wedonet team.
          </p>
        </PageShell>
      </div>

      <div className="bg-gray-100">
        <PageShell>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-brand-steel-blue mb-2">{post.date} &bull; by {post.author}</p>
                  <h2 className="text-xl font-bold text-brand-dark-blue mb-3 flex-grow">{post.title}</h2>
                  <p className="text-brand-shadow-blue mb-4">{post.excerpt}</p>
                  <span className="font-semibold text-brand-accent mt-auto cursor-not-allowed">
                    Read More &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </PageShell>
      </div>
    </>
  );
};

export default BlogPage;