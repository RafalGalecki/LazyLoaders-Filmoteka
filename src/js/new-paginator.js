// 'use strict';
// const paginationContainer = document.getElementById('pagination-numbers');

// export function displayPagination(selectedPage, totalPages) {
//   const total = 20;
//   const pageNumbersArr = [];

//   for (let i = 1; i <= totalPages; i++) {
//     const pageNumber = `<button value="${i}" id="page${i}" class="page-number ${
//       i === selectedPage ? 'activebtn' : ''
//     }">${i}</button>`;
//     if (
//       i === 1 ||
//       i === totalPages ||
//       (i >= selectedPage - 2 && i <= selectedPage + 2)
//     ) {
//       pageNumbersArr.push(pageNumber);
//     } else if (i === selectedPage - 3 || i === selectedPage + 3) {
//       pageNumbersArr.push('<button>...</button>');
//     }
//   }

//   paginationContainer.innerHTML = pageNumbersArr.join('');
// }

// ///
// function renderPagins(selectedPage, totalPages) {
//   if (selectedPage === 1) {
//     for (let i = 5; i < totalPages; i++) {
//       const pageButton = document.getElementById(`page${i}`);
//       pageButton.classList.add('hidden');
//     }
//     for (let i = 1; i <= 5; i++) {
//       const pageButton = document.getElementById(`page${i}`);
//       pageButton.classList.remove('hidden');
//     }
//   }
//   if (selectedPage === totalPages) {
//     for (let i = 2; i < totalPages - 5; i++) {
//       const pageButton = document.getElementById(`page${i}`);
//       pageButton.classList.add('hidden');
//     }
//     for (let i = totalPages - 5; i <= totalPages; i++) {
//       const pageButton = document.getElementById(`page${i}`);
//       pageButton.classList.remove('hidden');
//     }
//   }

//   if (selectedPage > 2 && selectedPage < totalPages - 2) {
//     for (let i = 2; i < totalPages; i++) {
//       const pageButton = document.getElementById(`page${i}`);
//       pageButton.classList.add('hidden');
//     }
//     for (let i = selectedPage - 2; i <= selectedPage + 2; i++) {
//       const pageButton = document.getElementById(`page${i}`);
//       pageButton.classList.remove('hidden');
//     }
//   }
// }
