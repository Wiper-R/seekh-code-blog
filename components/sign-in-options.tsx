"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import GoogleIcon from "@/public/google.svg";
import GithubIcon from "@/public/github.svg";
import { signIn } from "next-auth/react";

export function SignInOptions() {
  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardTitle>Sign in options</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Button
          className="space-x-4"
          size="lg"
          onClick={() => signIn("google")}
        >
          <img src={GoogleIcon.src} className="w-5" />
          <span>Sign in with Google</span>
        </Button>
        <Button
          className="space-x-4"
          size="lg"
          onClick={() => signIn("github")}
        >
          <img src={GithubIcon.src} className="w-5" />
          <span>Sign in with Github</span>
        </Button>
      </CardContent>
    </Card>
  );
}
