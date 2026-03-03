// Initialize Icons
lucide.createIcons();

// Slider functionality - only initialize if elements exist
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('serviceSlider');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (slider && nextBtn && prevBtn) {
        const cardWidth = 392; // 372px card + 20px gap

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
    }
});
// Note: Mega Menu Hover Functionality is now handled in index.html inline script
document.addEventListener('DOMContentLoaded', () => {
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
        s.addEventListener('click', (e) => {
            const btn = e.currentTarget;
            const imgUrl = btn.dataset.image;
            const card = btn.closest('.product-card');
            if (!card) return;
            const img = card.querySelector('.product-img');
            if (!img) return;
            img.src = imgUrl;

            // update active state
            const siblings = card.querySelectorAll('.color-swatch');
            siblings.forEach(x => x.classList.remove('ring-2', 'ring-offset-1', 'ring-apple-blue'));
            btn.classList.add('ring-2', 'ring-offset-1', 'ring-apple-blue');
        });
    });

    // Optionally set first swatch active on each card
    document.querySelectorAll('.product-card').forEach(card => {
        const first = card.querySelector('.color-swatch');
        if (first) first.click();
    });

    // Service Section Scroll Functionality
    const serviceScrollContainer = document.getElementById('service-scroll-container');
    const serviceScrollLeftBtn = document.getElementById('service-scroll-left');
    const serviceScrollRightBtn = document.getElementById('service-scroll-right');

    if (serviceScrollContainer && serviceScrollLeftBtn && serviceScrollRightBtn) {
        const scrollAmount = 392; // Card width (372px) + gap (20px)

        serviceScrollLeftBtn.addEventListener('click', () => {
            serviceScrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        serviceScrollRightBtn.addEventListener('click', () => {
            serviceScrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        // Update button states based on scroll position
        const updateButtonStates = () => {
            const isAtStart = serviceScrollContainer.scrollLeft <= 0;
            const isAtEnd = serviceScrollContainer.scrollLeft >= 
                (serviceScrollContainer.scrollWidth - serviceScrollContainer.clientWidth - 10);

            // Visual feedback: disable/enable buttons
            serviceScrollLeftBtn.style.opacity = isAtStart ? '0.5' : '1';
            serviceScrollLeftBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
            
            serviceScrollRightBtn.style.opacity = isAtEnd ? '0.5' : '1';
            serviceScrollRightBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        };

        // Initial check
        updateButtonStates();

        // Update on scroll
        serviceScrollContainer.addEventListener('scroll', updateButtonStates);
    }
});
