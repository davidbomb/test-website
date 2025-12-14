// ============================================
// NAVIGATION MOBILE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');

  // Animation du bouton hamburger
  const spans = menuToggle.querySelectorAll('span');
  spans[0].style.transform = navMenu.classList.contains('active')
    ? 'rotate(45deg) translate(5px, 5px)'
    : 'none';
  spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
  spans[2].style.transform = navMenu.classList.contains('active')
    ? 'rotate(-45deg) translate(7px, -6px)'
    : 'none';
});

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// ============================================
// NAVBAR AU SCROLL
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Ajouter une ombre plus prononcée au scroll
  if (currentScroll > 50) {
    navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
  }

  lastScroll = currentScroll;
});

// ============================================
// ANIMATION DES STATISTIQUES
// ============================================
const animateStats = () => {
  const stats = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCount = () => {
          current += increment;
          if (current < target) {
            entry.target.textContent = Math.floor(current);
            requestAnimationFrame(updateCount);
          } else {
            entry.target.textContent = target;
          }
        };

        updateCount();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
};

animateStats();

// ============================================
// SLIDER DE TÉMOIGNAGES
// ============================================
const testimonialsContainer = document.getElementById('testimonialsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');
const testimonials = document.querySelectorAll('.testimonial-card');

let currentSlide = 0;
const totalSlides = testimonials.length;

// Créer les points indicateurs
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('button');
  dot.classList.add('slider-dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  sliderDots.appendChild(dot);
}

const dots = document.querySelectorAll('.slider-dot');

const updateSlider = () => {
  testimonialsContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
};

const goToSlide = (n) => {
  currentSlide = n;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;
  updateSlider();
};

const nextSlide = () => goToSlide(currentSlide + 1);
const prevSlide = () => goToSlide(currentSlide - 1);

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto-play du slider
let autoplayInterval = setInterval(nextSlide, 5000);

// Pause au survol
testimonialsContainer.addEventListener('mouseenter', () => {
  clearInterval(autoplayInterval);
});

testimonialsContainer.addEventListener('mouseleave', () => {
  autoplayInterval = setInterval(nextSlide, 5000);
});

// ============================================
// FORMULAIRE DE CONTACT
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Récupérer les valeurs
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  // Validation simple
  if (!name || !email || !message) {
    showFormMessage('Veuillez remplir tous les champs obligatoires.', 'error');
    return;
  }

  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFormMessage('Veuillez entrer une adresse email valide.', 'error');
    return;
  }

  // Simuler l'envoi du formulaire
  // Dans un cas réel, vous enverriez les données à un serveur
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Envoi en cours...';

  setTimeout(() => {
    showFormMessage('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.', 'success');
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Envoyer le message';

    // Masquer le message après 5 secondes
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }, 1500);
});

const showFormMessage = (message, type) => {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = 'block';
};

// ============================================
// BOUTON SCROLL TO TOP
// ============================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ============================================
// SMOOTH SCROLL POUR TOUS LES LIENS INTERNES
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      const offsetTop = target.offsetTop - 80; // 80px pour la navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// ANIMATION AU SCROLL POUR LES CARTES
// ============================================
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.service-card, .info-card, .testimonial-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
  });
};

// Lancer l'animation au chargement de la page
window.addEventListener('load', animateOnScroll);

// ============================================
// GESTION DU CLAVIER POUR L'ACCESSIBILITÉ
// ============================================
document.addEventListener('keydown', (e) => {
  // Navigation du slider avec les flèches
  if (document.activeElement.closest('.testimonials-slider')) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  }

  // Fermer le menu mobile avec Escape
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// ============================================
// EFFET PARALLAXE LÉGER SUR LE HERO
// ============================================
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;

  if (hero && scrolled < hero.offsetHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🚀 Site développé avec passion !', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cPour personnaliser ce site, modifiez le contenu HTML et les variables CSS.', 'color: #64748b; font-size: 12px;');

