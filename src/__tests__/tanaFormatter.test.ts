import { describe, it, expect } from "vitest";
import { formatForTana } from "../utils/tanaFormatter";
import { VideoInfo } from "../types/video";

describe("formatForTana", () => {
  it("should format video information correctly", () => {
    const videoInfo: VideoInfo = {
      title: "Test Video",
      channelName: "Test Channel",
      channelUrl: "https://youtube.com/channel/test",
      description: "Test Description"
    };

    const expected = `#video
- Test Video
  - Author:: Test Channel
    - URL:: https://youtube.com/channel/test
  - Description:: Test Description`;

    expect(formatForTana(videoInfo)).toBe(expected);
  });
}); 