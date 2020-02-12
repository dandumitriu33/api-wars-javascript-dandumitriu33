
fetch('https://swapi.co/api/planets/?page=1')
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        console.log(myJson);
        console.log(myJson.next);
        console.log(myJson.previous);
        localStorage.setItem('next', myJson.next);
        localStorage.setItem('previous', myJson.previous);
        makeTable(myJson);
    });

function makeTable(obj) {
    for (let planet of obj.results) {
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
}


let nextPage = document.getElementById("next")
nextPage.addEventListener("click", handleNext);
let previousPage = document.getElementById("previous")
previousPage.addEventListener("click", handlePrevious);


function handleNext() {
    console.log('entered handleNext');
    let page = localStorage.getItem('next');
    reWriteTable(page);
}

function handlePrevious() {
    console.log('entered handlePrevious');
    let page = localStorage.getItem('previous');
    if (page != null) {
        reWriteTable(page);
    }
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
        localStorage.setItem('next', myJson.next);
        localStorage.setItem('previous', myJson.previous);
        document.querySelector('#tbody').innerHTML = '';
        makeTable(myJson);
    });
}