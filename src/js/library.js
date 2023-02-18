// import '../sass/components/_header-library.scss';
// import '../sass/components/_header-home.scss';

// import { getGenres, getMovieDetails } from './fetch';
// import { loadMovies } from './cards-home';
// import { refreshRendering } from './refreshrendering';
// import { moviesContainer } from './cards-home';
// import Notiflix from 'notiflix';

// const watchedMoviesContainer = document.querySelector(
//   '.cards-watched-container'
// );

// const LOCALSTORAGE_WATCHED = 'watched';
// const LOCALSTORAGE_QUE = 'que';

// const watched = localStorage.getItem(LOCALSTORAGE_WATCHED) || '';
// const queue = localStorage.getItem(LOCALSTORAGE_QUE) || '';

// //const watchedParsed = JSON.parse(watched);
// //const queueParsed = JSON.parse(queue);
// // TEST - poprawka Michala
// let watchedParsed = [];
// if (watched) {
//   watchedParsed = JSON.parse(watched);
// }
// let queueParsed = [];
// if (queue) {
//   queueParsed = JSON.parse(queue);
// };
// // koniec poprawki

// const headerHome = document.querySelector('.header-home');
// const headerLibrary = document.querySelector('.header-library');
// const cardsLibraryWatched = document.querySelector('.cards-watched-container');

// export { watchedParsed, queueParsed, watchedMoviesContainer, headerLibrary };

// headerLibrary.addEventListener('click', libraryHidden);
// headerHome.addEventListener('click', homeHidden);

// function homeHidden(event) {
//   if (event.target.nodeName !== 'A') {
//     return;
//   }

//   if (event.target.classList.contains('js-library')) {
//     renderWatchedMovies(getWatchedMovies[0]);
//     //refreshRendering();
//     headerHome.classList.add('visually-hidden');
//     moviesContainer.classList.add('visually-hidden');
//     headerLibrary.classList.remove('visually-hidden');
//     cardsLibraryWatched.classList.remove('visually-hidden');
//   }
// }

// function libraryHidden(event) {
//   if (event.target.nodeName !== 'A') {
//     return;
//   }

//   if (event.target.classList.contains('js-home-page')) {
//     loadMovies();
//     headerHome.classList.remove('visually-hidden');
//     moviesContainer.classList.remove('visually-hidden');
//     headerLibrary.classList.add('visually-hidden');
//     cardsLibraryWatched.classList.add('visually-hidden');
//   }
// }

// let watchedMovies = [];

// export const getWatchedMovies = watchedParsed.map(el => {
//   getMovieDetails(el)
//     .then(result => {
//       const storageMovies = result;
//       watchedMovies.push(storageMovies);
//     })
//     .catch(error => console.log(error));

//   return watchedMovies;
// });

// let queueMovies = [];

// export const getQueueMovies = queueParsed.map(el => {
//   getMovieDetails(el)
//     .then(result => {
//       const storageMovies = result;
//       queueMovies.push(storageMovies);
//     })
//     .catch(error => console.log(error));
//   return queueMovies;
// });

// export function renderWatchedMovies(response) {
//   refreshRendering();
//   //get genres for movies
//   getGenres().then(el => {
//     const genres = el;

//     generateCards(response);
//     //get movies with genres description
//     // getInitialMovies().then(res => {
//     //   const initialMovies = moviesData;

//     //   console.log(res.data);

//     //   generateCards(res.data.results);
//     // });
//   });

//   //create set of movie cards
//   function generateCards(data) {
//     data.map(el => {
//       createMovieCard(el);
//     });
//   }
//   //create single movie card element
//   function createMovieCard(singleMovie) {
//     let movieWrapper = document.createElement('div');
//     movieWrapper.classList.add('movie-card');
//     movieWrapper.setAttribute('id', singleMovie.id);

//     //create full url for images
//     let urlImg = `https://image.tmdb.org/t/p/w300${singleMovie.poster_path}`;

//     let moviePicture = document.createElement('img');
//     moviePicture.classList.add('movie-card__img');
//     moviePicture.setAttribute('src', urlImg);
//     moviePicture.setAttribute('alt', singleMovie.title);
//     moviePicture.setAttribute(
//       'onerror',
//       "this.src = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'"
//     );
//     moviePicture.setAttribute('loading', 'lazy');

//     let movieTitle = document.createElement('h2');
//     movieTitle.classList.add('movie-card__title');
//     movieTitle.textContent = singleMovie.title;

//     let movieInfo = document.createElement('p');
//     movieInfo.classList.add('movie-card__info');
//     movieInfo.textContent = `${singleMovie.release_date.slice(0, 4)}`;

//     watchedMoviesContainer.appendChild(movieWrapper);
//     movieWrapper.append(moviePicture, movieTitle, movieInfo);
//   }
// }
