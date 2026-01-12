
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Brain Stylized Form */}
        <path d="M50 20C35 20 20 30 20 50C20 70 35 80 50 80C65 80 80 70 80 50C80 30 65 20 50 20Z" fill="white" fillOpacity="0.1" />
        
        {/* Connecting Lines */}
        <line x1="30" y1="40" x2="50" y2="35" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" className="opacity-40" />
        <line x1="50" y1="35" x2="70" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" className="opacity-40" />
        <line x1="30" y1="40" x2="40" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" className="opacity-40" />
        <line x1="70" y1="40" x2="60" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" className="opacity-40" />
        <line x1="40" y1="60" x2="60" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" className="opacity-40" />
        <line x1="50" y1="35" x2="50" y2="75" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" className="opacity-40" />

        {/* Nodes */}
        <circle cx="30" cy="40" r="5" fill="#4A90E2" />
        <circle cx="70" cy="40" r="5" fill="#8E44AD" />
        <circle cx="50" cy="35" r="4" fill="#9B59B6" />
        <circle cx="40" cy="60" r="5" fill="#8E44AD" />
        <circle cx="60" cy="60" r="5" fill="#4A90E2" />
        <circle cx="50" cy="75" r="4" fill="#9B59B6" />
        
        {/* Brain Central Connection */}
        <path d="M45 50C45 47.2386 47.2386 45 50 45C52.7614 45 55 47.2386 55 50C55 52.7614 52.7614 55 50 55C47.2386 55 45 52.7614 45 50Z" fill="currentColor" />
      </svg>
    </div>
  );
};

export default Logo;
