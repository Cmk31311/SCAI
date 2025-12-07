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

  // Scroll animations with Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(animateOnScroll, observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => {
    // Check if element is already in viewport (e.g., hero section)
    const rect = el.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInViewport && el.closest('.hero')) {
      // Animate hero elements immediately on load
      setTimeout(() => {
        el.classList.add('animated');
      }, 100);
    } else {
      // Observe other elements for scroll trigger
      observer.observe(el);
    }
  });

  // Waitlist form handling with EmailJS
  const waitlistForm = document.getElementById('waitlist-form');
  const waitlistMessage = document.getElementById('waitlist-message');
  const waitlistSubmit = document.getElementById('waitlist-submit');
  
  if (waitlistForm) {
    // Check if EmailJS is loaded and configured
    const EMAILJS_PUBLIC_KEY = 'PhRpRIzYYlCizbcfF';
    const EMAILJS_SERVICE_ID = 'service_avcwb2i';
    const EMAILJS_TEMPLATE_ID = 'template_9h7hj05';
    
    const isEmailJSConfigured = EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && 
                                 EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' && 
                                 EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID';
    
    if (typeof emailjs !== 'undefined' && isEmailJSConfigured) {
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
    
    waitlistForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('waitlist-email').value;
      const submitButton = waitlistSubmit;
      const originalText = submitButton.textContent;
      
      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      waitlistMessage.style.display = 'none';
      
      // Check if EmailJS is properly configured
      if (!isEmailJSConfigured || typeof emailjs === 'undefined') {
        waitlistMessage.textContent = 'Email service not configured. Please contact us at cmkadhar3@gmail.com';
        waitlistMessage.style.color = 'var(--warning)';
        waitlistMessage.style.display = 'block';
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        return;
      }
      
      try {
        // Send email to user
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          to_email: email,
          to_name: email.split('@')[0],
          from_name: 'SCAI Team',
          message: 'Thank you for joining the SCAI waitlist! We\'ll send you updates on SCAI soon.',
          subject: 'Welcome to SCAI Waitlist'
        });
        
        // Show success message
        waitlistMessage.textContent = '✓ Check your email! We\'ve sent you a confirmation.';
        waitlistMessage.style.color = 'var(--success)';
        waitlistMessage.style.display = 'block';
        
        // Reset form
        waitlistForm.reset();
        
      } catch (error) {
        console.error('EmailJS Error:', error);
        waitlistMessage.textContent = 'Something went wrong. Please try again or contact us at cmkadhar3@gmail.com';
        waitlistMessage.style.color = 'var(--error)';
        waitlistMessage.style.display = 'block';
      } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  }
});