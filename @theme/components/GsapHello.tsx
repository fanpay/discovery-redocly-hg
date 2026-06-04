import React, { useEffect, useRef } from 'react';

export function GsapHello() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    script.onload = () => {
      const gsap = (window as any).gsap;
      gsap.from(titleRef.current, { opacity: 0, y: -50, duration: 1, ease: 'power3.out' });
      gsap.from(boxRef.current, { opacity: 0, scale: 0.5, duration: 1, delay: 0.4, ease: 'back.out(1.7)' });
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2 ref={titleRef} style={{ fontSize: '2.5rem', color: 'var(--heading-text-color)' }}>
        Hola Mundo con GSAP
      </h2>
      <div
        ref={boxRef}
        style={{
          display: 'inline-block',
          marginTop: '1.5rem',
          padding: '1rem 2rem',
          background: 'var(--heading-text-color)',
          color: 'white',
          borderRadius: '8px',
          fontSize: '1.1rem',
        }}
      >
        Si ves esto con animación, GSAP funciona en Redocly
      </div>
    </div>
  );
}
