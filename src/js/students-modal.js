const modalLink = document.querySelector('.footer__link');
const modalWindow = document.querySelector('.modal');
let slides = document.getElementsByClassName('modal__slide');
let navlinks = document.getElementsByClassName('modal__navlink');
let slideIndex = 0;
let timer = null;

const removingClass = () => {
  modalWindow.classList.add('is-hidden');
};

modalLink.addEventListener('click', () => {
  modalWindow.classList.remove('is-hidden');
  function showSlides() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    for (i = 0; i < navlinks.length; i++) {
      navlinks[i].className = navlinks[i].className.replace(' active', '');
    }
    slides[slideIndex - 1].style.display = 'block';
    navlinks[slideIndex - 1].className += ' active';
    timer = setTimeout(showSlides, 1000);
  }
  showSlides();
});

window.addEventListener('click', event => {
  if (event.target.classList.contains('modal')) {
    removingClass();
    clearTimeout(timer);
  }
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    removingClass();
    clearTimeout(timer);
  }
});
