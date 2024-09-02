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
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { MaxWidthWrapper } from "../MaxWidthWrapper";

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
                  <Input />
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
