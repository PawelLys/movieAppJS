import { DOMstring } from './DOMstrings';

export const displayMovie = object => {
    let markUp;
    if(object.Response === "False") {
        markUp = `
        <div class="movie-box movie-result">
            <div class="movie__title" style="color:#fff; width: 71vw;">
            Sorry, we can\'t find that movie, or there is a problem with server ;(</div>
        </div>
        `;
    } else {
        const title = limitRecipeTitle(object.Title);
        markUp = `
        <div class="movie-box movie-result">
            <img class="movie__photo" src="${object.Poster}" alt="Movie photo">
            <div class="movie__title"><a href="#">${title}</a></div>
            <div class="movie__rating">
                <div class="movie__fav-icon"><ion-icon name="heart" class="movie__fav yellow-movieBtn"></ion-icon></div>
                <ion-icon name="star" class="yellow"></ion-icon>${object.Metascore !== 'N/A' ? `${object.Metascore} / 100` : 'N/A'}
            </div>
            <div class="movie__genre">${object.Genre}</div>
            <div class="movie__ageTime">${object.Rated} | ${object.Runtime}</div>
            <div class="movie__production">${object.Production}</div>
        </div>
        `;
    }
    
    removeLoader();
    DOMstring.movieDisplay.insertAdjacentHTML('afterbegin', markUp);
}

export const limitRecipeTitle = (title, limit = 18) => {
    const newTitle = [];
    let acc = 0;
    if(title.length > limit) {
        [...title.split(' ')].forEach(cur => {
            if(acc + cur.length <= limit) {
                acc += cur.length;
                newTitle.push(cur);
            }
        });
        return `${newTitle.join(' ')} ...`;
    } else return title;
}

export const addLoader = () => DOMstring.movieDisplay.classList.add('loader');
export const removeLoader = () => DOMstring.movieDisplay.classList.remove('loader');

export const removeMovieUI = () => DOMstring.movieDisplay.innerHTML = '';

export const clearInput = () => {
    DOMstring.movieTitle.value = '';
    DOMstring.movieYear.value = '';
    const option = DOMstring.moviePlot.options;
    if(option !== 0) option.selectedIndex = 0;
}
