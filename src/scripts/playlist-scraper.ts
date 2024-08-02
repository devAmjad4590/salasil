import puppeteer from 'puppeteer';

interface VideoDetails {
  title: string | null;
  videoId: string | null;
  thumbnail: string | null;
  url: string | null;
  duration: string | null;
}

interface PlaylistDetails {
  videoCount: number;
  videos: VideoDetails[];
}

let browser= await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
});

/**
 * Fetches all video details from a YouTube playlist.
 * @param {string} playlistId - The ID of the YouTube playlist.
 * @returns {Promise<PlaylistDetails | null>} - An object containing the video count and an array of video details.
 */
async function getAllVideoDetails(playlistId: string): Promise<PlaylistDetails | null> {
  const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;
  try {
    const page = await browser.newPage();
    // Navigate to the playlist URL
    await page.goto(playlistUrl, { waitUntil: 'networkidle2' });
    // Wait for the video elements to load
    await page.waitForSelector('ytd-playlist-video-renderer');
    // Extract all video details and video count
    const playlistDetails: PlaylistDetails = await page.evaluate(() => {
      const videoElements = document.querySelectorAll('ytd-playlist-video-renderer');
      const videoCount = videoElements.length;
      const videos: VideoDetails[] = Array.from(videoElements).map((video, index) => {
        const titleElement = video.querySelector('a#video-title');
        const title = titleElement ? titleElement.textContent?.trim() ?? null : null;
        const videoHref = titleElement ? titleElement.getAttribute('href') : null;
        const videoId = videoHref ? new URL(videoHref, 'https://www.youtube.com').searchParams.get('v') : null;
        const durationElement = video.querySelector('span.ytd-thumbnail-overlay-time-status-renderer');
        const duration = durationElement ? durationElement.textContent?.trim() ?? null : null;
        // Only get the thumbnail for the first video
        const thumbnail = index === 0 ? video.querySelector('img')?.getAttribute('src') ?? null : null;
        return {
          title,
          videoId,
          thumbnail,
          url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : null,
          duration
        };
      });
      return {
        videoCount,
        videos
      };
    });
    // close Puppeteer
    await browser.close();
    return playlistDetails;
  } catch (error) {
    console.error('Error fetching playlist details:', error);
    if (browser) {
      await browser.close();
    }
    return null;
  }
}

// Export the function for reuse
export { getAllVideoDetails };