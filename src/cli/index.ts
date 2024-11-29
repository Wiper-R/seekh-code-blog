import { Command } from "commander";
import { input, search, confirm } from "@inquirer/prompts";
import fs from "node:fs/promises";

type Author = {
  displayName: string;
};

const BASE_PATH = "src/content/blog/";

const isValidSlug = (slug: string) => {
  const slugRegex = /^[a-z0-9-]+$/;
  return slugRegex.test(slug);
};

const slugExists = async (slug: string) => {
  try {
    await fs.access(BASE_PATH + slug);
    return true;
  } catch {
    return false;
  }
};

async function getAuthors() {
  const res = await fetch("http://localhost:4321/authors.json");
  return await res.json();
}
const authors: Record<string, Author> = await getAuthors();

const getBlogTemplate = (slug: string, authorId: string) => {
  const date = new Date().toISOString();
  return `---
title: "Untitled"
description: "Describe your post here"
pubDate: "${date}"
# heroImage: "./${slug}.jpg"
author: ${authorId}
---

Your content goes here`;
};

const program = new Command();

program
  .name("blog-cli")
  .description("CLI tool for blog posts")
  .version("1.0.0")
  .action(async () => {
    const authorId: string = await search({
      message: "Who are you?",
      validate: (value) => {
        if (!value) return false;
        if (!value || !authors[value as string]) return false;
        return true;
      },
      source: (input) => {
        const foundAuthors = Object.keys(authors).filter((authorId) => {
          if (!input) return true;
          if (
            authors[authorId].displayName
              .toLowerCase()
              .includes(input.toLowerCase()) ||
            authorId.toLowerCase().includes(input.toLowerCase())
          ) {
            return true;
          }
          return false;
        });
        return foundAuthors.map((authorId) => ({
          name: authors[authorId].displayName,
          value: authorId,
        }));
      },
    });
    const slug = (
      await input({
        message: "What will be slug of your post?",
        validate: async (value: string) => {
          const transformedSlug = value
            .split(" ")
            .join("-")
            .toLocaleLowerCase();

          if (!isValidSlug(transformedSlug)) {
            return "Slug can only contain lowercase letters, numbers, and dashes.";
          }
          if (await slugExists(transformedSlug)) {
            return "This slug already exists, please choose another.";
          }

          return true;
        },
        transformer: (value) => {
          return value.split(" ").join("-").toLocaleLowerCase();
        },
      })
    )
      .replace(" ", "-")
      .toLocaleLowerCase();

    let confirmation = await confirm({
      message: `You are about to create a new post at \`./src/content/blog/${slug}/index.mdx\`\nAre you sure?`,
      default: false,
    });

    if (!confirmation) {
      console.warn("You cancelled this generation.");
      return;
    }

    await fs.mkdir(BASE_PATH + slug);
    await fs.writeFile(
      BASE_PATH + slug + "/" + "index.mdx",
      getBlogTemplate(slug, authorId),
    );

    console.log(
      `New post created \`./src/content/blog/${slug}/index.mdx\`\nYou can edit it to get started.`,
    );
  });

program.parse();
