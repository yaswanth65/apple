// Initialize Icons
lucide.createIcons();

// Main DOMContentLoaded Handler
document.addEventListener('DOMContentLoaded', () => {
    // Hero Slider functionality
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    let heroIntervalId = null;
    const slideInterval = 5000;

    function showSlide(index) {
        if (!slides.length) return;

        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });

    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startHeroAutoplay() {
        if (heroIntervalId) {
            clearInterval(heroIntervalId);
        }
        heroIntervalId = setInterval(nextSlide, slideInterval);
    }

    if (slides.length > 1) {
        showSlide(0);
        startHeroAutoplay();
    } else if (slides.length === 1) {
        showSlide(0);
    }

    // Service Section Scroll Functionality (Enhanced)
    const serviceScrollContainer = document.getElementById('service-scroll-area') || document.getElementById('service-scroll-container');
    const serviceButtons = [
        { left: document.getElementById('service-scroll-left-bottom'), right: document.getElementById('service-scroll-right-bottom') }
    ];

    if (serviceScrollContainer) {
        const scrollAmount = 392; // Card width (372px) + gap (20px)

        serviceButtons.forEach(buttonSet => {
            if (buttonSet.left && buttonSet.right) {
                buttonSet.left.addEventListener('click', () => {
                    serviceScrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                });

                buttonSet.right.addEventListener('click', () => {
                    serviceScrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                });
            }
        });

        // Update button states based on scroll position
        const updateButtonStates = () => {
            const isAtStart = serviceScrollContainer.scrollLeft <= 0;
            const isAtEnd = serviceScrollContainer.scrollLeft >= 
                (serviceScrollContainer.scrollWidth - serviceScrollContainer.clientWidth - 10);

            serviceButtons.forEach(buttonSet => {
                if (buttonSet.left) {
                    buttonSet.left.style.opacity = isAtStart ? '0.5' : '1';
                    buttonSet.left.style.pointerEvents = isAtStart ? 'none' : 'auto';
                }
                if (buttonSet.right) {
                    buttonSet.right.style.opacity = isAtEnd ? '0.5' : '1';
                    buttonSet.right.style.pointerEvents = isAtEnd ? 'none' : 'auto';
                }
            });
        };

        serviceScrollContainer.addEventListener('scroll', updateButtonStates);
        updateButtonStates(); // Initial state
    }

    // Note: Mega Menu Hover Functionality is now handled in index.html inline script
    // Scroll reveal animations
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Navbar background blur effect on scroll
    const navbarElement = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbarElement.classList.add('shadow-sm');
        } else {
            navbarElement.classList.remove('shadow-sm');
        }
    });

    // Color swatch image switcher for Shop iPhone cards
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(s => {
        const applySwatch = (e) => {
            const btn = e.currentTarget;
            const imgUrl = btn.dataset.image;
            const card = btn.closest('.product-card');
            if (!card) return;
            const img = card.querySelector('.product-img');
            if (!img) return;
            img.src = imgUrl;
            card.dataset.selected = imgUrl;

            // update active state
            const siblings = card.querySelectorAll('.color-swatch');
            siblings.forEach(x => x.classList.remove('active', 'ring-2', 'ring-offset-1', 'ring-apple-blue'));
            btn.classList.add('active');
        };

        s.addEventListener('click', applySwatch);
        s.addEventListener('mouseenter', applySwatch);
    });

    // Optionally set first swatch active on each card
    document.querySelectorAll('.product-card').forEach(card => {
        const first = card.querySelector('.color-swatch');
        if (first) first.click();
    });
});
