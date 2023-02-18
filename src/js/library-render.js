import Notiflix from 'notiflix';
import {
  getWatchedMovies,
  getQueueMovies,
  renderWatchedMovies,
} from './library';
import { headerLibrary } from './library';

headerLibrary.addEventListener('click', libraryEvents);

function libraryEvents(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  if (event.target.classList.contains('js-btn-watched')) {
    // if (getWatchedMovies = []) {
    //  // Notiflix.Report.info("Oops!", "It's empty in here. Go back and add your favorite movies.", "Ok");
    // }
    renderWatchedMovies(getWatchedMovies[0]);
  }

  if (event.target.classList.contains('js-btn-queue')) {
    // if (getQueueMovies = []) {
    //   Notiflix.Report.info("Oops!", "It's empty in here. Go back and add your favorite movies.", "Ok");
    // }
    renderWatchedMovies(getQueueMovies[0]);
  }
}
