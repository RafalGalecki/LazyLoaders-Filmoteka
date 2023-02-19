const modalLink = document.querySelector('.footer__link');
const modalWindow = document.querySelector('.modal');
let slides = document.getElementsByClassName('modal__slide');
let navlinks = document.getElementsByClassName('modal__navlink');
let slideIndex = 0;
let timer = null;

const removingClass = () => {
  modalWindow.classList.add('is-hidden');
};

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    for (let j = 0; j < navlinks.length; j++) {
      navlinks[j].className = navlinks[j].className.replace(' active', '');
    }
    slides[slideIndex - 1].style.display = 'flex';
    navlinks[slideIndex - 1].className += ' active';
    timer = setTimeout(showSlides, 2000);
}
  

modalLink.addEventListener('click', () => {
  modalWindow.classList.remove('is-hidden');
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
