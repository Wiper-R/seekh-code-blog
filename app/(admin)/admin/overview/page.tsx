import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session?.user?.email != "rshivang12345@gmail.com") redirect("/not-found");
  return <></>;
}
