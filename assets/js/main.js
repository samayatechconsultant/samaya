/** 
 * Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/ 
 */

(function () {
  "use strict";

  fetch("/nav.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("nav-placeholder").innerHTML = data;

      /** * Header toggle */
      const headerToggleBtn = document.querySelector('.header-toggle');

      function headerToggle() {
        document.querySelector('#header').classList.toggle('header-show');
        headerToggleBtn.classList.toggle('bi-list');
        headerToggleBtn.classList.toggle('bi-x');
      }
      headerToggleBtn?.addEventListener('click', headerToggle);

      /**
       * Hide mobile nav on same-page/hash links
       */
      document.querySelectorAll('#navmenu a').forEach(navmenu => {
        navmenu.addEventListener('click', () => {
          if (document.querySelector('.header-show')) {
            headerToggle();
          }
        });

      });

      /** * Toggle mobile nav dropdowns  */
      document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
        navmenu.addEventListener('click', function (e) {
          e.preventDefault();
          this.parentNode.classList.toggle('active');
          this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
          e.stopImmediatePropagation();
        });
      });


      const faq_item_title = document.querySelectorAll(".faq-item-title");
      const toggleTitle = document.getElementById("toggleTitle");
      const toggleTitleContent = document.getElementById("toggleTitleContent");
      if (faq_item_title.length > 0) { toggleTitleContent.style.display = "flex"; toggleTitle.style.display = "flex"; }

      else { toggleTitleContent.style.display = "none"; toggleTitle.style.display = "none"; }


      const panel = document.getElementById("floatingPanel");

      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;

      function startDrag(x, y) {
        const rect = panel.getBoundingClientRect();
        offsetX = x - rect.left;
        offsetY = y - rect.top;
        isDragging = true;
        panel.style.userSelect = "none";
      }

      function moveDrag(x, y) {
        if (!isDragging) return;
        panel.style.left = (x - offsetX) + "px";
        panel.style.top = (y - offsetY) + "px";
      }

      function endDrag() {
        isDragging = false;
      }

      /* Desktop (Mouse) */
      panel.addEventListener("mousedown", function (e) {
        startDrag(e.clientX, e.clientY);
      });

      document.addEventListener("mousemove", function (e) {
        moveDrag(e.clientX, e.clientY);
      });

      document.addEventListener("mouseup", endDrag);

      /* Mobile (Touch) */
      panel.addEventListener("touchstart", function (e) {
        const t = e.touches[0];
        startDrag(t.clientX, t.clientY);
      }, { passive: true });

      document.addEventListener("touchmove", function (e) {
        if (!isDragging) return;
        const t = e.touches[0];
        moveDrag(t.clientX, t.clientY);
      }, { passive: false });

      document.addEventListener("touchend", endDrag);


      const zoomable = document.querySelectorAll(".zoomable");
      const toggleImages = document.getElementById("toggleImages");
      const toggleImagesSlider = document.getElementById("toggleImagesSlider");
      if (zoomable.length > 0) { toggleImages.style.display = "flex"; toggleImagesSlider.style.display = "flex"; }
      else { toggleImages.style.display = "none"; toggleImagesSlider.style.display = "none"; }


    }).catch(err => console.error("Nav load failed", err));



  /** * Preloader  */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**  * Scroll top button  */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**  * Animation on scroll function and init  */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**  * Init typed.js  */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      const configEl = swiperElement.querySelector(".swiper-config");
      if (configEl) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config")?.innerHTML.trim()
        );

        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);








  document.querySelectorAll('.faq-item-title .title-icon').forEach(icon => {
    icon.addEventListener('click', function () {
      const faqItem = this.closest('.faq-item-title');
      faqItem.classList.toggle('active');
    });
  });
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      q.parentElement.classList.toggle("active");
    });
  });
  fetch("/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });


  // Save scroll position before leaving page
  document.addEventListener("click", function () {
    sessionStorage.setItem("scrollY", window.scrollY);
  });

  // Restore scroll position when coming back
  window.addEventListener("load", function () {
    const y = sessionStorage.getItem("scrollY");
    if (y !== null) {
      window.scrollTo(0, parseInt(y, 10));
    }
  });

})();

/**
  * Page Functions Code
  */

function openPdf(btn) {
  const pdfUrl = btn.getAttribute("data-pdf");
  const iframe = document.getElementById("pdfFrame");
  iframe.src = pdfUrl + "#toolbar=0&navpanes=0";
  document.getElementById("pdfModal").style.display = "flex";
}

function closePdf() {
  document.getElementById("pdfFrame").src = "";
  document.getElementById("pdfModal").style.display = "none";
} // Close modal when clicking outside 
window.onclick = function (e) {
  const modal = document.getElementById("pdfModal");
  if (e.target === modal) {
    closePdf();
  }
};
let lastFocusedElement = null;
let lastScrollPosition = 0;

function openProjectDetails(projectModal) {
  lastFocusedElement = this;
  lastScrollPosition = window.scrollY;
  var modal = new bootstrap.Modal(document.getElementById(projectModal));
  modal.show();
  portfolio.focus();
};
document.querySelectorAll('.btn-close').forEach(btn => {
  btn.addEventListener('click', function () {
    window.scrollTo({
      top: lastScrollPosition,
      behavior: "smooth"
    });
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  });
});

function openImage(img) {
  document.getElementById("imageModal").style.display = "flex";
  document.getElementById("modalImg").src = img.src;
}

function closeImage() {
  document.getElementById("imageModal").style.display = "none";
}
function goBack() {
  history.back();
}

function toggleTitleContent(el) {
  const loader = document.getElementById("loader");
  const faq_titles = document.querySelectorAll(".faq-item-title");
  const willOpen = el.classList.contains("bi-eye-fill");
  // Show loader
  loader.style.display = "flex";
  setTimeout(() => {
    faq_titles.forEach(title => {
      const faqes = title.querySelectorAll(".faq-item");
      faqes.forEach(e => {
        if (willOpen) {
          e.classList.add("active");
        } else {
          e.classList.remove("active");
        }
      });
    });

    if (willOpen) {
      el.classList.remove("bi-eye-fill");
      el.classList.add("bi-eye-slash-fill");
    } else {
      el.classList.add("bi-eye-fill");
      el.classList.remove("bi-eye-slash-fill");
    }
    // Hide loader
    loader.style.display = "none";
  }, 50); // small delay to render loader
}

function toggleTitle(el) {
  const loader = document.getElementById("loader");
  const faq_titles = document.querySelectorAll(".faq-item-title");
  const willOpen = el.classList.contains("bi-eye-fill");
  // Show loader
  loader.style.display = "flex";
  setTimeout(() => {
    faq_titles.forEach(e => {
      if (willOpen) {
        e.classList.add("active");
      } else {
        e.classList.remove("active");
      }
    });

    if (willOpen) {
      el.classList.remove("bi-eye-fill");
      el.classList.add("bi-eye-slash-fill");
    } else {
      el.classList.add("bi-eye-fill");
      el.classList.remove("bi-eye-slash-fill");
    }
    // Hide loader
    loader.style.display = "none";
  }, 50); // small delay to render loader
}

let isBig = false;

function toggleImages() {
  const loader = document.getElementById("loader");
  const images = document.getElementsByClassName("zoomable");
  const icon = document.getElementById("toggleImages");

  // Show loader
  loader.style.display = "flex";
  setTimeout(() => {
    isBig = !isBig;

    for (let i = 0; i < images.length; i++) {
      const img = images[i];

      if (isBig) {
        img.style.width = "auto";
        img.style.height = "auto";
        img.style.maxWidth = "100%";
      } else {
        img.style.width = "50px";
        img.style.height = "50px";
      }
    }

    // Change icon based on state
    if (isBig) {
      icon.classList.remove("bi-image-fill");
      icon.classList.add("bi-slash-circle");
    } else {
      icon.classList.add("bi-image-fill");
      icon.classList.remove("bi-slash-circle");
    }
    // Hide loader
    loader.style.display = "none";
  }, 50); // small delay to render loader
}


let togglePanelOpen = false;

function togglePanel() {
  const wrapper = document.getElementById("floatingPanel");
  const arrow = document.getElementById("msArrow");

  togglePanelOpen = !togglePanelOpen;

  if (togglePanelOpen) {
    wrapper.classList.remove("closed");
    wrapper.classList.add("open");
    arrow.classList.remove("bi-chevron-left");
    arrow.classList.add("bi-chevron-right");
  } else {
    wrapper.classList.add("closed");
    wrapper.classList.remove("open");
    arrow.classList.add("bi-chevron-left");
    arrow.classList.remove("bi-chevron-right");
  }
}


let images = [];
let currentIndex = 0;

function openSlider() {
  images = Array.from(document.querySelectorAll("img.zoomable"))
    .filter(img => !img.closest("#sliderPopup"))
    .map(img => img.src);

  if (!images.length) return;

  currentIndex = 0;
  document.getElementById("sliderImage").src = images[currentIndex];
  document.getElementById("sliderPopup").style.display = "flex";
}

function closeSlider() {
  document.getElementById("sliderPopup").style.display = "none";
}

function changeSlide(step) {
  currentIndex = (currentIndex + step + images.length) % images.length;
  document.getElementById("sliderImage").src = images[currentIndex];
}

/* // Optional: click any page image to open slider from that image
document.querySelectorAll("img").forEach((img, i) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => openSlider(i));
}); */


//  Popup Text Slider 
let tx_Pages = [];
let tx_Titles = [];
let tx_Index = 0;
const tx_PAGE_SIZE = 50; // change to 5 if needed
function openTextGallery() {
  document.getElementById("sliderTextContent").innerHTML = "";
     const items = Array.from(document.querySelectorAll(".faq-item"));

    tx_Pages = [];
    tx_Titles = [];

    for(let i=0;i<items.length;i+=tx_PAGE_SIZE){
        const group = items.slice(i,i+tx_PAGE_SIZE);

        const html = group.map(div=>`<div class="faq-item active">${div.innerHTML}</div>`).join("");
        tx_Pages.push(html);

        // Find heading-title from first item in this group
        const heading = group[0].closest("main")?.querySelector(".heading-title");
        tx_Titles.push(heading ? heading.textContent.trim() : "");
    }
  openTextSlider(0);
}
function openTextSlider(i) {
 tx_Index=i;
    document.getElementById("sliderTitle").innerText = tx_Titles[tx_Index];
    document.getElementById("sliderTextContent").innerHTML = tx_Pages[tx_Index];
    document.getElementById("sliderTextPopup").style.display="flex";
}
function changeTextSlide(step) {
     tx_Index+=step;
    if(tx_Index<0) tx_Index=tx_Pages.length-1;
    if(tx_Index>=tx_Pages.length) tx_Index=0;

    document.getElementById("sliderTitle").innerText = tx_Titles[tx_Index];
    document.getElementById("sliderTextContent").innerHTML = tx_Pages[tx_Index];
}
function closeTextSlider() {
  document.getElementById("sliderTextPopup").style.display = "none";
}