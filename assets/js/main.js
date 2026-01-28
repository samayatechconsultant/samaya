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

function openGridAnswer(et) {
  et.parentElement.classList.toggle("active");
}
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
      let faqes = [];
      if (title.querySelectorAll(".faq-item-new").length > 0)
        faqes = title.querySelectorAll(".faq-item-new");
      else
        faqes = title.querySelectorAll(".faq-item");
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


let MAX_PER_TITLE = 50;
let tx_Pages = [];
let tx_Titles = [];
let tx_Index = 0;

function buildTextPages(n) {
  // MAX_PER_TITLE = n == 1 ? 1 : MAX_PER_TITLE;
  MAX_PER_TITLE = n;

  tx_Pages.length = 0;
  tx_Titles.length = 0;

  const loader = document.getElementById("loader");
  loader.style.display = "flex";

  // Cache selectors ONCE
  const isNew = document.querySelector(".faq-item-new") !== null;
  const faqItems = document.querySelectorAll(
    isNew ? ".faq-item-new" : ".faq-item"
  );

  const groupedByTitle = new Map();

  // Group items
  faqItems.forEach(item => {
    const heading = item
      .closest(".faq-item-title")
      ?.querySelector("h2.heading-title");

    const titleText = heading?.textContent.trim() || "General";

    if (!groupedByTitle.has(titleText)) {
      groupedByTitle.set(titleText, []);
    }
    groupedByTitle.get(titleText).push(item);
  });

  // Build pages using fragments (FAST)
  groupedByTitle.forEach((items, title) => {
    for (let i = 0; i < items.length; i += MAX_PER_TITLE) {
      const fragment = document.createDocumentFragment();

      items.slice(i, i + MAX_PER_TITLE).forEach(src => {
        const div = document.createElement("div");
        div.className = isNew
          ? "faq-item-new active"
          : "faq-item active";

        div.innerHTML = src.innerHTML;
        fragment.appendChild(div);
      });

      tx_Pages.push(fragment);
      tx_Titles.push(title);
    }
  });

  loader.style.display = "none";
}

function openTextGallery(n) {
  tx_Index = 0;
  buildTextPages(n);
  renderSlide();
  document.getElementById("sliderTextPopup").style.display = "flex";
}

function renderSlide() {
  const content = document.getElementById("sliderTextContent");
  content.innerHTML = ""; // clear first
  content.appendChild(tx_Pages[tx_Index]);

  document.getElementById("sliderTitle").textContent =
    tx_Titles[tx_Index];
}

function changeTextSlide(dir) {
  tx_Index += dir;
  if (tx_Index < 0) tx_Index = tx_Pages.length - 1;
  if (tx_Index >= tx_Pages.length) tx_Index = 0;
  renderSlide();
}

function closeTextSlider() {
  document.getElementById("sliderTextPopup").style.display = "none";
}

function openPdf(el) {
  const pdfUrl = el.getAttribute("data-pdf");
  document.getElementById("pdfFrame").src = pdfUrl;
  document.getElementById("pdfPopup").style.display = "flex";
}

function closePdf() {
  document.getElementById("pdfFrame").src = "";
  document.getElementById("pdfPopup").style.display = "none";
}
window.onclick = function (e) {
  const modal = document.getElementById("pdfModal");
  if (e.target === modal) {
    closePdf();
  }
};

function toggleFullscreen() {
  const box = document.getElementById("sliderBox");
  const btn = document.getElementById("fsBtn");

  if (!document.fullscreenElement) {
    box.requestFullscreen();
    btn.textContent = "🗗";
  } else {
    document.exitFullscreen();
    btn.textContent = "⛶";
  }
}

/* function toggleFullscreen() {
 const box = document.getElementById("sliderBox");
    const btn = document.getElementById("fsBtn");

    box.classList.toggle("fullscreen");
    btn.innerHTML = box.classList.contains("fullscreen") ? "🗗" : "⛶";
} */

/* Handle ESC fullscreen exit */
document.addEventListener("fullscreenchange", () => {
  const btn = document.getElementById("fsBtn");
  if (!document.fullscreenElement) {
    btn.textContent = "⛶";
  }
});


//Sorting 
document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".faq-item-title")?.parentElement;
  if (!container) return;
  // Collect sections with counts
  const sections = Array.from(
    document.querySelectorAll(".faq-item-title")
  ).map(section => {

    const heading = section.querySelector(".heading-title");
    if (!heading) return null;

    const questionCount = section.querySelectorAll(
      ".faq-item-new .faq-question-new"
    ).length;

    return {
      section,
      heading,
      questionCount
    };
  }).filter(Boolean);

  // 🔽 Sort by questionCount (highest first)
  sections.sort((a, b) => b.questionCount - a.questionCount);

  // Batch DOM updates
  const fragment = document.createDocumentFragment();

  sections.forEach(({ section, heading, questionCount }) => {

    // Avoid duplicate count
    let countSpan = heading.querySelector(".faq-count");
    if (!countSpan) {
      countSpan = document.createElement("span");
      countSpan.className = "faq-count";
      heading.appendChild(countSpan);
    }
    if (questionCount > 0)
      countSpan.textContent = ` [ ${questionCount} ]`;
    fragment.appendChild(section);
  });
  container.innerHTML = "";
  container.appendChild(fragment);
  document.querySelectorAll(".iqas-section").forEach(sec => {
    if (!sec.children.length) sec.remove();
  });
});