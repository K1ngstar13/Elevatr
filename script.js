// NeoSignal Website Interactive Features

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Feather Icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }

  // FAQ Accordion
  const faqContainer = document.getElementById('faq-container');
  if (faqContainer) {
    const faqItems = faqContainer.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      const content = item.querySelector('.faq-content');
      const icon = trigger.querySelector('svg');
      
      trigger.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          const otherContent = otherItem.querySelector('.faq-content');
          const otherIcon = otherItem.querySelector('.faq-trigger svg');
          otherContent.classList.add('hidden');
          if (otherIcon) {
            otherIcon.style.transform = 'rotate(0deg)';
          }
        });
        
        // Toggle current item
        if (!isOpen) {
          content.classList.remove('hidden');
          if (icon) {
            icon.style.transform = 'rotate(180deg)';
          }
        }
      });
    });
  }

  // Counter Animation
  const counters = document.querySelectorAll('.counter');
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    
    updateCounter();
  };
  
  // Intersection Observer for counters
  if (counters.length > 0) {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Navbar scroll effect (add background blur on scroll)
  const navbar = document.querySelector('custom-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.opacity = '1';
      }
    });
  }
});
