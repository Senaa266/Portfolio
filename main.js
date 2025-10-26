document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVIGATION LOGIC ---
    const sections = document.querySelectorAll('section[id], header[id]');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = mainNav.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.3 // Lowered threshold to better detect sections
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- 2. INTERACTIVE WORK GALLERY ---
    const menuItems = document.querySelectorAll('.work-menu li');
    const imageColumn = document.querySelector('.image-column');
    let autoScrollTimeout;
    let currentCategoryIndex = 0;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const categories = Array.from(menuItems).map(item => item.dataset.category);

    // A single function to handle activating a category and its animations
    function showCategory(category, isAuto = false) {
        const targetMenuItem = document.querySelector(`.work-menu li[data-category="${category}"]`);
        const targetImageGroup = document.getElementById(category);
        const carousel = targetImageGroup ? targetImageGroup.querySelector('.image-carousel') : null;
        if (!targetMenuItem || !targetImageGroup || !carousel) return;
 
        // 1. Update menu
        menuItems.forEach(item => item.classList.remove('active'));
        targetMenuItem.classList.add('active');
 
        // 2. Scroll main column into view
        imageColumn.style.transform = `translateY(-${targetImageGroup.offsetTop}px)`;
 
        // 3. Handle carousel animation
        carousel.style.transition = 'none'; // Reset instantly
        carousel.style.transform = 'translateX(0)';
        
        // Use a timeout to allow the instant transform to apply before transitioning again
        setTimeout(() => {
            carousel.style.transition = 'transform 0.6s ease-in-out';
            carousel.style.transform = 'translateX(-50%)';
        }, isAuto ? 2500 : 100); // Shorter delay for manual click
    }
 
    // Function to run the automatic scrolling sequence.
    // Using recursive setTimeout is better than setInterval, as it waits for the previous animation cycle to finish.
    function startAutoScroll() {
        const category = categories[currentCategoryIndex];
        showCategory(category, true);
        currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
        autoScrollTimeout = setTimeout(startAutoScroll, 5000); // 2.5s on first image, 2.5s on second
    }

    // Handle user clicks on menu items
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;

            if (isMobile) {
                // On mobile, a single tap navigates to the detail page.
                window.location.href = `project-detail.html?category=${category}`;
            } else {
                // On desktop, a single click controls the preview gallery.
                clearTimeout(autoScrollTimeout); // Stop the auto-scroll
                currentCategoryIndex = categories.indexOf(category);
                showCategory(category, false);
            }
        });

        // Add double-click event to navigate to detail page
        item.addEventListener('dblclick', () => {
            const category = item.dataset.category;
            window.location.href = `project-detail.html?category=${category}`;
        });
    });

    // Start the show, but only on desktop!
    if (!isMobile) {
        startAutoScroll();
    }

    // --- 3. CUSTOM CURSOR DOT ---
    const heroSection = document.querySelector('.hero-section');
    const customCursor = document.querySelector('.custom-cursor');

    // Check if the elements exist to avoid errors
    if (heroSection && mainNav && customCursor) {
        // When the mouse moves over the hero section...
        heroSection.addEventListener('mousemove', (e) => {
            // Update the dot's position to follow the cursor
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
        });

        // When the mouse enters the hero section...
        heroSection.addEventListener('mouseenter', () => {
            customCursor.style.opacity = 1; // Fade the dot in
            heroSection.classList.add('hide-cursor'); // Hide the default cursor
        });

        // When the mouse leaves the hero section...
        heroSection.addEventListener('mouseleave', () => {
            customCursor.style.opacity = 0; // Fade the dot out
            heroSection.classList.remove('hide-cursor'); // Restore the default cursor
        });

        // When the mouse enters the navigation area...
        mainNav.addEventListener('mouseenter', () => {
            heroSection.classList.remove('hide-cursor'); // Show default cursor for nav
        });

        // When the mouse leaves the navigation area...
        mainNav.addEventListener('mouseleave', () => {
            heroSection.classList.add('hide-cursor'); // Hide default cursor again
        });
    }

    // --- 4. ANIMATED DOWNLOAD BUTTON ---
    const downloadCheckbox = document.getElementById('download-checkbox');
    if (downloadCheckbox) {
        downloadCheckbox.addEventListener('change', function() {
            // Only trigger download if the checkbox is checked
            if (this.checked) {
                const label = this.closest('.label');
                const filePath = label.dataset.file;
                const fileName = filePath.split('/').pop();

                // Wait for the animation to be in a good state before downloading
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = filePath;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }, 1500); // 1.5-second delay
            }
        });
    }

    // --- 5. TAP-TO-FLIP FOR ABOUT CARD ON MOBILE ---
    const flippableCard = document.querySelector('.about-layout .about-column:first-child .card');
    if (flippableCard) {
        flippableCard.addEventListener('click', () => {
            const cardInner = flippableCard.querySelector('.card-inner');
            cardInner.classList.toggle('is-flipped');
        });
    }

});
