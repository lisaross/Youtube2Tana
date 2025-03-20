import { VideoInfo } from "../types/video";

/**
 * Extracts video information from the current YouTube page
 * @throws {Error} If the current page is not a YouTube video or if required information cannot be extracted
 */
export async function extractVideoInfo(): Promise<VideoInfo> {
  // This will be implemented to use Raycast's browser API
  // For now, we'll throw an error to indicate it needs implementation
  throw new Error("YouTube extraction not yet implemented");
} 