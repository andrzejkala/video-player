
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
    title:    "Zozole - kawał",
    url:      "/vids/sample_video.mp4",
    duration: "0:05",
    type:     "video/mp4"
  },
  {
    title:    "Happy Socks - otwarcie",
    url:      "/vids/sample_video.mp4",
    duration: "0:05",
    type:     "video/mp4"
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
    type: "json",
    data: "http://localhost:9001/json/playlist.json"
  }
});