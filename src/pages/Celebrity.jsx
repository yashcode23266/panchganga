// ============================================================
// Celebrity.jsx
// 3D Infinite Gallery for Celebrity / Special Guests section
//
// HOW TO ADD YOUR OWN PHOTOS:
//   Edit the GALLERY_IMAGES array below.
//   Each entry: { src: 'URL_or_/path/to/image.jpg', alt: 'Caption' }
//   You can add as many as you want — the gallery loops infinitely.
//
// HOW TO CONTROL SPEED & SETTINGS:
//   Edit GALLERY_CONFIG below. All options are documented.
// ============================================================

import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// ╔══════════════════════════════════════════════════════════╗
// ║  📸 ADD YOUR PHOTOS HERE                                 ║
// ║  Replace or add entries. Use local paths like            ║
// ║  '/images/celebrity/photo1.jpg'  (put files in           ║
// ║  client/public/images/celebrity/)                        ║
// ║  OR use full https:// URLs                               ║
// ╚══════════════════════════════════════════════════════════╝
const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    alt: 'Celebrity Guest 1',
  },
  {
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    alt: 'Ganpati Celebration',
  },
  {
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80',
    alt: 'Festival Crowd',
  },
  {
    src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&auto=format&fit=crop&q=80',
    alt: 'Cultural Performance',
  },
  {
    src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=80',
    alt: 'Music & Dance',
  },
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80',
    alt: 'Event Stage',
  },
  {
    src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&auto=format&fit=crop&q=80',
    alt: 'Festival Lights',
  },
  {
    src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&auto=format&fit=crop&q=80',
    alt: 'Celebration Night',
  },
  {
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
    alt: 'Artist Performance',
  },
  {
    src: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&auto=format&fit=crop&q=80',
    alt: 'Live Concert',
  },
  {
    src: 'https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=600&auto=format&fit=crop&q=80',
    alt: 'Grand Celebration',
  },
  {
    src: 'https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?w=600&auto=format&fit=crop&q=80',
    alt: 'Devotional Gathering',
  },
];

// ╔══════════════════════════════════════════════════════════╗
// ║  ⚙️  GALLERY SETTINGS — tweak these to change behaviour  ║
// ╚══════════════════════════════════════════════════════════╝
const GALLERY_CONFIG = {
  speed: 1.2,          // Auto-scroll speed (0.5 = slow, 2.0 = fast)
  visibleCount: 10,    // How many images visible at once in 3D space
  autoPlayDelay: 3000, // ms of inactivity before auto-play resumes
  fadeIn:  { start: 0.05, end: 0.22 },   // When images fade in (0–1 range)
  fadeOut: { start: 0.42, end: 0.48 },   // When images fade out
  blurIn:  { start: 0.0,  end: 0.12 },   // Blur zone near
  blurOut: { start: 0.42, end: 0.48 },   // Blur zone far
  maxBlur: 7.0,        // Maximum blur strength
};

// ── Shader material (cloth + flag wave effect) ─────────────
const createClothMaterial = () =>
  new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map:         { value: null },
      opacity:     { value: 1.0 },
      blurAmount:  { value: 0.0 },
      scrollForce: { value: 0.0 },
      time:        { value: 0.0 },
      isHovered:   { value: 0.0 },
    },
    vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float curveIntensity = scrollForce * 0.3;
        float dist = length(pos.xy);
        float curve = dist * dist * curveIntensity;
        float ripple = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02
                     + sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = ripple * abs(curveIntensity) * 2.0;
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          float damp = smoothstep(-0.5, 0.5, pos.x);
          flagWave = sin(pos.x * 3.0 + time * 8.0) * 0.1 * damp
                   + sin(pos.x * 5.0 + time * 12.0) * 0.03 * damp;
        }
        pos.z -= (curve + clothEffect + flagWave);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      void main() {
        vec4 color = texture2D(map, vUv);
        if (blurAmount > 0.0) {
          vec2 ts = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              float w = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + vec2(x, y) * ts * blurAmount) * w;
              total += w;
            }
          }
          color = blurred / total;
        }
        color.rgb += vec3(abs(scrollForce) * 0.05 * 0.1);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });

// ── Single image plane mesh ────────────────────────────────
function ImagePlane({ texture, position, scale, material }) {
  const [hovered, setHovered] = useState(false);
  useEffect(() => { if (material) material.uniforms.map.value = texture; }, [material, texture]);
  useEffect(() => { if (material) material.uniforms.isHovered.value = hovered ? 1 : 0; }, [material, hovered]);
  return (
    <mesh
      position={position}
      scale={scale}
      material={material}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
    </mesh>
  );
}

// ── Core 3D scene ──────────────────────────────────────────
function GalleryScene({ images, speed, visibleCount, fadeIn, fadeOut, blurIn, blurOut, maxBlur }) {
  const [vel, setVel] = useState(0);
  const [auto, setAuto] = useState(true);
  const lastTouch = useRef(Date.now());
  const DEPTH = 50;

  const textures = useTexture(images.map(i => i.src));
  const materials = useMemo(() => Array.from({ length: visibleCount }, createClothMaterial), [visibleCount]);

  const spatialPos = useMemo(() => Array.from({ length: visibleCount }, (_, i) => {
    const ha = (i * 2.618) % (Math.PI * 2);
    const va = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
    const hr = (i % 3) * 1.2, vr = ((i + 1) % 4) * 0.8;
    return { x: Math.sin(ha) * hr * 8 / 3, y: Math.cos(va) * vr * 8 / 4 };
  }), [visibleCount]);

  const planes = useRef(Array.from({ length: visibleCount }, (_, i) => ({
    index: i,
    z: (DEPTH / visibleCount * i) % DEPTH,
    imageIndex: i % images.length,
    x: spatialPos[i]?.x ?? 0,
    y: spatialPos[i]?.y ?? 0,
  })));

  // Scroll handler
  const onWheel = useCallback(e => {
    e.preventDefault();
    setVel(p => p + e.deltaY * 0.01 * speed);
    setAuto(false);
    lastTouch.current = Date.now();
  }, [speed]);

  // Keyboard handler
  const onKey = useCallback(e => {
    if (['ArrowUp','ArrowLeft'].includes(e.key)) { setVel(p => p - 2 * speed); setAuto(false); lastTouch.current = Date.now(); }
    if (['ArrowDown','ArrowRight'].includes(e.key)) { setVel(p => p + 2 * speed); setAuto(false); lastTouch.current = Date.now(); }
  }, [speed]);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    canvas.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('keydown', onKey);
    return () => { canvas.removeEventListener('wheel', onWheel); document.removeEventListener('keydown', onKey); };
  }, [onWheel, onKey]);

  useEffect(() => {
    const t = setInterval(() => { if (Date.now() - lastTouch.current > 3000) setAuto(true); }, 1000);
    return () => clearInterval(t);
  }, []);

  useFrame((state, delta) => {
    if (auto) setVel(p => p + 0.3 * delta * speed);
    setVel(p => p * 0.95);

    const time = state.clock.getElapsedTime();
    materials.forEach(m => { if (m?.uniforms) { m.uniforms.time.value = time; m.uniforms.scrollForce.value = vel; } });

    const imageAdvance = visibleCount % images.length || images.length;

    planes.current.forEach((plane, i) => {
      let nz = plane.z + vel * delta * 10;
      let fw = 0, bw = 0;
      if (nz >= DEPTH) { fw = Math.floor(nz / DEPTH); nz -= DEPTH * fw; }
      else if (nz < 0) { bw = Math.ceil(-nz / DEPTH); nz += DEPTH * bw; }
      if (fw > 0) plane.imageIndex = (plane.imageIndex + fw * imageAdvance) % images.length;
      if (bw > 0) { const s = plane.imageIndex - bw * imageAdvance; plane.imageIndex = ((s % images.length) + images.length) % images.length; }
      plane.z = ((nz % DEPTH) + DEPTH) % DEPTH;
      plane.x = spatialPos[i]?.x ?? 0;
      plane.y = spatialPos[i]?.y ?? 0;

      const np = plane.z / DEPTH;
      // Opacity
      let opacity = 1;
      if (np < fadeIn.start) opacity = 0;
      else if (np <= fadeIn.end) opacity = (np - fadeIn.start) / (fadeIn.end - fadeIn.start);
      else if (np >= fadeOut.end) opacity = 0;
      else if (np >= fadeOut.start) opacity = 1 - (np - fadeOut.start) / (fadeOut.end - fadeOut.start);
      opacity = Math.max(0, Math.min(1, opacity));
      // Blur
      let blur = 0;
      if (np < blurIn.start) blur = maxBlur;
      else if (np <= blurIn.end) blur = maxBlur * (1 - (np - blurIn.start) / (blurIn.end - blurIn.start));
      else if (np >= blurOut.end) blur = maxBlur;
      else if (np >= blurOut.start) blur = maxBlur * ((np - blurOut.start) / (blurOut.end - blurOut.start));
      blur = Math.max(0, Math.min(maxBlur, blur));

      const m = materials[i];
      if (m?.uniforms) { m.uniforms.opacity.value = opacity; m.uniforms.blurAmount.value = blur; }
    });
  });

  if (!images.length) return null;

  return (
    <>
      {planes.current.map((plane, i) => {
        const tex = textures[plane.imageIndex];
        const mat = materials[i];
        if (!tex || !mat) return null;
        const worldZ = plane.z - DEPTH / 2;
        const aspect = tex.image ? tex.image.width / tex.image.height : 1;
        const scale = aspect > 1 ? [2 * aspect, 2, 1] : [2, 2 / aspect, 1];
        return (
          <ImagePlane
            key={plane.index}
            texture={tex}
            position={[plane.x, plane.y, worldZ]}
            scale={scale}
            material={mat}
          />
        );
      })}
    </>
  );
}

// ── Fallback grid (no WebGL) ───────────────────────────────
function FallbackGrid({ images }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-6">
      {images.map((img, i) => (
        <div key={i} className="relative group overflow-hidden rounded-xl aspect-square">
          <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          {img.alt && (
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-white text-sm font-medium">{img.alt}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main exported page ─────────────────────────────────────
export default function Celebrity() {
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      if (!c.getContext('webgl') && !c.getContext('experimental-webgl')) setWebgl(false);
    } catch { setWebgl(false); }
  }, []);

  const cfg = GALLERY_CONFIG;

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      {/* ── Hero heading ── */}
      <div className="absolute top-2 left-0 right-0 z-10 text-center">
        <p className="text-green-700 uppercase tracking-[0.3em] text-[10px] font-semibold mb-1">
          Special Guests & Celebrities
        </p>
        <h1
          className="text-2xl md:text-3xl font-bold"
          style={{
            color: '#176308',
            fontFamily: '"Georgia", serif',
          }}
        >
          Celebrity Moments
        </h1>
        <p className="mt-1 text-white/50 text-[10px] tracking-wide">
          Scroll • Arrow keys • Touch to navigate
        </p>
      </div>

      {/* ── 3D Gallery ── */}
      <div className="relative" style={{ height: '100vh' }}>
        {webgl ? (
          <Canvas
            camera={{ position: [0, 0, 0], fov: 55 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <GalleryScene
              images={GALLERY_IMAGES}
              speed={cfg.speed}
              visibleCount={cfg.visibleCount}
              fadeIn={cfg.fadeIn}
              fadeOut={cfg.fadeOut}
              blurIn={cfg.blurIn}
              blurOut={cfg.blurOut}
              maxBlur={cfg.maxBlur}
            />
          </Canvas>
        ) : (
          <FallbackGrid images={GALLERY_IMAGES} />
        )}

        {/* Overlaid title in centre */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center mix-blend-exclusion">
          <h2
            className="font-serif italic text-4xl md:text-6xl text-white text-center leading-tight select-none"
            style={{ textShadow: '0 0 60px rgba(255,107,0,0.5)' }}
          >
            <br />
          </h2>
        </div>
      </div>

      {/* ── Controls hint ── */}
      <div className="fixed bottom-6 left-0 right-0 z-50 text-center pointer-events-none">
        <p className="text-white/40 text-[11px] uppercase tracking-widest font-mono">
          Auto-play resumes after {cfg.autoPlayDelay / 1000}s of inactivity
        </p>
      </div>
    </div>
  );
}