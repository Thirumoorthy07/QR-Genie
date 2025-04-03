import React from 'react';
import { Mail, Instagram, Twitter, Github } from 'lucide-react';

function Contact() {
  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: 'starkcloudie@gmail.com',
      href: 'mailto:starkcloudie@gmail.com',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@starkcloudie',
      href: 'https://www.instagram.com/starkcloudie/?igsh=MTRpcG96cmJpdXVx',
    },
    {
      icon: Twitter,
      label: 'Twitter (X)',
      value: '@Rajeshcoder',
      href: 'https://x.com/Rajeshcoder?t=uXXfNCnXc1wrqD7d8fSsiA&s=09',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'rajeshstark2',
      href: 'https://github.com/rajeshstark2',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 neon-header">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {contacts.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 hover:transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <contact.icon size={24} className="text-primary" />
              <div>
                <h2 className="text-xl font-semibold">{contact.label}</h2>
                <p className="opacity-80">{contact.value}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Contact;