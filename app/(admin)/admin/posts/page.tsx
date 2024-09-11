import { Topbar, TopbarTitle } from "@/components/admin/topbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function PostsPage() {
  return (
    <div className="">
      <Topbar>
        <TopbarTitle title="Posts" />
        <div className="ml-auto">
          <Link href="/admin/posts/new" className={cn(buttonVariants({}))}>
            New Post
          </Link>
        </div>
      </Topbar>
    </div>
  );
}
