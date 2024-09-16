import { fetchPosts } from "@/actions/posts";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import moment from "moment";

export default async function Page() {
  const result = await fetchPosts();
  if (!result.success) throw new Error();
  const posts = result.data;
  return (
    <MaxWidthWrapper className="my-10">
      {posts.map((post, idx) => (
        <>
          <div
            key={post.id}
            className="grid relative"
            // role="link"
            // data-href="https://mozilla.org/"
            // tabIndex={0}
          >
            <Link href={`/posts/${post.slug}`} className="absolute inset-0" />
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={post.author.image || undefined} />
                <AvatarFallback>{post.author.name}</AvatarFallback>
              </Avatar>
              <span className="pointer-events-none z-10">
                <Link
                  href={`/users/${post.author.username}`}
                  className="pointer-events-auto hover:underline"
                >
                  <span>{post.author.name}</span>
                </Link>
              </span>
            </div>
            <div className="flex gap-6">
              {/* Post information */}
              <div className="flex-grow flex flex-col gap-4 my-4">
                <h4 className="line-clamp-2 text-3xl font-bold leading-10">
                  {post.title}
                </h4>
                <p className="line-clamp-2">{post.description}</p>
                <div className="flex gap-4">
                  <span>{moment(post.publishedAt).format("DD MMM")}</span>
                </div>
              </div>
              {/* Post Image */}
              <ImageWithFallback
                src={post.coverImage || undefined}
                className="w-56 h-36 object-cover rounded flex-shrink-0"
                fallbackSrc="https://cpworldgroup.com/wp-content/uploads/2021/01/placeholder.png"
              />
            </div>
          </div>
          {idx !== posts.length - 1 && <hr className="my-10" />}
        </>
      ))}
    </MaxWidthWrapper>
  );
}
