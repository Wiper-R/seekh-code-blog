"use client";
import { RichTextEditor } from "@/components/RichTextEditor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { MaxWidthWrapper } from "../MaxWidthWrapper";
import { Textarea } from "../ui/textarea";

export function BlogEditor() {
  const form = useForm();
  return (
    <MaxWidthWrapper className="p-0">
      <Form {...form}>
        <form className="p-4 min-h-screen flex flex-col gap-2">
          <FormField
            name="title"
            render={() => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="description"
            render={() => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={1} />
                </FormControl>
              </FormItem>
            )}
          />
          <RichTextEditor className="flex-grow" />
        </form>
      </Form>
    </MaxWidthWrapper>
  );
}
