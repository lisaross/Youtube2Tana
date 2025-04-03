/**
 * Interface representing the extracted information from a YouTube video
 */
export interface VideoInfo {
  /** The title of the video */
  title: string;
  /** The name of the channel */
  channelName: string;
  /** The URL of the channel */
  channelUrl: string;
  /** The URL of the video */
  url: string;
  /** The video description */
  description: string;
} 