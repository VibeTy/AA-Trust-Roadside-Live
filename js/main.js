// Main JavaScript functionality for A Good Steward Co.

// Sample product data - in production, this would come from a database/API
const products = [
    {
        id: 1,
        name: "Intentional Living Planner",
        description: "A comprehensive 12-month planner designed to help you live with purpose and intention.",
        price: 24.99,
        category: "planners",
        image: "assets/products/planner-1.jpg",
        featured: true,
        tags: ["planning", "productivity", "intentional living"]
    },
    {
        id: 2,
        name: "Meal Planning Templates",
        description: "Beautiful templates to streamline your meal planning and grocery shopping.",
        price: 12.99,
        category: "templates",
        image: "assets/products/meal-planning.jpg",
        featured: true,
        tags: ["meal planning", "organization", "health"]
    },
    {
        id: 3,
        name: "Budget Tracker Workbook",
        description: "Take control of your finances with this comprehensive budget tracking system.",
        price: 18.99,
        category: "ebooks",
        image: "assets/products/budget-tracker.jpg",
        featured: true,
        tags: ["budget", "finance", "money management"]
    },
    {
        id: 4,
        name: "Habit Tracker Printables",
        description: "Track your daily habits and build lasting positive routines.",
        price: 8.99,
        category: "printables",
        image: "assets/products/habit-tracker.jpg",
        featured: false,
        tags: ["habits", "tracking", "self-improvement"]
    },
    {
        id: 5,
        name: "Goal Setting Guide",
        description: "A step-by-step guide to setting and achieving meaningful goals.",
        price: 15.99,
        category: "ebooks",
        image: "assets/products/goal-setting.jpg",
        featured: false,
        tags: ["goals", "planning", "success"]
    },
    {
        id: 6,
        name: "Weekly Planning Sheets",
        description: "Simple and effective weekly planning templates for busy lives.",
        price: 9.99,
        category: "printables",
        image: "assets/products/weekly-planning.jpg",
        featured: false,
        tags: ["weekly planning", "organization", "productivity"]
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeNewsletter();
    loadFeaturedProducts();
    initializeCart();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Newsletter signup functionality
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletter-email').value;
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            
            if (email && isValidEmail(email)) {
                // Show loading state
                submitButton.innerHTML = '<span class="spinner"></span> Subscribing...';
                submitButton.disabled = true;
                
                // Simulate API call - replace with actual newsletter service integration
                setTimeout(() => {
                    showMessage('Thank you for subscribing! Check your email for your free mini-planner.', 'success');
                    newsletterForm.reset();
                    submitButton.innerHTML = 'Subscribe';
                    submitButton.disabled = false;
                }, 2000);
            } else {
                showMessage('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Load featured products on homepage
function loadFeaturedProducts() {
    const featuredGrid = document.getElementById('featured-products-grid');
    
    if (featuredGrid) {
        const featuredProducts = products.filter(product => product.featured);
        
        featuredGrid.innerHTML = featuredProducts.map(product => `
            <div class="product-card" onclick="openProductDetail(${product.id})">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price}</div>
                    <div class="product-actions">
                        <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Cart functionality
function initializeCart() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('agoodstewardco_cart');
    if (savedCart) {
        window.cart = JSON.parse(savedCart);
    } else {
        window.cart = [];
    }
    
    updateCartCount();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = window.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        window.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('agoodstewardco_cart', JSON.stringify(window.cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    showMessage(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    window.cart = window.cart.filter(item => item.id !== productId);
    localStorage.setItem('agoodstewardco_cart', JSON.stringify(window.cart));
    updateCartCount();
    
    // Reload cart page if we're on it
    if (window.location.pathname.includes('cart.html')) {
        loadCartPage();
    }
}

function updateCartQuantity(productId, newQuantity) {
    const item = window.cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            localStorage.setItem('agoodstewardco_cart', JSON.stringify(window.cart));
            updateCartCount();
            
            // Reload cart page if we're on it
            if (window.location.pathname.includes('cart.html')) {
                loadCartPage();
            }
        }
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = window.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

function getCartTotal() {
    return window.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(text, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message message-${type}`;
    message.textContent = text;
    
    // Insert at top of page
    const body = document.body;
    body.insertBefore(message, body.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}

function openProductDetail(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src || img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Export functions for use in other files
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.openProductDetail = openProductDetail;
window.products = products;