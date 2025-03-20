import { showHUD } from "@raycast/api";
import { extractVideoInfo } from "../utils/youtubeExtractor";
import { formatForTana } from "../utils/tanaFormatter";

/**
 * Main command handler for the YouTube to Tana extension
 * Extracts information from the current YouTube video and formats it for Tana
 */
export default async function Command(): Promise<void> {
  try {
    const videoInfo = await extractVideoInfo();
    const formattedContent = formatForTana(videoInfo);
    
    // Copy to clipboard
    await navigator.clipboard.writeText(formattedContent);
    
    await showHUD("✅ Video information copied to clipboard!");
  } catch (error) {
    await showHUD(`❌ Error: ${error instanceof Error ? error.message : "Failed to extract video information"}`);
  }
} 