import Movie from './models/Movie';
import MovieDetail from './models/MovieDetail';
import Favourite from './models/Favourite';
import { DOMstring } from './UIview/DOMstrings';
import { displayMovie, addLoader, removeMovieUI, clearInput } from './UIview/displayUIMovie';
import { displayMovieDetail } from './UIview/displayUIMovieDetail';
import { displayFavList, clearFavList, removeFromFavList, toggleHeartIcon, toggleColors } from './UIview/displayUIFavourite';

const data = {};

// 0. Event on click Btn Search
DOMstring.movieBtnSearch.addEventListener('click', async () => {
    
    if(DOMstring.movieTitle.value !== '') {
        // 1. Check if ealier there wasn't already add any content and if there was then delete it
        if(data.movie || data.detail) removeMovieUI();
        // 2. Add loader on the page
        addLoader();
        // 3. Create new Movie
        data.movie = new Movie;
        // 4. Get data from the server
        await data.movie.getData(DOMstring.movieTitle.value, DOMstring.movieYear.value, DOMstring.moviePlot.value);
        // 5. Display movie on website
        displayMovie(data.movie.item);
        // If movie is in favourite (if is checkFav return false) then change color of Fav Icon to red
        if(!data.favourite.checkFav(data.movie.item.imdbID)) toggleColors();
        // 6. Clearing inputs
        clearInput();
    }
})

// 7. Even on click Btn Reset
DOMstring.movieBtnReset.addEventListener('click', async () => {
    // Delete all existing objects in data, clear inputs and localStore
    if(data.movie || data.detail) removeMovieUI();
    clearInput();
    clearFavList();
    if(data.movie) delete data.movie;
    if(data.detail) delete data.detail;
    delete data.favourite;
    localStorage.clear();
    DOMstring.favHeartIcon.style.visibility = 'hidden';
})

// 8. Even on click a movie title
DOMstring.movieDisplay.addEventListener('click', async event => {
    event.preventDefault();
    // 9. When we click title, we load more details about film
    if(event.target.matches('.movie__title, .movie__title *')) {
        // 10. Clear previous display and add loader
        removeMovieUI();
        addLoader();
        // 11. Check if earlier there wasn't already the same movie movie
        let chechMovie = true;
        if(data.detail) {
            chechMovie = false;
            if(data.detail.item.imdbID !== data.movie.item.imdbID || data.movie.plot !== data.detail.plot) {
                delete data.detail;
                chechMovie = true;
            }
        } 
        if(chechMovie) {
            // 12. Create new MovieDetail and get data from server
            data.detail = new MovieDetail(data.movie.item.imdbID, data.movie.plot);
            await data.detail.getDetail();
        } 
        // 13. Display movie detail on website
        displayMovieDetail(data.detail.item);
        if(!data.favourite.checkFav(data.detail.item.imdbID)) toggleColors();
    }
    // 14. If we click return then delete details on movie and load old info
    else if(event.target.matches('.movie-detail__return *')) {
        removeMovieUI();
        displayMovie(data.movie.item);
        if(!data.favourite.checkFav(data.movie.item.imdbID)) toggleColors();
    }
    // 15. If we click heart then add that movie to favourite
    else if(event.target.matches('.movie__fav-icon, .movie__fav-icon *, .movie-detail__like, .movie-detail__like *')) {
        // 16. If there isn't already created earlier data.favourite then create new class Favourite
        if(!data.favourite) data.favourite = new Favourite();
        // 17. Check if this movie isn't already added to the Favourite, if is then remove it
        if(data.favourite.checkFav(data.movie.item.imdbID)) {
            // 18. Send object from movie to favourite and store it in local
            data.favourite.createFav(data.movie.item);
            // 19. Display element on page
            clearFavList();
            displayFavList(data.favourite.arr);
        } else {
            // 20. Remove object in favourite and localStore
            data.favourite.deleteFav(data.movie.item.imdbID);
            // 21. Remove element on page
            removeFromFavList(data.movie.item.imdbID);
        }
        // 22. Change colors of Like button and vibility of Heart icon
        toggleColors();
        toggleHeartIcon(data.favourite.lengthFav());
    }
})

// 23. Event when we click element from Favourite List
DOMstring.favDisplayParent.addEventListener('click', event => {
    event.preventDefault();
    clearInput();
    // 24. Get id from element that was clicked
    let elementID = event.target.id;
    if(!elementID) elementID = event.target.parentNode.id;
    if(elementID){
        // 25. If it's different movie then display that movie on page
        removeMovieUI();
        data.movie = new Movie;
        // We need to get info about movie from localStorage
        data.movie.getMovieFromFav(elementID, data.favourite.arr);
        // and display it
        displayMovie(data.movie.item);
        if(!data.favourite.checkFav(data.movie.item.imdbID)) toggleColors();
    }
})

window.addEventListener('load', () => {
    data.favourite = new Favourite();

    data.favourite.startFav();

    toggleHeartIcon(data.favourite.lengthFav());

    displayFavList(data.favourite.arr);
})
