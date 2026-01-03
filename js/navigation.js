// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  highlightActiveNavItem();
});

// Initialize mobile navigation
function initMobileNav() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  
  if (!menuToggle || !nav) return;
  
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('nav-active')) {
      nav.classList.remove('nav-active');
    }
  });
}

// Highlight active navigation item based on scroll position
function highlightActiveNavItem() {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  if (sections.length === 0 || navItems.length === 0) return;
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
}

// Update navigation style on page load based on scroll position
window.addEventListener('load', () => {
  const nav = document.getElementById('mainNav');
  
  if (window.scrollY > 50) {
    nav.classList.add('nav-scrolled');
  }
});

// Handle window resize for navigation
window.addEventListener('resize', () => {
  const nav = document.getElementById('mainNav');
  
  // Reset mobile navigation on larger screens
  if (window.innerWidth > 768 && nav.classList.contains('nav-active')) {
    nav.classList.remove('nav-active');
  }
});