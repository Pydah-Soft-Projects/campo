import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import sectionBg from '../assets/section-bg.jpg';

export const revealEase = [0.22, 1, 0.36, 1];

const backgroundOrientations = {
  default: '',
  flipX: '-scale-x-100',
  flipY: '-scale-y-100',
  flipBoth: '-scale-x-100 -scale-y-100',
};

/**
 * Shared light cyan orbital background layer for content sections with edge fades
 * to maintain seamless transitions and crisp text/card contrast.
 */
export function SectionBackground({
  variant = 'default',
  opacityClass = 'opacity-85',
  washClass = 'bg-white/25',
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <img
        src={sectionBg}
        alt=""
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover object-center ${opacityClass} ${
          backgroundOrientations[variant] || backgroundOrientations.default
        }`}
      />
      <div className={`absolute inset-0 ${washClass}`} />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/75 to-transparent" />
    </div>
  );
}

/**
 * Signature bottom-right layered teal curved wave matching Campo's dark brand cards.
 */
export function BrandCornerWave({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 150"
      fill="none"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute bottom-0 right-0 select-none ${className}`}
    >
      <path
        d="M360 150H35C118 134 195 92 268 42C302 19 332 6 360 0V150Z"
        fill="#009E91"
        fillOpacity="0.45"
      />
      <path
        d="M360 150H95C172 132 238 96 300 49C322 32 342 20 360 14V150Z"
        fill="#00C5B5"
        fillOpacity="0.9"
      />
    </svg>
  );
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 16,
  once = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.16 }}
      transition={{ duration: 0.5, delay, ease: revealEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  description,
  align = 'left',
}) {
  const isCenter = align === 'center';

  return (
    <Reveal
      className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'}`}
    >
      {(index || label) && (
        <div
          className={`mb-3 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-campo-teal-dark ${
            isCenter ? 'justify-center' : ''
          }`}
        >
          {index && <span className="font-mono text-campo-navy/45">{index}</span>}
          {index && label && <span className="h-px w-5 bg-slate-300" />}
          {label && <span>{label}</span>}
        </div>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-campo-navy sm:text-4xl lg:text-[2.6rem] lg:leading-[1.14]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-campo-muted sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function AnimatedCounter({ target, suffix = '', duration = 1100 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCount(target);
      return undefined;
    }

    let frameId;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
