let button = document.getElementById("song-button");
let backButton = document.getElementById("back-button");
let nextButton = document.getElementById("next-button");
let songs = [];
let index = 0;

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


button.addEventListener("click", function () {
  loadSongs();
});

nextButton.addEventListener("click", function () {
  if (index < songs.length - 1) {
    index = index + 1;
    showSong();
  }
});
backButton.addEventListener("click", function () {
  if (index > 0) {
    index = index - 1;
    showSong();
  }
});

