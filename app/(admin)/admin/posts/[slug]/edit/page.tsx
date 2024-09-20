"use client";
import { fetchForEditPost, editPost } from "@/actions/posts";
import { Topbar, TopbarTitle } from "@/components/admin/topbar";
import { RichTextEditor } from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { $generateHtmlFromNodes } from "@lexical/html";
import { LexicalEditor } from "lexical";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";
import ReactSelectCreatable from "react-select/creatable";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function EditPostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newSlug, setNewSlug] = useState("");
  useEffect(() => {
    async function checkCanEdit() {
      const result = await fetchForEditPost({ slug });
      if (!result.success || !result.data) {
        router.push("/admin/posts");
        return;
      }
      const post = result.data;
      setPost(post);
      setTitle(post.title);
      setDescription(post.description);
      setNewSlug(post.slug);
    }
    checkCanEdit();
  }, []);
  const [editor, setEditor] = useState<LexicalEditor | null>(null);
  if (!post) return "Loading";
  return (
    <div className="h-full flex flex-col">
      <Topbar>
        <TopbarTitle title={title} />
        <div className="ml-auto flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Post Details</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-4">
                  <Label htmlFor="title" className="">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="description" className="">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    rows={6}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={newSlug}
                    onChange={(e) => {
                      setNewSlug(e.target.value);
                    }}
                  />
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="tags">Tags</Label>
                  <ReactSelectCreatable
                    classNames={{
                      control: ({ isFocused }) =>
                        cn(
                          "!bg-transparent text-white !border",
                          isFocused && "!border-white !outline-none"
                        ),
                      input: () => "!text-white",
                      option: () => "!bg-transparent",
                      menu: () => "border !bg-primary-foreground",
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button>Save Changes</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={async () => {
              if (!editor) return;
              const post = await editPost({
                slug,
                update: {
                  content: editor.read(() => $generateHtmlFromNodes(editor)),
                  title,
                  description,
                  slug: newSlug,
                },
              });
              if (slug != newSlug) {
                router.push(`/admin/posts/${newSlug}/edit`);
              }
              console.log(post);
            }}
          >
            Save
          </Button>
        </div>
      </Topbar>
      <div className="p-4 flex flex-grow flex-col">
        <RichTextEditor
          className="flex flex-grow"
          setEditor={setEditor}
          defaultValue={post?.content}
        />
      </div>
    </div>
  );
}
