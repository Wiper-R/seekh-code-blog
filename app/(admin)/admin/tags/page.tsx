"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Topbar, TopbarTitle } from "@/components/admin/topbar";
import { Tag } from "@prisma/client";
import { createTag, deleteTag, getTags } from "@/actions/tags";

function TagDashboard() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState("");
  const [editingCategory, setEditingCategory] = useState<Tag | null>(null);

  async function fetchTags() {
    const result = await getTags();
    if (result.success) {
      setTags(result.data);
    }
  }
  useEffect(() => {
    fetchTags();
  }, []);

  // const addCategory = () => {
  //   if (newCategory.trim()) {
  //     setTags([...tags, { name: newCategory }]);
  //     setNewCategory("");
  //   }
  // };

  // const updateCategory = (id: number, newName: string) => {
  //   setCategories(
  //     categories.map((cat) => (cat.id === id ? { ...cat, name: newName } : cat))
  //   );
  //   setEditingCategory(null);
  // };

  // const deleteCategory = (id: number) => {
  //   setCategories(categories.filter((cat) => cat.id !== id));
  // };
  const addTag = async () => {
    if (newTag.trim()) {
      const result = await createTag({ name: newTag });
      if (result.success) {
        setTags((tags) => [result.data, ...tags]);
      }
    }
  };

  const _deleteTag = async (name: string) => {
    const result = await deleteTag({ name });
    if (result.success) {
      await fetchTags();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Topbar>
        <TopbarTitle title="Tags" />
      </Topbar>
      <div className="flex flex-grow flex-col max-w-4xl mx-auto my-10 space-y-6 overflow-hidden w-full">
        <div className="shrink-0 flex items-center space-x-2">
          <Input
            placeholder="New tag name"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={() => addTag()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Tag
          </Button>
        </div>
        <div className="flex-grow overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags.map((tag) => (
                <TableRow key={tag.name}>
                  <TableCell>{tag.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <Input />
                            {/* defaultValue={category.name}
                              onChange={(e) =>
                                setEditingCategory({
                                  ...category,
                                  name: e.target.value,
                                })
                              }
                            /> */}
                          </div>
                          <Button
                          // onClick={() =>
                          //   updateCategory(
                          //     category.id,
                          //     editingCategory?.name || ""
                          //   )
                          // }
                          >
                            Save Changes
                          </Button>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => await _deleteTag(tag.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
export default function Page() {
  return <TagDashboard />;
}
