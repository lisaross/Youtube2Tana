# YouTube to Tana Raycast Extension

A Raycast extension that extracts metadata from YouTube videos and formats it for seamless importing into Tana. Perfect for capturing video content into your Tana knowledge base.

## Features

- **One-Click Extraction**: Quickly capture YouTube video metadata with a single command
- **Complete Metadata**: 
  - Video title with #video tag
  - Video URL
  - Channel URL
  - Author name
  - Full description (when expanded)
  - Preserves description formatting including timestamps and sections
- **Tana-Ready Format**: Auto-formats data with proper field structure and node hierarchy
- **Clipboard Integration**: Automatically copies formatted content ready to paste into Tana

## Installation

### Prerequisites

- macOS with [Raycast](https://raycast.com/) installed
- Node.js 16 or later
- npm or yarn

### Installation Steps

1. Clone this repository:
```bash
git clone https://github.com/lisaross/Youtube2Tana.git
```

2. Navigate to the project directory:
```bash
cd Youtube2Tana
```

3. Install dependencies:
```bash
npm install
```

4. Build the extension:
```bash
npm run build
```

5. Import into Raycast:
   - Open Raycast
   - Search for "Import Extension"
   - Select the built extension directory

## Usage

1. Navigate to a YouTube video in your browser
2. **Important**: If you want the full description, click "Show more" in the YouTube video description first
3. Open Raycast (default: ⌘+Space)
4. Type "YouTube to Tana" 
5. Press Enter
6. Switch to Tana and paste (⌘+V)

The extracted content will be formatted as follows:

```
- [Video Title] #video
  - URL::[Video URL]
  - Channel URL::[Channel URL]
  - Author::[Channel Name]
  - Description::[First paragraph]
    - [Additional content]
    - [Timestamps]
    - [Links]
```

## Troubleshooting

- **Missing Description Content**: Make sure to click "Show more" on YouTube if you want the full description
- **Extension Not Finding Video**: Ensure you're on a YouTube video page (not shorts, home, or channel pages)
- **Formatting Issues**: Make sure you're pasting into a Tana node

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Privacy

This extension:
- Only accesses data from the active YouTube tab
- Does not send data to any third-party servers
- Does not track usage behavior
- Handles all data locally on your device

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. The test suite includes:

- Unit tests for utility functions
- Mock implementations of browser APIs
- Test coverage reporting

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Test Structure

Tests are organized in `__tests__` directories alongside their source files:

```
src/
  utils/
    __tests__/
      browserWrapper.test.ts
      tanaFormatter.test.ts
      youtubeExtractor.test.ts
    browserWrapper.ts
    tanaFormatter.ts
    youtubeExtractor.ts
```

### Test Coverage

Test coverage reports are generated in the `coverage` directory. The coverage includes:

- Line coverage
- Function coverage
- Branch coverage

To view the coverage report:

```bash
npm run test:coverage
```

---

Made with ❤️ for Tana enthusiasts