import { Navbar } from "@/components/navbar";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="items-center h-full justify-center flex text-white flex-grow">
        <div className="flex items-center gap-6">
          <span className="text-3xl">404</span>
          <span className="h-12 w-px bg-gray-300 block" />
          <span>This page could not be found.</span>
        </div>
      </div>
    </div>
  );
}
