// Order success page functionality

// Initialize order success page
document.addEventListener('DOMContentLoaded', function() {
    loadOrderDetails();
    initializeNewsletter();
});

// Load order details
function loadOrderDetails() {
    const orderData = localStorage.getItem('agoodstewardco_order');
    
    if (!orderData) {
        // Redirect to shop if no order data
        window.location.href = 'shop.html';
        return;
    }
    
    const order = JSON.parse(orderData);
    displayOrderDetails(order);
    displayDownloadItems(order.items);
}

// Display order details
function displayOrderDetails(order) {
    const orderDetailsContainer = document.getElementById('order-details');
    
    orderDetailsContainer.innerHTML = `
        <div class="order-info">
            <div class="info-item">
                <span class="info-label">Order Number:</span>
                <span class="info-value">${order.orderId}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Customer:</span>
                <span class="info-value">${order.customer.firstName} ${order.customer.lastName}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Email:</span>
                <span class="info-value">${order.customer.email}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Order Total:</span>
                <span class="info-value">$${order.total.toFixed(2)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Order Date:</span>
                <span class="info-value">${new Date().toLocaleDateString()}</span>
            </div>
        </div>
    `;
}

// Display download items
function displayDownloadItems(items) {
    const downloadItemsContainer = document.getElementById('download-items');
    
    downloadItemsContainer.innerHTML = items.map(item => `
        <div class="download-item">
            <div class="download-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="download-item-info">
                <h3>${item.name}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${item.price}</p>
            </div>
            <div class="download-item-actions">
                <button class="btn btn-primary btn-download" onclick="downloadProduct('${item.name}', ${item.id})">
                    <i class="fas fa-download"></i> Download
                </button>
            </div>
        </div>
    `).join('');
}

// Download product (simulated)
function downloadProduct(productName, productId) {
    // In a real application, this would trigger an actual download
    // For this demo, we'll show a success message
    showMessage(`${productName} download started! Check your downloads folder.`, 'success');
    
    // Simulate download
    setTimeout(() => {
        showMessage(`${productName} downloaded successfully!`, 'success');
    }, 1000);
}

// Initialize newsletter
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
                
                // Simulate API call
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

// Show message
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

// Export functions for global access
window.downloadProduct = downloadProduct;