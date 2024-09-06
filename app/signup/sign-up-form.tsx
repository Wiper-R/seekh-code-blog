"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useActionState } from "react";
import { signUp } from "@/actions/auth";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const SignUpFormSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string(),
  displayName: z.string(),
});

type SignUpFormSchema = z.infer<typeof SignUpFormSchema>;

export function SignUpForm() {
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const router = useRouter();

  async function onValidSubmit(data: SignUpFormSchema) {
    const result = await signUp(data);
    if (result.success) {
      router.push("/signin");
    }
  }

  async function onInvalidSubmit(e: any) {
    console.log(e);
  }

  return (
    <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)}>
      <Card className="m-10">
        <CardHeader>
          <CardTitle>Create a new user</CardTitle>
          <CardDescription>
            Create a user if you don't already have one
          </CardDescription>
        </CardHeader>
        <CardContent className="min-w-[400px]">
          <Form {...form}>
            <FormField
              control={form.control}
              name="email"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayName"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
        </CardContent>
        <CardFooter className="block">
          <Button type="submit" className="w-full">
            <Loader2Icon
              className={cn(
                "animate-spin mr-2 hidden",
                form.formState.isSubmitting && "block"
              )}
            />
            <span>Sign Up</span>
          </Button>
          <div>
            Already have an account?{" "}
            <Link href="/login" className={buttonVariants({ variant: "link" })}>
              {" login"}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
