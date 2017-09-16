
// Set the playlist
const playlist = [
  {
    title:    "Reklama Play",
    url:      "/vids/play.mp4",
    duration: "...",
    type:     "video/mp4"
  },
  {
    title:    "Reklama Hellena",
    url:      "/vids/hellena.mp4",
    duration: "...",
    type:     "video/mp4"
  },
  {
    title:    "Zozole - kawał",
    url:      "/vids/zozole_kawal.mp4",
    duration: "...",
    type:     "video/mp4"
  },
  {
    title:    "Happy Socks - otwarcie",
    url:      "/vids/happy_socks_opening.mp4",
    duration: "...",
    type:     "video/mp4"
  }
]

// Import the player class
import VideoPlayer from "./vplayer";

// Create the player
let vplayer = new VideoPlayer("vplayer", playlist);


$('#playlist').on('click', function(e) {
  e.preventDefault();

  vplayer.showPlaylist();
});
