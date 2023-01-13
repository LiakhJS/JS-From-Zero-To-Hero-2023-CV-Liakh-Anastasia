window.onload = () => {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
};

const animItems = document.querySelectorAll('.anim-item');

if (animItems.length > 0) {
  let offset = (el) => {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.scrollY || document.documentElement.scrollLeft,
      scrollTop = window.scrollY || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  };
  let animOnScroll = () => {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;
      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      if ((window.scrollY > animItemOffset - animItemPoint) && window.scrollY < (animItemOffset + animItemHeight)) {
        animItem.classList.add('active-anim');
      } else {
        animItem.classList.remove('active-anim');
      }
    }
  };

  window.addEventListener('scroll', animOnScroll);

  setTimeout(() => {
    animOnScroll();
  }, 100);
}

let i = 0;
let speed = 70;
let typingMessage = document.getElementById("typing-text");
let txt = typingMessage.dataset.typedItems;

let typeWriter = () => {
  if (i < txt.length) {
    typingMessage.innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
};

let typeWriterWithDelay = () => {
  setTimeout(typeWriter, 500);
};

typeWriterWithDelay();

let mobileNavToogle = document.querySelector(".mobile__nav__toggle");

mobileNavToogle.addEventListener("click", () => {
  let header = document.querySelector("#header");
  header.classList.toggle("display-block");
});

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener('click', (e) => {
    e.preventDefault();
    const link = smoothLink.getAttribute('href');
    document.querySelector(link).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

let backtotop = document.querySelector(".back-to-top");
backtotop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const mediaQuery1024 = window.matchMedia('(max-width: 1024px)');
let header = document.querySelector('#header');

if (backtotop) {
  const toggleBacktotop = () => {
    if (window.scrollY > 100 && !mediaQuery1024.matches) {
      backtotop.classList.add('visible');
      header.classList.add('dark-header-theme');
    } else {
      backtotop.classList.remove('visible');
      header.classList.remove('dark-header-theme');
    }
  };
  window.addEventListener('load', toggleBacktotop);
  window.addEventListener('scroll', toggleBacktotop);
}

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu__link");
let sectionScroll = 0;
let lastScrollTop = 0;

let pageScrolling = (sectionScroll) => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - sectionScroll) {
      current = section.getAttribute("id");
      return current;
    }
  });
  navLinks.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
      header.classList.remove("display-block");
    }
  });
};

window.addEventListener("scroll", () => {
  let scrollPosition = window.scrollY;
  if (scrollPosition > lastScrollTop) {
    pageScrolling(500);
  } else {
    pageScrolling(400);
  }
  lastScrollTop = scrollPosition;
}, false);

let projects = document.querySelectorAll('.projects__project');
let projectDescriptions = document.querySelectorAll('.project__description');
let indexOfProject = 0;

let onTouchstartShowDescriptionFunction = (event) => {
  if (event.target === projects[indexOfProject]) {
    projectDescriptions[indexOfProject].classList.toggle('show-description');
    projects[indexOfProject].classList.toggle('show');
  }
};

let onMouseenterShowDescriptionFunction = (event) => {
  if (event.target === projectDescriptions[indexOfProject] || projects[indexOfProject]) {
    projectDescriptions[indexOfProject].classList.add('show-description');
    projects[indexOfProject].classList.add('show');
  }
};

let onMouseleaveShowDescriptionFunction = (event) => {
  if (!(event.target === projectDescriptions[indexOfProject]) || (projects[indexOfProject])) {
    projectDescriptions[indexOfProject].classList.remove('show-description');
    projects[indexOfProject].classList.remove('show');
  }
};

let showDescriptionOfProjectDesctopV = (event) => {
  projects.forEach((project, index) => {
    if (event.target === project) {
      indexOfProject = index;
      projects[indexOfProject].addEventListener('mouseenter', onMouseenterShowDescriptionFunction);
      projects[indexOfProject].addEventListener('mouseleave', onMouseleaveShowDescriptionFunction);
    }
  });
};

let showDescriptionOfProjectDesctopM = (event) => {
  projects.forEach((project, index) => {
    if (event.target === project) {
      indexOfProject = index;
      projects[indexOfProject].addEventListener('touchstart', onTouchstartShowDescriptionFunction);

    }
  });
};

window.addEventListener('mouseover', showDescriptionOfProjectDesctopV);
document.querySelector('.sec__cont__projects').addEventListener('touchstart', showDescriptionOfProjectDesctopM);

let certificateImages = document.querySelectorAll('.scalable-image>img');
let resumeItemScaleBlock = document.querySelector('.resume-image-scale');
const mediaQuery640 = window.matchMedia('(max-width: 640px)');
const mediaQuery1520 = window.matchMedia('(min-width: 1520px)');

let changeScale = (event) => {
  if (mediaQuery640.matches) {
    return;
  } else if (mediaQuery1520.matches) {
    return;
  } else {
    if (event.target === certificateImages[0]) {
      certificateImages[0].classList.toggle('scale');
    } else if (event.target === certificateImages[1]) {
      certificateImages[1].classList.toggle('scale');
    }
  }
};

resumeItemScaleBlock.addEventListener('click', changeScale);
resumeItemScaleBlock.addEventListener('touchstart', changeScale);

let slideIndex1 = 1;
let slideIndex2 = 1;
const slides1 = document.querySelectorAll('.slider__wr__slide.plush-s');
const slides2 = document.querySelectorAll('.slider__wr__slide.ubisoft');
const prevSlide1 = document.querySelector('.slider__counter__prev.plush-s');
const prevSlide2 = document.querySelector('.slider__counter__prev.ubisoft');
const currentSlide1 = document.querySelector('.slider__counter__current.plush-s');
const currentSlide2 = document.querySelector('.slider__counter__current.ubisoft');
const nextSlide1 = document.querySelector('.slider__counter__next.plush-s');
const nextSlide2 = document.querySelector('.slider__counter__next.ubisoft');
const totalSlides2 = document.querySelector('.slider__counter__total.ubisoft');
const totalSlides1 = document.querySelector('.slider__counter__total.plush-s');
totalSlides1.textContent = slides1.length;
totalSlides2.textContent = slides2.length;

let showSlides = (slideNumber, slideIndex, slides, current, btnPrev, btnNext) => {
  if (slideNumber === slides.length) {
    btnNext.disabled = true;
    btnNext.style.opacity = 0.2;
  } else {
    btnNext.disabled = false;
    btnNext.style.opacity = 0.7;
  }
  if (slideNumber === 1) {
    btnPrev.disabled = true;
    btnPrev.style.opacity = 0.2;
  } else {
    btnPrev.disabled = false;
    btnPrev.style.opacity = 0.7;
  }

  slides.forEach(slide => {
    slide.classList.add('display-none');

  });
  slides[slideIndex - 1].classList.remove('display-none');
  current.textContent = slideIndex;
};

let changeSlides1 = (numberOfIncrOrDecr) => {
  showSlides((slideIndex1 += numberOfIncrOrDecr), slideIndex1, slides1, currentSlide1,
    prevSlide1.firstElementChild, nextSlide1.firstElementChild);
};
let changeSlides2 = (numberOfIncrOrDecr) => {
  showSlides((slideIndex2 += numberOfIncrOrDecr), slideIndex2, slides2, currentSlide2,
    prevSlide2.firstElementChild, nextSlide2.firstElementChild);
};

prevSlide1.addEventListener('click', () => {
  changeSlides1(-1);
});
nextSlide1.addEventListener('click', () => {
  changeSlides1(1);
});
prevSlide2.addEventListener('click', () => {
  changeSlides2(-1);
});
nextSlide2.addEventListener('click', () => {
  changeSlides2(1);
});

showSlides(slideIndex1, slideIndex1, slides1, currentSlide1,
  prevSlide1.firstElementChild, nextSlide1.firstElementChild);
showSlides(slideIndex2, slideIndex2, slides2, currentSlide2,
  prevSlide2.firstElementChild, nextSlide2.firstElementChild);


