// ==============================
// Portfolio Website JavaScript
// ==============================

// ========= DOM ELEMENTS ========
const menuIcon = document.getElementById("menu-icon");
const menuIconIcon = menuIcon.querySelector("i"); // Inside <i> tag
const navbar = document.querySelector(".navbar");
const h1Element = document.querySelector(".home-content h1");
const homeSection = document.querySelector(".home");
const buttons = document.querySelectorAll('.btn-box a');
const socialIcons = document.querySelectorAll('.home-sci a');

// ========= TYPING ANIMATION =========
function typeWriter(element, text, speed = 10) {
  let i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

document.addEventListener('DOMContentLoaded', () => {
  const originalText = h1Element.textContent.trim();
  setTimeout(() => typeWriter(h1Element, originalText, 80), 1000);
  createScrollProgress();
  initScrollAnimations();
});

// ========= MOBILE MENU TOGGLE =========
menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
  menuIconIcon.classList.toggle("fa-bars");
  menuIconIcon.classList.toggle("fa-xmark");

  navbar.style.animation = navbar.classList.contains("active")
    ? "slideDown 0.3s ease forwards"
    : "slideUp 0.3s ease forwards";
});

// ========= CLOSE MENU ON NAV LINK CLICK =========
 
// ========= CLOSE MENU ON OUTSIDE CLICK =========
document.addEventListener("click", e => {
  if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
    navbar.classList.remove("active");
    menuIconIcon.classList.add("fa-bars");
    menuIconIcon.classList.remove("fa-xmark");
  }
});

// ========= SMOOTH SCROLL FOR NAVIGATION =========
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========= PARALLAX BACKGROUND EFFECT =========
window.addEventListener('scroll', debounce(() => {
  const scrolled = window.pageYOffset;
  if (homeSection) {
    homeSection.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
}));

function debounce(func, delay = 10) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// ========= BUTTON HOVER ANIMATIONS =========
buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-3px)';
    button.style.boxShadow = '0 10px 20px rgba(0, 171, 240, 0.3)';
  });
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = 'none';
  });
});

// ========= SOCIAL ICONS HOVER ANIMATION =========
socialIcons.forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    icon.style.transform = 'translateY(-5px) scale(1.1)';
    icon.style.color = '#00abf0';
  });
  icon.addEventListener('mouseleave', () => {
    icon.style.transform = 'translateY(0) scale(1)';
    icon.style.color = '#ededed';
  });
});

// ========= SCROLL PROGRESS BAR =========
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #00abf0, #00d4ff);
    z-index: 1000;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  });
}

// ========= INTERSECTION OBSERVER FOR FADE-IN =========
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.home-content > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ========= OPTIONAL: DARK/LIGHT MODE =========
function createThemeToggle() {
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.className = 'theme-toggle';
  themeToggle.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 171, 240, 0.1);
    border: 2px solid #00abf0;
    color: #00abf0;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1001;
    transition: all 0.3s ease;
  `;

  document.body.appendChild(themeToggle);

  let isDark = true;
  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.style.background = isDark ? '#081b29' : '#f0f0f0';
    document.body.style.color = isDark ? '#ededed' : '#333';
    themeToggle.innerHTML = isDark
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
  });
}
// Uncomment to enable theme toggle
// createThemeToggle();

// ========= GLOBAL STYLE INJECTION FOR ANIMATIONS =========
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideUp {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
  }

  .navbar, .btn-box a, .home-sci a {
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(style);

// ========= CONSOLE MESSAGE =========
console.log('%c👋 Welcome to Sonu\'s Portfolio!', 'color: #00abf0; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to explore the code! 🚀', 'color: #ededed; font-size: 14px;');
