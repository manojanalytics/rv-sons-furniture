/* ============================================
   [Business Name] — Furniture Website
   Interactivity: navbar, mobile menu, scroll
   animations, FAQ accordion, form validation,
   WhatsApp integration, back-to-top
   ============================================ */

/* ==================================================
   IMPORTANT: WHATSAPP NUMBER
   Replace 91XXXXXXXXXX below with your actual WhatsApp
   number in international format (country code + number,
   no + sign, no spaces). Example: 919876543210
   ================================================== */
const WHATSAPP_NUMBER = '91XXXXXXXXXX';

/* ---------- Navbar Scroll Effect ---------- */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

/* ---------- Mobile Hamburger Menu ---------- */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

function toggleMenu() {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
  const isOpen = navMenu.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
}

hamburger.addEventListener('click', toggleMenu);

// Close mobile menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

/* ---------- Active Nav Link on Scroll ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollPos = window.scrollY + 120;
  let current = '';

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

/* ---------- Scroll Reveal Animations ---------- */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

/* ---------- FAQ Accordion ---------- */
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const answer = question.nextElementSibling;
    const isOpen = item.classList.contains('active');

    // Close all other FAQ items
    document.querySelectorAll('.faq-item.active').forEach(activeItem => {
      if (activeItem !== item) {
        activeItem.classList.remove('active');
        activeItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        activeItem.querySelector('.faq-answer').style.maxHeight = '0';
      }
    });

    // Toggle current item
    if (isOpen) {
      item.classList.remove('active');
      question.setAttribute('aria-expanded', 'false');
      answer.style.maxHeight = '0';
    } else {
      item.classList.add('active');
      question.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

/* ---------- Back to Top Button ---------- */
const backToTop = document.getElementById('backToTop');

function handleBackToTop() {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

window.addEventListener('scroll', handleBackToTop, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Contact Form Validation & WhatsApp Submit ---------- */
const quoteForm = document.getElementById('quoteForm');

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + 'Error');
  if (field) field.classList.add('error');
  if (errorEl) errorEl.textContent = message;
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + 'Error');
  if (field) field.classList.remove('error');
  if (errorEl) errorEl.textContent = '';
}

function validatePhone(phone) {
  // Indian mobile number: 10 digits, optionally starting with +91
  const cleaned = phone.replace(/[\s\-+]/g, '');
  return /^[6-9]\d{9}$/.test(cleaned) || /^91[6-9]\d{9}$/.test(cleaned);
}

function validateEmail(email) {
  if (email.trim() === '') return true; // optional field
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

quoteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;

  // Clear all previous errors
  ['name', 'phone', 'email', 'location', 'requirement', 'projectType'].forEach(clearError);

  // Name
  const name = document.getElementById('name').value.trim();
  if (name.length < 2) {
    showError('name', 'Please enter your name');
    isValid = false;
  }

  // Phone
  const phone = document.getElementById('phone').value.trim();
  if (phone === '') {
    showError('phone', 'Please enter your phone number');
    isValid = false;
  } else if (!validatePhone(phone)) {
    showError('phone', 'Please enter a valid 10-digit mobile number');
    isValid = false;
  }

  // Email (optional)
  const email = document.getElementById('email').value.trim();
  if (!validateEmail(email)) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  }

  // Location
  const location = document.getElementById('location').value.trim();
  if (location.length < 2) {
    showError('location', 'Please enter your location');
    isValid = false;
  }

  // Project Type
  const projectType = document.getElementById('projectType').value;
  if (projectType === '') {
    showError('projectType', 'Please select a project type');
    isValid = false;
  }

  // Requirement
  const requirement = document.getElementById('requirement').value.trim();
  if (requirement.length < 3) {
    showError('requirement', 'Please describe your furniture requirement');
    isValid = false;
  }

  if (!isValid) {
    // Focus first error field
    const firstError = quoteForm.querySelector('.error');
    if (firstError) firstError.focus();
    return;
  }

  // Gather remaining fields
  const budget = document.getElementById('budget').value.trim();
  const message = document.getElementById('message').value.trim();

  // Build WhatsApp message
  let waMessage = `Hello, I would like to request a furniture quotation.\n\n`;
  waMessage += `*Name:* ${name}\n`;
  waMessage += `*Phone:* ${phone}\n`;
  if (email) waMessage += `*Email:* ${email}\n`;
  waMessage += `*Location:* ${location}\n`;
  waMessage += `*Project Type:* ${projectType}\n`;
  waMessage += `*Furniture Requirement:* ${requirement}\n`;
  if (budget) waMessage += `*Approximate Budget:* ${budget}\n`;
  if (message) waMessage += `*Message:* ${message}\n`;
  waMessage += `\nPlease get back to me with a quotation. Thank you.`;

  // Encode and open WhatsApp
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  /* ==================================================
     The WhatsApp link below uses WHATSAPP_NUMBER defined
     at the top of this file. Replace it with your actual
     WhatsApp number (international format, no + sign).
     Example: const WHATSAPP_NUMBER = '919876543210';
     ================================================== */
  window.open(waUrl, '_blank', 'noopener');

  // Show confirmation
  const submitBtn = quoteForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Opening WhatsApp...';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';

  setTimeout(() => {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '';
    quoteForm.reset();
  }, 2500);
});

// Clear errors on input
['name', 'phone', 'email', 'location', 'requirement', 'projectType'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', () => clearError(id));
    el.addEventListener('change', () => clearError(id));
  }
});

/* ---------- Footer Year ---------- */
document.getElementById('footerYear').textContent = new Date().getFullYear();

/* ---------- Smooth Scroll for Anchor Links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId.length < 2) return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
