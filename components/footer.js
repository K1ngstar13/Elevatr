class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        footer {
          font-family: 'Inter', system-ui, sans-serif;
          background: #020617;
          border-top: 1px solid #1e293b;
          padding: 3rem 1rem;
        }
        
        .container {
          max-width: 80rem;
          margin: 0 auto;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .brand {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #f1f5f9;
          font-weight: 700;
          font-size: 1.25rem;
          text-decoration: none;
        }
        
        .brand-icon {
          width: 2rem;
          height: 2rem;
          background: linear-gradient(135deg, #06b6d4, #7c3aed);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .brand p {
          color: #64748b;
          font-size: 0.875rem;
          max-width: 20rem;
          line-height: 1.5;
        }
        
        .links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        
        .link-group h4 {
          color: #f1f5f9;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .link-group a {
          display: block;
          color: #64748b;
          text-decoration: none;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          transition: color 0.2s;
        }
        
        .link-group a:hover {
          color: #06b6d4;
        }
        
        .bottom {
          padding-top: 2rem;
          border-top: 1px solid #1e293b;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          text-align: center;
        }
        
        .bottom p {
          color: #475569;
          font-size: 0.875rem;
          font-family: 'JetBrains Mono', monospace;
        }
        
        .socials {
          display: flex;
          gap: 1rem;
        }
        
        .socials a {
          color: #64748b;
          transition: color 0.2s;
        }
        
        .socials a:hover {
          color: #06b6d4;
        }
        
        @media (min-width: 640px) {
          .links {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (min-width: 768px) {
          .footer-content {
            grid-template-columns: 2fr 3fr;
          }
          .bottom {
            flex-direction: row;
            justify-content: space-between;
          }
        }
      </style>
      
      <footer>
        <div class="container">
          <div class="footer-content">
            <div class="brand">
              <a href="/" class="brand-logo">
                <div class="brand-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                NeoSignal
              </a>
              <p>AI-native signal engine built on BNB Chain. Turn noise into signal.</p>
            </div>
            
            <div class="links">
              <div class="link-group">
                <h4>Product</h4>
                <a href="#studio">Studio</a>
                <a href="#feed">Feed</a>
                <a href="#challenges">Challenges</a>
              </div>
              
              <div class="link-group">
                <h4>Resources</h4>
                <a href="https://docs.neosignal.io" target="_blank">Documentation</a>
                <a href="#token">Tokenomics</a>
                <a href="#roadmap">Roadmap</a>
              </div>
              
              <div class="link-group">
                <h4>Community</h4>
                <a href="https://x.com/neosignal" target="_blank">X / Twitter</a>
                <a href="https://t.me/neosignal" target="_blank">Telegram</a>
                <a href="https://discord.gg/neosignal" target="_blank">Discord</a>
              </div>
            </div>
          </div>
          
          <div class="bottom">
            <p>© 2024 NeoSignal. All rights reserved.</p>
            <div class="socials">
              <a href="https://x.com/neosignal" target="_blank" aria-label="X">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="https://t.me/neosignal" target="_blank" aria-label="Telegram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </a>
              <a href="https://discord.gg/neosignal" target="_blank" aria-label="Discord">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);
