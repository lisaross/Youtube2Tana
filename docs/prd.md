# YouTube to Tana Raycast Extension PRD

## Overview
The YouTube to Tana extension for Raycast will allow users to quickly capture structured information from YouTube videos and format it for seamless pasting into Tana. This will streamline the process of creating knowledge nodes from video content.

## User Story
As a knowledge worker using Tana, I want to easily extract information from YouTube videos I'm watching, so that I can add them to my knowledge base without manual formatting.

## Core Features

### 1. YouTube Data Extraction
- Extract video title
- Extract channel name
- Extract channel URL
- Extract video description
- Extract video transcript (when available)

### 2. Tana Formatting
- Format extracted data into Tana-compatible paste format
- Apply #video supertag to the content
- Structure data hierarchically with appropriate fields

### 3. Clipboard Integration
- Automatically copy formatted data to clipboard
- Provide visual confirmation of successful copy

## User Flow

1. User navigates to a YouTube video in their browser
2. User activates Raycast with the assigned hotkey
3. User selects the "YouTube to Tana" extension from Raycast
4. Extension automatically:
   - Detects the current browser tab contains a YouTube video
   - Extracts the required information (title, channel, description, transcript)
   - Formats the data according to Tana requirements
   - Copies the formatted data to clipboard
   - Provides confirmation of successful operation
5. User switches to Tana and pastes the content

## Output Format

```
#video
- [Video Title]
  - Author:: [Channel Name]
    - URL:: [Channel URL]
  - Description:: [Video Description]
  - Transcript:: [Video Transcript]
```

## Requirements

### Functional Requirements

1. **Browser Detection**
   - Must be able to identify active browser tab
   - Must verify the tab contains a YouTube video

2. **Data Extraction**
   - Must access YouTube page DOM to extract video metadata
   - Must be able to retrieve video transcripts through YouTube API or DOM scraping
   - Must handle videos without transcripts gracefully

3. **Formatting**
   - Must format data according to Tana paste requirements
   - Must maintain proper hierarchy and field structure

4. **User Experience**
   - Must complete operation within 3 seconds for videos with transcripts
   - Must provide clear success/failure indicators
   - Must handle errors gracefully with meaningful messages

### Non-Functional Requirements

1. **Performance**
   - Extension should add minimal overhead to Raycast operation
   - Transcript retrieval should be optimized for speed

2. **Privacy**
   - No data should be sent to third-party servers except YouTube API
   - No usage tracking beyond what's necessary for operation

3. **Maintenance**
   - Code should be resilient to YouTube UI changes
   - Documentation should be provided for future maintenance

## Constraints and Limitations

1. **YouTube API Limitations**
   - May be subject to rate limiting for transcript retrieval
   - Some videos may not have transcripts available

2. **Browser Permissions**
   - Will require permission to access browser tabs and content

3. **Raycast Extension Limitations**
   - Must adhere to Raycast extension guidelines and API constraints

## Future Enhancements (v2)

1. **Additional Metadata**
   - Video duration
   - Upload date
   - View count
   - Like count

2. **Custom Templates**
   - Allow users to define custom Tana templates

3. **Timestamp Linking**
   - Allow bookmarking specific timestamps within transcripts
   - Generate direct links to specific video moments

4. **Batch Processing**
   - Process multiple videos from a playlist
   - Process videos from watch history

## Success Metrics

1. **Adoption Rate**
   - Number of extension installations
   - Frequency of extension usage

2. **Time Savings**
   - Comparison of manual vs. extension-assisted workflow time

3. **User Satisfaction**
   - User ratings and feedback
   - Feature request patterns