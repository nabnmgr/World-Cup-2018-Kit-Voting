

const getTeams = async () => {
  const response = await fetch('/resources/teams.json');
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Unable to get Teams');
  }
}

let kits;

const startApp = async () => {
  const data = await getTeams();
  kits = data.kits;
  renderKits();
}

startApp();


const kitOneEl = document.querySelector('.team__kit--1');
const flagOneEl = document.querySelector('.team__flag--1');
const nameOneEl = document.querySelector('.team__name--1');

const kitTwoEl = document.querySelector('.team__kit--2');
const flagTwoEl = document.querySelector('.team__flag--2');
const nameTwoEl = document.querySelector('.team__name--2');

const renderKits = () => {
  console.log(kits);
  if(kits.length > 0) {
    let randOne = Math.floor(Math.random() * kits.length);
    console.log(randOne);
  
    kitOneEl.src = kits[randOne].kit;
    flagOneEl.src = kits[randOne].flag;  
    nameOneEl.textContent = kits[randOne].team;
  
    kits.splice(randOne, 1);
  
    let randTwo = Math.floor(Math.random() * kits.length);
    console.log(randTwo);
  
    kitTwoEl.src = kits[randTwo].kit;
    flagTwoEl.src = kits[randTwo].flag;  
    nameTwoEl.textContent = kits[randTwo].team;
  
    kits.splice(randTwo, 1);
  } else {
    
  }
  
}

document.querySelector('.new').addEventListener('click', function(e) {
  renderKits();
  e.preventDefault();
});