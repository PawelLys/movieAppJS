import { DOMstring } from './DOMstrings';
import { removeLoader } from './displayUIMovie';

export const displayMovieDetail = (object) => {
    let markUp;
    if(object.Response === "False" ) {
        markUp = `
        <div class="movie-box movie-result">
            <div class="movie__title" style="color:#fff; width: 71vw;">
            Sorry, we can\'t find that movie, or there is a problem with server ;(</div>
        </div>
        `;
    } else {
        markUp = `
        <div class="movie-box movie-detail">
                <div class="movie-detail-container">
                    <div class="movie-detail__intro">Więcej informacji o wybranym filmie</div>
                    <div class="movie-detail__date">
                        <div class="movie-detail__calendar">
                            <ion-icon name="calendar"></ion-icon>
                            <div>
                                <p>DATA PREMIERY:</p>
                                <p>${object.Released}</p>
                            </div>
                        </div>
                        <div class="movie-detail__time">
                            <ion-icon name="time"></ion-icon>
                            <div>
                                <p>CZAS TRWANIA:</p>
                                <p>${object.Runtime}</p>
                            </div>
                        </div>
                    </div>    
                    <div class="movie-detail__descr">
                        <p>${object.Plot}</p>
                    </div>
                    <div class="movie-detail__title">
                        <p>TYTUŁ:</p><p>${object.Title}</p>
                    </div>
                    <div class="movie-detail__genre">
                        <p>GATUNEK FILMU:</p><p>${object.Genre}</p>
                    </div>
                    <div class="movie-detail__actors">
                        <p>OBSADA:</p><p>${object.Actors}</p>
                    </div>
                    <div class="movie-detail__director">
                        <p>REŻYSER:</p><p>${object.Director}</p>
                    </div>
                    <div class="movie-detail__awards">
                        <p>Nagrody:</p><p>${object.Awards}</p>
                    </div>
                    <div class="movie-detail__age">
                        <p>OGRANICZENIA WIEKOWE:</p><p>${object.Rated}</p>
                    </div>
                </div>
                <div class="movie-detail-rigth">
                    <div class="movie-detail__like"><ion-icon name="heart" class="movie__fav yellow-movieBtn"></ion-icon></div>
                    <img class="movie__photo" src="${object.Poster}" alt="Movie photo">
                    <div class="movie-detail__return"><a href="#"><ion-icon name="arrow-round-back"></ion-icon>Return</a><div>
                </div>
            </div>
        `;
    }
    
    removeLoader();
    DOMstring.movieDisplay.insertAdjacentHTML('afterbegin', markUp);
}