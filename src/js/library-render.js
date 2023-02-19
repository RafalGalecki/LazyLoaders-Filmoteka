import Notiflix from 'notiflix';
import {
  getWatchedMovies,
  getQueueMovies,
  renderStorageMovies,
} from './library';
import { headerLibrary } from './library';
const libBtnWatched = document.querySelector('.js-btn-watched');
const libBtnQueue = document.querySelector('.js-btn-queue');

headerLibrary.addEventListener('click', libraryEvents);

function libraryEvents(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  if (event.target.classList.contains('js-btn-watched')) {
    libBtnWatched.classList.add('btn-lib-js-active');
    libBtnQueue.classList.remove('btn-lib-js-active');

    renderStorageMovies(getWatchedMovies[0]);
  }

  if (event.target.classList.contains('js-btn-queue')) {
    libBtnQueue.classList.add('btn-lib-js-active');
    libBtnWatched.classList.remove('btn-lib-js-active');

    renderStorageMovies(getQueueMovies[0]);
  }
}
