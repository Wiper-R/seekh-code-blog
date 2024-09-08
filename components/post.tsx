import Link from "next/link";

type PostProps = {
  title: string;
  description: string;
  imageUrl: string;
  postLink: string;
};

export default function Post({
  title,
  description,
  imageUrl,
  postLink,
}: PostProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transform transition-transform hover:scale-105 bg-gray-800">
      <img src={imageUrl} alt={title} className="w-full h-60 object-cover" />
      <div className="flex flex-col p-6 space-y-4 bg-gray-900">
        <h3 className="text-xl font-bold text-gray-100">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
        <Link href={postLink}>
          <span className="inline-block text-green-500 font-medium group-hover:underline">
            Read More →
          </span>
        </Link>
      </div>
    </div>
  );
}
