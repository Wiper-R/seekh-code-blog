import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
