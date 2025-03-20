# YouTube to Tana Raycast Extension

A Raycast extension that extracts metadata from YouTube videos and formats it for seamless importing into Tana.

![YouTube to Tana Logo](./assets/youtube-to-tana-icon.png)

## Features

- **One-Click Extraction**: Quickly capture YouTube video metadata with a single command
- **Comprehensive Data**: Extracts video title, channel information, description, and transcript
- **Tana-Ready Format**: Auto-formats data with proper supertags and field structure
- **Clipboard Integration**: Automatically copies formatted content to clipboard
- **Simple Workflow**: Seamlessly bridges YouTube content to your Tana knowledge base

## Installation

### Prerequisites

- [Raycast](https://raycast.com/) installed on your macOS device
- Appropriate browser permissions enabled

### From Raycast Store

1. Open Raycast
2. Search for "YouTube to Tana"
3. Click "Install"

### Manual Installation

1. Clone this repository
```bash
git clone https://github.com/yourusername/youtube-to-tana.git
```

2. Install dependencies
```bash
cd youtube-to-tana
npm install
```

3. Build the extension
```bash
npm run build
```

4. Import into Raycast
- Open Raycast
- Go to "Extensions"
- Click "+ Import Extension"
- Select the compiled extension folder

## Usage

1. Navigate to a YouTube video in your browser
2. Open Raycast (default: ⌘+Space)
3. Type "YouTube to Tana" 
4. Press Enter
5. Wait for confirmation of successful extraction
6. Switch to Tana and paste (⌘+V)

The extracted content will be formatted as follows:

```
#video
- [Video Title]
  - Author:: [Channel Name]
    - URL:: [Channel URL]
  - Description:: [Video Description]
  - Transcript:: [Video Transcript]
```

## Troubleshooting

### Common Issues

- **Extension can't access browser content**: Check browser permissions
- **Transcript unavailable**: Some videos don't have transcripts; extension will still capture other metadata
- **Formatting appears incorrect**: Ensure your Tana workspace has compatible field definitions

### Reporting Bugs

Please file issues on the GitHub repository with:
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Browser and Raycast version information

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

See the [CONTRIBUTING.md](CONTRIBUTING.md) file for more details.

## Privacy

This extension:
- Only accesses data from the active YouTube tab
- Does not send data to any third-party servers except YouTube API when necessary
- Does not track usage behavior
- Handles all data locally on your device

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Raycast](https://raycast.com/) for their extension platform
- [Tana](https://tana.inc/) for their innovative knowledge management tool
- Contributors and early testers

---

Made with ❤️ for knowledge workers and Tana enthusiasts