import React, { useState, useEffect } from 'react';

export interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
}

export default function ScrollProgress({
  className,
  color = 'bg-primary-500',
  height = 3,
}: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    // Calculate initial progress
    calculateScrollProgress();

    // Add scroll listener
    const handleScroll = () => {
      requestAnimationFrame(calculateScrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      role="progressbar"
      aria-label="Progresso da leitura da página"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${Math.round(scrollProgress)}% da página lida`}
    >
      {/* Background */}
      <div
        className="w-full bg-neutral-200/50 backdrop-blur-sm"
        style={{ height: `${height}px` }}
      >
        {/* Progress Bar */}
        <div
          className={`h-full transition-all duration-150 ease-out ${color}`}
          style={{
            width: `${scrollProgress}%`,
            transformOrigin: 'left center',
          }}
        />
      </div>

      {/* Screen Reader Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {scrollProgress > 0 && scrollProgress < 100 && (
          <span>Progresso da leitura: {Math.round(scrollProgress)}%</span>
        )}
        {scrollProgress >= 100 && <span>Você chegou ao final da página</span>}
      </div>
    </div>
  );
}
