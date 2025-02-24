// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cart Functionality
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.getElementById('cart-total-amount');

let cart = [];

cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartSidebar.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Modal Handling
const loginBtn = document.querySelector('.login-btn');
const modal = document.getElementById('login-modal');
const closeModal = document.querySelector('.close-modal');
const loginForm = document.getElementById('login-form');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle login logic here
    alert('Login functionality will be implemented soon!');
    modal.style.display = 'none';
});

// Sample Products Data
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 99.99,
        image: 'Sony WH-CH720N Noise Canceling Wireless.jfif',
        category: 'Electronics'
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        image: 'Ultimate Fitness Watch for Men and Women  Waterproof Sleep Tracker Pedometer - Orange.jfif',
        category: 'Electronics'
    },
    {
        id: 3,
        name: 'Running Shoes',
        price: 79.99,
        image: 'These Expert-Backed Shoes Are Perfect for Runners with Achey Knees & Joints.jfif',
        category: 'Fashion'
    },
    {
        id: 4,
        name: 'Backpack',
        price: 49.99,
        image: 'download (2).jfif',
        category: 'Fashion'
    },
    {
        id: 5,
        name: 'Coffee Maker',
        price: 129.99,
        image: 'Gevi 10-Cup Coffee Maker.jfif',
        category: 'Home & Living'
    },
    {
        id: 6,
        name: 'Face Cream',
        price: 24.99,
        image: 'CeraVe Moisturizing Cream for Your Body and Face_ Highly Recommended for All My Alligator People!.jfif',
        category: 'Beauty'
    }
];

// Populate Featured Products
const featuredProducts = document.getElementById('featured-products');

products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">
                Add to Cart <i class="fas fa-shopping-cart"></i>
            </button>
        </div>
    `;
    featuredProducts.appendChild(productCard);
});

// Add to Cart Functionality
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        total += product.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div style="display: flex; align-items: center; padding: 1rem; border-bottom: 1px solid #eee;">
                <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 1rem;">
                <div style="flex: 1;">
                    <h4>${product.name}</h4>
                    <p>$${product.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="remove-item" data-id="${product.id}" style="background: none; border: none; color: #ff6b6b; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.dataset.id);
            cart = cart.filter(item => item.id !== id);
            updateCart();
        });
    });
}

// Add to Cart Event Listeners
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart') || e.target.parentElement.classList.contains('add-to-cart')) {
        const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.parentElement;
        const id = parseInt(button.dataset.id);
        
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, quantity: 1 });
        }
        
        updateCart();
        cartSidebar.classList.add('active');
    }
});

// Newsletter Subscription
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    alert(`Thank you for subscribing with ${email}! You'll receive our latest updates soon.`);
    e.target.reset();
});

// Search Functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.category.toLowerCase().includes(searchTerm)
        );
        // Here you would typically update the UI with filtered products
        alert(`Found ${filteredProducts.length} products matching "${searchTerm}"`);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});
