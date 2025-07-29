import React, { useEffect, useState } from 'react';

const MouseTrail = () => {
  const [trails, setTrails] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    let trailId = 0;
    const maxTrails = 8;

    const handleMouseMove = (e: MouseEvent) => {
      const newTrail = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY,
      };

      setTrails(prev => {
        const updated = [...prev, newTrail];
        if (updated.length > maxTrails) {
          return updated.slice(1);
        }
        return updated;
      });

      // Remove trail after animation
      setTimeout(() => {
        setTrails(prev => prev.filter(trail => trail.id !== newTrail.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="mouse-trail"
          style={{
            left: trail.x - 3,
            top: trail.y - 3,
            opacity: 0.7 - (index * 0.08),
            transform: `scale(${1 - index * 0.1})`,
                               background: index % 3 === 0
                     ? 'hsl(var(--data-blue))'
                     : index % 3 === 1
                       ? 'hsl(var(--data-cyan))'
                       : 'hsl(var(--data-purple))'
          }}
        />
      ))}
    </>
  );
};

export default MouseTrail; 