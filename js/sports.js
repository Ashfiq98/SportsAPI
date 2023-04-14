const detail = document.getElementById('detail');

function sports() {
    const url = 'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League';
    fetch(url)
        .then(res => res.json())
        .then(data => displayTeamsInfo(data))
        // .then(data => display2(data))
}
sports();

function display2(data) {
    console.log(data.teams[0])
}

const displayTeamsInfo = (data) => {

    // modal details

    const laliga = document.getElementById('laliga');

    data.teams.forEach(team => {
        // console.log(team.strDescriptionEN);
        let str2 = team.strDescriptionEN.replace(/\s+/g, ' ').trim();
        let str3 = str2.replaceAll(/'/g, ' ');
        let str = str3.replaceAll(/"/g, ' ')

        // console.log(str.length)
        // console.log(str)
        const div = document.createElement('div');
        div.classList.add('card');
        //<h6 class="card-title">Stadium : ${team.strStadium}</h6>
        // <p class="card-text">${team.strDescriptionEN.slice(0,100)}</p>
        div.innerHTML = `
           <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
            <div class="card-body">
                <h6 class="card-title" style="color: #a6672b">${team.strTeam}</h6>
                <button class='description-open'onclick = 'openModalDescription("${str}")'>View details about <h6 class="card-title" style="color: #ff4000">${team.strTeam}</h6></button> 
                
                <button class='modal-open' onclick="openModal(${team.idTeam})"> Details of last 5 matches</button>
                </div>
            <div class="card-footer">
            <a href="https://${team.strWebsite ? team.strWebsite : "No website"}"class="text-muted">Website</a>
            </div>
        `
            // ${team.idTeam}
        laliga.appendChild(div);
        // const hideModal = document.querySelector('.close-modal');
        // hideModal.addEventListener('click', closeModal);
        // matchDetails(team.idTeam);
    })
    const hideModal = document.querySelectorAll('.close-modal');
    hideModal.forEach(btn => { btn.addEventListener('click', closeModal) });


}

const matchDetails = (teamID) => {
    // console.log('Team ID ' + teamID);
    const url = `https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${teamID}`;
    fetch(url)
        .then(res => res.json())
        .then(data => matchDetailsDescription(data.results));
}
const matchDetailsDescription = (results) => {
    // console.log(results);

    detail.innerHTML = '';
    results.forEach(result => {
        // console.log(result)
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="card-body">
                <h4 style='color: red' class="card-title">Date : ${result.dateEvent}</h4>
                <h1 style = "color: Blue">${result.strLeague} </h1>
                <h3 style='color: #03AC13'>${result.strHomeTeam} ${result.intHomeScore} - ${result.intAwayScore} ${result.strAwayTeam}</h3>
                <h5 style='color: #807fc6'> Venue : ${result.strVenue}</h5>
                </div>
            <div class="card-footer">
            <iframe height = "300px" width="400px" src="https://www.youtube.com/embed/${result.strVideo.substr(32,result.strVideo.length-32)}" ></iframe>
            </div>`
        detail.appendChild(div);
        // console.log(result.dateEvent)
        // console.log(result.intRound)
        // console.log(result.intHomeScore)
        // console.log(result.intAwayScore)
        // console.log(result.strHomeTeam)
        // console.log(result.strAwayTeam)
        // console.log(result.strLeague)
        // console.log(result.strVideo)
    })
    const hideModal = document.querySelectorAll('.close-modal');
    hideModal.forEach(btn => { btn.addEventListener('click', closeModal) });
}

const descriptionDetails = (des) => {
    const description = document.getElementById('description');
    description.innerText = des;
}

const modal2 = document.querySelector('.modal2');
const descriptionModal = document.querySelector('.description-modal');

const overlay = document.querySelector('.overlay');


const openModalDescription = (des) => {
    // console.log('clicked');
    // event.preventDefault();
    descriptionModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    descriptionDetails(des);
    // console.log(des);
};
const closeModalDescription = function() {
    descriptionModal.classList.add('hidden');
    overlay.classList.add('hidden');
};
const openModal = function(id) {
    // console.log('clicked')
    // e.preventDefault();
    modal2.classList.remove('hidden');
    overlay.classList.remove('hidden');
    matchDetails(id);
    // console.log(id);
};


const closeModal = function() {
    // console.log('clicked')
    modal2.classList.add('hidden');
    descriptionModal.classList.add('hidden');
    overlay.classList.add('hidden');
};
// const showModal = document.querySelector('.modal-open');
// const hideModal = document.querySelector('.close-modal');

// showModal.forEach(btn => { btn.addEventListener('click', openModal) })
// showModal.addEventListener('click', openModal);
// hideModal.forEach(btn => { btn.addEventListener('click', closeModal) })
// hideModal.addEventListener('click', closeModal);