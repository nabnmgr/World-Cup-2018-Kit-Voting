const kitOneEl = document.querySelector('.team__kit--1');
const flagOneEl = document.querySelector('.team__flag--1');
const nameOneEl = document.querySelector('.team__name--1');

const kitTwoEl = document.querySelector('.team__kit--2');
const flagTwoEl = document.querySelector('.team__flag--2');
const nameTwoEl = document.querySelector('.team__name--2');

const removeOne = document.querySelector('.remove--1');
const removeTwo = document.querySelector('.remove--2');

const teamsLeft = document.querySelector('.teams-left');

const getTeams = async () => {
  const response = await fetch('/resources/teams.json');
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Unable to get Teams');
  }
}

let kits, winner, trackOne, trackTwo;


const startApp = async () => {
  const data = await getTeams();
  kits = data.kits;
  trackTwo = kits.length;
  shuffleKits(kits);
  renderKits();
}

const shuffleKits = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

startApp();


const renderKits = () => {
  newKitOne();
  newKitTwo();
}


const newKitOne = () => {
  console.log(kits);
  trackOne = 0;
  kitOneEl.src = kits[trackOne].kit;
  flagOneEl.src = kits[trackOne].flag; 
  nameOneEl.textContent = kits[trackOne].team;
  trackTwo = kits.length - 1;
}


removeOne.addEventListener('click', function(e) {
  kits.splice(trackOne, 1);

  if(trackTwo === 1){
    console.log(`Winner`)
    console.log(kits[0].team)
    document.querySelector('.team-1').style.display = "none";
    removeTwo.disabled = true;
  } else {
    newKitOne();
    teamsLeft.textContent = (kits.length - 2 === 0) ? 'FINAL' : kits.length - 2 + ' team(s) after this'
  }
  e.preventDefault();
});



const newKitTwo = () => {
  console.log(kits);
  trackTwo = kits.length - 1;
  kitTwoEl.src = kits[trackTwo].kit;
  flagTwoEl.src = kits[trackTwo].flag;
  nameTwoEl.textContent = kits[trackTwo].team;
}

removeTwo.addEventListener('click', function(e) {
  kits.splice(trackTwo, 1);

  if(trackTwo === 1){
    console.log(`Winner`)
    console.log(kits[0].team)
    document.querySelector('.team-2').style.display = "none";
    removeOne.disabled = true;
  } else {
    newKitTwo();
    teamsLeft.textContent = (kits.length - 2 === 0) ? 'FINAL' : kits.length - 2 + ' team(s) after this';
  }
  e.preventDefault();
});



