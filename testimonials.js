// Testimonials Slider
class TestimonialsSlider {
    constructor() {
        this.wrapper = document.getElementById('testimonialsWrapper');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('testimonialsDots');
        
        this.currentIndex = 0;
        this.cardsPerView = this.getCardsPerView();
        this.totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.updateSlider();
        this.bindEvents();
        this.startAutoSlide();
        
        // Handle resize
        window.addEventListener('resize', () => {
            this.cardsPerView = this.getCardsPerView();
            this.totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
            this.currentIndex = Math.min(this.currentIndex, this.totalSlides - 1);
            this.updateSlider();
            this.createDots();
        });
    }
    
    getCardsPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    createDots() {
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = `dot ${i === this.currentIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateSlider() {
        const translateX = -(this.currentIndex * (100 / this.cardsPerView));
        this.wrapper.style.transform = `translateX(${translateX}%)`;
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.totalSlides - 1;
        
        // Update dots
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    goToSlide(index) {
        this.currentIndex = Math.max(0, Math.min(index, this.totalSlides - 1));
        this.updateSlider();
        this.resetAutoSlide();
    }
    
    nextSlide() {
        if (this.currentIndex < this.totalSlides - 1) {
            this.currentIndex++;
            this.updateSlider();
            this.resetAutoSlide();
        }
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlider();
            this.resetAutoSlide();
        }
    }
    
    bindEvents() {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        
        // Touch/swipe support
        let startX = 0;
        let isDragging = false;
        
        this.wrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.wrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        this.wrapper.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
        
        // Mouse drag support
        let mouseStartX = 0;
        let isMouseDragging = false;
        
        this.wrapper.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            isMouseDragging = true;
            this.wrapper.style.cursor = 'grabbing';
        });
        
        this.wrapper.addEventListener('mousemove', (e) => {
            if (!isMouseDragging) return;
            e.preventDefault();
        });
        
        this.wrapper.addEventListener('mouseup', (e) => {
            if (!isMouseDragging) return;
            isMouseDragging = false;
            this.wrapper.style.cursor = 'grab';
            
            const endX = e.clientX;
            const diff = mouseStartX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
        
        this.wrapper.addEventListener('mouseleave', () => {
            isMouseDragging = false;
            this.wrapper.style.cursor = 'grab';
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            if (this.currentIndex === this.totalSlides - 1) {
                this.goToSlide(0);
            } else {
                this.nextSlide();
            }
        }, 5000);
    }
    
    resetAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }
}

// Initialize testimonials slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsSlider();
});