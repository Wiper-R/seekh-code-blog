import { useState } from "react";
import Logo from "@/images/seekh-code.png";
import { MaxWidthWrapper } from "@/layouts/MaxWidthWrapper";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log("Toggling menu");
    setIsOpen(!isOpen);
  };

  const links = [
    ["Blog", "/blog"],
    ["Github", "https://github.com/wiper-r/seekh-code-blog"],
    ["Youtube", "https://youtube.com/@seekhcode"],
    ["Projects", "/projects"],
    ["Get in touch", "mailto:rshivang12345@gmail.com"],
  ];

  return (
    <header className="bg-start p-3 shadow z-10">
      <MaxWidthWrapper>
        {/* Tab/PC navigation */}
        <div className="hidden md:flex justify-between items-center">
          <a href="/" className="">
            <img src={Logo.src} className="w-14" alt="Seekh Code Logo" />
          </a>
          {/* Navigation Links */}
          <div className={cn("flex gap-5")}>
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-center text-lg text-black dark:text-white relative after:content-[''] after:absolute after:block after:w-0 hover:after:w-full after:transition-all after:h-0.5 after:bg-black after:dark:bg-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden flex-col">
          <div className="flex justify-between items-center">
            <a href="/" className="">
              <img src={Logo.src} className="w-14" alt="Seekh Code Logo" />
            </a>
            <button
              className="block md:hidden p-2 text-black dark:text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          {/* Navigation Links */}
          <div
            className={cn(
              "grid transition-[grid-template-rows]",
              isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div
              className={cn("flex flex-col items-center gap-5 overflow-hidden")}
            >
              {links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="text-center w-fit text-lg text-black dark:text-white relative after:content-[''] after:absolute after:block after:w-0 hover:after:w-full after:transition-all after:h-0.5 after:bg-black after:dark:bg-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
