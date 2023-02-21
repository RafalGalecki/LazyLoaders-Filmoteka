import {
  PAGINATION_STATE,
  totalPages,
  selectedPage,
  getInitialMovies,
  getSearchedMovies,
} from './fetch';
import {
  refreshRendering,
  refreshRenderingPagination,
} from './refreshrendering';
import { renderMovies, searchInput } from './search-form';

//export let selectedPage;

export const screenWidth = screen.width;

export function foo(page) {
  console.log('PAGINATION_STATE', PAGINATION_STATE);
  console.log('totalPages', typeof totalPages, totalPages);
  console.log('page', page);
  console.log('searchInput', searchInput);
}

const paginationContainer = document.getElementById('pagination-numbers');
paginationContainer.innerHTML = '';

export function generatePageButtons(totalPages, selectedPage) {
  refreshRenderingPagination();
  //do not render if nothing to render
  if (totalPages === 0) {
    return;
  }

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
  // backwardEllipsisBtn.classList.add('hidden');
  backwardEllipsisBtn.innerHTML = '...';

  const forwardEllipsisBtn = document.createElement('button');
  forwardEllipsisBtn.setAttribute('type', 'button');
  forwardEllipsisBtn.setAttribute('value', '');
  forwardEllipsisBtn.setAttribute('id', 'nextStepButton');
  forwardEllipsisBtn.classList.add('pagination-button');
  forwardEllipsisBtn.classList.add('pagination-ellipsis');
  forwardEllipsisBtn.innerHTML = '...';

  firstBtn.after(backwardEllipsisBtn);
  lastBtn.before(forwardEllipsisBtn);

  // Hide ellipsis for less pages
  if (totalPages < 4) {
    forwardEllipsisBtn.classList.add('hidden');
  }
  if (lastBtn) {
    if (screenWidth < 440) {
      lastBtn.classList.add('hidden');
    } else {
      lastBtn.classList.remove('hidden');
    }
  }
  limitDisplayedButtons(totalPages);
  mobileFit(totalPages);
  renderPageButtons(selectedPage, totalPages);
  setActivePage(selectedPage);
}

// Page buttons logic
// Set class activebtn to a selected page for indicating
export function setActivePage(currentPage) {
  console.log('SET ACTIVE', selectedPage);
  const elementActive = document.querySelector('.activebtn');
  if (elementActive) {
    elementActive.classList.remove('activebtn');

    elementActive.classList.add('visible');
  }
  const activeBtn = document.getElementById(`page${currentPage}`);
  if (activeBtn) {
    activeBtn.classList.add('activebtn');
  }
}

// Limit page buttons displayed on load ---------------
export function limitDisplayedButtons(totalPages) {
  if (totalPages > 4) {
    for (let i = 5; i < totalPages; i++) {
      const hideButton = document.getElementById(`page${i}`);
      hideButton.classList.add('hidden');
    }
  }
}

// Show page buttons around a selected page -------------
export function renderPageButtons(selectedPage, totalPages) {
  for (let i = 2; i < totalPages; i++) {
    const hideButton = document.getElementById(`page${i}`);
    if (hideButton) {
      hideButton.classList.add('hidden');
    }
  }
  for (let i = selectedPage - 2; i <= selectedPage + 2; i++) {
    const showButton = document.getElementById(`page${i}`);
    if (showButton) {
      showButton.classList.remove('hidden');
    }
  }
}

export function mobileFit(pagesAmount) {
  const screenWidth = screen.width;
  if (screenWidth < 440) {
    const hideBackwardEllipsis = document.getElementById('prevStepButton');
    hideBackwardEllipsis.classList.add('hidden');
    const hideForwardEllipsis = document.getElementById('nextStepButton');
    hideForwardEllipsis.classList.add('hidden');

    for (let i = 1; i <= pagesAmount; i++) {
      const hideButton = document.getElementById(`page${i}`);
      if (hideButton) {
        hideButton.classList.add('hidden');
      }
    }
  }
}

//--------------------------------------------------//
paginationContainer.addEventListener('click', event => {
  //if (event.target.tagName === 'BUTTON') {
  let selectedPage = Number(event.target.value);

  //   }

  console.log('selected before arrows', selectedPage);
  const previousBtn = document.getElementById('prevButton');
    previousBtn.setAttribute('value', `${selectedPage}`);
    
  console.log('prevbuttonvalue', previousBtn.value);
  // Prev and Next buttons logic --------------------------
  // handle 'previous' button, one click = one page backward
    if (event.target.id === 'prevButton') {
      
        console.log('prevbutton!!!!!', previousBtn.value);
    selectedPage -= 1;

    //const prevBtn = document.getElementById('prevButton');
    //prevBtn.setAttribute('value', `${selectedPage}`);
  }

  //handle 'next' button, one click = one page forward
  if (event.target.id === 'nextButton') {
    if (selectedPage === totalPages) {
      return;
    } else {
      selectedPage += 1;
      console.log('SELECTED INSIDE NEXT', selectedPageContainer);
      const nextBtn = document.getElementById('nextButton');
      nextBtn.setAttribute('value', `${selectedPage}`);
    }
  }

  // Ellipsis 10-page step logic
  // Step backward
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
  console.log('selected after ellipsis', selectedPage);
  // Selected page variable declaration----------------------------
  //selectedPage = Number(event.target.value);
  // set active page --------------------------
  //setActivePage(selectedPage);
  console.log('selected after binding with value', selectedPage);

  // Ellipsis buttons show/hide logic -------------------------
  const backwardEllipsisBtn = document.getElementById('prevStepButton');
  const forwardEllipsisBtn = document.getElementById('nextStepButton');
  if (screenWidth < 440) {
    backwardEllipsisBtn.classList.add('hidden');
    forwardEllipsisBtn.classList.add('hidden');
  } else {
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
  }

  if (PAGINATION_STATE === 'popular') {
    //showSpinner();
    getInitialMovies(selectedPage).then(data => {
      refreshRendering();
      //renderMovies(data);
      //hideSpinner();
    });
  } else if (PAGINATION_STATE === 'search') {
    //showSpinner();
    getSearchedMovies(searchInput, selectedPage).then(data => {
      refreshRendering();
      //renderMovies(data);
      //hideSpinner();
    });
  }
  return selectedPage;
});

function prev(selectedPage) {
  if (selectedPage === 1) {
    return;
  } else {
    selectedPage -= 1;

    const prevBtn = document.getElementById('prevButton');
    prevBtn.setAttribute('value', `${selectedPage}`);
  }
  return selectedPage;
}
