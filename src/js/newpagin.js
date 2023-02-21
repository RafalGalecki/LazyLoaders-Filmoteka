import {
  PAGINATION_STATE,
  totalPages,
  page,
  getInitialMovies,
  getSearchedMovies,
} from './fetch';
import {
  refreshRendering,
  refreshRenderingPagination,
} from './refreshrendering';
import { renderMovies, searchInput } from './search-form';

export let selectedPage;

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
  backwardEllipsisBtn.classList.add('hidden');
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
}

// Page buttons logic
// Set class activebtn to a selected page for indicating
export function setActivePage(currentPage) {
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
  const screenWidth = screen.width;
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
  //const screenWidth = screen.width;
  if (screenWidth < 440) {
    // const hideBackwardEllipsis = document.getElementById('prevStepButton');
    // hideBackwardEllipsis.classList.add('hidden');
    // const hideForwardEllipsis = document.getElementById('nextStepButton');
    // hideForwardEllipsis.classList.add('hidden');

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
  let selectedPage = page; //Number(event.target.value);

  //   }

  console.log('selected before arrows', selectedPage);

  // Prev and Next buttons logic --------------------------
  // handle 'previous' button, one click = one page backward
  if (event.target.id === 'prevButton') {
    if (selectedPage === 1) {
      return;
    } else {
      selectedPage -= 1;

      const prevBtn = document.getElementById('prevButton');
      prevBtn.setAttribute('value', `${selectedPage}`);
    }
  }
  //handle 'next' button, one click = one page forward
  if (event.target.id == 'nextButton') {
    if (selectedPage === totalPages) {
      return;
    } else {
      selectedPage += 1;

      const nextBtn = document.getElementById('nextButton');
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
  console.log('selected after ellipsis', selectedPage);
  // Selected page variable declaration----------------------------
  selectedPage = Number(event.target.value);
  // set active page --------------------------
  setActivePage(selectedPage);
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
  //   } else if (PAGINATION_STATE === 'watched') {
  //     setPage(pageNumber);
  //     createLibrary(PAGINATION_STATE, pageNumber);
  //   } else if (PAGINATION_STATE === 'queue') {
  //     setPage(pageNumber);
  //     createLibrary(PAGINATION_STATE, pageNumber);
  //   }
});

/////////////////////////////////////////
////////////////////
///////

// import { createGallery } from './create-gallery';
// import { getSearchedMovies, getInitialMovies } from './fetch';
// import {
//   PAGE,
//   TOTAL_PAGES,
//   PAGINATION_STATE,
//   LAST_QUERY,
//   setPage,
// } from './globals';
// import { createLibrary } from './create-library';
// import { hideSpinner, showSpinner } from './spinner';

// const paginationList = document.querySelector('.pagination');
// const galleryBox = document.querySelector('.gallery__box');

// function scrollToTop() {
//   window.scrollTo({
//     top: 230,
//     left: 0,
//     behavior: 'smooth',
//   });
// }

// paginationList.addEventListener('click', event => {
//   if (event.target.tagName === 'BUTTON') {
//     const pageNumber = Number(event.target.dataset.page);
//     if (PAGINATION_STATE === 'trending') {
//       showSpinner();
//       fetchTrending(pageNumber).then(data => {
//         createGallery(data);
//         hideSpinner();
//       });
//     } else if (PAGINATION_STATE === 'search') {
//       showSpinner();
//       fetchQuery(LAST_QUERY, pageNumber).then(data => {
//         createGallery(data);
//         hideSpinner();
//       });
//     } else if (PAGINATION_STATE === 'watched') {
//       setPage(pageNumber);
//       createLibrary(PAGINATION_STATE, pageNumber);
//     } else if (PAGINATION_STATE === 'queue') {
//       setPage(pageNumber);
//       createLibrary(PAGINATION_STATE, pageNumber);
//     }
//     scrollToTop();
//   }
// });

// export function createButtons(TOTAL_PAGES, PAGE) {
//   let liTag = '';
//   let beforePage = PAGE - 1;
//   let afterPage = PAGE + 1;
//   let activeLi;

//   if (PAGE > 1) {
//     liTag += `<button class="pagination__button--arrow-left" data-page="${
//       PAGE - 1
//     }">
//   <i style="pointer-events: none" class="fa-solid fa-arrow-left"></i>
// </button>`;
//   }

//   // if there's more then 6 page
//   if (TOTAL_PAGES > 6) {
//     if (PAGE > 3) {
//       liTag += `<button class="pagination__button" type="button" data-page="1">1</button>`;
//       if (PAGE > 4) {
//         liTag += `<span class="pagination__hidden-results">&middot&middot&middot</span>`;
//       }
//     }

//     if (PAGE === TOTAL_PAGES) {
//       beforePage = beforePage - 1;
//     } else if (PAGE === TOTAL_PAGES - 1) {
//       beforePage = beforePage - 1;
//     }
//     if (PAGE === 1) {
//       afterPage = afterPage + 2;
//     } else if (page => 2 && page <= 4) {
//       afterPage = afterPage + 1;
//       beforePage = beforePage - 1;
//     } else if (PAGE === TOTAL_PAGES + 1) {
//       beforePage = beforePage + 3;
//       afterPage = afterPage + 1;
//     }

//     for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
//       if (pageLength > TOTAL_PAGES) {
//         continue;
//       }
//       if (pageLength < 0) {
//         pageLength = pageLength + 2;
//       }
//       if (pageLength === 0) {
//         pageLength = pageLength + 1;
//       }

//       if (PAGE == pageLength) {
//         activeLi = 'pagination__button--current';
//       } else {
//         activeLi = '';
//       }
//       liTag += `<button class="${activeLi} pagination__button" type="button" data-page="${pageLength}">${pageLength}</button>`;
//     }
//     if (PAGE < TOTAL_PAGES - 2) {
//       if (PAGE < TOTAL_PAGES - 3) {
//         liTag += `<span class="pagination__hidden-results">&middot&middot&middot</span>`;
//       }
//       liTag += `<button class="pagination__button" type="button" data-page="${TOTAL_PAGES}">${TOTAL_PAGES}</button>`;
//     }
//   }
//   // if there's less then 6 page
//   else {
//     for (let pageLength = 1; pageLength <= TOTAL_PAGES; pageLength++) {
//       if (PAGE == pageLength) {
//         activeLi = 'pagination__button--current';
//       } else {
//         activeLi = '';
//       }
//       liTag += `<button class="${activeLi} pagination__button" type="button" data-page="${pageLength}">${pageLength}</button>`;
//     }
//   }

//   if (PAGE < TOTAL_PAGES) {
//     liTag += `<button class="pagination__button--arrow-right" data-page="${
//       PAGE + 1
//     }">
//   <i style="pointer-events: none" class="fa-solid fa-arrow-right"></i>
// </button>`;
//   }

//   paginationList.innerHTML = liTag;
// }
