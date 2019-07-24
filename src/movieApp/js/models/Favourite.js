export default class Favourite {
    constructor() {
        this.arr = [];
    }

    createFav(object) {
         this.arr.push(object);
         localStorage.setItem(object.imdbID, JSON.stringify(object));
    }

    deleteFav(id) {
        let searchIndex;
        this.arr.forEach((cur, index) => {
            if(cur.imdbID === id) searchIndex = index;
        })
        
        this.arr.splice(searchIndex, 1);
        localStorage.removeItem(id);
    }

    checkFav(id) {
        return this.arr.findIndex(cur => cur.imdbID === id) === -1;
    }

    lengthFav() {
        return this.arr.length;
    }

    startFav() {
        const keys = Object.keys(localStorage);
        let i = keys.length, n = 0;
        while(i--) {
            if( keys[i] !== 'loglevel:webpack-dev-server')
                this.arr[n++] = JSON.parse(localStorage.getItem(keys[i]));
        }
    }
}

