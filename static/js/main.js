// import {readSWAPI} from './connection.js'

async function fetchData() {
    const result = await fetch('https://swapi.co/api/planets/');
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
                        <td><button>${planet.terrain.length} resident(s)</button></td>`;
        document.querySelector('#tbody').appendChild(tr);
    }
}

fetchData();




// let testPromise = new Promise(function(resolve, reject){
//     let info = readSWAPI();
//     if (info) {
//         resolve(console.log(info.name));
//     }
//     else {
//         reject(console.log('oof'));
//     }
// });
//
// testPromise.then(function(value) {
//     console.log('worked', value);
// });
// {
//     console.log('ok 2');
//     for (let elem of value) {
//         console.log('entered for');
//         let tr = document.createElement("tr");
//         tr.textContent = 'item';
//         document.querySelector('#tbody').appendChild(tr);
//     }
// });
// testPromise.catch(function(reason) {
//     console.log('nope 2');
// });
// testPromise.finally(function() {
//     console.log('final dot');
// });
//
// function printSomething(str) {
//     console.log(JSON.stringify(str));
//     let tr = document.createElement("tr");
//     tr.textContent = str.length;
//     document.querySelector('#tbody').appendChild(tr);
// }


//
// function buttonPressed(obj, populateFunction) {
//     for (let i=0; i<10; i++) {
//         populateFunction(obj);
//     }
// }
//
//
// function populateTable(item) {
//     // let info;
//     // info = readSWAPI();
//     // console.log('blip ',info);
//     let tr = document.createElement("tr");
//     tr.textContent = item;
//     document.querySelector('#tbody').appendChild(tr);
// }
//
// buttonPressed(info[0], populateTable);
