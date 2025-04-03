import { describe, expect, it } from "vitest";
import { formatForTana } from "../tanaFormatter";
import { VideoInfo } from "../../types/video";

describe("Tana Formatter", () => {
  it("should format video information with a single paragraph description", () => {
    const videoInfo: VideoInfo = {
      title: "Test Video",
      url: "https://youtube.com/watch?v=123",
      channelName: "Test Channel",
      channelUrl: "https://youtube.com/channel/123",
      description: "This is a test video description.",
    };

    const expected = `%%tana%%
- Test Video
  - Metadata
    - URL::https://youtube.com/watch?v=123
    - Channel::Test Channel https://youtube.com/channel/123
    - Description
      - This is a test video description.`;

    expect(formatForTana(videoInfo)).toBe(expected);
  });

  it("should format video information with multiple paragraphs", () => {
    const videoInfo: VideoInfo = {
      title: "Test Video",
      url: "https://youtube.com/watch?v=123",
      channelName: "Test Channel",
      channelUrl: "https://youtube.com/channel/123",
      description: "First paragraph.\n\nSecond paragraph.\n\nThird paragraph.",
    };

    const expected = `%%tana%%
- Test Video
  - Metadata
    - URL::https://youtube.com/watch?v=123
    - Channel::Test Channel https://youtube.com/channel/123
    - Description
      - First paragraph.
      - Second paragraph.
      - Third paragraph.`;

    expect(formatForTana(videoInfo)).toBe(expected);
  });

  it("should handle empty description", () => {
    const videoInfo: VideoInfo = {
      title: "Test Video",
      url: "https://youtube.com/watch?v=123",
      channelName: "Test Channel",
      channelUrl: "https://youtube.com/channel/123",
      description: "",
    };

    const expected = `%%tana%%
- Test Video
  - Metadata
    - URL::https://youtube.com/watch?v=123
    - Channel::Test Channel https://youtube.com/channel/123
    - Description
      - No description available`;

    expect(formatForTana(videoInfo)).toBe(expected);
  });

  it("should handle description with leading/trailing whitespace", () => {
    const videoInfo: VideoInfo = {
      title: "Test Video",
      url: "https://youtube.com/watch?v=123",
      channelName: "Test Channel",
      channelUrl: "https://youtube.com/channel/123",
      description: "  First paragraph.  \n\n  Second paragraph.  \n\n  Third paragraph.  ",
    };

    const expected = `%%tana%%
- Test Video
  - Metadata
    - URL::https://youtube.com/watch?v=123
    - Channel::Test Channel https://youtube.com/channel/123
    - Description
      - First paragraph.
      - Second paragraph.
      - Third paragraph.`;

    expect(formatForTana(videoInfo)).toBe(expected);
  });
}); 