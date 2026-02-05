class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        nav {
          font-family: 'Inter', system-ui, sans-serif;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: rgba(2, 6, 23, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(15, 23, 42, 0.5);
        }
        
        .container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 4rem;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: #f1f5f9;
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.025em;
        }
        
        .logo-icon {
          width: 2rem;
          height: 2rem;
          background: linear-gradient(135deg, #06b6d4, #7c3aed);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .nav-links {
          display: none;
          align-items: center;
          gap: 2rem;
        }
        
        .nav-links a {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        
        .nav-links a:hover {
          color: #06b6d4;
        }
        
        .nav-cta {
          display: none;
          padding: 0.5rem 1.25rem;
          background: #06b6d4;
          color: #020617;
          text-decoration: none;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        
        .nav-cta:hover {
          background: #22d3ee;
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
        }
        
        .mobile-menu-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: transparent;
          border: 1px solid #1e293b;
          border-radius: 0.5rem;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .mobile-menu-btn:hover {
          border-color: #06b6d4;
          color: #06b6d4;
        }
        
        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(15, 23, 42, 0.98);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #1e293b;
          padding: 1rem;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .mobile-menu.active {
          display: flex;
        }
        
        .mobile-menu a {
          color: #94a3b8;
          text-decoration: none;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        
        .mobile-menu a:hover {
          background: rgba(6, 182, 212, 0.1);
          color: #06b6d4;
        }
        
        @media (min-width: 768px) {
          .nav-links {
            display: flex;
          }
          .nav-cta {
            display: inline-flex;
          }
          .mobile-menu-btn {
            display: none;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      </style>
      
      <nav>
        <div class="container">
          <div class="nav-content">
            <a href="/" class="logo">
              <div class="logo-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              NeoSignal
            </a>
            
            <div class="nav-links">
              <a href="#product">Product</a>
              <a href="#how-it-works">How it Works</a>
              <a href="#token">Token</a>
              <a href="#roadmap">Roadmap</a>
              <a href="#faq">FAQ</a>
            </div>
            
            <a href="#buy" class="nav-cta">Get $NSGL</a>
            
            <button class="mobile-menu-btn" id="mobileToggle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="mobile-menu" id="mobileMenu">
          <a href="#product">Product</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#token">Token</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#faq">FAQ</a>
          <a href="#buy" style="color: #06b6d4; font-weight: 600;">Get $NSGL</a>
        </div>
      </nav>
    `;
    
    const toggle = this.shadowRoot.getElementById('mobileToggle');
    const menu = this.shadowRoot.getElementById('mobileMenu');
    
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });
  }
}

customElements.define('custom-navbar', CustomNavbar);
