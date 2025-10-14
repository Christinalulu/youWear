
const products = [
    {
        id: "cloth01",
        title: "Urban Drift Denim Jacket",
        for: "Men",
        color: "Washed Blue",
        sizes: ["S","M","L","XL"],
        price: 89.99,
        desc: "A classic denim jacket with a relaxed fit and washed blue tone. Built for everyday layering and street-ready style.",
        img: "../img/products/cloth01.jpg"
    },
    {
        id: "cloth02",
        title: "SoftCloud Pants",
        for: "Women",
        color: "Cream White",
        sizes: ["XS","S","M","L"],
        price: 79.99,
        desc: "Lightweight and ultra-soft cream pants that combine casual comfort with effortless elegance. Perfect for lounging or a day out.",
        img: "../img/products/cloth02.jpg"
    },
    {
        id: "cloth03",
        title: "ShadowFlex Cargo Pants",
        for: "Men",
        color: "Charcoal Grey",
        sizes: ["S","M","L","XL"],
        price: 69.99,
        desc: "Modern cargo pants with deep utility pockets and a tapered silhouette. Durable stretch fabric keeps you moving freely all day.",
        img: "../img/products/cloth03.jpg"
    },
    {
        id: "cloth04",
        title: "BloomMist Summer Dress",
        for: "Women",
        color: "Soft Pink",
        sizes: ["XS","S","M","L"],
        price: 64.99,
        desc: "A flowing pink summer dress made from breathable fabric. Lightweight, romantic, and perfect for warm days or sunset dinners.",
        img: "../img/products/cloth04.jpg"
    },
    {
        id: "cloth05",
        title: "Midnight Hoodie",
        for: "Men",
        color: "Jet Black",
        sizes: ["S","M","L","XL"],
        price: 74.99,
        desc: "A sleek black hoodie crafted from heavyweight cotton. Minimalist design meets all-day comfort — ideal for gym or streetwear.",
        img: "../img/products/cloth05.jpg"
    },
    {
        id: "cloth06",
        title: "Linen Aura Shirt",
        for: "Women",
        color: "Off-White",
        sizes: ["XS","S","M","L"],
        price: 59.99,
        desc: "An airy off-white linen shirt that’s light, breathable, and effortlessly elegant — a perfect everyday staple.",
        img: "../img/products/cloth06.jpg"
    },
    {
        id: "cloth07",
        title: "TrailEdge Puffer Vest",
        for: "Women",
        color: "Olive Green",
        sizes: ["M","L","XL"],
        price: 84.99,
        desc: "A lightweight puffer vest offering core warmth without bulk. The olive tone adds a rugged, outdoor-ready aesthetic.",
        img: "../img/products/cloth07.jpg"
    },
    {
        id: "cloth08",
        title: "VelvetTone Sweatpants",
        for: "Women",
        color: "Deep Burgundy",
        sizes: ["S","M","L"],
        price: 54.99,
        desc: "Luxuriously soft burgundy sweatpants made with a velvet-finish fabric. Comfy enough for home, stylish enough for errands.",
        img: "../img/products/cloth08.jpg"
    },
    {
        id: "cloth09",
        title: "DriftEase Jacket",
        for: "Men",
        color: "Ash Grey",
        sizes: ["S","M","L","XL"],
        price: 94.99,
        desc: "A sporty ash-grey jacket that blends performance and style. Lightweight insulation keeps you comfortable in any season.",
        img: "../img/products/cloth09.jpg"
    },
    {
        id: "cloth10",
        title: "Coastline Linen Pants",
        for: "Women",
        color: "Sand Beige",
        sizes: ["XS","S","M","L"],
        price: 69.99,
        desc: "Relaxed-fit linen pants in soft beige. Cool, breathable, and versatile — perfect for sunny days and travel.",
        img: "../img/products/cloth10.jpg"
    },
    {
        id: "cloth11",
        title: "SkyRise Shoes",
        for: "Women",
        color: "Light Blue",
        sizes: ["36","37","38","39","40","41"],
        price: 119.99,
        desc: "Contemporary light-blue sneakers with cushioned soles and a sleek design. Lightweight comfort for city walks or weekend wear.",
        img: "../img/products/cloth11.jpg"
    },
    {
        id: "cloth12",
        title: "EmberTone Overshirt",
        for: "Men",
        color: "Burnt Orange",
        sizes: ["M","L","XL"],
        price: 99.99,
        desc: "A rugged overshirt in warm burnt orange. Crafted from textured cotton and designed to layer easily over tees or sweaters.",
        img: "../img/products/cloth12.jpg"
    }
];




// ---- Render cards using your structure ----
const productsEl = document.getElementById('products');

function renderCards() {
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product';
        card.setAttribute('data-id', p.id);

        card.innerHTML = `
          <div class="product_Name">
            <h2>${p.title}</h2>
          </div>
          <div class="product_Image">
            <img src="${p.img}" alt="${p.title}">
            
    <div class="price-overlay">$${p.price.toFixed(2)}</div>
  </div>
          </div>
          <div class="product_btns">
            <button class="btn-details" type="button">Details</button>
            
          </div>
        `;

        productsEl.appendChild(card);
    });
}
renderCards();

// ---- Drawer logic ----
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('drawerOverlay');
const closeBtn = document.getElementById('drawerClose');

const elTitle = document.getElementById('drawerTitle');
const elImg   = document.getElementById('drawerImg');
const elFor   = document.getElementById('drawerFor');
const elColor = document.getElementById('drawerColor');
const elSizes = document.getElementById('drawerSizes');
const elDesc  = document.getElementById('drawerDesc');
const btnAddCart = document.getElementById('drawerAddCart');
const elPrice = document.getElementById('drawerPrice');

const sizeModal = document.getElementById('sizeModal');
const closeSize = document.getElementById('closeSize');


function openSizeModal() {
    sizeModal.classList.add('open');
    sizeModal.setAttribute('aria-hidden', 'false');
}
function closeSizeModal() {
    sizeModal.classList.remove('open');
    sizeModal.setAttribute('aria-hidden', 'true');
}
if (closeSize) closeSize.addEventListener('click', closeSizeModal);
if (sizeModal) {
    sizeModal.addEventListener('click', (e) => {
        if (e.target === sizeModal) closeSizeModal();
    });
}

function openDrawer(product) {
    elTitle.textContent = product.title;
    elImg.src = product.img;
    elImg.alt = product.title;
    elFor.textContent = product.for;
    elColor.textContent = product.color;
    elPrice.textContent = `$${product.price.toFixed(2)}`;
    elSizes.innerHTML = '';
    let selectedSize = null;

    product.sizes.forEach(s => {
        const pill = document.createElement('span');
        pill.className = 'size-pill';
        pill.textContent = s;
        pill.addEventListener('click', () => {
            elSizes.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            selectedSize = s;
        });
        elSizes.appendChild(pill);
    });
    elDesc.textContent = product.desc;

    btnAddCart.onclick = () => {
        if (!selectedSize) {
            openSizeModal();
            return;
        }
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(item => item.id === product.id && item.size === selectedSize);
        if (existing) {
            existing.qty = (existing.qty || 1) + 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                img: product.img,
                price: product.price,
                color: product.color,
                size: selectedSize,
                qty: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = "../html/cart.html";
    };

    drawer.classList.add('open');
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
}

function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
}

overlay.addEventListener('click', closeDrawer);
closeBtn.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
});


productsEl.addEventListener('click', (e) => {
    const detailsBtn = e.target.closest('.btn-details');
    const card = e.target.closest('.product');
    if (!card) return;

    const id = card.getAttribute('data-id');
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (detailsBtn) {
        openDrawer(product);
    }
});
