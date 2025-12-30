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

  
    // Price and Inclusions functionality
document.addEventListener('DOMContentLoaded', function() {
    // Pricing data
    const pricingData = {
        '1': { price: 2650, description: 'Per person for 1 person' },
        '2': { price: 2250, description: 'Per person for 2 people' },
        '3-4': { price: 2150, description: 'Per person for 3-4 people' },
        '5-6': { price: 2050, description: 'Per person for 5-6 people' },
        '7+': { price: 1950, description: 'Per person for 7+ people' }
    };

    // Upgrade costs
    const upgradeCosts = {
        'toiletTent': 150,
        'extraDay': 250,
        'hotelUpgrade': 200
    };

    // Initialize current selections
    let currentGroupSize = '3-4';
    let currentUpgrades = {};
    let basePrice = pricingData[currentGroupSize].price;

    // Update price display
    function updatePriceDisplay() {
        const totalElement = document.getElementById('totalPrice');
        const descriptionElement = document.getElementById('priceDescription');
        const groupSelect = document.getElementById('groupSize');
        
        // Get selected group size
        currentGroupSize = groupSelect.value;
        basePrice = pricingData[currentGroupSize].price;
        
        // Calculate total with upgrades
        let total = basePrice;
        for (const upgrade in currentUpgrades) {
            if (currentUpgrades[upgrade]) {
                total += upgradeCosts[upgrade];
            }
        }
        
        // Update display with animation
        totalElement.classList.remove('price-updated');
        void totalElement.offsetWidth; // Trigger reflow
        totalElement.classList.add('price-updated');
        
        totalElement.textContent = `$${total.toLocaleString()}`;
        descriptionElement.textContent = pricingData[currentGroupSize].description;
    }

    // Initialize group size selector
    const groupSelect = document.getElementById('groupSize');
    if (groupSelect) {
        groupSelect.addEventListener('change', updatePriceDisplay);
    }

    // Initialize upgrade checkboxes
    const upgradeCheckboxes = document.querySelectorAll('.upgrade-checkbox');
    upgradeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const upgradeType = this.getAttribute('data-upgrade');
            currentUpgrades[upgradeType] = this.checked;
            updatePriceDisplay();
        });
    });

    // Mobile book buttons
    const mobileBookButtons = document.querySelectorAll('.mobile-book-btn');
    mobileBookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const groupSize = this.getAttribute('data-group-size');
            document.getElementById('groupSize').value = groupSize;
            updatePriceDisplay();
            
            // Scroll to booking form
            document.querySelector('.booking-card').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });


    // Upgrade card buttons
    const addUpgradeButtons = document.querySelectorAll('.add-upgrade-btn');
    addUpgradeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.upgrade-card');
            const upgradeType = card.getAttribute('data-upgrade');
            const checkbox = document.querySelector(`#${upgradeType}Checkbox`);
            
            if (checkbox) {
                checkbox.checked = true;
                currentUpgrades[upgradeType] = true;
                updatePriceDisplay();
                
                // Toggle button visibility
                this.classList.add('d-none');
                card.querySelector('.remove-upgrade-btn').classList.remove('d-none');
            }
        });
    });

    const removeUpgradeButtons = document.querySelectorAll('.remove-upgrade-btn');
    removeUpgradeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.upgrade-card');
            const upgradeType = card.getAttribute('data-upgrade');
            const checkbox = document.querySelector(`#${upgradeType}Checkbox`);
            
            if (checkbox) {
                checkbox.checked = false;
                currentUpgrades[upgradeType] = false;
                updatePriceDisplay();
                
                // Toggle button visibility
                this.classList.add('d-none');
                card.querySelector('.add-upgrade-btn').classList.remove('d-none');
            }
        });
    });

    // Booking form submission
    const bookingForm = document.getElementById('routeBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                startDate: document.getElementById('startDate').value,
                groupSize: document.getElementById('groupSize').value,
                upgrades: currentUpgrades,
                totalPrice: document.getElementById('totalPrice').textContent
            };
            
            // In a real application, you would send this data to your server
            console.log('Booking form submitted:', formData);
            
            // Show success message
            alert('Thank you for your booking request! We will contact you shortly to confirm your climb.');
            
            // Optionally reset form
            this.reset();
            currentUpgrades = {};
            updatePriceDisplay();
            
            // Reset upgrade buttons
            document.querySelectorAll('.remove-upgrade-btn').forEach(btn => {
                btn.classList.add('d-none');
            });
            document.querySelectorAll('.add-upgrade-btn').forEach(btn => {
                btn.classList.remove('d-none');
            });
        });
    }

    // Initialize date picker with minimum date as today
    const startDateInput = document.getElementById('startDate');
    if (startDateInput) {
        const today = new Date();
        const minDate = today.toISOString().split('T')[0];
        startDateInput.setAttribute('min', minDate);
    }

    // Initialize price display
    updatePriceDisplay();
});

// Existing mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuTrigger = document.querySelector('.mobile-menu-trigger');
    const closeMenu = document.querySelector('.close-menu');
    const mobileSideMenu = document.querySelector('.mobile-side-menu');
    const overlay = document.querySelector('.overlay');

    if (menuTrigger && closeMenu && mobileSideMenu && overlay) {
        menuTrigger.addEventListener('click', function() {
            mobileSideMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeMenu.addEventListener('click', function() {
            mobileSideMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        overlay.addEventListener('click', function() {
            mobileSideMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Inquiry form submission
    const inquiryForm = document.getElementById('inquiryForm');
    const submitInquiry = document.getElementById('submitInquiry');
    
    if (submitInquiry && inquiryForm) {
        submitInquiry.addEventListener('click', function() {
            // Simple form validation
            let isValid = true;
            const requiredFields = inquiryForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // In a real application, you would send the form data to your server
                alert('Thank you for your inquiry! We will contact you shortly.');
                
                // Close the modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('inquiryModal'));
                modal.hide();
                
                // Reset the form
                inquiryForm.reset();
            }
        });
    }
});


// ========== SET MINIMUM DATE FOR ALL DATE INPUTS ==========
// This function runs immediately and sets today's date as minimum for all date inputs
function initializeDateInputs() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;
    
    // Select ALL date inputs on the page
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    // Apply minimum date to each input
    dateInputs.forEach(input => {
        input.setAttribute('min', minDate);
    });
}

// Initialize date inputs when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDateInputs);
} else {
    // DOM is already loaded
    initializeDateInputs();
}
