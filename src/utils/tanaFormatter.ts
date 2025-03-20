import { VideoInfo } from "../types/video";

/**
 * Formats video information into Tana-compatible format
 * @param videoInfo The extracted video information
 * @returns Formatted string ready to be pasted into Tana
 */
export function formatForTana(videoInfo: VideoInfo): string {
  // Split description into paragraphs and format as nodes
  const [firstParagraph, ...restContent] = videoInfo.description
    .split('\n')
    .filter(line => line.trim()); // Remove empty lines

  const formattedDescription = restContent.length 
    ? `${firstParagraph}\n${restContent.map(line => `    - ${line}`).join('\n')}`
    : firstParagraph;

  return `%%tana%%
- ${videoInfo.title} #video
  - URL::${videoInfo.videoUrl}
  - Channel URL::${videoInfo.channelUrl}
  - Author::${videoInfo.channelName}
  - Description::${formattedDescription}`;
} 