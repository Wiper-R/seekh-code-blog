"use client";

import { useEffect, useRef, useState } from "react";

const MAX_PARTICLE_SPEED = 0.3;

class Particle {
  x: number;
  y: number;
  r: number;
  _o: number;
  speed: [number, number];
  opDiff: number;
  constructor(
    x: number,
    y: number,
    r: number,
    o: number,
    speed: [number, number]
  ) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speed = speed;
    this._o = o;
    this.opDiff = 0;
  }

  static random(width: number, height: number) {
    const r = 1 + Math.random() * 2;
    const o = 0.1 + Math.random() * 0.4;
    const x = Math.random() * width;
    const y = Math.random() * height;
    const speed: [number, number] = [
      Math.random() * (MAX_PARTICLE_SPEED * 2) - MAX_PARTICLE_SPEED,
      Math.random() * (MAX_PARTICLE_SPEED * 2) - MAX_PARTICLE_SPEED,
    ];
    return new Particle(x, y, r, o, speed);
  }

  update(canvasSize: { width: number; height: number }) {
    this.x += this.speed[0];
    this.y += this.speed[1];

    if (this.x > canvasSize.width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = canvasSize.width;
    }

    if (this.y > canvasSize.height) {
      this.y = 0;
    }

    if (this.y < 0) {
      this.x = canvasSize.height;
    }

    const buffer = 50; // In pixels
    const distLeft = Math.max(0, buffer - this.x);
    const distRight = Math.max(0, this.x - canvasSize.width + buffer);
    const distTop = Math.max(0, buffer - this.y);
    const distBottom = Math.max(0, this.y - canvasSize.height + buffer);
    this.opDiff =
      (Math.max(distLeft, distRight, distTop, distBottom) / buffer) * this._o;
  }

  get o() {
    return Math.max(0, this._o - this.opDiff);
  }
}

export function ParticlesBackground({
  amount = 30,
  color,
}: {
  amount?: number;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  color = color || "255, 255, 255";
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    const handleResize = () => {
      if (parent) {
        const { width, height } = parent.getBoundingClientRect();
        setParentSize({ width, height });
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (parent) resizeObserver.observe(parent);

    return () => {
      if (parent) resizeObserver.unobserve(parent);
    };
  }, [canvasRef.current]);
  useEffect(() => {
    const _particles: Particle[] = [];
    for (let i = 0; i < amount; i++) {
      _particles.push(Particle.random(parentSize.width, parentSize.height));
    }
    setParticles(_particles);
  }, [parentSize]);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const animateParticles = () => {
      ctx.clearRect(0, 0, parentSize.width, parentSize.height);
      particles.forEach((particle) => {
        particle.update(parentSize);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${Math.max(particle.o, 0)})`;
        ctx.fill();
      });
      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }, [particles, parentSize]);
  return (
    <canvas
      className="absolute left-0 top-0 right-0 bottom-0 -z-10"
      ref={canvasRef}
      width={parentSize.width}
      height={parentSize.height}
    />
  );
}
