import { BrowserExtension, showToast, Toast } from '@raycast/api';
import { VideoInfo } from '../types/video';

/**
 * Extracts video information from the current YouTube page
 * @returns Promise<VideoInfo>
 * @throws {Error} If the current page is not a YouTube video or if required information cannot be extracted
 */
export async function extractVideoInfo(): Promise<VideoInfo> {
  try {
    // Get the current tab
    const tabs = await BrowserExtension.getTabs();
    const activeTab = tabs.find(tab => tab.active);
    
    if (!activeTab?.url?.includes('youtube.com/watch')) {
      throw new Error('Not a YouTube video page. Please make sure you have a YouTube video page open and active.');
    }

    const videoUrl = activeTab.url;
    console.log('Video URL:', videoUrl); // Debug log

    // Extract title
    const title = await BrowserExtension.getContent({ 
      cssSelector: 'h1.ytd-video-primary-info-renderer', 
      format: 'text' 
    });

    console.log('Found title:', title); // Debug log

    if (!title) {
      throw new Error('Could not find video title. Please make sure the video page is fully loaded.');
    }

    // Extract channel name and URL
    const channelElement = await BrowserExtension.getContent({ 
      cssSelector: '#channel-name yt-formatted-string a', 
      format: 'html' 
    });

    console.log('Found channel element:', channelElement); // Debug log

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

    console.log('Extracted channel name:', channelName); // Debug log
    console.log('Extracted channel URL:', channelUrl); // Debug log

    // Format the channel URL
    const fullChannelUrl = channelUrl.startsWith('http') 
      ? channelUrl 
      : `https://www.youtube.com${channelUrl}`;

    console.log('Formatted channel URL:', fullChannelUrl); // Debug log

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
      console.log(`Trying selector ${selector}:`, description); // Debug log
      if (description) {
        workingSelector = selector;
        break;
      }
    }

    if (!description) {
      throw new Error('Could not find video description. Please make sure the video page is fully loaded and the description is visible.');
    }

    console.log('Working selector:', workingSelector); // Debug log

    // Clean up the description
    const cleanedDescription = description
      .replace(/Show more$/, '') // Remove "Show more" text if present
      .replace(/Show less$/, '') // Remove "Show less" text if present
      .replace(/^\s*\.{3}\s*/, '') // Remove leading ellipsis
      .replace(/\s*\.{3}$/, '') // Remove trailing ellipsis
      .replace(/^\s+|\s+$/g, '') // Trim whitespace from start and end
      .trim();

    console.log('Cleaned description:', cleanedDescription); // Debug log
    console.log('Description length:', cleanedDescription.length); // Debug log

    // Return complete VideoInfo
    return {
      title: title.trim(),
      channelName: channelName,
      channelUrl: fullChannelUrl,
      videoUrl: videoUrl,
      description: cleanedDescription,
    };

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