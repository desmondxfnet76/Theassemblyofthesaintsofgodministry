 // ================== Smooth Scroll & Navigation ==================
class SmoothScroll {
  constructor() {
    this.navLinks = document.querySelectorAll('nav ul li a');
    this.init();
  }

  init() {
    this.addSmoothScroll();
    this.addSectionObserver();
  }

  addSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          this.setActiveLink(anchor);
        }
      });
    });
  }

  setActiveLink(activeLink) {
    this.navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }

  addSectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          this.navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, options);

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  }
}

// ================== Mobile Navigation ==================
class MobileMenu {
  constructor() {
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('nav ul');
    this.init();
  }

  init() {
    this.navToggle.addEventListener('click', () => this.toggleMenu());
    document.addEventListener('click', e => this.closeOnOutsideClick(e));
    window.addEventListener('resize', () => this.handleResize());
  }

  toggleMenu() {
    this.navMenu.classList.toggle('active');
    this.navToggle.classList.toggle('active');
    this.navToggle.setAttribute('aria-expanded',
      this.navToggle.classList.contains('active').toString()
    );
  }

  closeOnOutsideClick(e) {
    if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
      this.navMenu.classList.remove('active');
      this.navToggle.classList.remove('active');
    }
  }

  handleResize() {
    if (window.innerWidth > 768) {
      this.navMenu.classList.remove('active');
      this.navToggle.classList.remove('active');
    }
  }
}

// ================== Form Handling ==================
class FormHandler {
  constructor() {
    this.form = document.getElementById('contact-form');
    if (this.form) this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault(); // Prevent form from reloading the page
    const formData = new FormData(this.form);

    // Validate the form
    if (!this.validateForm(formData)) {
      this.showToast('Please fill in all required fields correctly.', 'error');
      return;
    }

    try {
      // Send form data to the backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        this.form.reset();
        this.showToast('Thank you for your message. We will get back to you soon. God bless you!', 'success');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Server error');
      }
    } catch (error) {
      this.showToast('An error occurred. Please try again later.', 'error');
      console.error('Form submission error:', error);
    }
  }

  validateForm(formData) {
    let isValid = true;

    this.form.querySelectorAll('[required]').forEach((field) => {
      if (!formData.get(field.name)?.trim()) {
        field.classList.add('invalid');
        isValid = false;
      } else {
        field.classList.remove('invalid');
      }
    });

    const email = formData.get('email');
    if (email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      document.querySelector('[name="email"]').classList.add('invalid');
      isValid = false;
    }

    return isValid;
  }

  showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <span class="toast-message">${message}</span>
      <button class="toast-close" aria-label="Close">&times;</button>
    `;

    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }
}

// Initialize the FormHandler when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => new FormHandler());

// ================== Scroll Animations ==================
class ScrollAnimator {
  constructor() {
    this.animatedElements = document.querySelectorAll('.animate-on-scroll');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 }); // Adjusted threshold for better visibility

    this.animatedElements.forEach(element => observer.observe(element));
  }
}


// ================== Scroll Animations ==================
class ScrollAnimator {
  constructor() {
    this.animatedElements = document.querySelectorAll('.animate-on-scroll');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    this.animatedElements.forEach(element => observer.observe(element));
  }
}

// ================== Initialize Everything ==================
document.addEventListener('DOMContentLoaded', () => {
  new SmoothScroll();
  new MobileMenu();
  new FormHandler();
  new ScrollAnimator();
});