import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon, Github } from "lucide-react";
import GoogleIcon from "@/public/google.svg";
import GithubIcon from "@/public/github.svg";

const PERKS = [
  "Personalize ad preferences",
  "Customize your newsletter",
  "Comment and engage with posts",
  "Receive personalized recommendations",
  "Get notifications when new content is available",
  "Participate in community discussions",
];

export default function Page() {
  return (
    <MaxWidthWrapper className="h-full flex flex-col-reverse md:flex-row items-center">
      <div className="flex-grow max-md:mt-16">
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
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Sign in options</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Button className="space-x-4">
            <img src={GoogleIcon.src} className="w-5" />
            <span>Sign in with Google</span>
          </Button>
          <Button className="space-x-4">
            <img src={GithubIcon.src} className="w-5" />
            <span>Sign in with Github</span>
          </Button>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
}
