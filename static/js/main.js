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
        let butttonResidents= '';
        planetsInventory[planet.name] = planet.residents;
        if (planet.residents.length > 0) {
            buttonResidents = `<td><button
                                type="button"
                                class="btn btn-outline-dark"
                                id="${planet.name}_residents"
                                name="${planet.name}"
                                data-toggle="modal"
                                data-target="#exampleModal">${planet.residents.length} resident(s)</button></td>`
        }
        else {
            buttonResidents = '<td>No known residents</td>'
        }
        tr.innerHTML = `<td>${planet.name}</td>
                        <td>${planet.diameter}</td>
                        <td>${planet.climate}</td>
                        <td>${planet.terrain}</td>
                        <td>${planet.surface_water}</td>
                        <td>${planet.population}</td>
                        ${buttonResidents}
                        <td><button type="button" class="btn btn-outline-dark" id="${planet.name}_vote">Vote</button></td>`;
        document.querySelector('#tbody').appendChild(tr);
    }
    console.log('planet Inventory: ', planetsInventory);
    let buttonPress = document.getElementsByTagName("BUTTON");
    console.log('buttonPress: ', buttonPress);
    for (let buttonPressed of buttonPress) {
        buttonPressed.addEventListener('click', handleButtonClick);
        };
}


let nextPage = document.getElementById("next");
nextPage.addEventListener("click", handleNext);
let previousPage = document.getElementById("previous");
previousPage.addEventListener("click", handlePrevious);

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
        // localStorage.setItem('next', myJson.next);
        // localStorage.setItem('previous', myJson.previous);
        nextP = myJson.next;
        previousP = myJson.previous;
        document.querySelector('#tbody').innerHTML = '';
        makeTable(myJson);
    });
}



