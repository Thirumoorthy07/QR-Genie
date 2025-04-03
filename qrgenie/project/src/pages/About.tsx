import React from 'react';
import { Github, Instagram, Twitter } from 'lucide-react';

function About() {
  const teamMembers = [
    {
      name: 'Rajesh',
      role: 'Full Stack Web Developer',
      specialties: 'Hacking & Cybersecurity Expert',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300',
    },
    {
      name: 'Thirumoorthy',
      role: 'Marketing & Sales',
      specialties: 'Game Dev & Basic Web Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300',
    },
    {
      name: 'Saur Basha',
      role: 'Full Stack Web Developer',
      specialties: 'Graphic Designer, App Developer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6 neon-header">About QR Genie</h1>
        <p className="text-xl opacity-80">
          This QR Code Generator is a fast and reliable tool to convert any URL into a scannable QR code. 
          It is perfect for businesses, social media links, event promotions, and more. Built with modern 
          web technologies, this tool is designed for efficiency and ease of use.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div key={member.name} className="glass-card p-6 text-center transition-all hover:transform hover:scale-105">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-2"
              style={{ borderColor: 'var(--primary)' }}
            />
            <h3 className="text-xl font-bold mb-2 neon-header">{member.name}</h3>
            <p className="opacity-90 mb-2">{member.role}</p>
            <p className="opacity-70 text-sm">{member.specialties}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-xl mb-6">We are currently college students, working on innovative tech solutions.</p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/rajeshstark2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.instagram.com/starkcloudie/?igsh=MTRpcG96cmJpdXVx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-colors"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://x.com/Rajeshcoder?t=uXXfNCnXc1wrqD7d8fSsiA&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-colors"
          >
            <Twitter size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;