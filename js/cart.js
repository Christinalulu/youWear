// cart.js
document.addEventListener('DOMContentLoaded', () => {
    const itemsEl = document.getElementById('cartItems');
    const countEl = document.getElementById('cartCount');
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const grandEl = document.getElementById('grandTotal');

    // Helpers
    const formatCurrency = (n) =>
        '$' + Number(n || 0).toFixed(2);

    const load = () => JSON.parse(localStorage.getItem('cart') || '[]');
    const save = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

    const productList =
        (typeof products !== 'undefined' && Array.isArray(products)) ? products :
            (typeof window !== 'undefined' && Array.isArray(window.products)) ? window.products :
                [];

    const productById = {};
    productList.forEach(p => { if (p && p.id) productById[p.id] = p; });

    // Calculate subtotal, shipping, and total
    function computeTotals(cart) {
        const subtotal = cart.reduce((sum, item) => {
            const p = productById[item.id] || {};
            const price = (item.price != null ? item.price : p.price) || 0;
            const qty = Number(item.qty || 1);
            return sum + price * qty;
        }, 0);
        const shipping = 0; // free shipping
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }

    // Render a single cart row
    function rowTemplate(item, idx) {
        const p = productById[item.id] || {};
        const brand = (p.for || '').toUpperCase();
        const title = p.title || 'Untitled';
        const img = p.img || '';
        const color = item.color || p.color || '—';
        const size = item.size || (Array.isArray(p.sizes) ? p.sizes[0] : p.sizes || '—');
        const price = (item.price != null ? item.price : p.price) || 0;
        const qty = Number(item.qty || 1);

        return `
      <div class="cart-row" data-index="${idx}">
        <img class="item-thumb" src="${img}" alt="${title}">
        <div class="item-main">
          <div class="brand">${brand}</div>
          <div class="title">${title}</div>
          <div class="meta"><strong>Color:</strong> ${color}</div>
          <div class="meta"><strong>Size:</strong> ${size}</div>
        </div>

        <div class="item-qty">
          <select class="qty-select" aria-label="Quantity">
            ${[...Array(10)].map((_, i) => `<option value="${i + 1}" ${i + 1 === qty ? 'selected' : ''}>${i + 1}</option>`).join('')}
          </select>
        </div>

        <div class="item-actions">
          <div class="item-price">${formatCurrency(price * qty)}</div>
          <button class="btn-remove" title="Remove item">×</button>
        </div>
      </div>
    `;
    }

    // Add event listeners for quantity and remove buttons
    function wireRowEvents(container, cart) {
        container.querySelectorAll('.cart-row').forEach(row => {
            const idx = Number(row.dataset.index);
            const select = row.querySelector('.qty-select');
            const removeBtn = row.querySelector('.btn-remove');

            select.addEventListener('change', () => {
                cart[idx].qty = Number(select.value);
                save(cart);
                render(); // refresh cart view
            });

            removeBtn.addEventListener('click', () => {
                cart.splice(idx, 1);
                save(cart);
                render();
            });
        });
    }

    // Render all cart items
    function render() {
        const cart = load();
        const count = cart.reduce((n, item) => n + Number(item.qty || 1), 0);
        if (countEl) countEl.textContent = `(${count} items)`;

        if (!cart.length) {
            itemsEl.innerHTML = '';
            if (subtotalEl) subtotalEl.textContent = formatCurrency(0);
            if (shippingEl) shippingEl.textContent = formatCurrency(0);
            if (grandEl) grandEl.textContent = formatCurrency(0);
            return;
        }

        itemsEl.innerHTML = cart.map(rowTemplate).join('');
        wireRowEvents(itemsEl, cart);

        const { subtotal, shipping, total } = computeTotals(cart);
        if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
        if (shippingEl) shippingEl.textContent = formatCurrency(shipping);
        if (grandEl) grandEl.textContent = formatCurrency(total);
    }

    render();
});

document.addEventListener('DOMContentLoaded', () => {
    const pills = document.querySelectorAll('.payments .pill');
    const STORAGE_KEY = 'selectedPaymentMethod';

    // Load saved method from localStorage
    const savedMethod = localStorage.getItem(STORAGE_KEY);
    if (savedMethod) {
        pills.forEach(p => {
            if (p.textContent.trim() === savedMethod) {
                p.classList.add('active');
            }
        });
    }

    // When user clicks a pill
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            localStorage.setItem(STORAGE_KEY, pill.textContent.trim());
        });
    });
});
