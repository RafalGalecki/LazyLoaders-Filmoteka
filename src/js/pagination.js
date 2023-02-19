'use strict';
'id';
import axios from 'axios';
import { API_KEY, BASE_URL } from './fetch';
import { searchInput } from './search-form';
import { renderMovies } from './search-form';
import { preloader } from './spinner';
import { refreshRendering, refreshRenderingPagination } from './refreshrendering';

const paginationNumbers = document.getElementById('pagination-numbers')

export function renderCardPaginator(totalPages, selectedPage = 1) {
  const paginationContainer = document.getElementById('pagination-numbers');
  paginationContainer.innerHTML = '';

  // generate buttons according to a totalPages variable

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.setAttribute('type', 'button');
    pageBtn.setAttribute('value', `${i}`);
    pageBtn.setAttribute('id', `page${i}`);
    pageBtn.classList.add('pagination-button');
    pageBtn.innerText = i;

    paginationContainer.append(pageBtn);
  }
  // handle how many buttons to show on start --------------
  limitDisplayedButtons(totalPages);

  // first button
  // on first search (page 1) it makes page button 1 active
  const firstBtn = document.getElementById('page1');
  //firstBtn.classList.remove('visible');
  if (firstBtn) {
    firstBtn.classList.add('activebtn');
  }
  // last button
  const lastBtn = document.getElementById(`page${totalPages}`);

  // generate Arrow Prev & Next buttons ------------------------

  const prevBtn = document.createElement('button');
  prevBtn.setAttribute('type', 'button');
  prevBtn.setAttribute('value', '');
  prevBtn.setAttribute('id', 'prevButton');
  prevBtn.classList.add('pagination-button');
  prevBtn.classList.add('pagination-arrow-btn');
  prevBtn.innerHTML = '&lt;-';
  paginationContainer.prepend(prevBtn);

  const nextBtn = document.createElement('button');
  nextBtn.setAttribute('type', 'button');
  nextBtn.setAttribute('value', '');
  nextBtn.setAttribute('id', 'nextButton');
  nextBtn.classList.add('pagination-button');
  nextBtn.classList.add('pagination-arrow-btn');
  nextBtn.innerHTML = '-&gt;';
  paginationContainer.append(nextBtn);

  // generate ellipsis (...) buttons --------------------

  const backwardEllipsisBtn = document.createElement('button');
  backwardEllipsisBtn.setAttribute('type', 'button');
  backwardEllipsisBtn.setAttribute('value', '');
  backwardEllipsisBtn.setAttribute('id', 'prevStepButton');
  backwardEllipsisBtn.classList.add('pagination-button');
  backwardEllipsisBtn.classList.add('pagination-ellipsis');
  backwardEllipsisBtn.classList.add('hidden');
  backwardEllipsisBtn.innerHTML = '...';

  firstBtn.after(backwardEllipsisBtn);

  const forwardEllipsisBtn = document.createElement('button');
  forwardEllipsisBtn.setAttribute('type', 'button');
  forwardEllipsisBtn.setAttribute('value', '');
  forwardEllipsisBtn.setAttribute('id', 'nextStepButton');
  forwardEllipsisBtn.classList.add('pagination-button');
  forwardEllipsisBtn.classList.add('pagination-ellipsis');
  forwardEllipsisBtn.innerHTML = '...';

  lastBtn.before(forwardEllipsisBtn);

  // LISTENER to page buttons-----------------------------

  paginationContainer.addEventListener('click', event => {
    event.preventDefault();

    // Prev and Next buttons logic --------------------------

    // const prevBtn = document.getElementById('prevButton');
    // const nextBtn = document.getElementById('nextButton');

    // handle 'previous' button, one click = one page backward
    if (event.target.id === 'prevButton') {
      if (selectedPage === 1) {
        return;
      } else {
        selectedPage -= 1;

        prevBtn.setAttribute('value', `${selectedPage}`);
      }
    }
    //handle 'next' button, one click = one page forward
    if (event.target.id == 'nextButton') {
      if (selectedPage === totalPages) {
        return;
      } else {
        selectedPage += 1;

        nextBtn.setAttribute('value', `${selectedPage}`);
      }
    }

    // Ellipsis 10-page step logic
    // Step back
    if (event.target.id === 'prevStepButton') {
      if (selectedPage <= 10) {
        return;
      } else {
        selectedPage -= 10;

        const backwardEllipsisBtn = document.getElementById('prevStepButton');
        backwardEllipsisBtn.setAttribute('value', `${selectedPage}`);
      }
    }
    // Step forward
    if (event.target.id === 'nextStepButton') {
      if (selectedPage > totalPages - 10) {
        return;
      } else {
        selectedPage += 10;

        const forwardEllipsisBtn = document.getElementById('nextStepButton');
        forwardEllipsisBtn.setAttribute('value', `${selectedPage}`);
      }
    }
    // Selected page variable declaration----------------------------
    selectedPage = Number(event.target.value);

    renderPageButtons(selectedPage, totalPages);

    // Ellipsis buttons show/hide logic -------------------------
    const backwardEllipsisBtn = document.getElementById('prevStepButton');
    const forwardEllipsisBtn = document.getElementById('nextStepButton');

    if (Number(event.target.value) <= 4) {
      backwardEllipsisBtn.classList.add('hidden');

      forwardEllipsisBtn.classList.remove('hidden');
    }
    if (
      Number(event.target.value) > 4 &&
      Number(event.target.value) < totalPages - 4
    ) {
      backwardEllipsisBtn.classList.remove('hidden');
      forwardEllipsisBtn.classList.remove('hidden');
    }
    if (Number(event.target.value) >= totalPages - 4) {
      forwardEllipsisBtn.classList.add('hidden');

      backwardEllipsisBtn.classList.remove('hidden');
    }
    // Preloader ------------------------------

    // set active page ---------------------------

    setActivePage(selectedPage);

    // create URL with selected page for searching -------
    const urlForSearching = ''.concat(
      BASE_URL,
      'search/movie?api_key=',
      API_KEY,
      '&query=',
      searchInput,
      `&page=${selectedPage}`
    );

    // axios fetch for searchin movies ----------------

    axios
      .get(urlForSearching)
      .then(function (response) {
        // handle success
        preloader.classList.remove("hidden")
        paginationNumbers.classList.add('hidden')
        refreshRendering();


        setTimeout(() => {
        renderMovies(response);
          preloader.classList.add("hidden")
          paginationNumbers.classList.remove('hidden')
        }, 500)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        Notiflix.Notify.warning(
          'We are sorry, but getting data is impossible in that moment'
        );
      });
  });
}

// Page buttons logic
// Set class activebtn to a selected page for indicating
function setActivePage(currentPage) {
  const elementActive = document.querySelector('.activebtn');
  elementActive.classList.remove('activebtn');

  elementActive.classList.add('visible');
  const activeBtn = document.getElementById(`page${currentPage}`);

  activeBtn.classList.add('activebtn');
}

// Limit page buttons displayed on load ---------------
function limitDisplayedButtons(totalPages) {
  if (totalPages > 4) {
    for (let i = 5; i < totalPages; i++) {
      const hideButton = document.getElementById(`page${i}`);
      hideButton.classList.add('hidden');
    }
  }
}

// Show page buttons around a selected page -------------
function renderPageButtons(selectedPage, totalPages) {
  for (let i = 2; i < totalPages; i++) {
    const hideButton = document.getElementById(`page${i}`);
    hideButton.classList.add('hidden');
  }
  for (let i = selectedPage - 2; i <= selectedPage + 2; i++) {
    const showButton = document.getElementById(`page${i}`);
    if (showButton) {
      showButton.classList.remove('hidden');
    }
  }
}
