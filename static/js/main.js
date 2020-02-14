let nextP ='';
let previousP = '';
let planetsInventory = {};


fetch('https://swapi.co/api/planets/?page=1')
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        console.log(myJson);
        console.log(myJson.next);
        console.log(myJson.previous);
        // localStorage.setItem('next', myJson.next);
        // localStorage.setItem('previous', myJson.previous);
        makeTable(myJson);
        nextP = myJson.next;
        previousP = myJson.previous;

    });

function makeTable(obj) {
    for (let planet of obj.results) {
        let tr = document.createElement("tr");
        let buttonResidents = '';
        let buttonVote = '';
        let loginStatus = document.getElementById("login_status");
        planetsInventory[planet.name] = planet.residents;
        if (planet.residents.length > 0) {
            buttonResidents = `<td><button
                                type="button"
                                class="btn btn-outline-dark"
                                id="${planet.name}"
                                name="${planet.name}"
                                data-toggle="modal"
                                data-target="#exampleModal">${planet.residents.length} resident(s)</button></td>`
        }
        else {
            buttonResidents = '<td>No known residents</td>'
        }
        if (loginStatus.innerText === 'Not Logged In') {
            buttonVote = '';
        }
        else {
            buttonVote = `
                          <td><button type="button" class="btn btn-outline-dark" id="vote_${planet.name}">Vote</button></td>
            `;
        }
        tr.innerHTML = `<td>${planet.name}</td>
                        <td>${planet.diameter}</td>
                        <td>${planet.climate}</td>
                        <td>${planet.terrain}</td>
                        <td>${planet.surface_water}</td>
                        <td>${planet.population}</td>
                        ${buttonResidents}
                        ${buttonVote}
                        `;
        document.querySelector('#tbody').appendChild(tr);
    }
    console.log('planet Inventory: ', planetsInventory);
    let buttonPress = document.getElementsByTagName("BUTTON");
    console.log('buttonPress: ', buttonPress);
    for (let buttonPressed of buttonPress) {
        if (buttonPressed.innerText === 'Vote') {
            buttonPressed.addEventListener('click', handleVoteButtonClick);
        }
        else {
            buttonPressed.addEventListener('click', handleButtonClick);
        }
        }
}


let nextPage = document.getElementById("next");
nextPage.addEventListener("click", handleNext);
let previousPage = document.getElementById("previous");
previousPage.addEventListener("click", handlePrevious);
let votesStats = document.getElementById("votes_stats");
votesStats.addEventListener('click', handleVotesStatsClick);

function handleNext() {
    console.log('entered handleNext');
    let page = nextP; //localStorage.getItem('next');
    reWriteTable(page);
}

function handlePrevious() {
    console.log('entered handlePrevious');
    let page = previousP;  //localStorage.getItem('previous');
    if (page != null) {
        reWriteTable(page);
    }
}

function handleButtonClick(event) {
    console.log('modal open');
    console.log(this.id);
    let modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
        <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${this.id} residents</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Height</th>
                      <th>Weight(mass)</th>
                      <th>Skin Color</th>
                      <th>Hair Color</th>
                      <th>Eye Color</th>
                      <th>Birth Year</th>
                      <th>Gender</th>
                    </tr>
                  </thead>
                  <tbody id="tableResidentsBody">
                    
                  </tbody>
                </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

    `;
    document.body.appendChild(modalContainer);
    document.getElementById('tableResidentsBody').innerHTML = '';
    document.getElementById('exampleModalLabel').innerText = `${this.id} residents`;
    for (let i=0; i < planetsInventory[this.name].length; i++) {
        console.log(planetsInventory[this.name][i]);
        fetch(planetsInventory[this.name][i])
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                console.log('resident', myJson);
                addResidentsRow(myJson);
            });
    }
}

function handleVoteButtonClick() {
    let votePlanetName = this.id.slice(5);
    console.log(votePlanetName);
    let voteLoginStatus = document.getElementById("login_status");
    let voteUsername = voteLoginStatus.innerText.slice(13);
    console.log(voteUsername);
    let data = { voteUsername, votePlanetName};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:5000/api/vote', options);
    let voteNotification = document.createElement('div')
    voteNotification.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Vote registered.</strong> Thank you for participating.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    `;
    document.getElementById("notification_container").appendChild(voteNotification);
}

function addResidentsRow(myJson) {
    let residentsTr = document.createElement("tr");
        residentsTr.innerHTML = `
              <td>${myJson.name}</td>
              <td>${myJson.height}</td>
              <td>${myJson.mass}</td>
              <td>${myJson.skin_color}</td>
              <td>${myJson.hair_color}</td>
              <td>${myJson.eye_color}</td>
              <td>${myJson.birth_year}</td>
              <td>${myJson.gender}</td>
        `;
    document.getElementById('tableResidentsBody').appendChild(residentsTr);
}

function reWriteTable(page) {
    fetch(page)
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        console.log(myJson);
        console.log(myJson.next);
        console.log(myJson.previous);
        nextP = myJson.next;
        previousP = myJson.previous;
        document.querySelector('#tbody').innerHTML = '';
        makeTable(myJson);
    });
}


function handleVotesStatsClick(event) {
    console.log('votes stats modal open');
    console.log(this.id);
    let modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
        <div class="modal" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Planet Votes</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Planet</th>
                      <th>Votes</th>
                    </tr>
                  </thead>
                  <tbody id="tbody_votes_stats">
                    
                  </tbody>
                </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

    `;
    document.body.appendChild(modalContainer);
    document.getElementById('tbody_votes_stats').innerHTML = '';
    fetch('http://localhost:5000/votes')
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log('planet votes ', myJson);
            for (let i=0; i < myJson.length; i++) {
                console.log(myJson[i]);
                addVotesRow(myJson[i]);
            }
        });

}

function addVotesRow(planet) {
    let planetTr = document.createElement("tr");
        planetTr.innerHTML = `
              <td>${planet.planet_name}</td>
              <td>${planet.count}</td>
        `;
    document.getElementById('tbody_votes_stats').appendChild(planetTr);
}





