import {
  getWatchedMovies,
  getQueueMovies,
  renderStorageMovies,
} from './library';
import { refreshRendering } from './refreshrendering';
import { watchedMoviesContainer, templCard } from './library';

const libBtnWatched = document.querySelector('.js-btn-watched');
const libBtnQueue = document.querySelector('.js-btn-queue');

//modalCard.addEventListener('click', libraryUpdate);

export function libraryMovies(event) {
  // event.preventDefault();

  preloader.classList.remove('hidden');
  refreshRendering();
  setTimeout(() => {
// console.log(getWatchedMovies);
// console.log(getQueueMovies);
    if (getWatchedMovies[0]) {
      renderStorageMovies(getWatchedMovies[0]);
    }
    if (getQueueMovies[0]) {
      renderStorageMovies(getQueueMovies[0]);
    }
    preloader.classList.add('hidden');
    libBtnWatched.classList.remove('btn-lib-js-active');
    libBtnQueue.classList.remove('btn-lib-js-active');
  }, 500);
}

export function reviewMovies(event) {
  // event.preventDefault();

  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  if (event.target.classList.contains('js-btn-watched')) {
    libBtnWatched.classList.add('btn-lib-js-active');
    libBtnQueue.classList.remove('btn-lib-js-active');
    preloader.classList.remove('hidden');
    refreshRendering();
    setTimeout(() => {

      

      // console.log(!!getWatchedMovies[0]);
      // console.log(getWatchedMovies[0]);
      if (getWatchedMovies[0]) {
        renderStorageMovies(getWatchedMovies[0]);

      } else {
        watchedMoviesContainer.appendChild(templCard);
      }

      preloader.classList.add('hidden');
    }, 500);
  }

  if (event.target.classList.contains('js-btn-queue')) {
    libBtnQueue.classList.add('btn-lib-js-active');
    libBtnWatched.classList.remove('btn-lib-js-active');
    preloader.classList.remove('hidden');
    refreshRendering();
    setTimeout(() => {

      

      // console.log(getWatchedMovies[0]);
      if (getWatchedMovies[0]) {
        renderStorageMovies(getQueueMovies[0]);
      } else {
        watchedMoviesContainer.appendChild(templCard);
      }

      preloader.classList.add('hidden');
    }, 500);
  }
}

// function libraryEvents(event) {
//   console.log(event.currentTarget);
//   event.preventDefault();
//   if (event.target.nodeName !== 'BUTTON') {
//     return;
//   }

//   if (event.target.classList.contains('js-btn-watched')) {
//     libBtnWatched.classList.add('btn-lib-js-active');
//     libBtnQueue.classList.remove('btn-lib-js-active');
//     preloader.classList.remove('hidden');
//     refreshRendering();
//     setTimeout(() => {
//       console.log(!!getWatchedMovies[0]);
//       console.log(getWatchedMovies[0]);
//       if (getWatchedMovies[0]) {
//         renderStorageMovies(getWatchedMovies[0]);
//         preloader.classList.add('hidden');
//       }
//     }, 500);
//   }

//   if (event.target.classList.contains('js-btn-queue')) {
//     libBtnQueue.classList.add('btn-lib-js-active');
//     libBtnWatched.classList.remove('btn-lib-js-active');
//     preloader.classList.remove('hidden');
//     refreshRendering();
//     setTimeout(() => {
//       console.log(getWatchedMovies[0]);
//       if (getWatchedMovies[0]) {
//         renderStorageMovies(getQueueMovies[0]);
//         preloader.classList.add('hidden');
//       }
//     }, 500);
//   }
// }

function libraryUpdate(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  if (event.target.classList.contains('btn__addToWatched')) {
    renderStorageMovies(getWatchedMovies[0]);
  }

  if (event.target.classList.contains('btn__addToQue')) {
    renderStorageMovies(getQueueMovies[0]);
  }
}
