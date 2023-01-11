//preloader

window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
}

// animation on scroll

const animItems = document.querySelectorAll('.anim-item');
if (animItems.length > 0) {

  let offset = (el) => {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.scrollY || document.documentElement.scrollLeft,
      scrollTop = window.scrollY || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }
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
  }
  window.addEventListener('scroll', animOnScroll);
  
  setTimeout(() => {
    animOnScroll();
  }, 100);

}

// typeWriterWithDelay 

let i = 0;
let speed = 70;
let typingMessage = document.getElementById("typing-text");
let txt = typingMessage.dataset.typedItems;

function typeWriter() {
  if (i < txt.length) {
    typingMessage.innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

function typeWriterWithDelay() {
  setTimeout(typeWriter, 500);
};

typeWriterWithDelay();

// mobile navigation menu become visible

let mobileNavToogle = document.querySelector(".mobile__nav__toggle");

mobileNavToogle.addEventListener("click", () => {
  let header = document.querySelector("#header");
  header.classList.toggle("display-block");
});

// link's smooth behavior 

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener('click', function (e) {
    e.preventDefault();
    const link = smoothLink.getAttribute('href');
    document.querySelector(link).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
};

// back-to-top button

let backtotop = document.querySelector(".back-to-top")
backtotop.addEventListener('click', () => {

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

// back-to-top button visible/hidden
//wrapper background while mobile burger clicked

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
  }
  window.addEventListener('load', toggleBacktotop);
  window.addEventListener('scroll', toggleBacktotop);
}






// active nav-menu__link while page is scrolling

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu__link");
let sectionScroll = 0;
var lastScrollTop = 0;

function pageScrolling(sectionScroll) {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - sectionScroll) {
      return current = section.getAttribute("id");
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

window.addEventListener("scroll", function () {
  let scrollPosition = window.scrollY;
  if (scrollPosition > lastScrollTop) {
    pageScrolling(500); // downscroll code
  } else {
    pageScrolling(400); // upscroll code
  }
  lastScrollTop = scrollPosition;;
}, false);

// show project description 

let projects = document.querySelectorAll('.projects__project');
let projectDescriptions = document.querySelectorAll('.project__description');
let indexOfProject = 0;

function onTouchstartShowDescriptionFunction(event) {
  if (event.target === projects[indexOfProject]) {
    projectDescriptions[indexOfProject].classList.toggle('show-description');
    projects[indexOfProject].classList.toggle('show');
  }
}

function onMouseenterShowDescriptionFunction(event) {
  if (event.target === projectDescriptions[indexOfProject] || projects[indexOfProject]) {
    projectDescriptions[indexOfProject].classList.add('show-description');
    projects[indexOfProject].classList.add('show');
  }
}

function onMouseleaveShowDescriptionFunction(event) {
  if (!(event.target === projectDescriptions[indexOfProject]) || (projects[indexOfProject])) {
    projectDescriptions[indexOfProject].classList.remove('show-description');
    projects[indexOfProject].classList.remove('show');
  }
}

function showDescriptionOfProjectDesctopV(event) {
  projects.forEach((project, index) => {
    if (event.target === project) {
      indexOfProject = index;
      projects[indexOfProject].addEventListener('mouseenter', onMouseenterShowDescriptionFunction);
      projects[indexOfProject].addEventListener('mouseleave', onMouseleaveShowDescriptionFunction);
    }
  })
}

function showDescriptionOfProjectDesctopM(event) {
  projects.forEach((project, index) => {
    if (event.target === project) {
      indexOfProject = index;
      projects[indexOfProject].addEventListener('touchstart', onTouchstartShowDescriptionFunction);

    }
  })
}

window.addEventListener('mouseover', showDescriptionOfProjectDesctopV);
document.querySelector('.sec__cont__projects').addEventListener('touchstart', showDescriptionOfProjectDesctopM);

//scalable certificate images

let certificateImages = document.querySelectorAll('.scalable-image>img');
let resumeItemScaleBlock = document.querySelector('.resume-image-scale');
const mediaQuery640 = window.matchMedia('(max-width: 640px)');
const mediaQuery1520 = window.matchMedia('(min-width: 1520px)');


function changeScale(event) {
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
}
resumeItemScaleBlock.addEventListener('click', changeScale);
resumeItemScaleBlock.addEventListener('touchstart', changeScale);


