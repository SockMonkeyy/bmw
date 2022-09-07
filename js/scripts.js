/*!
* Start Bootstrap - Grayscale v7.0.5 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

document.addEventListener('DOMContentLoaded', function () {
    var modeSwitch = document.querySelector('.mode-switch');
  
    modeSwitch.addEventListener('click', function () {                     document.documentElement.classList.toggle('dark');
      modeSwitch.classList.toggle('active');
    });
  });

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

const AnimateOnScroll = function ({ offset } = { offset: 10 }) {
    // Define a dobra superior, inferior e laterais da tela
    const windowTop = (offset * window.innerHeight) / 100;
    const windowBottom = window.innerHeight - windowTop;
    const windowLeft = 0;
    const windowRight = window.innerWidth;
  
    this.start = (element) => {
      window.requestAnimationFrame(() => {
        // Seta os atributos customizados
        element.style.animationDelay = element.dataset.animationDelay;
        element.style.animationDuration = element.dataset.animationDuration;
  
        // Inicia a animacao setando a classe para animar
        element.classList.add(element.dataset.animation);
  
        // Seta o elemento como animado
        element.dataset.animated = "true";
      });
    };
  
    this.inViewport = (element) => {
      // Obtem o boundingbox do elemento
      const elementRect = element.getBoundingClientRect();
      const elementTop =
        elementRect.top + parseInt(element.dataset.animationOffset) ||
        elementRect.top;
      const elementBottom =
        elementRect.bottom - parseInt(element.dataset.animationOffset) ||
        elementRect.bottom;
      const elementLeft = elementRect.left;
      const elementRight = elementRect.right;
  
      // Verifica se o elemento esta na tela
      return (
        elementTop <= windowBottom &&
        elementBottom >= windowTop &&
        elementLeft <= windowRight &&
        elementRight >= windowLeft
      );
    };
  
    // Percorre o array de elementos, verifica se o elemento está na tela e inicia animação
    this.verifyElementsInViewport = (els = elements) => {
      for (let i = 0, len = els.length; i < len; i++) {
        // Passa para o proximo laço se o elemento ja estiver animado
        if (els[i].dataset.animated) continue;
  
        this.inViewport(els[i]) && this.start(els[i]);
      }
    };
  
    // Obtem todos os elementos a serem animados
    this.getElements = () =>
      document.querySelectorAll("[data-animation]:not([data-animated])");
  
    // Atualiza a lista de elementos a serem animados
    this.update = () => {
      elements = this.getElements();
      elements && this.verifyElementsInViewport(elements);
    };
  
    // Inicia os eventos
    window.addEventListener("load", this.update, false);
    window.addEventListener(
      "scroll",
      () => this.verifyElementsInViewport(elements),
      { passive: true }
    );
    window.addEventListener(
      "resize",
      () => this.verifyElementsInViewport(elements),
      { passive: true }
    );
  };
  
  // Initialize
  const options = {
    offset: 15 // percentage of the window
  };
  
  const animation = new AnimateOnScroll(options);



  const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "Tom",
    "Williams",
    "BMW",
    "of",
    "Birmingham"
];

const morphTime = 1;
const cooldownTime = 2;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();

