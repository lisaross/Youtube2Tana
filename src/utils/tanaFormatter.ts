import { VideoInfo } from "../types/video";

/**
 * Formats video information into Tana-compatible format
 * @param videoInfo The extracted video information
 * @returns Formatted string ready to be pasted into Tana
 */
export function formatForTana(videoInfo: VideoInfo): string {
  const description = videoInfo.description
    ? videoInfo.description
        .split('\n\n')
        .filter(p => p.trim()) // Remove empty paragraphs
        .map(p => `      - ${p.trim()}`)
        .join('\n')
    : '      - No description available';

  return `%%tana%%
- ${videoInfo.title} #video
    - URL::${videoInfo.url}
    - Author::${videoInfo.channelName}
    - Channel URL::${videoInfo.channelUrl}
    - Description::
${description}`;
} 