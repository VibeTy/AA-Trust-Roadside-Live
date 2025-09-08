// Contact page functionality

// Initialize contact page
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

// Initialize contact form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('.btn-submit');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            newsletter: formData.get('newsletter') === 'on'
        };
        
        // Validate form
        if (!validateContactForm(data)) {
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner"></span> Sending...';
        
        // Simulate form submission
        setTimeout(() => {
            // In a real application, you would send this data to your server
            console.log('Contact form submission:', data);
            
            // Show success message
            showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            form.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            
        }, 2000);
    });
}

// Validate contact form
function validateContactForm(data) {
    const errors = [];
    
    if (!data.firstName.trim()) {
        errors.push('First name is required');
    }
    
    if (!data.lastName.trim()) {
        errors.push('Last name is required');
    }
    
    if (!data.email.trim()) {
        errors.push('Email address is required');
    } else if (!isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject) {
        errors.push('Please select a subject');
    }
    
    if (!data.message.trim()) {
        errors.push('Message is required');
    } else if (data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        showMessage(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Show message
function showMessage(text, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message message-${type}`;
    message.innerHTML = text;
    
    // Insert at top of form
    const form = document.getElementById('contact-form');
    form.insertBefore(message, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}