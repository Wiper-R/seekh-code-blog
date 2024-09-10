"use client";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

export function SpotlightCard({ children }: PropsWithChildren) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) return;

    const div = divRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = div.getBoundingClientRect();
      setMousePos({
        x: e.pageX - (rect.left + window.scrollX),
        y: e.pageY - (rect.top + window.scrollY),
      });
    };

    div.addEventListener("mousemove", handleMouseMove);

    return () => div.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={divRef}
      className="p-px bg-border rounded-xl relative isolate overflow-hidden group"
    >
      <div
        className="absolute -z-10 w-[100%] aspect-square opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-radial from-white/60 to-transparent -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      {children}
    </div>
  );
}
