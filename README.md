# VideoPlayer
A simple HTML5/JS video player. Crated just to check out the HTML5 `<video>` JavaScript API.

---

### Configuration

To be able to run smoothly, the player requires some basic configuration.

* __playerPoster__ - poster file location (image that's displayed when player is stopped)
* __playerContainer__ - `id` of the DOM Element that the player should be injected into
* __playlistContainer__ - `id` of the DOM Element that the playlist component should be injected into
* __playlistData__ - playlist configuration object that includes two fields:
  * __type__ - type of configuration provided `obj` for object, `url` for JSON file to load via XHR
  * __data__ - either an object with all the data as specified below or an `url` to JSON file

```javascript
let vplayer = new VideoPlayer({
  playerPoster:       "img/poster.jpg",
  playerContainer:    "vplayer",
  playlistContainer:  "playlist",
  playlistData:       {
    type: _list_type_,
    data: _playlist_data_source
  }
});
```

---

### Playlist

Player includes basic support for playlist, which should be an array of objects in format mentioned below.

* __title__ - title of the movie clip
* __url__ - movie file location (currently remote resources are not supported)
* __duration__ - movie clip duration
* __type__ - file format: `video/mp4`, `video/webm`, `video/ogg`

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
4. Open browser and load up `http://localhost:9001`

For now the build process assumes that **video files are located inside `/vids/` folder in the root**.