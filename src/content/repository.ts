import "server-only";

import { fileContentRepository } from "./file-repository";
import type { ContentRepository } from "./schema";

export function getContentRepository(): ContentRepository {
  return fileContentRepository;
}
