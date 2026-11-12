import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 displaced = position;
    float wave = sin(position.y * 5.2 + uTime * 1.4) * cos(position.x * 4.1 - uTime);
    wave += sin(position.z * 5.8 + uTime * 0.9) * 0.45;
    displaced += normal * wave * 0.035;
    vNormal = normalize(normalMatrix * normal);
    vPosition = displaced;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x),
          mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
          mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z
    );
  }

  void main() {
    vec3 p = normalize(vPosition);
    float turbulence = noise(p * 5.0 + vec3(0.0, -uTime * 0.32, uTime * 0.12));
    turbulence += noise(p * 11.0 + vec3(uTime * 0.18)) * 0.32;
    float heat = smoothstep(0.18, 0.83, p.y * 0.38 + turbulence * 0.9 + 0.35);
    vec3 ember = vec3(0.22, 0.025, 0.035);
    vec3 flame = vec3(1.0, 0.16, 0.025);
    vec3 gold = vec3(1.0, 0.71, 0.23);
    vec3 color = mix(ember, flame, heat);
    color = mix(color, gold, smoothstep(0.66, 0.96, heat + turbulence * 0.12));
    float rim = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 2.1);
    color += vec3(1.0, 0.13, 0.025) * rim * 0.8;
    gl_FragColor = vec4(color, 0.97);
  }
`;

export const FireOrb = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 5.6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const orb = new THREE.Group();
    scene.add(orb);

    const sphereMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: { uTime: { value: 0 } }
    });
    const sphereGeometry = new THREE.SphereGeometry(1.08, 96, 96);
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    orb.add(sphere);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xff7a36,
      transparent: true,
      opacity: 0.46
    });
    const ringGeometry = new THREE.TorusGeometry(1.44, 0.006, 8, 160);
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.set(1.1, 0.18, -0.3);
    orb.add(ring);

    const orbitGeometry = new THREE.TorusGeometry(1.58, 0.003, 6, 160);
    const orbit = new THREE.Mesh(
      orbitGeometry,
      new THREE.MeshBasicMaterial({
        color: 0xffc477,
        transparent: true,
        opacity: 0.24
      })
    );
    orbit.rotation.set(0.48, 0.9, 0.22);
    orb.add(orbit);

    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOffsets = new Float32Array(particleCount);
    for (let index = 0; index < particleCount; index += 1) {
      particlePositions[index * 3] = (Math.random() - 0.5) * 3.8;
      particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 3.8;
      particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 1.8;
      particleOffsets[index] = Math.random() * 3.4;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('aOffset', new THREE.BufferAttribute(particleOffsets, 1));
    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        uniform float uTime;
        attribute float aOffset;
        varying float vAlpha;
        void main() {
          vec3 point = position;
          point.y = mod(aOffset + uTime * 0.2, 3.5) - 1.75;
          point.x += sin(uTime * 0.6 + aOffset * 7.0) * 0.08;
          vec4 viewPosition = modelViewMatrix * vec4(point, 1.0);
          gl_Position = projectionMatrix * viewPosition;
          gl_PointSize = 3.5 * (1.0 / -viewPosition.z);
          vAlpha = 0.25 + 0.65 * (0.5 + 0.5 * sin(uTime * 2.0 + aOffset * 13.0));
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float distanceToCenter = length(gl_PointCoord - 0.5);
          float alpha = (1.0 - smoothstep(0.05, 0.5, distanceToCenter)) * vAlpha;
          gl_FragColor = vec4(1.0, 0.43, 0.13, alpha);
        }
      `
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    orb.add(particles);

    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = mount;
      if (!clientWidth || !clientHeight) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    });
    resizeObserver.observe(mount);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId;
    const clock = new THREE.Clock();
    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();
      sphereMaterial.uniforms.uTime.value = elapsed;
      particleMaterial.uniforms.uTime.value = elapsed;
      orb.rotation.y = elapsed * 0.12;
      ring.rotation.z = Math.sin(elapsed * 0.18) * 0.08 - 0.3;
      orbit.rotation.y = 0.9 + elapsed * 0.08;
      renderer.render(scene, camera);
      if (!reduceMotion) frameId = window.requestAnimationFrame(renderFrame);
    };
    renderFrame();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      orbitGeometry.dispose();
      orbit.material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="fire-orb-canvas" aria-hidden="true" />;
};
