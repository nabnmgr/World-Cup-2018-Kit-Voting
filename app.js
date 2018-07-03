
const getTeams = async () => {
  const response = await fetch('/resources/teams.json');
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Unable to get Teams');
  }
}

const startApp = async () => {
  const data = await getTeams();
  console.log(data.kits[31]);
  // kitEl.src = team[2].home_kit;
  // flagEl.src = team[2].flag;  
  // nameEl.textContent = team[2].country;
}

startApp();


// const kitEl = document.querySelector('.team__kit');
// const flagEl = document.querySelector('.team__flag');
// const nameEl = document.querySelector('.team__name');


