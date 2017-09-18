export default class PlaylistPanel {
  constructor (config) {
    // Set playlist basic data
    switch (config.playlistData.type) {
    case "obj":
      this.playlist   = config.playlistData.data
      break;
    case "json":
      this.playlist   = this.loadPlaylistFromJSON(config.playlistData.data);
      break;
    default:
      console.error("You need to provide a playlist source");
    }

    // Set the container
    this.container  = config.playlistContainer;

    // Loaded from playlist
    this.loadedFromPlaylist = false;

    // Basic playlist params
    this.repeatPlaylist   = false;
    this.shufflePlaylist  = false;

    // Hook up the player
    this.player           = config.player;

    // Create the playlist information panel
    if (this.playlist) {
      this.createPlaylistPanel();
    }


  }

  // Getters / setters
  getPlaylist() {
    return this.playlist;
  }

  getShufflePlaylist() {
    return this.shufflePlaylist;
  }

  getRepeatPlaylist() {
    return this.repeatPlaylist;
  }

  getLoadedFromPlaylist() {
    return this.loadedFromPlaylist;
  }

  getProcessedItems() {
    return this.processedItems;
  }

  getLoadedFromPlaylist() {
    return this.loadedFromPlaylist;
  }

  setLoadedFromPlaylist(loadedFromPlaylist) {
    this.loadedFromPlaylist = loadedFromPlaylist;
  }


  // http://localhost:9001/json/playlist.json
  // To make things simple - $.ajax via jQuery
  loadPlaylistFromJSON(url) {
    console.log("Loading playlist from JSON", url);
    $.ajax(url)
      .done( (response) => {
        this.playlist = response;
        this.createPlaylistPanel();
        console.log("HERE WE GO!")
        this.player.loadVideo(this.player.currentVideo, false);
      });
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
            this.player.player.pause();
            this.player.currentVideo = e.currentTarget.dataset.video_id;
            this.loadedFromPlaylist = true;
            this.highlightPlaylistItem(this.player.currentVideo);
            this.player.loadVideo(this.player.currentVideo, true);

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
        repeatButton.innerHTML = "<i class=\"fa fa-repeat\" aria-hidden=\"true\"></i>";

        repeatButton.addEventListener("click", (e) => {
          this.repeatPlaylist = !this.repeatPlaylist;
          $(e.currentTarget).toggleClass("active"); // jQuery to make things simpler
        });

        playlistToolbar.appendChild(repeatButton);

    // Shuffle button
    var shuffleButton = document.createElement("button");
        shuffleButton.className = "shuffle";
        shuffleButton.innerHTML = "<i class=\"fa fa-random\" aria-hidden=\"true\"></i>";

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

  // Random video func. for shuffle functionality
  chooseRandomVideo() {
    var min = 0;
    var max = this.playlist.length - 1;
    return Math.floor( Math.random() * ( max - min + 1 ) + min);
  }
}