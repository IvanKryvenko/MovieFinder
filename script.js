const serarchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    if (searchText.trim().length === 0) {
        movie.innerHTML = '<h2 class="col-12 text-center text-danger"> Field can"t be empty<h2>';
        return
    }
    const server = `https://api.themoviedb.org/3/search/multi?api_key=932623e910f1364a44381e6adde47cb2&language=ru&query=${searchText}&page=integer&include_adult=Boolean`;
    movie.innerHTML = '<div class="spinner"></div>';
    fetch(server)
        .then(function(value) {
            if (value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then(function(output) {
            let inner = '';
            if (output.results.length === 0) {
                inner = '<h2 class="col-12 text-center text-info">Results not find<h2>'
            }
            output.results.forEach(function(item) {
                let nameItem = item.name || item.title;
                if (item.poster_path == undefined) {
                    inner +=`
                    <div class="col-12 col-md-6 col-xl-3 item">
                        <img src="https://www.film.ru/images/empty/260x400.png" class="imgPoster" alt="${nameItem}">
                        <h5>${nameItem}</h5>
                    </div>
                    `;
                } else {
                    let dataInfo = '';
                    if(item.media_type !== 'person') dataInfo = `data-id="${item.id}"
                    data-type="${item.media_type}"`;
                    inner +=`
                    <div class="col-12 col-md-4 col-xl-3 item">
                        <img src="${urlPoster + item.poster_path}" class="imgPoster" alt="${nameItem}" ${dataInfo}>
                        <h5>${nameItem}</h5>
                    </div>
                    `;
                }
        });
        movie.innerHTML = inner;

        addEventMedia();

    })
    .catch(function(reason) {
        movie.innerHTML = 'Upsss... Something going wrong';
        console.error('error: ' + reason.status);
    });
}

serarchForm.addEventListener('submit', apiSearch);

function addEventMedia() {
    const media = movie.querySelectorAll('img[data-id]');
        media.forEach(function(elem) {
            elem.style.cursor = 'pointer';
            elem.addEventListener('click', showFullInfo);
        });
}

function showFullInfo() {
    console.log(this);
}

document.addEventListener('DOMContentLoaded', function() {
    fetch(server)
        .then(function(value) {
            if (value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then(function(output) {
            let inner = '';
            if (output.results.length === 0) {
                inner = '<h2 class="col-12 text-center text-info">Results not find<h2>'
            }
            output.results.forEach(function(item) {
                let nameItem = item.name || item.title;
                if (item.poster_path == undefined) {
                    inner +=`
                    <div class="col-12 col-md-6 col-xl-3 item">
                        <img src="https://www.film.ru/images/empty/260x400.png" class="imgPoster" alt="${nameItem}">
                        <h5>${nameItem}</h5>
                    </div>
                    `;
                } else {
                    let dataInfo = '';
                    if(item.media_type !== 'person') dataInfo = `data-id="${item.id}"
                    data-type="${item.media_type}"`;
                    inner +=`
                    <div class="col-12 col-md-4 col-xl-3 item">
                        <img src="${urlPoster + item.poster_path}" class="imgPoster" alt="${nameItem}" ${dataInfo}>
                        <h5>${nameItem}</h5>
                    </div>
                    `;
                }
        });
        movie.innerHTML = inner;

        addEventMedia();

    })
    .catch(function(reason) {
        movie.innerHTML = 'Upsss... Something going wrong';
        console.error('error: ' + reason.status);
    });
});