// export const readSWAPI = async () => {
//     const response = await fetch('https://swapi.co/api/planets/1/');
//     const myJson = await response.json();
//     console.log(myJson);
//     console.log(myJson.name);
//     return myJson;
// };


// export const readSWAPI = function(){
//     let planetList = [];
//     fetch('https://swapi.co/api/planets/')
//         .then((response) => response.json())
//         .then((data) => {
//             // console.log(data);
//             for (let item of data.results) {
//                 // console.log(item.name);
//                 planetList.push(item);
//             }
//             // console.log(typeof planetList);
//             return planetList;
//         });
// };
