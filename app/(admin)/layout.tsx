import { auth } from "@/auth";
import { Dashboard } from "@/components/admin/dashboard";
import { Sidebar } from "@/components/admin/sidebar";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user?.email != "rshivang12345@gmail.com") redirect("/not-found");
  return (
    <div className="h-screen w-screen relative">
      <Dashboard>
        <Sidebar />
        <div className="flex-grow overflow-auto">{children}</div>
      </Dashboard>
    </div>
  );
}
