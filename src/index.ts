import { showToast, Toast, Clipboard } from "@raycast/api";
import { extractVideoInfo } from "./utils/youtubeExtractor";
import { formatForTana } from "./utils/tanaFormatter";

/**
 * Main command handler for the YouTube to Tana extension
 * Extracts information from the current YouTube video and formats it for Tana
 */
export default async function Command(): Promise<void> {
  try {
    await showToast({
      style: Toast.Style.Animated,
      title: "Extracting video information...",
    });

    const videoInfo = await extractVideoInfo();
    const formattedContent = formatForTana(videoInfo);
    
    // Copy to clipboard
    await Clipboard.copy(formattedContent);
    
    // Create a preview of the description (first 100 characters)
    const descriptionPreview = videoInfo.description.length > 100 
      ? `${videoInfo.description.substring(0, 100)}...` 
      : videoInfo.description;
    
    await showToast({
      style: Toast.Style.Success,
      title: "Video information copied!",
      message: `Title: ${videoInfo.title}\nChannel: ${videoInfo.channelName}\nURL: ${videoInfo.videoUrl}\n\nDescription Preview:\n${descriptionPreview}`,
    });
  } catch (error) {
    // Error handling is now done in extractVideoInfo
    console.error('Error in main command:', error);
  }
} 