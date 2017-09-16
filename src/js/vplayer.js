export default class videoPlayer {
  constructor (container, playlist) {
    if (playlist)
      this.playlist   = playlist

      this.container  = document.getElementById(container);
      this.player     = document.createElement("video")
      this.player.controls = false // hide native player controls

      this.container.appendChild(this.player);

      // Create player controls
      this.createPlayerControls();

      // Load first video
      this.loadVideo(0);
  }

  // Play, Stop, Pause
  createPlayerControls() {
    var toolbar = document.createElement("div")
        toolbar.className = "player-toolbar"

    // Create the play button
    var playButton = document.createElement("button")
        playButton.id = "play-button"
        playButton.innerHTML = "Play"

        playButton.addEventListener("click", () => {
          this.player.play();
        });

        toolbar.appendChild(playButton);

    // Create the pause button
    var pauseButton = document.createElement("button")
        pauseButton.id = "pause-button"
        pauseButton.innerHTML = "Pause"

        pauseButton.addEventListener("click", () => {
          this.player.pause()
        });

        toolbar.appendChild(pauseButton);


    // Add to #vplayer
    this.container.appendChild(toolbar)

  }

  // Load the videos from playlist
  loadVideo(index) {
    if (Array.isArray(this.playlist)) {
      if (this.playlist[index]) {
        var source      = document.createElement("source")
        source.src  = this.playlist[index].url
        source.type = this.playlist[index].type

        this.player.appendChild(source);
      } else {
        console.error("Video doesn't exist");
      }
    }
  }
}
