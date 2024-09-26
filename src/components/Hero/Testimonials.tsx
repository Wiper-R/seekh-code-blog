import Spotlight2 from "@/images/spotlight2.png";
import { MaxWidthWrapper } from "@/layouts/MaxWidthWrapper";
import { SectionHeading } from "./SectionHeading";

type TestimonalCardProps = {
  author: string;
  content: string;
  role: string;
};
function TestimonialCard({ author, content, role }: TestimonalCardProps) {
  return (
    <div className="flex flex-col bg-gradient-to-b h-[160px] from-start to-end p-4 rounded-lg text-white border-none relative isolate border border-border/20">
      <h3 className="text-xl font-semibold">@{author}</h3>
      <p className="mt-3 text-gray-300">{content}</p>
      <div className="text-right text-gray-200 mt-auto">- {role}</div>
    </div>
  );
}

export function Testimonials() {
  return (
    <div className="relative">
      <hr className="border-border/40" />
      <img
        src={Spotlight2.src}
        className="w-full mx-auto max-w-[1800px] absolute left-1/2 -translate-x-1/2 select-none pointer-events-none"
      />

      <MaxWidthWrapper className="py-10 my-20">
        <SectionHeading heading="Testimonials" />
        <div className="gap-10 mt-16 grid grid-cols-1 max-w-sm mx-auto md:max-w-screen-md md:grid-cols-2 lg:max-w-screen-xl lg:grid-cols-3">
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
