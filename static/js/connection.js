export const readSWAPI = function(){
    let planetList = [];
    fetch('https://swapi.co/api/planets/')
        .then((response) => response.json())
        .then((data) => {
            for (let item of data.results) {
                planetList.push(item.name);
            }
        });
    return planetList;
};
