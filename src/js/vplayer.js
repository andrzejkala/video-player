import PlaylistPanel from "./playlist";

export default class videoPlayer {
  constructor (config) {

    // Create the video player basics
    this.container  = document.getElementById(config.playerContainer);
    this.player     = document.createElement("video");
    this.player.controls = false; // hide native player controls
    this.container.appendChild(this.player);

    // Check if there is a playlist data at all
    if (config.playlistData) {
      this.playlistPanel = new PlaylistPanel({
        playlistContainer:  config.playlistContainer,
        playlistData:       config.playlistData,
        player:             this
      })
    }

    // Set initial state to first video
    this.currentVideo = 0;

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
      this.playlistPanel.highlightPlaylistItem(this.currentVideo);
    });

    // When playback is paused
    this.player.addEventListener("pause", () => {
      console.log("Video paused");
    });

    // When playback is complete
    this.player.addEventListener("ended", () => {
      // Play the whole playlist
      if (!this.playlistPanel.getLoadedFromPlaylist()) {
        if (this.playlistPanel.getShufflePlaylist()) {
          this.currentVideo = this.playlistPanel.chooseRandomVideo();
          this.loadVideo(this.currentVideo, true);
        } else {
          if (this.currentVideo < this.playlistPanel.getPlaylist().length - 1) {
            this.currentVideo++;
            this.loadVideo(this.currentVideo, true);
          } else {
            this.currentVideo = 0;
            this.loadVideo(this.currentVideo, this.playlistPanel.getRepeatPlaylist());
          }
        }
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

    // Create the volume control
    var volumeControl = document.createElement("input");
        volumeControl.type  = "range";
        volumeControl.min   = 0;
        volumeControl.max   = 100;
        volumeControl.step  = 1;
        volumeControl.value = this.player.volume * 100;

        volumeControl.addEventListener("input", (e) => {
          this.player.volume = e.target.value / 100;
        });

        volumeControl.addEventListener("change", (e) => {
          this.player.volume = e.target.value / 100;
        });

        toolbar.appendChild(volumeControl);

    // Create the fullscreen control
    var fullscreenControl = document.createElement("button");
        fullscreenControl.id = "fullscreen-button";
        fullscreenControl.innerHTML = "Fullscreen";

        fullscreenControl.addEventListener("click", (e) => {
          if (!document.fullscreenElement) {
            // Standards version
            if (this.player.requestFullscreen) {
              this.player.requestFullscreen();
            }

            // Chrome / Opera
            if (this.player.webkitRequestFullscreen) {
              this.player.webkitRequestFullscreen();
            }

            // Firefox
            if (this.player.mozRequestFullScreen) {
              this.player.mozRequestFullScreen();
            }

            // Internet Explorer 11
            if (this.player.msRequestFullscreen) {
              this.player.msRequestFullscreen();
            }

          }
        });

        toolbar.appendChild(fullscreenControl);

    // Add to #vplayer
    this.container.appendChild(toolbar);

  }

  // Load video
  loadVideo(index, play) {
    if (Array.isArray(this.playlistPanel.getPlaylist())) {
      if (this.playlistPanel.getPlaylist()[index]) {
        if (!this.source) {
          this.source    = document.createElement("source");
          this.player.appendChild(this.source);
        }

        this.source.src  = this.playlistPanel.getPlaylist()[index].url;
        this.source.type = this.playlistPanel.getPlaylist()[index].type;

        this.player.load();

        if (this.playlistPanel.getProcessedItems()) {
          this.playlistPanel.highlightPlaylistItem(index);
        }

        if (play) {
          this.player.play();
        }

      } else {
        console.error("Video doesn't exist");
      }
    }
  }
}
