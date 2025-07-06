let allSong = [
  [
    {
      class: "album1",
      songNumber: "11",
      name: "Main Rang Sharbaton Ka - Atif Aslam",
      link: "https://files.catbox.moe/bpfiv2.mp3",
    },
    {
      class: "album1",
      songNumber: "12",
      name: "Tera Hone Laga Hoon - Atif Aslam",
      link: "https://files.catbox.moe/mhs6mg.mp3",
    },
  ],
  [
    {
      class: "album2",
      songNumber: "21",
      name: "Dekha Ek Khwab - Lata Mangeshkar",
      link: "https://files.catbox.moe/arj99s.mp3",
    },
    {
      class: "album2",
      songNumber: "22",
      name: "Dil To Pagal Hai - Lata Mangeshkar",
      link: "https://files.catbox.moe/ysx8st.mp3",
    },
    {
      class: "album2",
      songNumber: "23",
      name: "Dafali Wale Dafali Baja - Lata Mangeshkar",
      link: "https://files.catbox.moe/qauvsb.mp3",
    },
    {
      class: "album2",
      songNumber: "24",
      name: "Ajib Dastan Hai Yeh - Lata Mangeshkar",
      link: "https://files.catbox.moe/skbdwl.mp3",
    },
  ],
  [
    {
      class: "album3",
      songNumber: "31",
      name: "Hukum Rajini The Jaile - Anirudh",
      link: "https://files.catbox.moe/n9z5cr.mp3",
    },
    {
      class: "album3",
      songNumber: "32",
      name: "Vikram - Anirudh",
      link: "https://files.catbox.moe/3i38km.mp3",
    },
  ],
  [
    {
      class: "album4",
      songNumber: "41",
      name: "LAAL PARI - Yo Yo Honey Singh",
      link: "https://files.catbox.moe/mbe8ox.mp3",
    },
  ],
  [
    {
      class: "album5",
      songNumber: "51",
      name: "Kaun Tujhe - Kishore Kumar",
      link: "https://files.catbox.moe/nou8az.mp3",
    },
    {
      class: "album5",
      songNumber: "52",
      name: "Neele Neele Ambar Par - Kishore Kumar",
      link: "https://files.catbox.moe/jismm3.mp3",
    },
    {
      class: "album5",
      songNumber: "53",
      name: "Pyar Deewana Hota Hai - Kishore Kumar",
      link: "https://files.catbox.moe/3gi239.mp3",
    },
  ],
];
let leftSide = document.querySelector(".left-side");
let rightSide = document.querySelector(".right-side");
let album = document.querySelectorAll(".card");
let albumClass = null;
let liOfLeft = document.querySelector(".song-list");
let audio = new Audio();
let playOrPause = "play";
const seekBar = document.getElementById("seekBar");
let cross = document.querySelector(".left-side>div>i");
seekBar.disabled = true;
function playPauseControl() {
  document.querySelector(".song-control>div").addEventListener("click", (e) => {
    if (playOrPause === "play") {
      playOrPause = "pause";
    } else {
      playOrPause = "play";
    }
    playPause();
  });
}
function playTime() {
  const currentTime = document.getElementById("currentTime");
  const totalDuration = document.getElementById("totalDuration");
  function formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    if (sec < 10) sec = "0" + sec;
    return `${min}:${sec}`;
  }

  audio.addEventListener("loadedmetadata", () => {
    totalDuration.textContent = formatTime(audio.duration);
    seekBar.disabled = false;
  });

  audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);
    const progress = (audio.currentTime / audio.duration) * 100;
    seekBar.value = progress;
    if (progress == "100") {
      playOrPause = "play";
      playPause();
    }
  });
  seekBar.addEventListener("input", () => {
    const seekTo = (seekBar.value / 100) * audio.duration;
    audio.currentTime = seekTo;
  });
}
function playPause() {
  if (playOrPause === "play") {
    document.querySelector(
      ".song-control>div"
    ).innerHTML = `<i class="fa-sharp fa-solid fa-play"></i>`;
    audio.pause();
  } else {
    document.querySelector(
      ".song-control>div"
    ).innerHTML = `<i class="fa-sharp fa-solid fa-pause"></i>`;
    audio.play();
  }
}
function playSong(currentSongInfo) {
  console.log(currentSongInfo.link);
  audio.src = currentSongInfo.link;
  playOrPause = "pause";
  audio.play();
  playTime();
  document.querySelector(
    ".song-name"
  ).innerHTML = `<span>${currentSongInfo.name}</span>`;
  playPause();
}
function showSongInLeftSide(sideSongs, canCall) {
  leftSide.style.left = "0%";
  liOfLeft.innerHTML += `<li data-sideSong='${JSON.stringify(sideSongs)}'>
  <i class="fa-sharp fa-solid fa-music"></i><span>${sideSongs.name}</span
  ><i class="fa-sharp fa-solid fa-play"></i>
</li>`;
  if (canCall) {
    let li = Array.from(document.querySelectorAll("li"));
    li.forEach((lii) => {
      lii.addEventListener("click", (e) => {
        playSong(JSON.parse(lii.dataset.sidesong));
      });
    });
  }
}
function getSongLeftSide(className) {
  liOfLeft.innerHTML = "";
  let index = -1;

  if (className === "card album1") index = 0;
  else if (className === "card album2") index = 1;
  else if (className === "card album3") index = 2;
  else if (className === "card album4") index = 3;
  else index = 4;

  for (let i = 0; i < allSong[index].length; i++) {
    const canCall = i === allSong[index].length - 1;
    showSongInLeftSide(allSong[index][i], canCall);
  }
}
Array.from(album).forEach((item) => {
  item.addEventListener("click", (e) => {
    albumClass = e.currentTarget.className;
    getSongLeftSide(albumClass);
  });
});
playPauseControl();
cross.addEventListener("click", () => {
  leftSide.style.left = "-100%";
});
