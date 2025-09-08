// Shop page functionality

let filteredProducts = [];
let currentFilters = {
    category: '',
    price: '',
    sort: 'name',
    search: ''
};

// Initialize shop page
document.addEventListener('DOMContentLoaded', function() {
    initializeShopFilters();
    loadAllProducts();
    handleURLParams();
});

// Handle URL parameters for direct category links
function handleURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        document.getElementById('category-filter').value = category;
        currentFilters.category = category;
        applyFilters();
    }
}

// Initialize filter functionality
function initializeShopFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const resetSearchBtn = document.getElementById('reset-search');

    // Filter event listeners
    categoryFilter.addEventListener('change', function() {
        currentFilters.category = this.value;
        applyFilters();
    });

    priceFilter.addEventListener('change', function() {
        currentFilters.price = this.value;
        applyFilters();
    });

    sortFilter.addEventListener('change', function() {
        currentFilters.sort = this.value;
        applyFilters();
    });

    // Search functionality
    searchInput.addEventListener('input', debounce(function() {
        currentFilters.search = this.value.toLowerCase();
        applyFilters();
    }, 300));

    searchBtn.addEventListener('click', function() {
        currentFilters.search = searchInput.value.toLowerCase();
        applyFilters();
    });

    // Clear filters
    clearFiltersBtn.addEventListener('click', clearFilters);
    resetSearchBtn.addEventListener('click', clearFilters);
}

// Load all products
function loadAllProducts() {
    filteredProducts = [...products];
    displayProducts();
    updateResultsCount();
}

// Apply filters to products
function applyFilters() {
    let filtered = [...products];

    // Category filter
    if (currentFilters.category) {
        filtered = filtered.filter(product => product.category === currentFilters.category);
    }

    // Price filter
    if (currentFilters.price) {
        const [min, max] = currentFilters.price.split('-').map(Number);
        filtered = filtered.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }

    // Search filter
    if (currentFilters.search) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(currentFilters.search) ||
            product.description.toLowerCase().includes(currentFilters.search) ||
            product.tags.some(tag => tag.toLowerCase().includes(currentFilters.search))
        );
    }

    // Sort products
    filtered = sortProducts(filtered, currentFilters.sort);

    filteredProducts = filtered;
    displayProducts();
    updateResultsCount();
}

// Sort products based on selected criteria
function sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch (sortBy) {
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'featured':
            return sorted.sort((a, b) => b.featured - a.featured);
        default:
            return sorted;
    }
}

// Display products in grid
function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    const loadingSpinner = document.getElementById('loading-spinner');
    const noProducts = document.getElementById('no-products');

    // Hide loading spinner
    loadingSpinner.style.display = 'none';

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '';
        noProducts.style.display = 'block';
        return;
    }

    noProducts.style.display = 'none';

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="openProductDetail(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.featured ? '<div class="product-badge">Featured</div>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <div class="product-tags">
                    ${product.tags.map(tag => `<span class="product-tag">${tag}</span>`).join('')}
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn-quick-view" onclick="event.stopPropagation(); openProductDetail(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Update results count
function updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    const count = filteredProducts.length;
    const total = products.length;
    
    if (count === total) {
        resultsCount.textContent = `Showing all ${total} products`;
    } else {
        resultsCount.textContent = `Showing ${count} of ${total} products`;
    }
}

// Clear all filters
function clearFilters() {
    currentFilters = {
        category: '',
        price: '',
        sort: 'name',
        search: ''
    };

    // Reset form elements
    document.getElementById('category-filter').value = '';
    document.getElementById('price-filter').value = '';
    document.getElementById('sort-filter').value = 'name';
    document.getElementById('search-input').value = '';

    // Apply cleared filters
    applyFilters();
}

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Newsletter form handling for shop page
document.addEventListener('DOMContentLoaded', function() {
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
});

// Export functions for global access
window.clearFilters = clearFilters;
window.applyFilters = applyFilters;