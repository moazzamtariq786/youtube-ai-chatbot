document.addEventListener("DOMContentLoaded", function () {
  var navbar = document.getElementById("navbar");
  var navLinks = document.querySelectorAll(".nav-link");

  // Scroll event for shrinking navbar
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Add active class to the clicked nav-link
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      // Remove active class from all links
      navLinks.forEach(function (nav) {
        nav.classList.remove("active");
      });

      // Add active class to the clicked link
      this.classList.add("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".nav-link, .dropdown-item");
  var navbarToggler = document.querySelector(".navbar-toggler");
  var navbarCollapse = document.querySelector(".navbar-collapse");
  var dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      // Prevent closing when clicking a dropdown toggle
      if (!this.classList.contains("dropdown-toggle")) {
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click(); // Close the menu
        }
      }
    });
  });

  // Prevent closing the navbar when clicking the dropdown toggle
  dropdownToggles.forEach(function (dropdown) {
    dropdown.addEventListener("click", function (event) {
      event.stopPropagation(); // Stop click from closing the menu
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var dropdownToggle = document.querySelector("#servicesDropdown");
  var dropdownIcon = dropdownToggle.querySelector(".dropdown-icon");

  dropdownToggle.addEventListener("click", function (event) {
    setTimeout(() => {
      if (dropdownToggle.classList.contains("show")) {
        dropdownIcon.classList.remove("fa-angle-down");
        dropdownIcon.classList.add("fa-angle-up");
      } else {
        dropdownIcon.classList.remove("fa-angle-up");
        dropdownIcon.classList.add("fa-angle-down");
      }
    }, 100);
  });

  document.addEventListener("click", function (event) {
    if (!dropdownToggle.parentElement.contains(event.target)) {
      dropdownIcon.classList.remove("fa-angle-up");
      dropdownIcon.classList.add("fa-angle-down");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var backToTop = document.getElementById("backToTop");
  var progressCircle = document.getElementById("progressCircle");
  var totalHeight = document.documentElement.scrollHeight - window.innerHeight;

  window.addEventListener("scroll", function () {
    var scrollProgress = (window.scrollY / totalHeight) * 138; // 138 is circle length

    // Show button after scrolling 100px
    if (window.scrollY > 50) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

    // Update circular progress
    progressCircle.style.strokeDashoffset = 138 - scrollProgress;
  });

  // Scroll to top when button clicked
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const statsSection = document.querySelector(".stats-section"); // Section to observe
  const counters = document.querySelectorAll(".counter");
  const millionCounter = document.querySelector(".million-counter");
  let animationStarted = false; // Prevent multiple triggers
  let completedCounters = 0; // Track completed counters

  // Function to start counter animation
  function animateCount(counter, target) {
    let count = 0;
    let speed = target / 200; // Adjust speed for smooth animation

    function updateCount() {
      count += speed;
      if (count < target) {
        counter.innerText = Math.ceil(count).toLocaleString() + "+";
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target.toLocaleString() + "+"; // Final value
        completedCounters++; // Mark counter as completed
        checkMillionCounterStart(); // Check if we can start million counter
      }
    }

    updateCount();
  }

  // Function to check when to start million counter
  function checkMillionCounterStart() {
    if (completedCounters === counters.length) {
      // Start only when all 3 are done
      animateMillionCount();
    }
  }

  // Function to animate 1 Million counter
  function animateMillionCount() {
    let count = 0;
    let target = 1; // We need to go from 0 to 1
    let speed = target / 100; // Adjust speed

    function updateCount() {
      count += speed;
      if (count < target) {
        millionCounter.innerText = Math.ceil(count);
        requestAnimationFrame(updateCount);
      }
    }

    updateCount();
  }

  // Observe when section is visible
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !animationStarted) {
        animationStarted = true; // Prevent re-triggering
        counters.forEach((counter) => {
          let target = +counter.getAttribute("data-target");
          animateCount(counter, target);
        });
      }
    },
    { threshold: 0.5 }
  ); // Trigger when 50% of section is visible

  observer.observe(statsSection); // Start observing
});

document.addEventListener("DOMContentLoaded", function () {
  const progressBars = document.querySelectorAll(".progress-bar");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetValue = parseInt(bar.getAttribute("data-progress"));
          let currentValue = 0;

          // Animate width
          bar.style.width = targetValue + "%";

          // Start counting
          const counter = setInterval(() => {
            if (currentValue >= targetValue) {
              clearInterval(counter);
            } else {
              currentValue++;
              bar.innerText = currentValue + "%";
            }
          }, 20); // Speed of counting

          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  progressBars.forEach((bar) => observer.observe(bar));
});





document.querySelectorAll(".faq-button").forEach(button => {
  button.addEventListener("click", function () {
    let faqItem = this.parentElement;
    let faqAnswer = faqItem.querySelector(".faq-answer");
    let plusIcon = this.querySelector("span");

    // Close all FAQs except the one clicked
    document.querySelectorAll(".faq-item").forEach(item => {
      if (item !== faqItem) {
        item.classList.remove("active");
        item.querySelector(".faq-answer").style.maxHeight = null;
        item.querySelector("span").textContent = "+";
      }
    });

    // Toggle the clicked FAQ
    if (faqItem.classList.contains("active")) {
      faqItem.classList.remove("active");
      faqAnswer.style.maxHeight = null;
      plusIcon.textContent = "+";
    } else {
      faqItem.classList.add("active");
      faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
      plusIcon.textContent = "-";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Simulate a delay (you can replace this with actual loading events)
  setTimeout(function () {
    // Hide the preloader
    document.querySelector(".preloader").style.display = "none";

    // Show the main content
    document.querySelector(".main-content").style.display = "block";
  }, 3500); // Adjust the time according to your needs or replace with actual loading events
});


document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".count-num");
  const percentCounter = document.querySelector(".percent-counter");
  const reviewCounter = document.querySelector(".review-counter");
  let countingStarted = false;
  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countingStarted) {
        countingStarted = true;
        startCounting();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector(".stats-container"));

  function startCounting() {
    counters.forEach((counter) => {
      counter.innerText = "0";
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText.replace('+', '');
        const speed = target / 100;

        if (count < target) {
          counter.innerText = Math.ceil(count + speed) + "+";
          setTimeout(updateCount, 50);
        } else {
          counter.innerText = target + "+";
        }
      };
      updateCount();
    });

    if (percentCounter) {
      percentCounter.innerText = "0%";
      const updatePercent = () => {
        const target = +percentCounter.getAttribute("data-target");
        const count = +percentCounter.innerText.replace('%', '');
        const speed = target / 100;

        if (count < target) {
          percentCounter.innerText = Math.ceil(count + speed) + "%";
          setTimeout(updatePercent, 50);
        } else {
          percentCounter.innerText = target + "%";
        }
      };
      updatePercent();
    }

    if (reviewCounter) {
      reviewCounter.innerText = "0/5";
      const updateReview = () => {
        const target = +reviewCounter.getAttribute("data-target");
        const count = +reviewCounter.innerText.split("/")[0];
        const speed = target / 100;

        if (count < target) {
          reviewCounter.innerText = Math.ceil(count + speed) + "/5";
          setTimeout(updateReview, 1450);
        } else {
          reviewCounter.innerText = target + "/5";
        }
      };
      updateReview();
    }
  }
});

function showTab(tabId) {
  // Hide all contents
  document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
  });
  // Show selected tab content
  document.getElementById(tabId).classList.add('active');

  // Remove 'active' class from all buttons
  document.querySelectorAll('.tab-button').forEach(button => {
      button.classList.remove('active');
  });
  // Add 'active' class to the clicked button
  event.target.classList.add('active');
}


const aboutSection = document.querySelector('#about-us');
const aboutBtn = document.querySelector('.about-btn');
const readMoreText = document.querySelector('.read-more-text');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      aboutBtn.classList.add('show');
      readMoreText.classList.add('show');
    }
  });
}, {
  threshold: 0.5
});

observer.observe(aboutSection);


document.querySelector("#sendBtn").addEventListener("click", async () => {
  const userMessage = document.querySelector("#userInput").value;

  const response = await fetch("https://YOUR-RENDER-URL.onrender.com/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await response.json();
  document.querySelector("#response").innerText = data.reply;
});
