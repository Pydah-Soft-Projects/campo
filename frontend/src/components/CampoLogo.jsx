import React from 'react';
import campoLogoDarkText from '../assets/campo-logo-dark-text-crisp.png';
import campoLogoLightText from '../assets/campo-logo-transparent-crisp.png';

/**
 * Renders the official Campo brand logo directly without container boxes.
 * - variant="dark": navy wordmark + teal swoosh for light backgrounds (default)
 * - variant="light": white wordmark + teal swoosh for dark surfaces
 */
export function CampoLogo({
  variant = 'dark',
  size = 'md',
  className = '',
}) {
  const src = variant === 'light' ? campoLogoLightText : campoLogoDarkText;
  const sizeClass = size === 'sm' ? 'h-5 sm:h-6' : 'h-7 sm:h-8';

  return (
    <img
      src={src}
      alt="Campo"
      width={432}
      height={128}
      className={`${sizeClass} w-auto select-none object-contain ${className}`}
      draggable={false}
    />
  );
}
