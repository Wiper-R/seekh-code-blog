import { getPost } from "@/actions/posts";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { notFound } from "next/navigation";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const result = await getPost({ slug });
  if (!result.success || !result.data) {
    notFound();
  }
  const post = result.data;
  return (
    <MaxWidthWrapper className="article-container">
      <div className="my-2">
        <h1 className="article-title">{post.title}</h1>
        <p className="text-gray-300">
          By: @{post.author.username} ({post.author.name})
        </p>
        <p className="text-gray-300">
          Published: {post.publishedAt.toDateString()}
        </p>
      </div>
      <hr className="bg-white h-px w-full my-10" />
      <article
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="my-10"
      />
    </MaxWidthWrapper>
  );
}
