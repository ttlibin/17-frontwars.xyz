// FrontWars - Navigation JavaScript

// Navigation State Management
class NavigationManager {
    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initScrollSpy();
        this.initActiveStates();
    }
    
    bindEvents() {
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Close menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.navToggle.classList.add('active');
        this.navMenu.classList.add('active');
        this.isMenuOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add animation delay for menu items
        this.navLinks.forEach((link, index) => {
            link.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    closeMobileMenu() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.isMenuOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Remove animation delay
        this.navLinks.forEach(link => {
            link.style.animationDelay = '';
        });
    }
    
    initScrollSpy() {
        // Throttled scroll handler for performance
        let ticking = false;
        
        const updateActiveSection = () => {
            let current = '';
            const scrollPosition = window.scrollY + 100;
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            this.updateActiveNavLink(current);
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateActiveSection);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }
    
    updateActiveNavLink(currentSection) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href === `#${currentSection}` || 
                (currentSection === 'hero' && href === 'index.html') ||
                (currentSection === 'hero' && href === '#hero')) {
                link.classList.add('active');
            }
        });
    }
    
    initActiveStates() {
        // Handle page-specific active states
        const currentPage = window.location.pathname.split('/').pop();
        
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (currentPage === 'about.html' && href === 'about.html') {
                link.classList.add('active');
            } else if (currentPage === 'contact.html' && href === 'contact.html') {
                link.classList.add('active');
            } else if (currentPage === 'index.html' || currentPage === '') {
                if (href === 'index.html' || href === '#hero') {
                    link.classList.add('active');
                }
            }
        });
    }
}

// Smooth Scrolling Manager
class SmoothScrollManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.bindScrollEvents();
    }
    
    bindScrollEvents() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => this.handleScrollClick(e, link));
        });
    }
    
    handleScrollClick(e, link) {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            this.scrollToSection(targetSection);
        }
    }
    
    scrollToSection(targetSection) {
        const navHeight = 70; // Fixed navigation height
        const offsetTop = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navigation Animation Manager
class NavigationAnimationManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.initNavbarScrollEffect();
        this.initMobileMenuAnimations();
    }
    
    initNavbarScrollEffect() {
        const navbar = document.querySelector('.military-nav');
        let lastScrollY = window.scrollY;
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        };
        
        // Throttle scroll events
        let ticking = false;
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }
    
    initMobileMenuAnimations() {
        // Add CSS for mobile menu animations
        const style = document.createElement('style');
        style.textContent = `
            .military-nav {
                transition: transform 0.3s ease;
            }
            
            .military-nav.scrolled {
                background: rgba(26, 26, 26, 0.95);
                backdrop-filter: blur(10px);
            }
            
            .nav-menu {
                transition: left 0.3s ease;
            }
            
            .nav-link {
                transition: all 0.3s ease;
            }
            
            .nav-link:hover {
                transform: translateY(-2px);
            }
            
            @media (max-width: 768px) {
                .nav-menu.active .nav-link {
                    animation: slideInFromRight 0.3s ease forwards;
                    opacity: 0;
                }
                
                @keyframes slideInFromRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new NavigationManager();
    new SmoothScrollManager();
    new NavigationAnimationManager();
});

// Export for external use
window.NavigationManager = NavigationManager;
window.SmoothScrollManager = SmoothScrollManager;
window.NavigationAnimationManager = NavigationAnimationManager;
