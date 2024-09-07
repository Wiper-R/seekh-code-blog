"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Button onClick={() => signIn("github", { redirect: true })}>
        Login With Github
      </Button>
      <Button onClick={() => signIn("google", { redirect: true })}>
        Login With Google
      </Button>
    </>
  );
}
