```javascript
// ELEVATR Website Interactive Features

// Web3 Wallet Connection
let provider;
let signer;
let userAddress = null;

async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    alert('Please install MetaMask or another Web3 wallet to connect.');
    return;
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    if (accounts.length > 0) {
      userAddress = accounts[0];
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      
      updateWalletUI();
      setupWalletListeners();
    }
  } catch (error) {
    console.error('Error connecting wallet:', error);
    if (error.code === 4001) {
      // User rejected request
      console.log('User rejected connection request');
    } else {
      alert('Error connecting wallet. Please try again.');
    }
  }
}

function disconnectWallet() {
  userAddress = null;
  provider = null;
  signer = null;
  updateWalletUI();
}

function updateWalletUI() {
  const connectBtn = document.getElementById('connectWalletBtn');
  if (!connectBtn) return;
  
  if (userAddress) {
    // Show shortened address
    const shortened = userAddress.substring(0, 6) + '...' + userAddress.substring(userAddress.length - 4);
    connectBtn.textContent = shortened;
    connectBtn.classList.add('btnPrimary');
    connectBtn.classList.remove('btnSmall');
    connectBtn.style.background = 'linear-gradient(135deg, #18c6a7, #7a5cff)';
    connectBtn.style.color = '#fff';
    connectBtn.style.borderColor = 'transparent';
  } else {
    connectBtn.textContent = 'Connect Wallet';
    connectBtn.classList.remove('btnPrimary');
    connectBtn.classList.add('btnSmall');
    connectBtn.style.background = '';
    connectBtn.style.color = '';
    connectBtn.style.borderColor = '';
  }
}

function setupWalletListeners() {
  if (!window.ethereum) return;
  
  // Handle account changes
  window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length === 0) {
      // User disconnected
      disconnectWallet();
    } else {
      userAddress = accounts[0];
      updateWalletUI();
    }
  });
  
  // Handle chain changes
  window.ethereum.on('chainChanged', (_chainId) => {
    // Reload page on chain change to ensure correct network state
    window.location.reload();
  });
}

// Check if already connected on load
async function checkExistingConnection() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        userAddress = accounts[0];
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        updateWalletUI();
        setupWalletListeners();
      }
    } catch (error) {
      console.error('Error checking existing connection:', error);
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  
  
  // Wallet button click handler
  const connectWalletBtn = document.getElementById('connectWalletBtn');
  if (connectWalletBtn) {
    connectWalletBtn.addEventListener('click', () => {
      if (userAddress) {
        // If already connected, clicking could disconnect or copy address
        navigator.clipboard.writeText(userAddress).then(() => {
          const originalText = connectWalletBtn.textContent;
          connectWalletBtn.textContent = 'Address Copied!';
          setTimeout(() => {
            connectWalletBtn.textContent = originalText;
          }, 1500);
        });
      } else {
        connectWallet();
      }
    });
  }
  
  // Copy blurb functionality
const copyBtn = document.getElementById('copyBtn');
  const blurb = document.getElementById('blurb');
  
  copyBtn?.addEventListener('click', async () => {
    try{
      await navigator.clipboard.writeText(blurb.textContent.trim());
      copyBtn.textContent = 'Copied';
      setTimeout(()=> copyBtn.textContent = 'Copy blurb', 1200);
    }catch(e){
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = blurb.textContent.trim();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      copyBtn.textContent = 'Copied';
      setTimeout(()=> copyBtn.textContent = 'Copy blurb', 1200);
    }
  });

  // Tier calculator
  const tiers = [
    { name: 'Lobby Holder', min: 0, weight: 1, note: 'Base eligibility when distributions are active.' },
    { name: 'Skydeck Holder', min: 100000, weight: 2, note: 'Higher weighting for consistent holders.' },
    { name: 'Penthouse Holder', min: 1000000, weight: 3, note: 'Highest weighting for long-term aligned holders.' },
  ];

  const holdInput = document.getElementById('holdInput');
  const calcBtn = document.getElementById('calcBtn');
  const tierResult = document.getElementById('tierResult');

  function getTier(amount){
    let t = tiers[0];
    for(const tier of tiers){
      if(amount >= tier.min) t = tier;
    }
    return t;
  }

  function format(n){
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);
  }

  calcBtn?.addEventListener('click', () => {
    const raw = (holdInput.value || '').replace(/,/g,'').trim();
    const amt = Number(raw);
    if(!isFinite(amt) || amt < 0){
      tierResult.style.display = 'block';
      tierResult.innerHTML = '<b>Enter a valid number.</b><span>Example: 250000</span>';
      return;
    }
    const t = getTier(amt);
    tierResult.style.display = 'block';
    tierResult.innerHTML = `<b>Your tier: ${t.name}</b><span>Holding: ${format(amt)} ELVTR • Example weighting: ${t.weight}×<br/>${t.note}<br/><br/><em>This is a UI preview, not a promise of returns.</em></span>`;
  });
  // Allow Enter key to trigger calculation
  holdInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      calcBtn?.click();
    }
  });

  // Update year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
