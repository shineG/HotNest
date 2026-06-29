/**
 * Minimal site scripts — ES5-compatible for broad browser support (incl. Firefox 75 ESR).
 */
(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");

  /* Sticky header background on scroll */
  function onScroll() {
    if (!header) return;
    if (window.pageYOffset > 50) {
      header.className = header.className.replace(/\bis-scrolled\b/g, "");
      if (header.className.indexOf("is-scrolled") === -1) {
        header.className += " is-scrolled";
      }
    } else {
      header.className = header.className.replace(/\s*is-scrolled/g, "");
    }
  }

  if (window.addEventListener) {
    window.addEventListener("scroll", onScroll, false);
    onScroll();
  }

  /* Mobile navigation toggle */
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.className.indexOf("is-open") !== -1;
      if (isOpen) {
        siteNav.className = siteNav.className.replace(/\s*is-open/g, "");
        navToggle.setAttribute("aria-expanded", "false");
      } else {
        siteNav.className += " is-open";
        navToggle.setAttribute("aria-expanded", "true");
      }
    });
  }

  /* Fade-in on scroll — IntersectionObserver with fallback */
  var fadeEls = document.querySelectorAll(".fade-in");

  function showElement(el) {
    el.className += " is-visible";
  }

  if (typeof IntersectionObserver !== "undefined" && fadeEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            showElement(entries[i].target);
            observer.unobserve(entries[i].target);
          }
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.1 },
    );

    for (var j = 0; j < fadeEls.length; j++) {
      observer.observe(fadeEls[j]);
    }
  } else {
    for (var k = 0; k < fadeEls.length; k++) {
      showElement(fadeEls[k]);
    }
  }

  /* Hero Slideshow Auto-slide (ES5 compatible for legacy browsers) */
  var slideshows = document.querySelectorAll(".hero--slideshow");
  for (var idx = 0; idx < slideshows.length; idx++) {
    (function (slideshow) {
      var slides = slideshow.querySelectorAll(".hero-slide");
      if (slides.length <= 1) return;

      var currentIndex = 0;
      var slideInterval;

      /* Navigation Buttons */
      var prevBtn = slideshow.parentElement.querySelector(".hero__nav-prev");
      var nextBtn = slideshow.parentElement.querySelector(".hero__nav-next");

      if (prevBtn) {
        prevBtn.addEventListener("click", function () {
          goToSlide(currentIndex - 1);
          resetTimer();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          goToSlide(currentIndex + 1);
          resetTimer();
        });
      }

      function goToSlide(index) {
        /* Handle wrapping around */
        var targetIndex = index;
        if (targetIndex < 0) {
          targetIndex = slides.length - 1;
        } else if (targetIndex >= slides.length) {
          targetIndex = 0;
        }

        if (targetIndex === currentIndex) return;

        var currentSlide = slides[currentIndex];
        var nextSlide = slides[targetIndex];

        window.requestAnimationFrame(function () {
          nextSlide.classList.add("is-active");
          currentSlide.classList.remove("is-active");
          currentIndex = targetIndex;
        });
      }

      function nextSlide() {
        goToSlide(currentIndex + 1);
      }

      function resetTimer() {
        if (slideInterval) {
          clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, 6000);
      }

      resetTimer(); // Start the timer for the first time
    })(slideshows[idx]);
  }

  /* Service Cards Interaction - Toggle Description Expansion */
  var serviceCards = document.querySelectorAll(".service-card-modern");
  for (var sIdx = 0; sIdx < serviceCards.length; sIdx++) {
    (function (card) {
      var title = card.querySelector(".service-card-modern__title");
      if (!title) return;

      title.addEventListener("click", function () {
        var isActive = card.classList.contains("is-active");

        /* Close all other cards first (Single Open Mode) */
        for (var j = 0; j < serviceCards.length; j++) {
          serviceCards[j].classList.remove("is-active");
        }

        /* Toggle current card if it wasn't already active */
        if (!isActive) {
          card.classList.add("is-active");
        }
      });

      /* Show description on hover */
      card.addEventListener("mouseenter", function () {
        card.classList.add("is-active");
      });

      /* Auto-close when mouse leaves the card area */
      card.addEventListener("mouseleave", function () {
        card.classList.remove("is-active");
      });
    })(serviceCards[sIdx]);
  }

  /* Press Logo Forced Jump (ES5) */
  var pressLinks = document.querySelectorAll(".js-press-link");
  for (var pIdx = 0; pIdx < pressLinks.length; pIdx++) {
    (function (link) {
      link.addEventListener("click", function (e) {
        var url = link.getAttribute("href");
        if (url && url !== "#") {
          /* Use window.open to bypass some browser/CSS restrictions */
          window.open(url, "_blank");
          /* Prevent default is risky if we want the link to still work normally,
             but here we use it to ensure our JS takes control.
             However, for best compatibility, we only prevent if window.open succeeds. */
          e.preventDefault();
        }
      });
    })(pressLinks[pIdx]);
  }

  /* Number Counter Animation - Wix Style (ES5) */
  var countEls = document.querySelectorAll(".js-count-up");
  if (typeof IntersectionObserver !== "undefined" && countEls.length) {
    var countObserver = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            var el = entries[i].target;
            var targetValue = parseInt(el.getAttribute("data-target"), 10);
            var startTime = null;
            var duration = 2000; // 2 seconds animation

            function animate(timestamp) {
              if (!startTime) startTime = timestamp;
              var progress = timestamp - startTime;
              var percentage = Math.min(progress / duration, 1);

              /* Easing function: OutCubic (Fast start, slow end) */
              var easeOutValue = 1 - Math.pow(1 - percentage, 3);
              var currentValue = Math.floor(easeOutValue * targetValue);

              el.innerText = currentValue.toLocaleString();
              if (percentage < 1) {
                window.requestAnimationFrame(animate);
              } else {
                el.innerText = targetValue.toLocaleString();
              }
            }
            window.requestAnimationFrame(animate);
            countObserver.unobserve(el);
          }
        }
      },
      { threshold: 0.1 },
    );

    for (var j = 0; j < countEls.length; j++) {
      countObserver.observe(countEls[j]);
    }
  } else if (countEls.length) {
    /* Fallback for very old browsers: just show the target value */
    for (var k = 0; k < countEls.length; k++) {
      var val = countEls[k].getAttribute("data-target");
      countEls[k].innerText = parseInt(val, 10).toLocaleString();
    }
  }

  /* Timeline Carousel Navigation & Drag-to-Scroll (ES5) */
  var timelineTrack = document.getElementById("timelineTrack");
  if (timelineTrack) {
    var prevBtn = document.querySelector(".timeline-nav--prev");
    var nextBtn = document.querySelector(".timeline-nav--next");
    var scrollAmount = 380; // Card width + gap

    /* Arrow Navigation */
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        timelineTrack.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        timelineTrack.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    }

    /* Mouse Drag-to-Scroll */
    var isDragging = false;
    var startX;
    var scrollLeft;

    timelineTrack.addEventListener("mousedown", function (e) {
      isDragging = true;
      timelineTrack.classList.add("is-dragging");
      startX = e.pageX - timelineTrack.offsetLeft;
      scrollLeft = timelineTrack.scrollLeft;
      // Prevent text selection during drag
      e.preventDefault();
    });

    window.addEventListener("mousemove", function (e) {
      if (!isDragging) return;
      e.preventDefault();
      var x = e.pageX - timelineTrack.offsetLeft;
      var walk = (x - startX) * 2; // Multiply by 2 to speed up scrolling
      timelineTrack.scrollLeft = scrollLeft - walk;
    });

    window.addEventListener("mouseup", function () {
      if (isDragging) {
        isDragging = false;
        timelineTrack.classList.remove("is-dragging");
      }
    });
  }
})();
