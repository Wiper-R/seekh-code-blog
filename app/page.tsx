import { signUp } from "@/actions/auth";
import { Navbar } from "@/components/Navbar";

export default async function Home() {
  const d = await signUp({
    email: "rshivang12345@gmail.com",
    firstname: "Shivang",
    lastname: "Rathore",
    password: "password",
    username: "shivang",
  });
  console.log(!d.success && d.error);
  return (
    <>
      <Navbar />
    </>
  );
}
