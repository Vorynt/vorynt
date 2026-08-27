import "server-only";

import { cache } from "react";
import { getContentRepository } from "./repository";
import type { Locale } from "./schema";

export const getSiteContent = cache(async (locale: Locale) => {
  return getContentRepository().getSite(locale);
});
