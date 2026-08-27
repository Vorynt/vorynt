import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import {
  type ContentRepository,
  type Locale,
  siteContentSchema,
} from "./schema";

async function readSite(locale: Locale) {
  const filePath = path.join(process.cwd(), "content", `${locale}.json`);
  const raw = await readFile(filePath, "utf-8");
  return siteContentSchema.parse(JSON.parse(raw));
}

export const fileContentRepository: ContentRepository = {
  getSite: cache(readSite),
};
