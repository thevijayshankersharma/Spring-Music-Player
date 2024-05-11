const audio = document.getElementById("music");
const playPauseBtn = document.getElementById("playPauseBtn");
const seekSlider = document.getElementById("seekSlider");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const icon = document.getElementById("buttonicon");
const seekfwd = document.getElementById("seekForward");
const seekBck = document.getElementById("seekBackward");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
let currplaying = 0;
let globalData = null;

const p = async () => {
  try {
    const response = await fetch("https://music-stream-a261.onrender.com/search1");
    const data = await response.json();
    globalData = data;
    console.log(data);
  } catch (e) {
    console.log("Error: " + e);
  }
};

p();

// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  // Save the current mode to localStorage
  const isDarkMode = body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
}

// Function to set initial mode
function setInitialMode() {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  const body = document.body;

  // Set the initial mode based on localStorage
  if (isDarkMode) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
}

// Call setInitialMode when the page loads
window.onload = setInitialMode;


function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    icon.setAttribute("src", "images/pause.png");
  } else {
    audio.pause();
    icon.setAttribute("src", "images/play.png");
  }
}

function updateProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  seekSlider.value = progress;
  const mins = Math.floor(audio.currentTime / 60);
  const secs = Math.floor(audio.currentTime % 60);
  currentTime.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function seek(e) {
  const seekTime = (audio.duration / 100) * e.target.value;
  audio.currentTime = seekTime;
}

function seekforward() {
  audio.currentTime += 10;
}

function seekbackward() {
  audio.currentTime -= 10;
}

function nextPlay() {
  currplaying++;
  if (currplaying >= globalData.length) {
    currplaying = 0;
  }
  const audio = document.getElementById("music");
  audio.src = globalData[currplaying].url;
  const icon = document.getElementById("buttonicon");
  if (audio.paused) {
    audio.play();
    icon.setAttribute("src", "images/pause.png");
  }
  const imgElement = document.querySelector(".imgBx img");
  const nameElement = document.querySelector(".details .name");
  const authorElement = document.querySelector(".details .author");
  imgElement.src = globalData[currplaying].img;
  nameElement.textContent = globalData[currplaying].name;
  authorElement.textContent = `${globalData[currplaying].artist} - ${globalData[currplaying].year}`;
}

function previousPlay() {
  currplaying--;
  if (currplaying < 0) {
    currplaying = globalData.length - 1;
  }
  const audio = document.getElementById("music");
  audio.src = globalData[currplaying].url;
  const icon = document.getElementById("buttonicon");
  if (audio.paused) {
    audio.play();
    icon.setAttribute("src", "images/pause.png");
  }
  const imgElement = document.querySelector(".imgBx img");
  const nameElement = document.querySelector(".details .name");
  const authorElement = document.querySelector(".details .author");
  imgElement.src = globalData[currplaying].img;
  nameElement.textContent = globalData[currplaying].name;
  authorElement.textContent = `${globalData[currplaying].artist} - ${globalData[currplaying].year}`;
}

audio.addEventListener("loadedmetadata", () => {
  const mins = Math.floor(audio.duration / 60);
  const secs = Math.floor(audio.duration % 60);
  duration.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
});

audio.addEventListener("timeupdate", updateProgress);

playPauseBtn.addEventListener("click", togglePlayPause);
seekSlider.addEventListener("input", seek);
seekfwd.addEventListener("click", seekforward);
seekBck.addEventListener("click", seekbackward);
next.addEventListener("click", nextPlay);
previous.addEventListener("click", previousPlay);