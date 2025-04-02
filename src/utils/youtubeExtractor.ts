import { BrowserExtension, showToast, Toast } from '@raycast/api';
import { VideoInfo } from '../types/video';

/**
 * Extracts video information from the current YouTube page
 * @returns Promise<VideoInfo>
 * @throws {Error} If the current page is not a YouTube video or if required information cannot be extracted
 */
export async function extractVideoInfo(): Promise<VideoInfo> {
  try {
    // Get all tabs and find a suitable YouTube tab
    const tabs = await BrowserExtension.getTabs();
    console.log(`Found ${tabs.length} browser tabs`);
    
    // First look for active YouTube tabs
    let youtubeTab = tabs.find(tab => tab.active && tab.url?.includes('youtube.com/watch'));
    
    // If no active YouTube tab, try to find any YouTube tab
    if (!youtubeTab) {
      console.log('No active YouTube tab found, looking for any YouTube tab');
      youtubeTab = tabs.find(tab => tab.url?.includes('youtube.com/watch'));
    }
    
    // If still no YouTube tab, throw an error
    if (!youtubeTab) {
      throw new Error('No YouTube video page found. Please make sure you have a YouTube video page open.');
    }
    
    console.log('Using YouTube tab:', youtubeTab.title);
    console.log('Tab URL:', youtubeTab.url);
    
    // Get the video URL
    const videoUrl = youtubeTab.url;
    
    // Extract video ID for verification
    const videoIdMatch = videoUrl.match(/[?&]v=([^&]+)/);
    if (!videoIdMatch) {
      throw new Error('Could not extract video ID from URL. Please try again with a valid YouTube video.');
    }
    
    const videoId = videoIdMatch[1];
    console.log('Extracted video ID:', videoId);

    // Extract title
    const title = await BrowserExtension.getContent({ 
      cssSelector: 'h1.ytd-video-primary-info-renderer', 
      format: 'text' 
    });

    console.log('Found title:', title); 

    if (!title) {
      throw new Error('Could not find video title. Please make sure the video page is fully loaded.');
    }

    // Extract channel name and URL
    const channelElement = await BrowserExtension.getContent({ 
      cssSelector: '#channel-name yt-formatted-string a', 
      format: 'html' 
    });

    console.log('Found channel element:', channelElement); 

    if (!channelElement) {
      throw new Error('Could not find channel information. Please make sure the video page is fully loaded.');
    }

    // Extract channel name and URL using string manipulation
    const hrefMatch = channelElement.match(/href="([^"]+)"/);
    const textMatch = channelElement.match(/<a[^>]*>([^<]+)<\/a>/);

    if (!hrefMatch || !textMatch) {
      throw new Error('Could not parse channel information.');
    }

    const channelUrl = hrefMatch[1];
    const channelName = textMatch[1].trim();

    console.log('Extracted channel name:', channelName);
    console.log('Extracted channel URL:', channelUrl);

    // Format the channel URL
    const fullChannelUrl = channelUrl.startsWith('http') 
      ? channelUrl 
      : `https://www.youtube.com${channelUrl}`;

    // Extract description - try multiple selectors for expanded content
    const descriptionSelectors = [
      'ytd-text-inline-expander yt-attributed-string',
      'ytd-text-inline-expander yt-formatted-string',
      'ytd-text-inline-expander #snippet-text',
      'ytd-text-inline-expander #plain-snippet-text'
    ];

    let description = '';
    let workingSelector = '';
    
    for (const selector of descriptionSelectors) {
      description = await BrowserExtension.getContent({ 
        cssSelector: selector, 
        format: 'text'
      });
      if (description) {
        workingSelector = selector;
        break;
      }
    }

    if (!description) {
      throw new Error('Could not find video description. Please make sure the video page is fully loaded and the description is visible.');
    }

    console.log('Using description selector:', workingSelector);

    // Clean up the description
    const cleanedDescription = description
      .replace(/Show more$/, '') // Remove "Show more" text if present
      .replace(/Show less$/, '') // Remove "Show less" text if present
      .replace(/^\s*\.{3}\s*/, '') // Remove leading ellipsis
      .replace(/\s*\.{3}$/, '') // Remove trailing ellipsis
      .replace(/^\s+|\s+$/g, '') // Trim whitespace from start and end
      .trim();

    // Create a VideoInfo object with all the extracted data
    const videoInfo = {
      title: title.trim(),
      channelName: channelName,
      channelUrl: fullChannelUrl,
      videoUrl: videoUrl,
      description: cleanedDescription,
    };
    
    return videoInfo;

  } catch (error) {
    // Show a persistent error toast with more details
    await showToast({
      style: Toast.Style.Failure,
      title: 'Failed to extract video information',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      primaryAction: {
        title: 'Try Again',
        onAction: () => extractVideoInfo(),
      },
    });
    throw error;
  }
} 