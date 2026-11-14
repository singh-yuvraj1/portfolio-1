import React, { useEffect, useRef, useState } from 'react';

/**
 * AnimatedCursor
 * A luxury, high-performance creative developer custom cursor with:
 * 1. Enhanced, bold border thickness and a crisp, multi-layer radiant center dot.
 * 2. High-density diamond star (✦) & stardust glitter particles that sparkle on movement.
 * 3. A luminous, dual-layer glowing comet ribbon trailing the cursor.
 * 4. 25+ particle burst shockwave on click with expanding gold energy rings.
 * 5. Context-aware morphing states (hovering links, buttons, cards, text).
 * 6. Zero performance impact via requestAnimationFrame Canvas rendering + GPU transforms.
 */
export const AnimatedCursor = () => {
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'pointer' | 'card' | 'text' | 'hidden'
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);

  // Position references (avoiding React re-renders for true 120fps smoothness)
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const prevMousePos = useRef({ x: -100, y: -100 });
  const trailPoints = useRef([]);
  const particles = useRef([]);
  const shockwaves = useRef([]);
  const isVisible = useRef(false);

  // Helper function to draw a 4-point diamond sparkle star
  const drawSparkleStar = (ctx, x, y, size, rotation, color, alpha) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;

    const spikes = 4;
    const outerRadius = size;
    const innerRadius = size * 0.22;
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(0, -outerRadius);
    for (let i = 0; i < spikes; i++) {
      let curX = Math.cos(rot) * outerRadius;
      let curY = Math.sin(rot) * outerRadius;
      ctx.lineTo(curX, curY);
      rot += step;

      curX = Math.cos(rot) * innerRadius;
      curY = Math.sin(rot) * innerRadius;
      ctx.lineTo(curX, curY);
      rot += step;
    }
    ctx.lineTo(0, -outerRadius);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  useEffect(() => {
    // Check if device supports fine hover (desktop/laptop)
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) {
      setIsTouchDevice(true);
      return;
    }

    // Add cursor-none class to body on fine pointer devices
    document.body.classList.add('custom-cursor-enabled');

    const GLITTER_COLORS = ['#FFFFFF', '#FFF8E7', '#FFE082', '#FFD54F', '#E5C37A', '#C8A45C'];

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible.current) {
        isVisible.current = true;
        ringPos.current = { x: e.clientX, y: e.clientY };
      }

      // Add to trailing history points with width & velocity data
      const dx = e.clientX - prevMousePos.current.x;
      const dy = e.clientY - prevMousePos.current.y;
      const speed = Math.hypot(dx, dy);

      trailPoints.current.unshift({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        speed: speed
      });

      // Increased & improved glitter emission (triggers on any gentle motion > 3px)
      if (speed > 3 && particles.current.length < 120) {
        // Spawn 2 to 5 glitter particles per movement step
        const spawnCount = Math.min(Math.max(Math.floor(speed / 7), 2), 6);
        for (let i = 0; i < spawnCount; i++) {
          const isStar = Math.random() > 0.45;
          const color = GLITTER_COLORS[Math.floor(Math.random() * GLITTER_COLORS.length)];
          particles.current.push({
            x: e.clientX + (Math.random() - 0.5) * 14,
            y: e.clientY + (Math.random() - 0.5) * 14,
            vx: (Math.random() - 0.5) * 2.2 - dx * 0.08,
            vy: (Math.random() - 0.5) * 2.2 - dy * 0.08 - 0.4, // gentle upward floating drift
            life: 1,
            decay: Math.random() * 0.022 + 0.016, // longer lasting sparkle
            size: isStar ? Math.random() * 4 + 3 : Math.random() * 2.8 + 1.2,
            isStar: isStar,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.18,
            twinkleFreq: Math.random() * 0.2 + 0.1,
            color: color
          });
        }
      }

      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (e) => {
      setIsMouseDown(true);

      // 1. Expanding shockwave ring
      shockwaves.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: 32,
        opacity: 0.9,
        lineWidth: 2.2
      });

      // 2. High-density radiant sparkle burst (25+ glittering particles)
      for (let i = 0; i < 26; i++) {
        const angle = (Math.PI * 2 * i) / 26 + (Math.random() - 0.5) * 0.4;
        const velocity = Math.random() * 4.5 + 2.5;
        const isStar = Math.random() > 0.35;
        const color = GLITTER_COLORS[Math.floor(Math.random() * GLITTER_COLORS.length)];

        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1,
          decay: Math.random() * 0.025 + 0.02,
          size: isStar ? Math.random() * 5 + 3.5 : Math.random() * 3 + 1.5,
          isStar: isStar,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.25,
          twinkleFreq: 0.25,
          color: color
        });
      }
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const interactiveLink = target.closest('a, button, [role="button"], input, textarea, select');
      const projectCard = target.closest('.project-card, .flip-card-inner, [data-cursor="view"]');
      const textElement = target.closest('p, blockquote, h1, h2, h3, h4');

      if (projectCard) {
        setCursorState('card');
        setCursorText('VIEW');
      } else if (interactiveLink) {
        setCursorState('pointer');
        setCursorText('');
      } else if (textElement && !interactiveLink) {
        setCursorState('text');
        setCursorText('');
      } else {
        setCursorState('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      setCursorState('hidden');
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
      setCursorState('default');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Canvas size sync
    const canvas = canvasRef.current;
    let ctx = canvas ? canvas.getContext('2d') : null;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // High performance animation loop
    let animId;
    let frameCount = 0;

    const render = () => {
      frameCount++;

      // 1. Update ring position with fluid Lerp
      const lerpFactor = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      // 2. Direct DOM positioning for zero latency
      if (dotRef.current && isVisible.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current && isVisible.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // 3. Canvas rendering for thick fluid ribbon & sparkling glitter
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // A. Draw expanding click shockwaves
        const waves = shockwaves.current;
        for (let i = waves.length - 1; i >= 0; i--) {
          const w = waves[i];
          w.radius += 2.2;
          w.opacity -= 0.045;
          if (w.opacity <= 0 || w.radius >= w.maxRadius) {
            waves.splice(i, 1);
            continue;
          }
          ctx.save();
          ctx.beginPath();
          ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 224, 130, ${w.opacity})`;
          ctx.lineWidth = w.lineWidth;
          ctx.shadowColor = '#FFD54F';
          ctx.shadowBlur = 14;
          ctx.stroke();
          ctx.restore();
        }

        // B. Draw thick, luminous dual-layer connecting fluid comet trail
        const points = trailPoints.current;
        if (points.length > 2) {
          // Layer 1: Thick golden ambient glow ribbon
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);

          for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
          }

          ctx.strokeStyle = 'rgba(200, 164, 92, 0.42)';
          ctx.lineWidth = 4.5; // Increased thickness
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.shadowColor = '#E5C37A';
          ctx.shadowBlur = 14;
          ctx.stroke();

          // Layer 2: Inner bright diamond core line
          ctx.strokeStyle = 'rgba(255, 248, 231, 0.8)';
          ctx.lineWidth = 2.0;
          ctx.shadowBlur = 6;
          ctx.stroke();
          ctx.restore();
        }

        // Age and trim trailing points
        for (let i = points.length - 1; i >= 0; i--) {
          points[i].age += 1;
          if (points[i].age > 18) {
            points.splice(i, 1);
          }
        }

        // C. Draw drifting glitter stardust & sparkling stars
        const partList = particles.current;
        for (let i = partList.length - 1; i >= 0; i--) {
          const p = partList[i];
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotSpeed;
          p.life -= p.decay;

          if (p.life <= 0) {
            partList.splice(i, 1);
            continue;
          }

          // Shimmering twinkle factor
          const twinkle = 0.75 + Math.sin(frameCount * p.twinkleFreq) * 0.25;
          const currentAlpha = p.life * twinkle;

          if (p.isStar) {
            // Draw 4-point diamond star sparkle
            drawSparkleStar(ctx, p.x, p.y, p.size * p.life, p.rotation, p.color, currentAlpha);
          } else {
            // Draw glowing stardust orb
            ctx.save();
            ctx.globalAlpha = currentAlpha;
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isTouchDevice) return null;

  // Calculate dynamic styling classes with reduced, refined circle sizes & clean thickness
  let ringClasses = 'w-7 h-7 border-[2px] border-[#C8A45C] bg-[rgba(200,164,92,0.08)] shadow-[0_0_16px_rgba(200,164,92,0.4),inset_0_0_8px_rgba(200,164,92,0.15)]';
  let dotClasses = 'w-2 h-2 bg-[#FFE082] border-[1.5px] border-white shadow-[0_0_8px_#FFD54F,0_0_16px_rgba(200,164,92,0.9)]';

  if (cursorState === 'pointer') {
    ringClasses = 'w-11 h-11 border-[2px] border-[#FFE082] bg-[rgba(200,164,92,0.18)] shadow-[0_0_24px_rgba(200,164,92,0.55)] backdrop-blur-[1px]';
    dotClasses = 'w-1.5 h-1.5 bg-white border border-[#FFE082] scale-110 shadow-[0_0_10px_#FFF]';
  } else if (cursorState === 'card') {
    ringClasses = 'w-14 h-14 border-[2px] border-[#E5C37A] bg-[rgba(14,18,26,0.85)] shadow-[0_0_28px_rgba(200,164,92,0.6)] backdrop-blur-sm';
    dotClasses = 'opacity-0';
  } else if (cursorState === 'text') {
    ringClasses = 'w-4 h-7 rounded-sm border-[1.5px] border-[#C8A45C] bg-[rgba(200,164,92,0.05)] shadow-[0_0_10px_rgba(200,164,92,0.25)]';
    dotClasses = 'w-1 h-3 rounded-full bg-[#FFE082] shadow-[0_0_8px_#FFE082]';
  } else if (cursorState === 'hidden') {
    ringClasses = 'opacity-0 scale-50';
    dotClasses = 'opacity-0 scale-50';
  }

  if (isMouseDown) {
    ringClasses += ' scale-75 border-[2.5px] border-amber-200 shadow-[0_0_20px_#FFE082]';
    dotClasses += ' scale-125 bg-white border border-amber-300';
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none">
      {/* 1. Canvas Sparkle Comet Trail & Glitter */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
      />

      {/* 2. Enhanced Thickness Spring Follower Ring */}
      <div
        ref={ringRef}
        className={`pointer-events-none absolute top-0 left-0 rounded-full flex items-center justify-center transition-[width,height,background-color,border-color,opacity] duration-300 ease-out z-10 ${ringClasses}`}
        style={{
          willChange: 'transform',
        }}
      >
        {cursorText && (
          <span className="font-mono text-[10px] font-bold text-[#FFE082] tracking-[0.25em] uppercase select-none animate-pulse drop-shadow-[0_0_8px_rgba(255,224,130,0.8)]">
            {cursorText}
          </span>
        )}
      </div>

      {/* 3. High-Definition Center Pinpoint Dot with White-Gold Core */}
      <div
        ref={dotRef}
        className={`pointer-events-none absolute top-0 left-0 rounded-full transition-[opacity,transform] duration-150 ease-out z-20 ${dotClasses}`}
        style={{
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default AnimatedCursor;
