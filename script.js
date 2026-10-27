      // Hamburger Menu Toggle
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("navLinks");

      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
      });

      // Close menu when clicking on a nav link
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active");
          navLinks.classList.remove("active");
        });
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
          hamburger.classList.remove("active");
          navLinks.classList.remove("active");
        }
      });

      // Theme Toggle
      const themeToggle = document.getElementById("themeToggle");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

      // Check for saved theme preference or default to dark
      const currentTheme = localStorage.getItem("theme") || "dark";
      document.documentElement.setAttribute("data-theme", currentTheme);

      themeToggle.addEventListener("click", () => {
        const theme = document.documentElement.getAttribute("data-theme");
        const newTheme = theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      });

      // Typing Animation
      const phrases = [
        "Software Engineering Graduate",
        "Full-Stack Developer",
        "Problem Solver",
        "Tech Enthusiast",
      ];
      let phraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      const typingSpeed = 100;
      const deletingSpeed = 50;
      const pauseTime = 2000;

      function typeText() {
        const currentPhrase = phrases[phraseIndex];
        const typingElement = document.getElementById("typingText");

        if (!isDeleting && charIndex < currentPhrase.length) {
          typingElement.textContent += currentPhrase.charAt(charIndex);
          charIndex++;
          setTimeout(typeText, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
          typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
          charIndex--;
          setTimeout(typeText, deletingSpeed);
        } else if (charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(typeText, pauseTime);
        } else if (charIndex === 0 && isDeleting) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeText, 500);
        }
      }


      typeText();

      // Slideshow functionality
      let currentSlides = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

      function showSlide(slideshowId, index) {
        const slideshow = document.querySelector(
          `[data-slideshow="${slideshowId}"]`,
        );
        if (!slideshow) return;
        const slides = slideshow.querySelectorAll(".slide");
        const dots = slideshow.querySelectorAll(".slide-dot");

        slides.forEach((slide) => slide.classList.remove("active"));
        dots.forEach((dot) => dot.classList.remove("active"));

        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        currentSlides[slideshowId] = index;
        if (slides[index]) slides[index].classList.add("active");
        if (dots[index]) dots[index].classList.add("active");
      }

      function changeSlide(slideshowId, direction) {
        showSlide(slideshowId, currentSlides[slideshowId] + direction);
      }

      function goToSlide(slideshowId, index) {
        showSlide(slideshowId, index);
      }

      // Initialize all slideshows on page load
      Object.keys(currentSlides).forEach((id) => {
        showSlide(parseInt(id), 0);
      });

      // Auto-advance slides
      setInterval(() => {
        Object.keys(currentSlides).forEach((id) => {
          changeSlide(parseInt(id), 1);
        });
      }, 5000);

      // Scroll animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      }, observerOptions);

      document
        .querySelectorAll(".fade-in")
        .forEach((el) => observer.observe(el));

      // Contact Form Handling
      const contactForm = document.getElementById("contactForm");
      const formStatus = document.getElementById("formStatus");

      contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = contactForm.querySelector(".submit-btn");
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        // Simulate form submission (replace with your actual endpoint)
        try {
          // Example: Replace this with your actual form submission logic
          // const response = await fetch('your-form-endpoint', {
          //     method: 'POST',
          //     headers: { 'Content-Type': 'application/json' },
          //     body: JSON.stringify(data)
          // });

          // For now, simulate success after 1 second
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Create mailto link as fallback
          const subject = encodeURIComponent(data.subject);
          const body = encodeURIComponent(
            `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
          );
          window.location.href = `mailto:avleshramah16@gmail.com?subject=${subject}&body=${body}`;

          formStatus.className = "form-status success";
          formStatus.textContent =
            "Message sent successfully! Opening your email client...";
          formStatus.style.display = "block";
          contactForm.reset();
        } catch (error) {
          formStatus.className = "form-status error";
          formStatus.textContent = "Failed to send message. Please try again.";
          formStatus.style.display = "block";
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";

          setTimeout(() => {
            formStatus.style.display = "none";
          }, 5000);
        }
      });

      // Smooth scroll for nav links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        });
      });

      // If the hero image is an external SVG <img>, fetch and inline it so we can style/animate paths.
      document.addEventListener("DOMContentLoaded", async () => {
        const img = document.querySelector(
          '.hero-image img[src$="I0NWo01.svg"]',
        );

        if (img) {
          try {
            const res = await fetch(img.src);
            const svgText = await res.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgText, "image/svg+xml");
            const svg = doc.querySelector("svg");
            if (svg) {
              // Ensure the SVG scales and inherits color from CSS
              svg.setAttribute("class", "hero-svg");
              svg.setAttribute("role", "img");
              svg.style.width = "100%";
              svg.style.height = "100%";
              svg.style.display = "block";
              svg.style.color = "var(--text-primary)";

              // Make groups and drawable elements use currentColor and no fill
              doc.querySelectorAll("g").forEach((g) => {
                if (g.getAttribute("fill")) g.setAttribute("fill", "none");
                g.setAttribute("stroke", "currentColor");
              });

              doc
                .querySelectorAll("path,circle,rect,line,polyline,polygon")
                .forEach((el) => {
                  if (!el.getAttribute("stroke") || el.getAttribute("stroke") === "none") {
                    el.setAttribute("stroke", "currentColor");
                  }
                  el.setAttribute("fill", "none");
                  el.setAttribute("stroke-linecap", "round");
                  el.setAttribute("stroke-linejoin", "round");
                  el.style.vectorEffect = "non-scaling-stroke";
                });

              // Replace the <img> with the inlined SVG
              img.replaceWith(svg);

              // Animate only the hero SVG drawable elements
              const drawable = svg.querySelectorAll(
                "path, circle, rect, line, polyline, polygon",
              );

              drawable.forEach((shape, i) => {
                try {
                  const len = shape.getTotalLength();
                  shape.style.strokeDasharray = len;
                  shape.style.strokeDashoffset = len;
                  shape.getBoundingClientRect();
                  shape.style.transition = "stroke-dashoffset 1s ease-out";
                  // slightly faster, tighter stagger
                  setTimeout(() => {
                    shape.style.strokeDashoffset = "0";
                  }, i * 6);
                } catch (err) {
                  // some elements (like rect) may not implement getTotalLength()
                }
              });
            }
          } catch (err) {
            console.error("Failed to inline hero SVG:", err);
          }
        } else {
          // If SVG already inlined, animate the hero svg paths
          const svg = document.querySelector('.hero-image svg');
          if (svg) {
            const drawable = svg.querySelectorAll(
              "path, circle, rect, line, polyline, polygon",
            );
            drawable.forEach((shape, i) => {
              try {
                const len = shape.getTotalLength();
                shape.style.strokeDasharray = len;
                shape.style.strokeDashoffset = len;
                shape.getBoundingClientRect();
                shape.style.transition = "stroke-dashoffset 1s ease-out";
                setTimeout(() => {
                  shape.style.strokeDashoffset = "0";
                }, i * 6);
              } catch (err) {}
            });
          }
        }
      });