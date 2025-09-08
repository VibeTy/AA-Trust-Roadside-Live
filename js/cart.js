// Cart page functionality

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    loadCartPage();
    loadRecommendedProducts();
});

// Load cart page content
function loadCartPage() {
    if (!window.cart || window.cart.length === 0) {
        showEmptyCart();
        return;
    }
    
    displayCartItems();
    updateCartSummary();
}

// Display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    cartItemsContainer.innerHTML = window.cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="cart-item-info">
                <h3 class="cart-item-title">${item.name}</h3>
                <div class="cart-item-category">${getProductCategory(item.id)}</div>
                <div class="cart-item-price">$${item.price}</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" 
                           onchange="updateCartQuantity(${item.id}, parseInt(this.value))">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `).join('');
}

// Update cart summary
function updateCartSummary() {
    const subtotal = getCartTotal();
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + tax;
    
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

// Show empty cart state
function showEmptyCart() {
    document.getElementById('cart-items').style.display = 'none';
    document.getElementById('empty-cart').style.display = 'block';
    document.getElementById('recommended-products').style.display = 'none';
}

// Load recommended products
function loadRecommendedProducts() {
    if (!window.cart || window.cart.length === 0) {
        return;
    }
    
    // Get categories of items in cart
    const cartCategories = window.cart.map(item => getProductCategory(item.id));
    const cartProductIds = window.cart.map(item => item.id);
    
    // Find products in same categories that aren't already in cart
    const recommended = products.filter(product => 
        !cartProductIds.includes(product.id) && 
        cartCategories.includes(product.category)
    ).slice(0, 4);
    
    displayRecommendedProducts(recommended);
}

// Display recommended products
function displayRecommendedProducts(products) {
    const recommendedGrid = document.getElementById('recommended-grid');
    
    if (products.length === 0) {
        document.getElementById('recommended-products').style.display = 'none';
        return;
    }
    
    recommendedGrid.innerHTML = products.map(product => `
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

// Get product category by ID
function getProductCategory(productId) {
    const product = products.find(p => p.id === productId);
    return product ? product.category : 'unknown';
}

// Proceed to checkout
function proceedToCheckout() {
    if (!window.cart || window.cart.length === 0) {
        showMessage('Your cart is empty. Add some products first!', 'error');
        return;
    }
    
    // In a real application, you would redirect to checkout
    // For now, we'll simulate the checkout process
    showMessage('Redirecting to secure checkout...', 'success');
    
    setTimeout(() => {
        // Simulate checkout redirect
        window.location.href = 'checkout.html';
    }, 1500);
}

// Export functions for global access
window.proceedToCheckout = proceedToCheckout;