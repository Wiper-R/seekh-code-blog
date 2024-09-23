import { createBlankPost, getAdminPanelPosts } from "@/actions/posts";
import { PostCard } from "@/components/admin/post-card";
import { Topbar, TopbarTitle } from "@/components/admin/topbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const result = await getAdminPanelPosts();
  var posts: Post[] = [];
  if (result.success) {
    posts = result.data;
  }
  return (
    <div className="h-full flex flex-col">
      <Topbar>
        <TopbarTitle title="Posts" />
        <form
          className="ml-auto"
          action={async () => {
            "use server";
            const result = await createBlankPost({});
            if (result.success) {
              const post = result.data;
              redirect(`/admin/posts/${post.slug}/edit`);
            }
          }}
        >
          <Button className={cn(buttonVariants({}))}>New Post</Button>
        </form>
      </Topbar>

      <div className="flex-grow flex flex-col overflow-y-auto min-h-0 p-4 gap-4">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
