// checkout.js
document.addEventListener('DOMContentLoaded', () => {
    // ===== Helpers & data =====
    const formatCurrency = n => '$' + Number(n || 0).toFixed(2);
    const loadCart = () => {
        try { return JSON.parse(localStorage.getItem('cart') || '[]'); }
        catch { return []; }
    };

    // Build lookup from the global products list
    const productList =
        (typeof products !== 'undefined' && Array.isArray(products)) ? products :
            (typeof window !== 'undefined' && Array.isArray(window.products)) ? window.products :
                [];

    const productById = productList.reduce((m, p) => { if (p && p.id) m[p.id] = p; return m; }, {});

    function computeTotals(cart) {
        const subtotal = cart.reduce((sum, it) => {
            const p = productById[it.id] || {};
            const price = (it.price != null ? it.price : p.price) || 0;
            const qty = Number(it.qty || 1);
            return sum + price * qty;
        }, 0);
        const shipping = 0;
        return { subtotal, shipping, total: subtotal + shipping };
    }

    // ===== Render order summary =====
    (function renderSummary() {
        const mini = document.getElementById('miniItems');
        const cart = loadCart();
        if (mini) {
            mini.innerHTML = cart.map(it => {
                const p = productById[it.id] || {};
                const title = p.title || it.title || 'Item';
                const img = p.img || it.img || '';
                const qty = Number(it.qty || 1);
                const price = (it.price != null ? it.price : p.price) || 0;
                const size = it.size || (Array.isArray(p.sizes) ? p.sizes[0] : p.sizes || '');
                return  `
          <div class="item-mini">
            <img src="${img}" alt="${title}">
            <div>
              <div>${title}</div>
              <div class="muted">Qty: ${qty}</div>
            </div>
            <div style="margin-left:auto; font-weight:600;">${formatCurrency(price * qty)}</div>
          </div>`;
            }).join('');
        }

        const { subtotal, shipping, total } = computeTotals(cart);
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        set('sumSubtotal', formatCurrency(subtotal));
        set('sumShipping', formatCurrency(shipping));
        set('sumTotal', formatCurrency(total));
    })();

    // ===== Input helpers =====
    const cardNumberEl = document.getElementById('cardNumber');
    const expEl = document.getElementById('exp');
    const cvcEl = document.getElementById('cvc');

    if (cardNumberEl) {
        cardNumberEl.addEventListener('input', e => {
            let v = e.target.value.replace(/\D/g, '').slice(0, 16);
            e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
        });
    }
    if (expEl) {
        expEl.addEventListener('input', e => {
            let v = e.target.value.replace(/\D/g, '').slice(0, 4);
            if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
            e.target.value = v;
        });
    }
    if (cvcEl) {
        cvcEl.addEventListener('input', e => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
        });
    }

    // ===== Validation + success modal =====
    const form = document.getElementById('checkoutForm');
    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('closeSuccess');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic checks (“rules”)
            if (!form.cardName.value.trim()) return form.cardName.focus();
            if (!cardNumberEl || cardNumberEl.value.replace(/\s/g, '').length < 16) return cardNumberEl && cardNumberEl.focus();
            if (!expEl || !/^\d{2}\/\d{2}$/.test(expEl.value)) return expEl && expEl.focus();
            if (!cvcEl || cvcEl.value.length < 3) return cvcEl && cvcEl.focus();
            if (!form.email.value.includes('@')) return form.email.focus();

            // Show success
            if (modal) modal.classList.add('show');

            // Clear cart for next visit
            localStorage.removeItem('cart');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) modal.classList.remove('show');
            // Back to products to continue shopping
            window.location.href = '../html/products.html';
        });
    }
});
