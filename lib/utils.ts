import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as cheerio from "cheerio";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCoverImage(content: string) {
  const $ = cheerio.load(content);
  const cover_image = $("img").first().attr("src");
  return cover_image;
}
