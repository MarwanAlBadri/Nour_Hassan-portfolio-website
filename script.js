/* script.js */

// ─── YEAR ───
document.getElementById('year').textContent = new Date().getFullYear();

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── ACTIVE NAV LINK ON SCROLL ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = { threshold: 0.4 };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// ─── BURGER MENU ───
const burger = document.getElementById('navBurger');
const drawer = document.getElementById('navDrawer');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  drawer.classList.toggle('open');
});

// close drawer on link click
document.querySelectorAll('.drawer-link, .drawer-cta').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    drawer.classList.remove('open');
  });
});

// ─── SKILL BARS ANIMATION ───
const bars = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const target = fill.getAttribute('data-width');
      fill.style.width = target + '%';
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

bars.forEach(bar => barObserver.observe(bar));

// ─── CONTACT FORM ───
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearErrors() {
  [nameInput, emailInput, messageInput].forEach(el => el.classList.remove('error'));
  [nameError, emailError, messageError].forEach(el => el.textContent = '');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();
  formSuccess.style.display = 'none';

  let valid = true;

  if (!nameInput.value.trim()) {
    nameInput.classList.add('error');
    nameError.textContent = 'Name is required.';
    valid = false;
  }

  if (!emailInput.value.trim()) {
    emailInput.classList.add('error');
    emailError.textContent = 'Email is required.';
    valid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    emailInput.classList.add('error');
    emailError.textContent = 'Please enter a valid email.';
    valid = false;
  }

  if (!messageInput.value.trim()) {
    messageInput.classList.add('error');
    messageError.textContent = 'Message is required.';
    valid = false;
  }

  if (!valid) return;

  // simulate send
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSending = submitBtn.querySelector('.btn-sending');
  submitBtn.disabled = true;
  btnText.style.display = 'none';
  btnSending.style.display = 'inline';

  setTimeout(() => {
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnSending.style.display = 'none';
    form.reset();
    formSuccess.style.display = 'block';
    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
  }, 1800);
});

// clear error on input
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('error');
  });
});
