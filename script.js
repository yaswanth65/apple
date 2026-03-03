// Initialize Icons
lucide.createIcons();

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
});
