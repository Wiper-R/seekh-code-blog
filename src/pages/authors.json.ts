import { getCollection, type InferEntrySchema } from "astro:content";

const authorsCollection = await getCollection("authors");
const authors = authorsCollection.reduce(
  (prev, cur) => {
    prev[cur.id] = cur.data;
    return prev;
  },
  {} as Record<string, InferEntrySchema<"authors">>,
);

export async function GET() {
  return new Response(JSON.stringify(authors));
}
