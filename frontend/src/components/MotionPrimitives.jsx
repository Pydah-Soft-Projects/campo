import React, { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import sectionBg from '../assets/section-bg.jpg';

export const revealEase = [0.22, 1, 0.36, 1];

const backgroundOrientations = {
  default: '',
  flipX: '-scale-x-100',
  flipY: '-scale-y-100',
  flipBoth: '-scale-x-100 -scale-y-100',
};

/**
 * Top viewport scroll progress indicator linking page scroll position to a crisp brand gradient
 * with an energetic glow and smooth spring physics.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3.5px] bg-slate-200/20">
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-left bg-gradient-to-r from-campo-navy via-campo-teal to-[#38BDF8] shadow-[0_0_12px_rgba(0,197,181,0.85)]"
      />
    </div>
  );
}

/**
 * Shared light cyan orbital background layer with scroll-linked parallax and edge fades
 * to maintain seamless transitions and crisp text/card contrast.
 */
export function SectionBackground({
  variant = 'default',
  opacityClass = 'opacity-85',
  washClass = 'bg-white/25',
}) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        style={prefersReducedMotion ? undefined : { y: parallaxY }}
        className="absolute -inset-y-10 inset-x-0 will-change-transform"
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
      </motion.div>
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
  y = 24,
  once = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, amount: 0.14 }}
      transition={{ duration: 0.55, delay, ease: revealEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  titleClassName = '',
  descriptionClassName = '',
}) {
  const isCenter = align === 'center';

  return (
    <Reveal
      y={22}
      className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'}`}
    >
      {label && (
        <div
          className={`mb-2.5 sm:mb-3 flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-campo-teal-dark ${
            isCenter ? 'justify-center' : ''
          }`}
        >
          <span>{label}</span>
        </div>
      )}
      <h2 className={`font-display text-xl sm:text-3xl lg:text-[2.6rem] font-bold leading-[1.2] lg:leading-[1.14] tracking-tight text-campo-navy ${titleClassName}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-2.5 sm:mt-4 text-xs sm:text-base leading-relaxed text-campo-muted ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 1.3,
  amount = 0.1,
  margin = '0px 0px -30px 0px',
  once = false,
  className = '',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount, margin });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (!isInView) {
      if (!once) {
        node.textContent = `${prefix}0${suffix}`;
      }
      return undefined;
    }

    if (prefersReducedMotion) {
      node.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
      return undefined;
    }

    // Convert milliseconds to seconds if passed as > 10
    const durInSeconds = duration > 10 ? duration / 1000 : duration;

    // Direct DOM text animation via framer-motion controls with easeOutExpo curve [0.16, 1, 0.3, 1]
    // Prevents React re-render churn (ensures 60-120fps smooth native text updates without digit jitter)
    const controls = animate(0, target, {
      duration: durInSeconds,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (!node) return;
        const val = Number.isInteger(target)
          ? Math.round(latest).toLocaleString()
          : latest.toFixed(1);
        node.textContent = `${prefix}${val}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration, once, prefix, suffix, prefersReducedMotion]);

  return (
    <span ref={ref} className={`tabular-nums inline-block ${className}`}>
      {prefix}0{suffix}
    </span>
  );
}
