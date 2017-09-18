
// Set the playlist
const playlist = [
  {
    title:    "Reklama Play",
    url:      "/vids/sample_video.mp4",
    duration: "0:05",
    type:     "video/mp4"
  },
  {
    title:    "Reklama Hellena",
    url:      "/vids/sample_video.mp4",
    duration: "0:05",
    type:     "video/mp4"
  },
  {
    title:    "Zozole - kawał (webm)",
    url:      "/vids/small.webm",
    duration: "0:05",
    type:     "video/webm"
  },
  {
    title:    "Happy Socks - otwarcie (ogg)",
    url:      "/vids/small.ogv",
    duration: "0:05",
    type:     "video/ogg"
  }
]

// Import the player class
import VideoPlayer from "./vplayer";

// Create the player
let vplayer = new VideoPlayer({
  playerPoster:       "img/poster.jpg",
  playerContainer:    "vplayer",
  playlistContainer:  "playlist",
  playlistData:       {
    type: "obj",
    data: playlist
  }
});