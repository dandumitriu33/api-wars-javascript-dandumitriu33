

async function fetchData(page=`https://swapi.dev/api/planets/?page=1`) {
    const result = await fetch(page);
    const data = await result.json();
    console.log(data);
    // console.log(data.results);
    // console.log(data.results[0]);
    // console.log(data.results[0].name);
    for (let planet of data.results) {
        let residentsList;
        residentsList = planet.residents;
        console.log('planet residents', planet.residents);
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${planet.name}</td>
                        <td>${planet.diameter}</td>
                        <td>${planet.climate}</td>
                        <td>${planet.terrain}</td>
                        <td>${planet.surface_water}</td>
                        <td>${planet.population}</td>
                        <td><button 
                                type="button" 
                                class="btn btn-outline-dark" 
                                id="${planet.name}_residents"
                                data-toggle="modal" 
                                data-target="#exampleModal">${planet.residents.length} resident(s)</button></td>
                        <td><button type="button" class="btn btn-outline-dark" id="${planet.name}_vote">Vote</button></td>`;
        document.querySelector('#tbody').appendChild(tr);
    }
    let nextPage = data.next;
    console.log(nextPage);
    document.getElementById("next").addEventListener("click", function() {
        document.querySelector('#tbody').innerHTML = '';
        fetchData(nextPage);
        nextPage = {};

    });
    let previousPage = data.previous;
    console.log(previousPage);
    document.getElementById("previous").addEventListener("click", function() {
        document.querySelector('#tbody').innerHTML = '';
        fetchData(previousPage);
        previousPage = {};
    });

    let elements = document.querySelectorAll('.btn');
    for (let element of elements) {
        element.addEventListener('click', clickHandler);
    }
    function clickHandler(event) {
        console.log(event);
        console.log(this['id']);
        if (this['id'].slice(-1) === 'e') {
            console.log('e');
        }
        else {
            console.log(this['id'].slice(-1));
            for (let resident of residentsList) {
                let residentsModal = document.createElement("div");
                residentsModal.innerHTML = `
                    <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            ...
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div>
                `;
            }

        }
    }
}


fetchData();


const mainData = fetch(`https://swapi.dev/api/planets/?page=1`)

