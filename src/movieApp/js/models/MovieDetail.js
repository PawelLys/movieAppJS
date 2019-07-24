export default class MovieDetail {
    constructor(id, plot) {
        this.id = id;
        this.plot = plot;
        this.item = {};
    }

    async getDetail() {
        let fetchString = '';
        if(this.plot === 'full') fetchString = '&plot=full';
        this.item = await (await fetch(`http://www.omdbapi.com/?apikey=1ea6d4f9&&i=${this.id}${fetchString}`)
            .then(resolve => {
                return resolve.json();
            })
            .catch(err => {
                return err;
            })
        )
    }

}