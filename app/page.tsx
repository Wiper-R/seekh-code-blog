import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Navbar } from "@/components/navbar";
import Spotlight1 from "@/public/spotlight1.png";
import Spotlight2 from "@/public/spotlight2.png";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <MaxWidthWrapper className="relative flex items-center justify-center flex-col h-full flex-grow w-full">
          <ParticlesBackground />
          <div className="max-w-5xl text-center space-y-10">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight uppercase text-gray-100">
              Unlock <span className="text-green-500">Knowledge</span> with Just
              a Few Clicks
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
        </MaxWidthWrapper>
      </div>
      <hr />
      <PopularPosts />
      <Testimonials />
      <Footer />
    </>
  );
}

type PostCardProps = {
  title: string;
  description: string;
  imageUrl: string;
};

function PopularPostCard({ title, description, imageUrl }: PostCardProps) {
  return (
    <SpotlightCard>
      <Link href="" className="h-full group">
        <Card className="bg-gradient-to-b from-[#232323] to-gray-950 h-full border-none relative isolate">
          <div className="absolute w-full h-full left-0 top-0 opacity-20 group-hover:opacity-100 transition-opacity duration-500 -z-10">
            <ParticlesBackground amount={50} />
          </div>
          <CardHeader className="space-y-5">
            <img src={imageUrl} className="rounded" />
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>{description}</CardContent>
        </Card>
      </Link>
    </SpotlightCard>
  );
}

function SectionHeading({ heading }: { heading: string }) {
  return <h3 className="text-center text-4xl font-semibold">{heading}</h3>;
}

function PopularPosts() {
  return (
    <div className="relative">
      <hr />
      <img
        src={Spotlight1.src}
        className="w-full mx-auto max-w-[1600px] absolute left-1/2 -translate-x-1/2 select-none pointer-events-none"
      />
      <MaxWidthWrapper className="py-10 my-20">
        <SectionHeading heading="Popular Posts" />
        <div className="grid grid-cols-3 gap-10 mt-16">
          <PopularPostCard
            imageUrl="https://img.youtube.com/vi/31B-zBRkh5I/maxresdefault.jpg"
            title="Compile aseprite from source"
            description="By compiling aseprite from source you can use it for free, and yes it's legal"
          />
          <PopularPostCard
            imageUrl="https://img.youtube.com/vi/D-weFjzQQ5M/maxresdefault.jpg"
            title="Create awesome level cards with Pillow (Python)"
            description="We used pillow to create awesome level up cards in discord.py bot"
          />
          <PopularPostCard
            imageUrl="https://img.youtube.com/vi/zoh-0niANDw/maxresdefault.jpg"
            title="Starting with discord bots"
            description="Creating discord bot in python is very begineer friendly using discord.py"
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
type TestimonalCardProps = {
  author: string;
  content: string;
  role: string;
};
function TestimonialCard({ author, content, role }: TestimonalCardProps) {
  return (
    <SpotlightCard>
      <Link href="" className="h-full group">
        <Card className="bg-gradient-to-b from-[#232323] to-gray-950 h-full border-none relative isolate">
          <div className="absolute w-full h-full left-0 top-0 opacity-20 group-hover:opacity-100 transition-opacity duration-500 -z-10">
            <ParticlesBackground amount={50} />
          </div>
          <CardHeader>
            <CardTitle>@{author}</CardTitle>
          </CardHeader>
          <CardContent>{content}</CardContent>
          <CardFooter>
            <div className="ml-auto">- {role}</div>
          </CardFooter>{" "}
        </Card>
      </Link>
    </SpotlightCard>
  );
}

function Testimonials() {
  return (
    <div className="relative">
      <hr />
      <img
        src={Spotlight2.src}
        className="w-full mx-auto max-w-[1800px] absolute left-1/2 -translate-x-1/2 select-none pointer-events-none"
      />

      <MaxWidthWrapper className="py-10 my-20">
        <SectionHeading heading="Testimonials" />
        <div className="grid grid-cols-3 mt-16 gap-10">
          {/* <div className="flex flex-wrap items-center justify-center gap-10 mt-16"> */}
          <TestimonialCard
            author="royaldakat5833 "
            content="Sat through this with a friend, this worked. Many Thanks Anonymous man"
            role="Game Developer"
          />
          <TestimonialCard
            author="poopoopewpew604"
            content="Thanks for your help did my first compiling from a source code.U deserve my like and sub"
            role="Programmer"
          />
          <TestimonialCard
            author="omerfi"
            content="This video needs to be translated into English"
            role="Game Designer"
          />
          <TestimonialCard
            author="ameywale"
            content="Thanks for your efforts sir"
            role="Web Developer"
          />
          <TestimonialCard
            author="juegosretro1042"
            content="Thank you very much"
            role="Python Developer"
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
