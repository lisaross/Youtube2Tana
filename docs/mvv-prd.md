# YouTube to Tana Raycast Extension - Minimum Viable Version PRD

## Overview
The Minimum Viable Version (MVV) of the YouTube to Tana extension for Raycast will focus on reliably extracting essential video metadata and formatting it for Tana. This version prioritizes stability and core functionality over comprehensive features.

## User Story
As a knowledge worker using Tana, I want to quickly capture basic information from YouTube videos I'm watching, so that I can reference them in my knowledge base without manual formatting.

## Core MVV Features

### 1. Basic YouTube Data Extraction
- Extract video title
- Extract channel name
- Extract channel URL
- Extract video description

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
   - Extracts the basic information (title, channel, description)
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
```

## MVV Requirements

### Functional Requirements

1. **Browser Detection**
   - Must be able to identify active browser tab
   - Must verify the tab contains a YouTube video

2. **Basic Data Extraction**
   - Must access YouTube page DOM to extract video title
   - Must extract channel name and URL
   - Must extract video description
   - Must handle missing elements gracefully

3. **Formatting**
   - Must format data according to Tana paste requirements
   - Must maintain proper hierarchy and field structure

4. **User Experience**
   - Must complete operation within 2 seconds
   - Must provide clear success/failure indicators
   - Must handle errors gracefully with meaningful messages

### Non-Functional Requirements

1. **Performance**
   - Extension should add minimal overhead to Raycast operation

2. **Privacy**
   - No data should be sent to third-party servers
   - No usage tracking beyond what's necessary for operation

3. **Reliability**
   - Must work consistently across YouTube's standard interface
   - Must degrade gracefully when elements can't be found

## Technical Implementation Notes

1. **DOM Element Selection**
   - Use reliable, stable selectors for key elements
   - Title: Document title or h1 element within main content
   - Channel: Author metadata within video info section
   - Description: Collapsed or expanded description container

2. **Browser Compatibility**
   - Initial focus on Chrome and Safari support
   - Clear documentation on supported browsers

3. **Error Handling**
   - Informative error messages for unsupported browsers
   - Graceful fallback when YouTube layout changes
   - Visual feedback when extraction succeeds/fails

## Future Enhancements (Post-MVV)

1. **Transcript Extraction** (High Complexity)
   - Research viable methods for transcript retrieval
   - Implement as optional feature with clear expectations

2. **Additional Metadata** (Medium Complexity)
   - Video duration
   - Upload date
   - View count
   - Like count

3. **Custom Templates** (Medium Complexity)
   - Allow users to define custom Tana templates

4. **Timestamp Linking** (High Complexity)
   - Allow bookmarking specific timestamps within videos

## Success Metrics for MVV

1. **Reliability**
   - Successful extraction rate on standard YouTube videos
   - Consistent formatting for Tana paste

2. **User Satisfaction**
   - Initial user feedback
   - Feature requests prioritization

3. **Time Savings**
   - Comparison of manual vs. extension-assisted basic workflow

## Implementation Timeline

1. **Phase 1: Core Extraction** (1-2 weeks)
   - Browser tab detection
   - Basic data extraction (title, channel, URL)
   - Simple clipboard formatting

2. **Phase 2: Enhanced Extraction** (1 week)
   - Description extraction
   - Error handling improvements
   - UX refinements

3. **Phase 3: Testing & Release** (1 week)
   - User testing
   - Documentation
   - Initial release

## MVV Limitations (To Set Expectations)

1. **No Transcript Support**
   - MVV will not include transcript extraction
   - Clear messaging in documentation and UI

2. **Limited Video Types**
   - Focus on standard YouTube video pages
   - May not work on shorts, live streams, or premium content

3. **Browser Compatibility**
   - Initial focus on mainstream browsers only