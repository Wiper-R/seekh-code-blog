import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <div className="h-full flex items-center justify-center flex-col p-8 py-10">
        <div className="max-w-5xl text-center space-y-10">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight uppercase text-gray-100">
            Unlock <span className="text-green-500">Knowledge</span> with Just a
            Few Clicks
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            Welcome to Seekh Code – your gateway to free, high-quality coding
            tutorials and insights. Dive into our resources and elevate your
            skills effortlessly.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mt-8">
            <Link
              className={cn(
                buttonVariants({}),
                "bg-green-600 hover:bg-green-700 text-white text-xl px-10 py-6 flex items-center space-x-2 transition-transform transform hover:scale-105"
              )}
              href="/blog"
            >
              <span>Start Reading</span>
            </Link>
            <Link
              href="https://youtube.com/@seekhcode"
              className={buttonVariants({
                className:
                  "text-xl px-10 py-6 flex items-center space-x-2 transition-transform transform hover:scale-105",
              })}
            >
              <span>Start Watching</span>
            </Link>
          </div>
        </div>
      </div>
      <PopularPosts />
    </>
  );
}

function PopularPosts() {
  return (
    <>
      <hr />
      <MaxWidthWrapper className="my-10">
        <h3 className="text-center text-4xl">Popular Posts</h3>
      </MaxWidthWrapper>
    </>
  );
}
