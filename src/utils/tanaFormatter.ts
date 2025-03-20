import { VideoInfo } from "../types/video";

/**
 * Formats video information into Tana-compatible format
 * @param videoInfo The extracted video information
 * @returns Formatted string ready to be pasted into Tana
 */
export function formatForTana(videoInfo: VideoInfo): string {
  return `#video
- ${videoInfo.title}
  - Author:: ${videoInfo.channelName}
    - URL:: ${videoInfo.channelUrl}
  - Description:: ${videoInfo.description}`;
} 