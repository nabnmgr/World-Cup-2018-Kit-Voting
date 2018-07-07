const kitOneEl = document.querySelector(".team__kit--1");
const flagOneEl = document.querySelector(".team__flag--1");
const nameOneEl = document.querySelector(".team__name--1");

const kitTwoEl = document.querySelector(".team__kit--2");
const flagTwoEl = document.querySelector(".team__flag--2");
const nameTwoEl = document.querySelector(".team__name--2");

const removeOne = document.querySelector(".remove--1");
const removeTwo = document.querySelector(".remove--2");

const teamInfo = document.querySelector(".team__info");
const gameStatusMsg = document.querySelector(".game-status");

// Getting local json

const getTeams = async () => {
  const response = await fetch("/resources/teams.json");
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Unable to get Teams");
  }
};

let kits, winner, trackOne, trackTwo;

const startApp = async () => {
  const data = await getTeams();
  kits = data.kits;
  trackTwo = kits.length;
  shuffleKits(kits);
  renderKits();
};

// Randomization using the Durstenfield shuffle
const shuffleKits = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

startApp();

const renderKits = () => {
  newKitOne();
  newKitTwo();
};

const newKitOne = () => {
  trackOne = 0; // variable for readability
  kitOneEl.src = kits[trackOne].kit;
  flagOneEl.src = kits[trackOne].flag;
  nameOneEl.textContent = kits[trackOne].team;
  trackTwo = kits.length - 1;
};

const newKitTwo = () => {
  trackTwo = kits.length - 1;
  kitTwoEl.src = kits[trackTwo].kit;
  flagTwoEl.src = kits[trackTwo].flag;
  nameTwoEl.textContent = kits[trackTwo].team;
};

document.getElementById("main").addEventListener("click", e => {
  if (e.target.matches(".remove--1")) {
    kits.splice(trackOne, 1);
    gameStatusMsg.style.display = "inline-block";

    // check if the kit is the last one
    if (trackTwo === 1) {
      document.querySelector(".team-1").style.display = "none";
      gameStatusMsg.textContent = `The home kit of ${
        kits[0].team
      } is the WINNER. `;
      gameStatusMsg.innerHTML += '<a href="/">Replay?</a>';
      teamInfo.style.display = "none";
      removeTwo.style.display = "none";
    } else {
      newKitOne();
      gameStatusMsg.textContent =
        kits.length - 2 === 0 ? "FINAL" : kits.length - 2 + " more coming up";
    }
  } else if (e.target.matches(".remove--2")) {
    kits.splice(trackTwo, 1);
    gameStatusMsg.style.display = "inline-block";

    if (trackTwo === 1) {
      document.querySelector(".team-2").style.display = "none";
      gameStatusMsg.textContent = `The home kit of ${
        kits[0].team
      } is the WINNER. `;
      gameStatusMsg.innerHTML += '<a href="/">Replay?</a>';
      teamInfo.style.display = "none";
      removeOne.style.display = "none";
    } else {
      newKitTwo();
      gameStatusMsg.textContent =
        kits.length - 2 === 0 ? "FINAL" : kits.length - 2 + " more coming up";
    }
  }

  e.preventDefault();
});
