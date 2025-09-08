// Product detail page functionality

let currentProduct = null;
let relatedProducts = [];

// Initialize product page
document.addEventListener('DOMContentLoaded', function() {
    loadProduct();
    initializeNewsletter();
});

// Load product based on URL parameter
function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        showProductNotFound();
        return;
    }
    
    currentProduct = products.find(product => product.id === productId);
    
    if (!currentProduct) {
        showProductNotFound();
        return;
    }
    
    displayProduct();
    loadRelatedProducts();
    updatePageMeta();
}

// Display product details
function displayProduct() {
    const productContent = document.getElementById('product-detail-content');
    
    productContent.innerHTML = `
        <div class="product-images">
            <div class="product-main-image">
                <img src="${currentProduct.image}" alt="${currentProduct.name}" id="main-product-image">
            </div>
            <div class="product-thumbnails">
                <div class="product-thumbnail active" onclick="changeMainImage('${currentProduct.image}')">
                    <img src="${currentProduct.image}" alt="${currentProduct.name}">
                </div>
                <!-- Additional thumbnails can be added here if product has multiple images -->
            </div>
        </div>
        
        <div class="product-info">
            <div class="product-category">${currentProduct.category}</div>
            <h1 class="product-title">${currentProduct.name}</h1>
            <div class="product-price">$${currentProduct.price}</div>
            <div class="product-description">${currentProduct.description}</div>
            
            <div class="product-features">
                <h4>What's Included:</h4>
                <ul class="features-list">
                    <li><i class="fas fa-check"></i> Instant digital download</li>
                    <li><i class="fas fa-check"></i> High-quality PDF format</li>
                    <li><i class="fas fa-check"></i> Print-ready files</li>
                    <li><i class="fas fa-check"></i> Commercial use license</li>
                    <li><i class="fas fa-check"></i> Lifetime access</li>
                </ul>
            </div>
            
            <div class="product-tags">
                ${currentProduct.tags.map(tag => `<span class="product-tag">${tag}</span>`).join('')}
            </div>
            
            <div class="product-actions">
                <button class="btn-buy-now" onclick="buyNow(${currentProduct.id})">
                    <i class="fas fa-shopping-bag"></i> Buy Now
                </button>
                <button class="btn-add-to-cart" onclick="addToCart(${currentProduct.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
            
            <div class="product-delivery">
                <h4><i class="fas fa-download"></i> Instant Delivery</h4>
                <p>Your digital product will be available for download immediately after purchase. You'll receive an email with download links and instructions.</p>
            </div>
            
            <div class="product-guarantee">
                <h4><i class="fas fa-shield-alt"></i> 30-Day Money Back Guarantee</h4>
                <p>If you're not completely satisfied with your purchase, we'll refund your money within 30 days.</p>
            </div>
        </div>
    `;
}

// Change main product image
function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    
    mainImage.src = imageSrc;
    
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.querySelector('img').src === imageSrc) {
            thumb.classList.add('active');
        }
    });
}

// Load related products
function loadRelatedProducts() {
    relatedProducts = products
        .filter(product => 
            product.id !== currentProduct.id && 
            (product.category === currentProduct.category || 
             product.tags.some(tag => currentProduct.tags.includes(tag)))
        )
        .slice(0, 4);
    
    displayRelatedProducts();
}

// Display related products
function displayRelatedProducts() {
    const relatedGrid = document.getElementById('related-products-grid');
    
    if (relatedProducts.length === 0) {
        relatedGrid.parentElement.style.display = 'none';
        return;
    }
    
    relatedGrid.innerHTML = relatedProducts.map(product => `
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

// Update page meta tags
function updatePageMeta() {
    document.title = `${currentProduct.name} - A Good Steward Co.`;
    document.getElementById('product-title').textContent = `${currentProduct.name} - A Good Steward Co.`;
    document.getElementById('product-description-meta').content = currentProduct.description;
    document.getElementById('og-title').content = `${currentProduct.name} - A Good Steward Co.`;
    document.getElementById('og-description').content = currentProduct.description;
    document.getElementById('og-image').content = currentProduct.image;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-product').textContent = currentProduct.name;
}

// Buy now functionality
function buyNow(productId) {
    // Add to cart and redirect to checkout
    addToCart(productId);
    window.location.href = 'checkout.html';
}

// Show product not found
function showProductNotFound() {
    const productContent = document.getElementById('product-detail-content');
    
    productContent.innerHTML = `
        <div class="product-loading">
            <div class="spinner"></div>
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist or has been removed.</p>
            <a href="shop.html" class="btn btn-primary">Back to Shop</a>
        </div>
    `;
    
    // Hide related products section
    document.querySelector('.related-products').style.display = 'none';
}

// Newsletter form handling
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

// Export functions for global access
window.changeMainImage = changeMainImage;
window.buyNow = buyNow;