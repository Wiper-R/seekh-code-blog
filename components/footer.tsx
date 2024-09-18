import { HeartFilledIcon } from "@radix-ui/react-icons";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import SeekhCodeIcon from "@/public/seekh-code.png";
import GithubLogo from "@/public/github.svg";
import YoutubeLogo from "@/public/youtube.svg";
import Link from "next/link";

export function Footer() {
  return (
    <div className="mt-auto">
      <hr />
      <footer className="p-6">
        <MaxWidthWrapper className="flex items-center justify-between flex-wrap gap-x-10 gap-y-6">
          <div className="flex gap-2 items-center flex-wrap">
            <img src={SeekhCodeIcon.src} className="w-14" />
            <span>Seekh Code</span>
            <span className="text-3xl mx-2">|</span>
            <span>Copyright &copy; 2023 seekhcode.me</span>
          </div>
          <div className="flex gap-6">
            <Link href="https://github.com/wiper-r">
              <GithubLogo className="text-white text-2xl" />
            </Link>
            <Link href="https://youtube.com/@seekhcode">
              <YoutubeLogo className="text-white text-2xl" />
            </Link>
          </div>
        </MaxWidthWrapper>
      </footer>
    </div>
  );
}
