import { auth } from "@/auth";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { SignInOptions } from "@/components/sign-in-options";
import { ArrowRightIcon } from "lucide-react";
import { redirect } from "next/navigation";

const PERKS = [
  "Personalize ad preferences",
  "Customize your newsletter",
  "Comment and engage with posts",
  "Receive personalized recommendations",
  "Get notifications when new content is available",
  "Participate in community discussions",
];

export default async function Page() {
  const session = await auth();
  if (session?.user) redirect("/");
  return (
    <MaxWidthWrapper className="h-full flex flex-col lg:flex-row items-center gap-16 py-14">
      <div className="flex-grow">
        <h4 className="text-green-600 text-4xl font-bold my-10">
          By signing in you unlock following perks -
        </h4>
        <ul className="text-xl">
          {PERKS.map((perk) => (
            <li className="flex items-center my-2" key={perk}>
              <ArrowRightIcon className="mr-2" size={20} />
              {perk}
            </li>
          ))}
        </ul>
      </div>
      <SignInOptions />
    </MaxWidthWrapper>
  );
}
