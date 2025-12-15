// Smooth scroll for in-page links
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');
  const nav = document.querySelector('.nav');
  const navHeight = nav ? nav.offsetHeight : 0;
  
  links.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - navHeight - 20;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  });


  // Initialize animations smoothly without flickering
  function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportMargin = 200; // Extra margin for smooth animation start

    // Helper function to check if element is in or near viewport
    function isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return rect.top < viewportHeight + viewportMargin && rect.bottom > -viewportMargin;
    }

    // Helper function to trigger animation smoothly
    function triggerAnimation(el) {
      // Force a reflow to ensure CSS initial state is painted
      void el.offsetHeight;
      
      // Use requestAnimationFrame for smooth transition
      requestAnimationFrame(() => {
        el.classList.add('animated');
      });
    }

    // Separate elements into visible and below-viewport
    const visibleElements = [];
    const belowViewportElements = [];

    animatedElements.forEach(el => {
      if (isInViewport(el)) {
        visibleElements.push(el);
      } else {
        belowViewportElements.push(el);
      }
    });

    // Animate visible elements immediately with slight stagger
    visibleElements.forEach((el, index) => {
      // Small delay for smooth staggered animation effect
      setTimeout(() => {
        triggerAnimation(el);
      }, 100 + (index * 80));
    });

    // Create Intersection Observer for elements below viewport
    if (belowViewportElements.length > 0) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            triggerAnimation(el);
            observer.unobserve(el);
          }
        });
      }, observerOptions);

      belowViewportElements.forEach(el => {
        observer.observe(el);
      });
    }
  }

  // Initialize as soon as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Use requestAnimationFrame to ensure smooth start
      requestAnimationFrame(initAnimations);
    });
  } else {
    // DOM ready, initialize on next frame
    requestAnimationFrame(initAnimations);
  }

  // Login Modal functionality
  const loginModal = document.getElementById('loginModal');
  
  // Close modal when clicking outside
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        closeLoginModal();
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && loginModal.classList.contains('active')) {
        closeLoginModal();
      }
    });

    // Handle form submissions
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Login submitted');
        // Example: closeLoginModal();
      });
    }

    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your signup logic here
        console.log('Signup submitted');
        // Example: closeLoginModal();
      });
    }
  }
});

// Modal functions
function openLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Switch to login tab by default
    switchTab('login');
  }
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const tabs = document.querySelectorAll('.tab-button');
  
  tabs.forEach(t => t.classList.remove('active'));
  
  if (tab === 'login') {
    if (loginForm) loginForm.classList.add('active');
    if (signupForm) signupForm.classList.remove('active');
    tabs[0]?.classList.add('active');
  } else {
    if (loginForm) loginForm.classList.remove('active');
    if (signupForm) signupForm.classList.add('active');
    tabs[1]?.classList.add('active');
  }
}