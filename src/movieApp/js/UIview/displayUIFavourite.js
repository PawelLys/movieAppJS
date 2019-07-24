import { DOMstring } from './DOMstrings';
import { limitRecipeTitle } from './displayUIMovie';

export const displayFavList = object => {
    object.forEach(ob => {
        const title = limitRecipeTitle(ob.Title);

        const markUp = `
            <a href="#" class="fav__link" id="${ob.imdbID}">
                <div class="fav__photo">
                    <img src="${ob.Poster}" alt="Movie img">
                </div>
                <div class="fav__title">${title}</div>
            </a>
            `;
    
        DOMstring.favDisplay.insertAdjacentHTML('beforeend', markUp);
    })  
}

export const clearFavList = () => DOMstring.favDisplay.innerHTML = '';

export const removeFromFavList = id => {
    const x = document.getElementById(id);
    x.parentNode.removeChild(x);
}

export const toggleHeartIcon = (value) => {
    if(value) DOMstring.favHeartIcon.style.visibility = 'visible';
    else DOMstring.favHeartIcon.style.visibility = 'hidden';
}

export const toggleColors = () => {
        document.querySelector('.movie__fav').classList.toggle('yellow-movieBtn');
        document.querySelector('.movie__fav').classList.toggle('red-movieBtn');
    
}
