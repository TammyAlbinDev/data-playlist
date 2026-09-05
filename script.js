let button = document.getElementById("song-button");
let backButton = document.getElementById("back-button");
let topButton = document.getElementById("top-button");
let artistButton = document.getElementById("artist-button");
let saveButton = document.getElementById("save-button");
let nextButton = document.getElementById("next-button");

let songs = [];
let index = 0;
let favorites = [];

async function loadSongs() {
  let response = await fetch("https://tammy-data-api.lestertammy1977.workers.dev/api/v1/datasets/viral-50-usa/records?limit=50");
  console.log("Status: " + response.status);
  let data = await response.json();
  songs = data.records;

  console.log("Records: " + songs.length);

  showSong();
}

function showSong() {
  let song = songs[index];

  document.getElementById("track-name").textContent = song["Track Name"];
  document.getElementById("track-facts").textContent = "#" + song.Position + " — " + song.Artist;
  document.getElementById("track-count").textContent = (index + 1) + " of " + songs.length;
}

function renderFavorites() {
  let text = "";

  favorites.forEach(function (favorite) {
    text = text + "• " + favorite + " ";
  });

  document.getElementById("favorites-list").textContent = text;
}

button.addEventListener("click", function () {
  loadSongs();
});

backButton.addEventListener("click", function () {
  if (index > 0) {
    index = index - 1;
    showSong();
  }
});

topButton.addEventListener("click", function () {
  index = 0;
  showSong();
});

artistButton.addEventListener("click", function () {
  if (songs.length > 0) {
    let wanted = songs[index].Artist;
    songs = songs.filter(function (song) {
      return song.Artist === wanted;
    });
    index = 0;
    showSong();
  }
});

nextButton.addEventListener("click", function () {
  if (index < songs.length - 1) {
    index = index + 1;
    showSong();
  }
});

saveButton.addEventListener("click", function () {
  let song = songs[index];

  if (favorites.length < 5) {
    favorites.push(song["Track Name"] + " — " + song.Artist);
    renderFavorites();
    document.getElementById("save-message").textContent = "Saved.";
  } else {
    document.getElementById("save-message").textContent = "Your Top 5 is full.";
  }
});
