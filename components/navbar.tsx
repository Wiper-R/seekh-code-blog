import SeekhCodePng from "@/public/seekh-code.png";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="bg-[#232323] p-3 shadow z-10">
      <MaxWidthWrapper className="flex justify-between items-center">
        <Link href="/">
          <img src={SeekhCodePng.src} className="w-14" />
        </Link>
        <div className="flex gap-10 items-center">
          {[
            ["Youtube", "/youtube"],
            ["Showcase", "/showcase"],
            ["Get in touch", "/get-in-touch"],
          ].map(([label, href]) => (
            <Link
              href={href}
              key={href}
              className="text-lg text-white relative after:content-[''] after:absolute after:block after:w-0 hover:after:w-full after:transition-all after:h-0.5 after:bg-white"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/signin"
            className="text-lg font-semibold bg-green-500 px-3 py-2 rounded text-black"
          >
            Sign In
          </Link>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
