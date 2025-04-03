import React from 'react';
import { ExternalLink } from 'lucide-react';

function Projects() {
  const projects = [
    { name: 'Clip Hunt', url: 'https://cliphunt.in' },
    { name: 'Ebook Store', url: 'https://ebookcart.in' },
    { name: 'Chat Mate', url: 'https://chatmate-dc97.onrender.com' },
    { name: 'Hire Skill Pro', url: 'https://hireskillpro.netlify.app' },
    { name: 'Handwritten to Code', url: 'https://handcode.onrender.com' },
    { name: 'Data Insight Pro', url: 'https://datainsight-pro.netlify.app' },
    { name: 'Last Minute Exam Prep', url: 'https://examprep-1.onrender.com' },
    { name: 'AI Fitness Coach', url: 'https://ai-fitness-pro.netlify.app' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 neon-header">Our Other Projects</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 hover:transform hover:scale-105 transition-all duration-300 flex items-center justify-between"
          >
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <ExternalLink className="text-primary" size={20} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Projects;