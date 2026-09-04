let button = document.getElementById("song-button");

async function loadSongs() {
  let response = await fetch("https://tammy-data-api.lestertammy1977.workers.dev/api/v1/datasets/viral-50-usa/records?limit=10");
  console.log("Status: " + response.status);
  let data = await response.json();
  let songs = data.records;
  let song = songs[0];

   document.getElementById("track-name").textContent = song["Track Name"];
   document.getElementById("track-facts").textContent = "#" + song.Position + " — " + song.Artist;
}

button.addEventListener("click", function () {
  loadSongs();
});
