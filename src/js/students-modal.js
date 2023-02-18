const modalLink = document.querySelector('.footer__link');
const modalWindow = document.querySelector('.modal');
let slides = document.getElementsByClassName('modal__slide');
let navlinks = document.getElementsByClassName('modal__navlink');
let currentSlide = 0;

const removingClass = () => {
  modalWindow.classList.add('is-hidden');
};

function changeSlide(n) {
  if (n >= slides.length) {
    n = 0;
  }
  if (n < 0) {
    n = slides.length - 1;
  }

  slides[currentSlide].classList.toggle('active');
  navlinks[currentSlide].classList.toggle('active');
  slides[n].classList.toggle('active');
  navlinks[n].classList.toggle('active');

  currentSlide = n;
}

document.querySelectorAll('.modal__navlink').forEach((bullet, bulletIndex) => {
  bullet.addEventListener('click', () => {
    if (currentSlide !== bulletIndex) {
      changeSlide(bulletIndex);
    }
  });
});

modalLink.addEventListener('click', () => {
  modalWindow.classList.remove('is-hidden');
});

window.addEventListener('click', event => {
  if (event.target.classList.contains('modal')) {
    removingClass();
  }
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    removingClass();
  }
});



