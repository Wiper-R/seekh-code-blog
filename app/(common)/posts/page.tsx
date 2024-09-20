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
          <div key={post.id} className="grid relative -space-y-2">
            <Link href={`/posts/${post.slug}`} className="absolute inset-0" />
            <div className="flex items-center gap-2">
              <Avatar className="h-5 w-5 md:h-7 md:w-7">
                <AvatarImage src={post.author.image || undefined} />
                <AvatarFallback>{post.author.name}</AvatarFallback>
              </Avatar>
              <span className="pointer-events-none z-10">
                <Link
                  href={`/users/${post.author.username}`}
                  className="pointer-events-auto hover:underline text-gray-300"
                >
                  <span className="text-sm md:text-base">
                    {post.author.name}
                  </span>
                </Link>
              </span>
            </div>
            <div className="flex gap-6">
              {/* Post information */}
              <div className="flex-grow flex flex-col gap-2 md:gap-4 my-4">
                <h4 className="line-clamp-2 text-xl md:text-3xl font-semibold md:font-bold leading-6 md:leading-10">
                  {post.title}
                </h4>
                <p className="line-clamp-2 text-sm md:text-base">
                  {post.description}
                </p>
                <div className="flex gap-4">
                  <span>{moment(post.publishedAt).format("DD MMM")}</span>
                </div>
              </div>
              {/* Post Image */}
              <ImageWithFallback
                src={post.coverImage || undefined}
                className="w-24 h-16 sm:w-32 sm:h-16 md:w-48 md:h-28 object-cover rounded flex-shrink-0"
                fallbackSrc="https://cpworldgroup.com/wp-content/uploads/2021/01/placeholder.png"
              />
            </div>
          </div>
          {idx !== posts.length - 1 && <hr className="my-10" key={post.id} />}
        </>
      ))}
    </MaxWidthWrapper>
  );
}
