import { Topbar } from "@/components/admin/topbar";
import { RichTextEditor } from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewPost() {
  return (
    <div>
      <Topbar>
        <Input className="" placeholder="Untitled" />
        <div className="ml-auto flex gap-4">
          <Button>Save to Draft</Button>
          <Button>Publish</Button>
        </div>
      </Topbar>
      <div className="p-4">
        <RichTextEditor className="" />
      </div>
    </div>
  );
}
