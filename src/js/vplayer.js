import PlaylistPanel from "./playlist";

export default class videoPlayer {
  constructor (config) {

    // Create the video player basics
    this.container  = document.getElementById(config.playerContainer);
    this.player     = document.createElement("video");
    this.player.poster = config.playerPoster;
    this.player.controls = false; // hide native player controls
    this.container.appendChild(this.player);

    // Player state
    this.playerState = document.createElement("div");
    this.playerState.id = "player-state";
    this.setPlayerState("Stopped");
    this.container.appendChild(this.playerState);

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

  setPlayerState(state) {
    this.playerState.innerHTML = state;
  }

  bindVideoEvents() {

    // When playback has started
    this.player.addEventListener("playing", () => {
      this.setPlayerState("Playing");
      this.playlistPanel.highlightPlaylistItem(this.currentVideo);
    });

    // When playback is paused
    this.player.addEventListener("pause", () => {
      this.setPlayerState("Paused");
    });

    // When playback is complete
    this.player.addEventListener("ended", () => {
      // Play the whole playlist
      if (!this.playlistPanel.loadedFromPlaylist) {
        if (this.playlistPanel.shufflePlaylist) {
          this.currentVideo = this.playlistPanel.chooseRandomVideo();
          this.loadVideo(this.currentVideo, true);
        } else {
          if (this.currentVideo < this.playlistPanel.playlist.length - 1) {
            this.currentVideo++;
            this.loadVideo(this.currentVideo, true);
          } else {
            this.currentVideo = 0;
            if (!this.playlistPanel.repeatPlaylist) {
              this.setPlayerState("Stopped");
            }
            this.loadVideo(this.currentVideo, this.playlistPanel.repeatPlaylist);
          }
        }
      } else {
        // Reset the "fromPlaylist" setting
        this.playlistPanel.loadedFromPlaylist = false;
      }
    });
  }

  // Play, Stop, Pause
  createPlayerControls() {
    var toolbar = document.createElement("div");
        toolbar.className = "player-toolbar";

    var controlsLeft = document.createElement("div");
        controlsLeft.className = "controls-left";

    var controlsRight = document.createElement("div");
        controlsRight.className = "controls-right";

    // Create the play button
    var playButton = document.createElement("button");
        playButton.id = "play-button";
        playButton.innerHTML = "<i class=\"fa fa-play\" aria-hidden=\"true\"></i>";

        playButton.addEventListener("click", () => {
          this.player.play();
        });

        controlsLeft.appendChild(playButton);

    // Create the pause button
    var pauseButton = document.createElement("button");
        pauseButton.id = "pause-button";
        pauseButton.innerHTML = "<i class=\"fa fa-pause\" aria-hidden=\"true\"></i>";

        pauseButton.addEventListener("click", () => {
          this.player.pause();
        });

        controlsLeft.appendChild(pauseButton);

    // Create the stop button
    var stopButton = document.createElement("button");
        stopButton.id = "stop-button";
        stopButton.innerHTML = "<i class=\"fa fa-stop\" aria-hidden=\"true\"></i>";

        stopButton.addEventListener("click", () => {
          this.player.pause();
          this.currentVideo = 0;
          this.loadVideo(this.currentVideo, false);
          this.setPlayerState("Stopped");
        });

        controlsLeft.appendChild(stopButton);

        toolbar.appendChild(controlsLeft);

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

        controlsRight.appendChild(volumeControl);

    // Create the fullscreen control
    var fullscreenControl = document.createElement("button");
        fullscreenControl.id = "fullscreen-button";
        fullscreenControl.innerHTML = "<i class=\"fa fa-expand\" aria-hidden=\"true\"></i>";

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

        controlsRight.appendChild(fullscreenControl);

        toolbar.appendChild(controlsRight);

    // Add to #vplayer
    this.container.appendChild(toolbar);

  }

  // Load video
  loadVideo(index, play) {
    if (Array.isArray(this.playlistPanel.playlist)) {
      if (this.playlistPanel.playlist[index]) {
        if (!this.source) {
          this.source    = document.createElement("source");
          this.player.appendChild(this.source);
        }

        this.source.src  = this.playlistPanel.playlist[index].url;
        this.source.type = this.playlistPanel.playlist[index].type;

        this.player.load();

        if (this.playlistPanel.processedItems) {
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
