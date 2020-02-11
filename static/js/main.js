

async function fetchData(page=`https://swapi.co/api/planets/?page=1`) {
    const result = await fetch(page);
    const data = await result.json();
    console.log(data);
    // console.log(data.results);
    // console.log(data.results[0]);
    // console.log(data.results[0].name);
    for (let planet of data.results) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${planet.name}</td>
                        <td>${planet.diameter}</td>
                        <td>${planet.climate}</td>
                        <td>${planet.terrain}</td>
                        <td>${planet.surface_water}</td>
                        <td>${planet.population}</td>
                        <td><button>${planet.terrain.length} resident(s)</button></td>
                        <td><button>Vote</button></td>`;
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
}

fetchData();

