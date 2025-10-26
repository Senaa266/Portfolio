document.addEventListener('DOMContentLoaded', () => {
    // --- DATA FOR PROJECTS ---
   
    const projectData = {
        'figma-projects': {
            title: 'Figma Projects',
            media: [
                { mediaType: 'video', src: 'MyStuff/videos/donut_anim.mp4', backText: "This is a donut website prototype with a dragging animation. I took inspiration from a couple of YouTube videos." },
                { mediaType: 'video', src: 'MyStuff/videos/donut_select.mp4', backText: "This is another one of my favorite donut animations. This one animates when you click on the donuts." },
                { mediaType: 'video', src: 'MyStuff/videos/sky_dev.mp4', backText: "This is a prototype for an architecture company's website. It's still a work in progress, but my favorite thing about it is the moving image carousel!" },
                { mediaType: 'video', src: 'MyStuff/videos/figma_res.mp4', backText: "This was my first-ever Figma project. It's a prototype app for tourists looking for restaurants, attractions, and hotels in a city." },
                { mediaType: 'image', src: 'MyStuff/images/androidlog1.png', backText: 'This simple form was made with Android Studio.' },
                { mediaType: 'video', src: 'MyStuff/videos/splash_screen .mp4', backText: "This is just a simple splash screen animation with moving gradient in the background and glassmorphism features." },
                { mediaType: 'image', src: 'MyStuff/images/bmi_home.png', backText: "This was also created with Android Studio." },
                { mediaType: 'image', src: 'MyStuff/images/bmi_login.png', backText: "This is the login screen for the BMI calculator app." },
                { mediaType: 'image', src: 'MyStuff/images/bmi_result.png', backText: "This is the result screen for the BMI calculator app." },
                { mediaType: 'image', src: 'MyStuff/images/flutsplash1.png', backText: 'An app static splash screen.' },
                { mediaType: 'image', src: 'MyStuff/images/flutter1.png', backText: 'This was a very simple login page i made for a food app.' },
                { mediaType: 'image', 
                  src: 'MyStuff/images/flutlog1.png', 
                  backText: 'A sign-in page design for a mobile application.' },
                { mediaType: 'image', 
                  src: 'MyStuff/images/flutlog2.png', 
                  backText: 'A sign-up page design.' }
            ]
        },
        'web-development': {
            title: 'Web Development',
            media: [
                { mediaType: 'video', src: 'MyStuff/videos/burger_web.mp4', backText: 'A simple website I made using a PowerPoint presentation. I took the frames from the presentation to create a scrolling effect of the burger splitting into its ingredients.' },
                { mediaType: 'video', src: 'MyStuff/videos/drowsy1log.mp4', backText: 'This is one of the simplest dashboards I have ever created.' },
                { mediaType: 'video', src: 'MyStuff/videos/she_builds.mp4', backText: 'I created a club for girls who wanted to learn about coding and other tech. This was a simple demo I built during one of our sessions.' },
            ]
        },
        'powerpoint-animations': {
            title: 'Powerpoint and Animations',
            media: [
                { mediaType: 'video', src: 'MyStuff/videos/burgerppt.mp4', backText: "This is a simple burger animation I created using PowerPoint." },
                { mediaType: 'video', src: 'MyStuff/videos/pptfg.mp4', backText: 'This is another powerpoint animation for a presentation.' },
                { mediaType: 'video', src: 'MyStuff/videos/pptsky.mp4', backText: 'A very simple powerpoint animation.' },
                { mediaType: 'video', src: 'MyStuff/videos/Animation.mp4', backText: 'A logo animation (This was done using canva).' },
            ]
        },
        'graphic-design-logos': {
            title: 'Graphic Design and Logos',
            media: [
                { mediaType: 'image', src: 'MyStuff/images/aesthetic_logo.png', backText: 'This was a random design I made because I was bored.' },
                { mediaType: 'image', src: 'MyStuff/images/book_cover1.png', backText: 'A book cover design. (Yes, I write too!)' },
                { mediaType: 'image', src: 'MyStuff/images/book_cover2.png', backText: 'Another book cover design.' },
                { mediaType: 'image', src: 'MyStuff/images/college_logo.png', backText: 'A simple logo I created for a food app.' },
                { mediaType: 'image', src: 'MyStuff/images/design1.png', backText: 'This was my first-ever design, created almost 4 years ago for a t-shirt brand idea.' },
                { mediaType: 'image', src: 'MyStuff/images/design2.png', backText: 'Another design for the t-shirt brand idea.' },
                { mediaType: 'image', src: 'MyStuff/images/mine_logo.png', backText: 'This was my first-ever logo. I still like it, despite it being 3 years old.' },
                { mediaType: 'image', src: 'MyStuff/images/mech1.png', backText: 'The logo for an app, which was used in a Figma project.' },
                { mediaType: 'image', src: 'MyStuff/images/mech2.png', backText: 'An alternate logo design for the same app.' },
                { mediaType: 'image', src: 'MyStuff/images/graphic design.png', backText: "A poster I made for a friend's assignment, using the word 'Reprieve'." },
                { mediaType: 'image', src: 'MyStuff/images/graphic design2.png', backText: "Another poster for the same assignment, using the word 'Dissipate'." },
                { mediaType: 'image', src: 'MyStuff/images/autocad.png', backText: 'A random design I built using AutoCAD. Inspiration was from Pinterest.' }
            ]
        }
    };

    // --- PAGE SETUP ---
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const data = projectData[category] || { title: 'Project Not Found', media: [] };

    document.title = `${data.title} | Portfolio`;
    document.getElementById('project-title').textContent = data.title;

    // Add "(Click to View)" prompt if the category is valid
    if (data.media.length > 0) {
        const header = document.querySelector('.detail-header');
        const prompt = document.createElement('p');
        prompt.classList.add('view-prompt');
        prompt.textContent = '(Click or Tap to View)';
        header.appendChild(prompt);
    }
    const mediaFeed = document.querySelector('.media-feed');

    // Combine images and videos into a single media array
    const mediaItems = data.media || [];

    if (mediaItems.length > 0) {
        mediaItems.forEach(item => {
            let cardFrontHTML = '';
            let descriptionText = item.backText || '';

            if (item.mediaType === 'video') {
                cardFrontHTML = `
                    <div class="card-front video-front">
                        <video src="${item.src}" muted loop playsinline class="media-video"></video>
                        <div class="play-icon-overlay">&#9658;</div>
                    </div>`;
            } else if (item.mediaType === 'image') {
                cardFrontHTML = `<div class="card-front"><img src="${item.src}" alt="${data.title} image" class="media-image"></div>`;
            } else if (item.mediaType === 'group') {
                const groupItemsHTML = item.items.map(groupItem => {
                    if (groupItem.mediaType === 'video') {
                        return `<video src="${groupItem.src}" muted loop playsinline class="grouped-media media-video"></video>`;
                    }
                    return `<img src="${groupItem.src}" alt="Grouped image" class="grouped-media media-image">`;
                }).join('');
                // Handle legacy 'sources' array for image-only groups
                const imageSourcesHTML = (item.sources || []).map(src => `<img src="${src}" alt="Grouped image" class="grouped-image">`).join('');
                cardFrontHTML = `<div class="card-front image-group-container">${groupItemsHTML}${imageSourcesHTML}</div>`;
            }

            // For groups, the description is for the whole group. For single items, it's for that item.
            const descriptionHTML = descriptionText ? `<p class="media-description">${descriptionText}</p>` : '';

            const mediaCardHTML = `
                <div class="media-card-container">
                    ${descriptionHTML}
                    <div class="card media-card" data-media-src="${item.src || item.items[0].src}" data-media-type="${item.mediaType}" style="cursor: pointer;">
                        <div class="card-inner">
                            ${cardFrontHTML}
                        </div>
                    </div>
                </div>`;
            mediaFeed.innerHTML += mediaCardHTML;
        });
    } else {
        mediaFeed.innerHTML = '<p class="no-media">No projects to display for this category.</p>';
    }

    // --- INTERSECTION OBSERVER FOR VIDEO AUTOPLAY ---
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(e => console.log("Autoplay was prevented."));
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.media-video').forEach(video => videoObserver.observe(video));

    const imageLightbox = document.getElementById('image-lightbox');
    const imageLightboxContent = imageLightbox.querySelector('.lightbox-content');
    const imageLightboxClose = imageLightbox.querySelector('.lightbox-close');
    const videoModal = document.getElementById('video-lightbox');
    const videoModalContent = videoModal.querySelector('.lightbox-content');
    const videoModalClose = videoModal.querySelector('.lightbox-close');

    document.querySelectorAll('.media-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('.media-card');
            const mediaType = card.dataset.mediaType;
            const mediaSrc = card.dataset.mediaSrc;

            if (mediaType === 'video') {
                videoModalContent.innerHTML = `<video controls autoplay src="${mediaSrc}"></video>`;
                videoModal.classList.remove('lightbox-hidden');
            } else if (mediaType === 'image') {
                // For single images, use the clicked image. For groups, use the first one.
                const imgSrc = e.target.tagName === 'IMG' ? e.target.src : card.querySelector('img').src;
                imageLightboxContent.innerHTML = `<img src="${imgSrc}" alt="Enlarged image">`;
                imageLightbox.classList.remove('lightbox-hidden');
            } else if (mediaType === 'group') {
                // For groups, just open the first item in the lightbox
                const firstItem = card.querySelector('.grouped-media, .grouped-image');
                if (firstItem.tagName === 'VIDEO') {
                    videoModalContent.innerHTML = `<video controls autoplay src="${firstItem.src}"></video>`;
                    videoModal.classList.remove('lightbox-hidden');
                } else {
                    imageLightboxContent.innerHTML = `<img src="${firstItem.src}" alt="Enlarged image">`;
                    imageLightbox.classList.remove('lightbox-hidden');
                }
            }
        });
    });

    const closeImageLightbox = () => {
        imageLightbox.classList.add('lightbox-hidden');
        imageLightboxContent.innerHTML = '';
    };
    imageLightboxClose.addEventListener('click', closeImageLightbox);
    imageLightbox.addEventListener('click', (e) => { if (e.target === imageLightbox) closeImageLightbox(); });

    const closeVideoLightbox = () => {
        videoModal.classList.add('lightbox-hidden');
        videoModalContent.innerHTML = '';
    };
    videoModalClose.addEventListener('click', closeVideoLightbox);
    videoModal.addEventListener('click', (e) => { if (e.target === videoModal) closeVideoLightbox(); });
});