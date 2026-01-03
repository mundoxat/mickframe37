// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initNavigation();
  initMusicPlayer();
  initGallery();
  initFloatingHearts();
  initChat();
  initParticles();
  initProfileAnimation();
});

// Navigation functionality
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const pages = document.querySelectorAll('.page');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetPage = button.getAttribute('data-page');
      
      // Update active states
      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === targetPage) {
          page.classList.add('active');
        }
      });
    });
  });
}

// Enhanced music player functionality
function initMusicPlayer() {
  const musicToggle = document.getElementById('musicToggle');
  const audioPlayer = document.getElementById('audioPlayer');
  const musicIcon = document.querySelector('.music-icon');
  let isPlaying = false;

  function forcePlay() {
    const playPromise = audioPlayer.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying = true;
          musicToggle.classList.add('playing');
          musicIcon.style.color = '#4CAF50';
        })
        .catch(error => {
          document.addEventListener('click', function initPlay() {
            audioPlayer.play()
              .then(() => {
                isPlaying = true;
                musicToggle.classList.add('playing');
                musicIcon.style.color = '#4CAF50';
              });
            document.removeEventListener('click', initPlay);
          }, { once: true });
        });
    }
  }

  forcePlay();

  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      audioPlayer.pause();
      musicToggle.classList.remove('playing');
      musicIcon.style.color = '#ff4444';
    } else {
      audioPlayer.play();
      musicToggle.classList.add('playing');
      musicIcon.style.color = '#4CAF50';
    }
    isPlaying = !isPlaying;
  });
}

// Gallery functionality
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.querySelector('.modal-close');
  
  const galleryGrid = document.querySelector('.gallery-grid');
  if (galleryItems.length > 4) {
    const columns = Math.ceil(Math.sqrt(galleryItems.length));
    galleryGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-img');
      modalImg.src = imgSrc;
      modal.classList.add('show');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
}

// Enhanced floating hearts animation
function initFloatingHearts() {
  const photoContainers = document.querySelectorAll('.couple-photo-container');
  
  photoContainers.forEach(container => {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'floating-hearts';
    container.appendChild(heartsContainer);
    
    function createHeart() {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerHTML = '❤️';
      heart.style.fontSize = Math.random() * 10 + 10 + 'px';
      heart.style.right = Math.random() * 40 + 'px';
      heartsContainer.appendChild(heart);
      
      heart.addEventListener('animationend', () => {
        heart.remove();
      });
    }
    
    setInterval(() => {
      if (document.getElementById('married').classList.contains('active')) {
        createHeart();
      }
    }, 300);
  });
}

// Enhanced chat functionality
function initChat() {
  const chatInput = document.querySelector('.chat-input input');
  const sendButton = document.querySelector('.chat-input button');
  const chatMessages = document.querySelector('.chat-messages');

  function addMessage(message, isUser = true) {
    const messageDiv = document.createElement('div');
    messageDiv.style.textAlign = isUser ? 'right' : 'left';
    messageDiv.style.margin = '10px 0';
    messageDiv.style.padding = '10px';
    messageDiv.style.background = isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)';
    messageDiv.style.borderRadius = '10px';
    messageDiv.style.animation = 'fadeIn 0.3s ease';
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleMessage() {
    const message = chatInput.value.trim();
    if (message) {
      addMessage(message);
      chatInput.value = '';
      setTimeout(() => {
        addMessage('Thanks for your message!', false);
      }, 1000);
    }
  }

  sendButton.addEventListener('click', handleMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleMessage();
    }
  });
}

// Particle background effect
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  initParticles();
  animate();
}

// Profile card animation
function initProfileAnimation() {
  const profileCard = document.querySelector('.profile-card');
  const profileImage = document.querySelector('.profile-image');

  profileImage.addEventListener('click', () => {
    profileImage.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      profileImage.style.transform = 'rotate(0deg)';
    }, 600);
  });

  let isAnimating = false;
  profileCard.addEventListener('mousemove', (e) => {
    if (!isAnimating) {
      const rect = profileCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      profileCard.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    }
  });

  profileCard.addEventListener('mouseleave', () => {
    isAnimating = true;
    profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    setTimeout(() => {
      isAnimating = false;
    }, 300);
  });
}
