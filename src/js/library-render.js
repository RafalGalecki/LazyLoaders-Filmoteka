import Notiflix from 'notiflix';
import {
  getWatchedMovies,
  getQueueMovies,
  renderStorageMovies
} from './library';
import { headerLibrary } from './library';
import { refreshRendering } from './refreshrendering';
const libBtnWatched = document.querySelector('.js-btn-watched');
const libBtnQueue = document.querySelector('.js-btn-queue');

const modalBtnAddWatch = document.querySelector('.btn__addToWatched');
const modalBtnAddQue = document.querySelector('.btn__addToQue');
const modalCard = document.querySelector('.modal-card');

headerLibrary.addEventListener('click', libraryEvents);
//modalCard.addEventListener('click', libraryUpdate);

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