export default class Movie {
    constructor() {
        this.item = {};
    }

    async getData(title, year, plot) {
        const api = `http://www.omdbapi.com/?apikey=1ea6d4f9&&t=${title}`
        let stringFetch;
        if(year.length === 0 && plot === 'short') stringFetch = api;
        else if(year.length !== 0 && plot === 'short') stringFetch = `${api}&y=${year}`;
        else if(year.length === 0 && plot === 'full') stringFetch = `${api}&plot=full`;
        else stringFetch = `${api}&y=${year}&plot=full`;

        this.item = await (await fetch(stringFetch)
            .then(resolve => {
                return resolve.json();
            })
            .catch(err => {
                return err;
            })
        )
        this.plot = plot;    
    }

    getMovieFromFav(id, favArr) {
        const index = favArr.findIndex(cur => cur.imdbID === id);
        if(index < 0) this.item.Response = 'False';
        else this.item = favArr[index];
    }

}