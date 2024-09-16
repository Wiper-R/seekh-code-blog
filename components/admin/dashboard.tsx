// "use client";

// import { useEffect, useState } from "react";

// export function Dashboard({ children }: { children?: React.ReactNode }) {
//   const [size, setSize] = useState({ w: 0, h: 0 });
//   useEffect(() => {
//     function computeSize() {
//       setSize({ w: document.body.clientWidth, h: document.body.clientHeight });
//     }
//     const resize_observer = new ResizeObserver(computeSize);
//     resize_observer.observe(document.body);
//     computeSize();
//     return () => resize_observer.unobserve(document.body);
//   }, []);
//   // 1440, 720

//   const scale = Math.min(size.w / 1440, size.h / 720);
//   console.log(scale);

//   return (
//     <div className="flex border p-0 w-[1440px] h-[720px]" style={{ scale }}>
//       {children}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

export function Dashboard({ children }: { children?: React.ReactNode }) {
  return <div className="flex border h-screen">{children}</div>;
}
