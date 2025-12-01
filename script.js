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
});