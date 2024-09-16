"use client";
import { EyeIcon } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { Post } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "../image-with-fallback";
import { editPost } from "@/actions/posts";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-[#222222] border flex p-4 gap-6 items-center">
      <ImageWithFallback
        width={600}
        height={480}
        src={post.coverImage || ""}
        alt="Cover Image"
        className="w-52 h-full rounded object-cover shrink-0"
        fallbackSrc="https://via.placeholder.com/600x480"
      />
      {/* Post Details */}
      <div className="flex flex-col h-full">
        <div className="text-2xl font-semibold">{post.title || "Untitled"}</div>

        <div className="text-base line-clamp-3">
          {post.description || "No description set"}
        </div>
        {/* Status */}
        <div className="flex gap-4 mt-auto">
          <span className="flex items-center text-gray-400 space-x-2">
            <EyeIcon />
            <span>50</span>
          </span>
        </div>
      </div>
      <div className="border-l-2 w-full ml-auto max-w-[400px] flex flex-col gap-2 px-4 flex-shrink-0">
        <Button
          onClick={async () => {
            await editPost({
              slug: post.slug,
              update: { status: "published" },
            });
          }}
          className="w-full bg-green-500 hover:bg-green-600 text-white"
          size={"lg"}
          disabled={post.status == "published"}
        >
          Publish
        </Button>
        <div className="flex gap-2">
          <Link
            href={`/admin/posts/${post.slug}/edit`}
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            Edit
          </Link>
          <Button
            className="w-full bg-red-600 hover:bg-red-700"
            size={"lg"}
            variant={"destructive"}
          >
            {post.status == "published" ? "Archieve" : "Delete"}
          </Button>
        </div>
        <div className="flex-grow flex border-t-2 text-right pt-4 text-gray-400 mt-4">
          <span className="mt-auto ml-auto">Last Edited: 12/08/2024</span>
        </div>
      </div>
    </div>
  );
}
