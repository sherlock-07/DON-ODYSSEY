// Blog Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Category filtering
    const categoryTags = document.querySelectorAll('.category-tag');
    const blogCards = document.querySelectorAll('.blog-card');
    
    categoryTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tags
            categoryTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            this.classList.add('active');
            
            const category = this.getAttribute('href').replace('#', '');
            
            // Filter blog cards
            blogCards.forEach(card => {
                const cardCategory = card.querySelector('.post-category').textContent.toLowerCase();
                
                if (category === 'all' || cardCategory.includes(category)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const privacyCheck = this.querySelector('#privacyCheck');
            
            if (!privacyCheck.checked) {
                alert('Please accept the privacy policy to subscribe.');
                return;
            }
            
            // Simulate subscription success
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                submitBtn.classList.remove('btn-primary');
                submitBtn.classList.add('btn-success');
                
                // Reset form
                this.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-success');
                    submitBtn.classList.add('btn-primary');
                }, 2000);
            }, 1500);
        });
    }
    
    // Add reading time to articles
    function calculateReadingTime() {
        const articles = document.querySelectorAll('.blog-card-excerpt');
        articles.forEach(article => {
            const words = article.textContent.split(/\s+/).length;
            const readingTime = Math.ceil(words / 200); // 200 words per minute
            const timeElement = article.closest('.blog-card').querySelector('.blog-card-meta');
            
            if (timeElement && !timeElement.querySelector('.reading-time')) {
                const timeSpan = document.createElement('span');
                timeSpan.className = 'reading-time';
                timeSpan.innerHTML = `<i class="far fa-clock"></i> ${readingTime} min read`;
                timeElement.appendChild(timeSpan);
            }
        });
    }
    
    calculateReadingTime();
    
    // Smooth scroll for category links
    document.querySelectorAll('.category-tag').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#all') {
                window.scrollTo({
                    top: document.querySelector('.blog-categories').offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effects to blog cards
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
        });
    });
});