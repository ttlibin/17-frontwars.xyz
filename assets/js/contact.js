// FrontWars - Contact Form JavaScript

// Contact Form Manager
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.bindEvents();
            this.initFormValidation();
            this.initFormAnimations();
        }
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.submitForm();
        } else {
            this.showFormErrors();
        }
    }
    
    validateForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Required fields validation
        const requiredFields = ['name', 'email', 'subject', 'priority', 'message'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim() === '') {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            }
        });
        
        // Email validation
        if (data.email && !this.isValidEmail(data.email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Message length validation
        if (data.message && data.message.length < 10) {
            this.showFieldError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        if (fieldName === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(fieldName, 'Please enter a valid email address');
            return false;
        }
        
        if (fieldName === 'message' && value && value.length < 10) {
            this.showFieldError(fieldName, 'Message must be at least 10 characters long');
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showFieldError(fieldName, message) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.classList.add('error');
            this.showErrorMessage(field, message);
        }
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        this.hideErrorMessage(field);
    }
    
    showErrorMessage(field, message) {
        // Remove existing error message
        this.hideErrorMessage(field);
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: var(--accent-red);
            font-size: 0.9rem;
            margin-top: 5px;
            font-weight: 600;
        `;
        
        // Insert after field
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    hideErrorMessage(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    showFormErrors() {
        // Focus on first error field
        const firstError = this.form.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
        
        // Show general error message
        this.showNotification('Please correct the errors below and try again.', 'error');
    }
    
    submitForm() {
        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'TRANSMITTING...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Message transmitted successfully! We will respond within 24 hours.', 'success');
            this.form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
    
    initFormValidation() {
        // Add CSS for form validation
        const style = document.createElement('style');
        style.textContent = `
            .military-form input.error,
            .military-form select.error,
            .military-form textarea.error {
                border-color: var(--accent-red);
                box-shadow: 0 0 10px rgba(139, 0, 0, 0.3);
            }
            
            .military-form input:focus,
            .military-form select:focus,
            .military-form textarea:focus {
                border-color: var(--accent-gold);
                box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
            }
            
            .field-error {
                animation: slideDown 0.3s ease;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    initFormAnimations() {
        // Add form field animations
        const fields = this.form.querySelectorAll('input, select, textarea');
        
        fields.forEach((field, index) => {
            field.style.opacity = '0';
            field.style.transform = 'translateY(20px)';
            field.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                field.style.opacity = '1';
                field.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    showNotification(message, type = 'info') {
        // Use the notification system from main.js
        if (window.FrontWars && window.FrontWars.showNotification) {
            window.FrontWars.showNotification(message, type);
        } else {
            // Fallback notification
            alert(message);
        }
    }
}

// Contact Info Manager
class ContactInfoManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.initProtocolAnimations();
        this.initInfoHoverEffects();
    }
    
    initProtocolAnimations() {
        const protocolItems = document.querySelectorAll('.protocol-item');
        
        protocolItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 150);
        });
    }
    
    initInfoHoverEffects() {
        const infoItems = document.querySelectorAll('.info-item');
        
        infoItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0) scale(1)';
            });
        });
    }
}

// Social Links Manager
class SocialLinksManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.initSocialAnimations();
        this.bindSocialEvents();
    }
    
    initSocialAnimations() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(30px)';
            link.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    bindSocialEvents() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Add click animation
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ContactFormManager();
    new ContactInfoManager();
    new SocialLinksManager();
});

// Export for external use
window.ContactFormManager = ContactFormManager;
window.ContactInfoManager = ContactInfoManager;
window.SocialLinksManager = SocialLinksManager;
