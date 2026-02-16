// ELEVATR Website Interactive Features
// Clean + working (no duplicate blocks)

// OPTIONAL: If you keep any old MetaMask code around, this prevents crashes if ethers isn't loaded
// (But this site is Solana, so we do NOT use MetaMask here.)
const ETHERS_AVAILABLE = typeof window.ethers !== "undefined";

document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // Wallet button (Solana placeholder)
  // -----------------------------
  const connectWalletBtn = document.getElementById("connectWalletBtn");
  if (connectWalletBtn) {
    connectWalletBtn.addEventListener("click", () => {
      alert("Wallet connect is coming soon. For Solana, we will support Phantom.");
    });
  }

  // -----------------------------
  // Copy blurb
  // -----------------------------
  const copyBtn = document.getElementById("copyBtn");
  const blurb = document.getElementById("blurb");

  if (copyBtn && blurb) {
    copyBtn.addEventListener("click", async () => {
      const text = (blurb.textContent || "").trim();
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "Copied";
        setTimeout(() => (copyBtn.textContent = "Copy blurb"), 1200);
      } catch (e) {
        // Fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        copyBtn.textContent = "Copied";
        setTimeout(() => (copyBtn.textContent = "Copy blurb"), 1200);
      }
    });
  }

  // -----------------------------
  // Tier preview (THIS is the Preview button)
  // -----------------------------
  const tiers = [
    { name: "Lobby Holder",     min: 0,        weight: 1, note: "Base eligibility when distributions are active." },
    { name: "Skydeck Holder",   min: 200000,   weight: 2, note: "Higher weighting for consistent holders." },
    { name: "Penthouse Holder", min: 2500000,  weight: 3, note: "Highest weighting for long-term aligned holders." },
  ];

  const holdInput = document.getElementById("holdInput");
  const calcBtn = document.getElementById("calcBtn");
  const tierResult = document.getElementById("tierResult");

  if (!holdInput || !calcBtn || !tierResult) {
    console.warn("Tier preview elements missing:", { holdInput, calcBtn, tierResult });
  } else {
    const format = (n) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);

    const getTier = (amount) => {
      let current = tiers[0];
      for (const t of tiers) {
        if (amount >= t.min) current = t;
      }
      return current;
    };

    const showTier = () => {
      const raw = (holdInput.value || "").replace(/,/g, "").trim();
      const amt = Number(raw);

      tierResult.style.display = "block";

      if (!Number.isFinite(amt) || amt < 0) {
        tierResult.innerHTML =
          '<b>Enter a valid number.</b><span style="display:block;margin-top:6px;">Example: 250000</span>';
        return;
      }

      const t = getTier(amt);

      tierResult.innerHTML =
        `<b>Your tier: ${t.name}</b>` +
        `<span style="display:block;margin-top:6px;line-height:1.5;">` +
        `Holding: ${format(amt)} ELVTR • Example weighting: ${t.weight}×<br/>` +
        `${t.note}<br/><br/><em>This is a tier preview UI, not a promise of returns.</em>` +
        `</span>`;
    };

    calcBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showTier();
    });

    holdInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") showTier();
    });
  }

  // -----------------------------
  // Footer year
  // -----------------------------
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
