import Spotlight1 from "@/images/spotlight1.png";
import { MaxWidthWrapper } from "@/layouts/MaxWidthWrapper";
import { SectionHeading } from "./SectionHeading";

type PostCardProps = {
  title: string;
  description: string;
  imageUrl: string;
};

function PopularPostCard({ title, description, imageUrl }: PostCardProps) {
  return (
    <div className="border border-border/20 rounded-xl">
      <a
        href=""
        className="bg-gradient-to-b from-start to-end h-full group max-w-[400px] p-6 rounded-xl text-black dark:text-white flex flex-col gap-4"
      >
        <div className="space-y-5">
          <img src={imageUrl} className="rounded" />
          <h3 className="text-2xl font-semibold">{title}</h3>
        </div>
        <div className="text-lg mt-auto">{description}</div>
      </a>
    </div>
  );
}

export function PopularPosts() {
  return (
    <div className="relative">
      <hr className="border-border/40" />
      <img
        src={Spotlight1.src}
        className="w-full mx-auto max-w-[1600px] absolute left-1/2 -translate-x-1/2 select-none pointer-events-none"
      />
      <MaxWidthWrapper className="py-10 my-20">
        <SectionHeading heading="Popular Posts" />
        <div className="gap-10 mt-16 grid grid-cols-1 max-w-sm mx-auto md:max-w-screen-md md:grid-cols-2 lg:max-w-screen-xl lg:grid-cols-3">
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
            description="Creating discord bot in python is very beginner friendly using discord.py"
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
