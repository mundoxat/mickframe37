// Advanced animations and effects
document.addEventListener('DOMContentLoaded', () => {
  initParallaxEffect();
  initTypingEffect();
  initScrollEffects();
  initHoverEffects();
});

// Parallax scrolling effect
function initParallaxEffect() {
  const heroSection = document.querySelector('.hero-section');
  
  if (!heroSection) return;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Parallax effect for hero section
    heroSection.style.backgroundPosition = `center ${scrollY * 0.5}px`;
  });
}

// Typing text effect for hero section
function initTypingEffect() {
  const titles = [
    'Web Developer',
    'UI/UX Designer',
    'Freelancer',
    'Creative Thinker'
  ];
  
  const heroSubtitle = document.querySelector('.hero-content h2');
  
  if (!heroSubtitle) return;
  
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function typeText() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
      // Deleting text
      heroSubtitle.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster when deleting
    } else {
      // Typing text
      heroSubtitle.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing speed
    }
    
    // If word is complete, start deleting after pause
    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      typingSpeed = 1500; // Pause before deleting
    } 
    // If deletion is complete, move to next word
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(typeText, typingSpeed);
  }
  
  // Start the typing effect with a delay
  setTimeout(typeText, 2000);
}

// Advanced scroll effects
function initScrollEffects() {
  // Tilt effect on scroll for portfolio items
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach(item => {
    // Create tilt effect based on mouse position
    item.addEventListener('mousemove', (e) => {
      const itemRect = item.getBoundingClientRect();
      const itemX = e.clientX - itemRect.left;
      const itemY = e.clientY - itemRect.top;
      
      const tiltX = (itemY / itemRect.height - 0.5) * 10; // Max tilt 10deg
      const tiltY = (0.5 - itemX / itemRect.width) * 10;
      
      item.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
    });
    
    // Reset transform when mouse leaves
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      setTimeout(() => {
        item.style.transition = 'transform 0.5s ease';
      }, 100);
    });
    
    // Remove transition when mouse enters for smooth tilt effect
    item.addEventListener('mouseenter', () => {
      item.style.transition = 'transform 0.2s ease';
    });
  });
  
  // Counter animation for experience badge
  const experienceBadge = document.querySelector('.experience-badge span:first-child');
  
  if (experienceBadge) {
    const finalNumber = parseInt(experienceBadge.textContent);
    let currentNumber = 0;
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start counter animation
          const interval = setInterval(() => {
            if (currentNumber < finalNumber) {
              currentNumber++;
              experienceBadge.textContent = currentNumber;
            } else {
              clearInterval(interval);
              experienceBadge.textContent = finalNumber + '+';
            }
          }, 200);
          
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.8 });
    
    counterObserver.observe(experienceBadge.parentElement);
  }
}

// Advanced hover effects
function initHoverEffects() {
  // Magnetic button effect
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate distance from center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distanceX = x - centerX;
      const distanceY = y - centerY;
      
      // Magnetic effect (subtle movement)
      const magnetStrength = 5; // Max pixels of movement
      const moveX = (distanceX / centerX) * magnetStrength;
      const moveY = (distanceY / centerY) * magnetStrength;
      
      button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });
  
  // Custom cursor for gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      document.body.style.cursor = 'zoom-in';
    });
    
    item.addEventListener('mouseleave', () => {
      document.body.style.cursor = 'default';
    });
  });
}s
