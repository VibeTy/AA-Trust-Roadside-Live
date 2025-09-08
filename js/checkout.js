// Checkout page functionality

let stripe;
let elements;
let cardElement;

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    // Check if cart is empty
    if (!window.cart || window.cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    initializeStripe();
    loadOrderSummary();
    initializeCheckoutForm();
});

// Initialize Stripe
function initializeStripe() {
    // In production, replace with your actual Stripe publishable key
    stripe = Stripe('pk_test_your_stripe_publishable_key_here');
    
    elements = stripe.elements({
        appearance: {
            theme: 'stripe',
            variables: {
                colorPrimary: '#6B73FF',
                colorBackground: '#ffffff',
                colorText: '#2D3748',
                colorDanger: '#F56565',
                fontFamily: 'Inter, system-ui, sans-serif',
                spacingUnit: '4px',
                borderRadius: '8px'
            }
        }
    });
    
    cardElement = elements.create('card', {
        style: {
            base: {
                fontSize: '16px',
                color: '#2D3748',
                '::placeholder': {
                    color: '#A0AEC0'
                }
            }
        }
    });
    
    cardElement.mount('#card-element');
    
    // Handle real-time validation errors from the card Element
    cardElement.on('change', function(event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });
}

// Load order summary
function loadOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    const subtotal = getCartTotal();
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + tax;
    
    // Display order items
    orderItemsContainer.innerHTML = window.cart.map(item => `
        <div class="order-item">
            <div class="order-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="order-item-info">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-quantity">Qty: ${item.quantity}</div>
            </div>
            <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
    
    // Update totals
    document.getElementById('order-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('order-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('order-total').textContent = `$${total.toFixed(2)}`;
}

// Initialize checkout form
function initializeCheckoutForm() {
    const form = document.getElementById('checkout-form');
    const submitButton = document.getElementById('submit-button');
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Disable submit button to prevent double submission
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner"></span> Processing...';
        
        try {
            // Create payment method
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: `${document.getElementById('first-name').value} ${document.getElementById('last-name').value}`,
                    email: document.getElementById('email').value,
                    address: {
                        line1: document.getElementById('address').value,
                        city: document.getElementById('city').value,
                        state: document.getElementById('state').value,
                        postal_code: document.getElementById('zip').value,
                    }
                }
            });
            
            if (error) {
                throw error;
            }
            
            // In a real application, you would send the payment method to your server
            // For this demo, we'll simulate a successful payment
            await simulatePayment(paymentMethod);
            
        } catch (error) {
            console.error('Payment error:', error);
            showMessage(error.message || 'An error occurred during payment. Please try again.', 'error');
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-lock"></i> Complete Purchase';
        }
    });
}

// Simulate payment processing
async function simulatePayment(paymentMethod) {
    // Show processing message
    showMessage('Processing your payment...', 'success');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate successful payment
    const orderData = {
        customer: {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            address: {
                street: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zip: document.getElementById('zip').value
            }
        },
        items: window.cart,
        total: getCartTotal() * 1.08, // Including tax
        paymentMethod: paymentMethod.id,
        orderId: generateOrderId()
    };
    
    // Clear cart
    window.cart = [];
    localStorage.setItem('agoodstewardco_cart', JSON.stringify(window.cart));
    updateCartCount();
    
    // Store order data for success page
    localStorage.setItem('agoodstewardco_order', JSON.stringify(orderData));
    
    // Redirect to success page
    window.location.href = 'order-success.html';
}

// Generate order ID
function generateOrderId() {
    return 'AGS' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
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
    
    // Insert at top of form
    const form = document.getElementById('checkout-form');
    form.insertBefore(message, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Export functions for global access
window.simulatePayment = simulatePayment;