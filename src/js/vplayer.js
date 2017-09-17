export default class videoPlayer {
  constructor (container, playlist) {
    if (playlist) {
      this.playlist = playlist;

      // Basic playlist params
      this.repeatPlaylist   = false;
      this.shufflePlaylist  = false;

      // Create the playlist information panel
      this.createPlaylistPanel();
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
      this.highlightPlaylistItem(this.currentVideo);
    });

    // When playback is paused
    this.player.addEventListener("pause", () => {
      console.log("Video paused");
    });

    // When playback is complete
    this.player.addEventListener("ended", () => {
      // Play the whole playlist
      if (!this.loadedFromPlaylist) {
        if (this.shufflePlaylist) {
          this.currentVideo = this.chooseRandomVideo();
          this.loadVideo(this.currentVideo, true);
        } else {
          if (this.currentVideo < this.playlist.length - 1) {
            this.currentVideo++;
            this.loadVideo(this.currentVideo, true);
          } else {
            this.currentVideo = 0;
            this.loadVideo(this.currentVideo, this.repeatPlaylist);
          }
        }


      }
    });
  }

  // Random video func. for shuffle functionality
  chooseRandomVideo() {
    var min = 0;
    var max = this.playlist.length - 1;
    return Math.floor( Math.random() * ( max - min + 1 ) + min);
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

  // Playlist panel
  createPlaylistPanel() {
    this.processedItems = document.createElement("ol");
    this.processedItems.className = "playlist-view";

    document.getElementById('playlist').appendChild(this.processedItems);

    for (var [index, listItem] of this.playlist.entries()) {
      var item = document.createElement("li");
          item.dataset.video_index = index;

      var link = document.createElement("a");
          link.dataset.video_id = index;
          link.href = "#";
          link.innerHTML = `<span class="title">${listItem.title}</span><span class="duration">${listItem.duration}</span>`;

          item.appendChild(link);

          link.addEventListener("click", (e) => {
            e.preventDefault();

            this.player.pause();
            this.currentVideo = e.currentTarget.dataset.video_id;
            this.loadedFromPlaylist = true;
            this.highlightPlaylistItem(this.currentVideo);
            this.loadVideo(this.currentVideo, true);

          });

      this.processedItems.appendChild(item);
    }

    this.createPlaylistToolbar();
  }

  // Playlist toolbar
  createPlaylistToolbar() {
    var playlistToolbar = document.createElement("div");
        playlistToolbar.className = "playlist-toolbar";

    // Repeat button
    var repeatButton = document.createElement("button");
        repeatButton.className = "repeat";
        repeatButton.innerHTML = "Repeat";

        repeatButton.addEventListener("click", (e) => {
          this.repeatPlaylist = !this.repeatPlaylist;
          $(e.currentTarget).toggleClass("active"); // jQuery to make things simpler
        });

        playlistToolbar.appendChild(repeatButton);

    // Shuffle button
    var shuffleButton = document.createElement("button");
        shuffleButton.className = "shuffle";
        shuffleButton.innerHTML = "Shuffle";

        shuffleButton.addEventListener("click", (e) => {
          this.shufflePlaylist = !this.shufflePlaylist;
          $(e.currentTarget).toggleClass("active"); // jQuery to make things simpler
        });

        playlistToolbar.appendChild(shuffleButton);


    document.getElementById('playlist').appendChild(playlistToolbar);
  }

  // Highlight playlist item
  highlightPlaylistItem(index) {
    if (index === false) {
      $(this.processedItems).find('li').removeClass("current"); // jQuery to make things simpler
    } else {
      var currentElem = this.processedItems.querySelector(`li[data-video_index="${index}"]`);
      $(this.processedItems).find('li').removeClass("current"); // jQuery to make things simpler
      $(currentElem).addClass("current"); // jQuery to make things simpler
    }

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

        if (this.processedItems) {
          this.highlightPlaylistItem(index);
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
