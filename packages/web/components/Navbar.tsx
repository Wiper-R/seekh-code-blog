import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import Link from "next/link";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { Button } from "./ui/button";
type NavLinkProps = {
  href: string;
  label: string;
  className?: string;
};
function NavLink({ href, label, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative text-semibold text-lg after:content-[''] after:absolute after:-bottom-0.5 after:w-0 hover:after:w-full after:transition-[width] after:h-0.5 after:bg-black after:block after:left-0",
        className
      )}
    >
      {label}
    </Link>
  );
}
type NavbarProps = ComponentProps<"header"> & {};

const links: NavLinkProps[] = [
  { href: "/", label: "Home" },
  { href: "/youtube", label: "Youtube" },
  { href: "/about", label: "About" },
  { href: "/get-in-touch", label: "Get in Touch" },
];

export function Navbar({ className, ...props }: NavbarProps) {
  return (
    <header {...props}>
      <MaxWidthWrapper className="flex items-center justify-between">
        <div className={cn("flex p-4 gap-8", className)}>
          {links.map((props) => (
            <NavLink {...props} key={props.href} />
          ))}
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="p-4">
            Signup
          </Button>
          <Button className="p-4">Login</Button>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
