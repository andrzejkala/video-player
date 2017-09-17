export default class videoPlayer {
  constructor (container, playlist) {
    if (playlist) {
      this.playlist   = playlist
    }

    this.container  = document.getElementById(container);
    this.player     = document.createElement("video");
    this.player.controls = false; // hide native player controls

    // Set initial state to first video
    this.currentVideo = 0;

    this.container.appendChild(this.player);

    // Create player controls
    this.createPlayerControls();

    // Load first video
    this.loadVideo(this.currentVideo, false);

    // Bind video events
    this.bindVideoEvents();

  }

  bindVideoEvents() {

    // When playback has started
    this.player.addEventListener("playing", () => {
      console.log("Video playing");
    });

    // When playback is paused
    this.player.addEventListener("pause", () => {
      console.log("Video paused");
    });

    // When playback is complete
    this.player.addEventListener("ended", () => {
      // Play the whole playlist
      if (this.currentVideo < this.playlist.length - 1) {
        this.currentVideo++;
        this.loadVideo(this.currentVideo, true);
      } else {
        this.currentVideo = 0;
        this.loadVideo(this.currentVideo, false);
      }
    });
  }

  // Play, Stop, Pause
  createPlayerControls() {
    var toolbar = document.createElement("div");
        toolbar.className = "player-toolbar";

    // Create the play button
    var playButton = document.createElement("button");
        playButton.id = "play-button";
        playButton.innerHTML = "Play";

        playButton.addEventListener("click", () => {
          this.player.play();
        });

        toolbar.appendChild(playButton);

    // Create the pause button
    var pauseButton = document.createElement("button");
        pauseButton.id = "pause-button";
        pauseButton.innerHTML = "Pause";

        pauseButton.addEventListener("click", () => {
          this.player.pause();
        });

        toolbar.appendChild(pauseButton);

    // Create the stop button
    var stopButton = document.createElement("button");
        stopButton.id = "stop-button";
        stopButton.innerHTML = "Stop";

        stopButton.addEventListener("click", () => {
          this.player.pause();
          this.currentVideo = 0;
          this.loadVideo(this.currentVideo, false);
        });

        toolbar.appendChild(stopButton);

    // Add to #vplayer
    this.container.appendChild(toolbar);

  }

  // Load video
  loadVideo(index, play) {
    if (Array.isArray(this.playlist)) {
      if (this.playlist[index]) {
        if (!this.source) {
          this.source    = document.createElement("source");
          this.player.appendChild(this.source);
        }

        this.source.src  = this.playlist[index].url;
        this.source.type = this.playlist[index].type;

        this.player.load();
        if (play) {
          this.player.play();
        }

      } else {
        console.error("Video doesn't exist");
      }
    }
  }
}
