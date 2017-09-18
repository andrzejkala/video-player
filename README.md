# VideoPlayer
A simple HTML5/JS video player. Crated just to check out the HTML5 `<video>` JavaScript API.

---

### Configuration

To be able to run smoothly, the player requires some basic configuration.

* __playerPoster__ - poster file location (image that's displayed when player is stopped)
* __playerContainer__ - `id` of the DOM Element that the player should be injected into
* __playlistContainer__ - `id` of the DOM Element that the playlist component should be injected into
* __playlist__ - the playlist

```javascript
let vplayer = new VideoPlayer({
  playerPoster:       "img/poster.jpg",
  playerContainer:    "vplayer",
  playlistContainer:  "playlist",
  playlistData:       playlist
});
```

---

### Playlist

Player includes basic support for playlist, which should be an array of objects in format mentioned below.

* __title__ - title of the movie clip
* __url__ - movie file location (currently remote resources are not supported)
* __duration__ - movie clip duration
* __type__ - format of the video file (currently only mp4 is supported)

A sample playlist element:
```javascript
  {
    title:    "Sample video title",
    url:      "/vids/sample_video.mp4",
    duration: "0:05",
    type:     "video/mp4"
  }
```
---

### Setup

To run it locally:

1. Clone the repository
2. run `npm install` or `yarn install` to install all the packages
3. Use `gulp` to build the project.

For now the build process assumes that **video files are located inside `/vids/` folder in the root**.