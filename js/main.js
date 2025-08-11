// Navbar scroll behavior for mobile/tablet
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (window.innerWidth < 1200) { // Only for mobile/tablet
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scrolled')) {
            // Scroll down
            navbar.classList.add('scrolled');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scrolled')) {
            // Scroll up
            navbar.classList.remove('scrolled');
            navbar.classList.add('visible');
        }
        
        lastScroll = currentScroll;
    });
}

// Mobile menu toggle - modified to handle navbar visibility
const mobileMenuTriggers = document.querySelectorAll('.mobile-menu-trigger');
const mobileSideMenu = document.querySelector('.mobile-side-menu');
const overlay = document.querySelector('.overlay');
const closeMenu = document.querySelector('.close-menu');

mobileMenuTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
        mobileSideMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
});

closeMenu.addEventListener('click', function() {
    mobileSideMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
});

overlay.addEventListener('click', function() {
    mobileSideMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
});

    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation and submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // In a real implementation, this would be an AJAX call
                alert('Thank you for your inquiry! We will contact you shortly.');
                this.reset();
                
                // If it's a modal form, close the modal
                const modal = bootstrap.Modal.getInstance(this.closest('.modal'));
                if (modal) modal.hide();
            }
        });
    });
    
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in:not(.animated)');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Testimonial carousel auto-rotation
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 5000,
            pause: 'hover'
        });
    }
    
    // Lazy loading images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers without native lazy loading
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }

    //ITENERARY ACCORDION
    document.addEventListener('DOMContentLoaded', function() {
        // Handle itinerary accordions
        const routeButtons = document.querySelectorAll('.route-nav-btn, .btn-view-itinerary');
        
        routeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('data-target') || this.getAttribute('href');
                const itinerary = document.querySelector(targetId);
                
                // Close all itineraries first
                document.querySelectorAll('.route-itinerary').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Remove active class from all buttons
                document.querySelectorAll('.route-nav-btn, .btn-view-itinerary').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Open selected itinerary
                itinerary.classList.add('active');
                this.classList.add('active');
                
                // Smooth scroll to itinerary
                setTimeout(() => {
                    itinerary.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            });
        });
        
        // Close all itineraries by default
        document.querySelectorAll('.route-itinerary').forEach(item => {
            item.classList.remove('active');
        });
    });
