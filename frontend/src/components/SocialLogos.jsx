import React from 'react';

/**
 * Circle social media icon set matching the reference design:
 * Uniform circles with crisp white brand glyphs and smooth brand-colored hover transitions.
 */

export function FacebookCircleIcon({ className = 'h-10 w-10 sm:h-11 sm:w-11' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`transition-all duration-300 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="24"
        cy="24"
        r="23"
        className="fill-slate-900/95 stroke-white/25 group-hover:fill-[#1877F2] group-hover:stroke-[#1877F2] transition-colors duration-300"
        strokeWidth="1.5"
      />
      <path
        d="M26.2 36V23.8h4.2l.6-4.8h-4.8v-3.1c0-1.4.4-2.3 2.4-2.3h2.5V9.4c-.4-.1-1.9-.2-3.6-.2-3.6 0-6 2.2-6 6.2v3.7H17v4.8h4.4V36h4.8z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function InstagramCircleIcon({ className = 'h-10 w-10 sm:h-11 sm:w-11' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`transition-all duration-300 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="24"
        cy="24"
        r="23"
        className="fill-slate-900/95 stroke-white/25 group-hover:fill-[#E1306C] group-hover:stroke-[#E1306C] transition-colors duration-300"
        strokeWidth="1.5"
      />
      <rect x="15" y="15" width="18" height="18" rx="5.2" stroke="#FFFFFF" strokeWidth="2.4" fill="none" />
      <circle cx="24" cy="24" r="4.6" stroke="#FFFFFF" strokeWidth="2.4" fill="none" />
      <circle cx="28.9" cy="19.1" r="1.3" fill="#FFFFFF" />
    </svg>
  );
}

export function YouTubeCircleIcon({ className = 'h-10 w-10 sm:h-11 sm:w-11' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`transition-all duration-300 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="24"
        cy="24"
        r="23"
        className="fill-slate-900/95 stroke-white/25 group-hover:fill-[#FF0000] group-hover:stroke-[#FF0000] transition-colors duration-300"
        strokeWidth="1.5"
      />
      {/* White YouTube Pill with Cutout Play Triangle */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.6 17.2a3.1 3.1 0 0 0-2.2-2.2C31.5 14.4 24 14.4 24 14.4s-7.5 0-9.4.6a3.1 3.1 0 0 0-2.2 2.2c-.6 2-.6 6.8-.6 6.8s0 4.8.6 6.8a3.1 3.1 0 0 0 2.2 2.2c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3.1 3.1 0 0 0 2.2-2.2c.6-2 .6-6.8.6-6.8s0-4.8-.6-6.8zm-14.1 10.2v-6.8l6 3.4-6 3.4z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function LinkedInCircleIcon({ className = 'h-10 w-10 sm:h-11 sm:w-11' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`transition-all duration-300 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="24"
        cy="24"
        r="23"
        className="fill-slate-900/95 stroke-white/25 group-hover:fill-[#0A66C2] group-hover:stroke-[#0A66C2] transition-colors duration-300"
        strokeWidth="1.5"
      />
      <path
        d="M18.8 15.6a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0zm-.3 4.2h-3.9v12.6h3.9V19.8zm6.2 0h-3.8v12.6h3.8v-6.8c0-2 .9-3 2.6-3 1.6 0 2.3 1.1 2.3 3v6.8h3.8v-7.6c0-3.7-2-5.4-4.7-5.4-2.2 0-3.2 1.2-3.8 2.1v-1.7z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export const realisticSocialLogos = {
  youtube: YouTubeCircleIcon,
  instagram: InstagramCircleIcon,
  facebook: FacebookCircleIcon,
  linkedin: LinkedInCircleIcon,
};
