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
    let autoScrollInterval;
    let currentCategoryIndex = 0;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const categories = Array.from(menuItems).map(item => item.dataset.category);

    // Function to activate a category
    function activateCategory(category) {
        // Find the target image group and menu item
        const targetImageGroup = document.getElementById(category);
        const targetMenuItem = document.querySelector(`[data-category="${category}"]`);
        if (!targetImageGroup || !targetMenuItem) return;

        // Update the active state in the menu
        menuItems.forEach(item => item.classList.remove('active'));
        targetMenuItem.classList.add('active');
    }

    // Function to handle the full auto-scroll sequence
    function runAutoScrollSequence() {
        const category = categories[currentCategoryIndex];
        activateCategory(category);

        const carousel = document.querySelector(`#${category} .image-carousel`);
        if (!carousel) return;

        if (!isMobile) {
            // Reset to first image
            carousel.style.transform = 'translateX(0)';

            // After a delay, slide to the second image
            setTimeout(() => {
                carousel.style.transform = 'translateX(-50%)';
            }, 2500); // Wait 2.5s on the first image
        }

        // After another delay, move to the next category (Desktop only)
        if (!isMobile) {
            setTimeout(() => {
                currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
                runAutoScrollSequence();
            }, 5000);
        }
    }

    // Function to start the automatic scrolling
    function startAutoScroll() { 
        clearInterval(autoScrollInterval); // Clear any existing interval
        runAutoScrollSequence(); // Start the sequence
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
                clearTimeout(autoScrollInterval); // We are using timeouts now
                currentCategoryIndex = categories.indexOf(category);
                activateCategory(category);
                const carousel = document.querySelector(`#${category} .image-carousel`);
                if (carousel) carousel.style.transform = 'translateX(0)';
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
        startAutoScroll(); // Start the automatic animation
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
