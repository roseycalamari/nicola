/**
 * Nicola Senn Tennis Website - Enhanced JavaScript File
 * 
 * This file contains all the interactive functionality for the website:
 * - Custom cursor
 * - Scroll animations
 * - Navigation handling
 * - Gallery functionality
 * - Stats counter animation
 * - Tournament countdown
 * - Interactive timeline
 * - Click-to-reveal animations
 * - Mobile-optimized interactions
 * - Form handling
 */

document.addEventListener('DOMContentLoaded', async function() {
    // Initialize components based on page type
    const isAdminPage = window.location.pathname.includes('admin-dashboard');
    
    if (isAdminPage) {
        // Admin page specific initializations
        const stats = await loadCareerStats();
    updateStatsDisplay(stats);
    }
    
    // Initialize stats counter if on a page with stats
    if (document.querySelector('.stat')) {
    initializeStatsCounter();
    }
    
    // Initialize other components
    initializeNavigation();
    initializeCustomCursor();
    initializeScrollAnimations();
    initializeGallery();
    initializeCountdown();
    initializeContactForm();
    initializeExpandableContent();
    initializeJourneyCards();
    initializeFilterButtons();
    initializeTabs();
    initializeScheduleSlider();
    initializeGalleryLightbox();
    initializeUpdateCards();
    initializeUpdateFilter();
    initializeLanguageSwitcher();
    initializeAlbumGallery();
    initializeDonationForm();
    initializePdfDownloads();
    
    // Load next tournament display if element exists
    if (document.querySelector('.next-tournament')) {
    loadNextTournamentDisplay();
    }
    
    // Handle hash links for cross-page navigation
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Slight delay to ensure page is fully loaded
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 500); // Increased delay for better reliability
        }
    }
});

/**
 * Custom Cursor Implementation
 * Creates a custom cursor that follows the mouse movement
 */
function initializeCustomCursor() {
    const cursor = document.querySelector('.cursor');
    
    if (!cursor) return;
    
    // Only enable custom cursor on devices with fine pointer (desktop)
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        
        // Add active class when clicking
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
            cursor.style.opacity = '0.9';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '1';
        });
        
        // Add hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .sponsor, .journey-card, .update-card, .tier-card, input, textarea, select, .category-card, .filter-btn, .flip-btn, .album-thumb');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.backgroundColor = 'rgba(160, 235, 255, 0.1)';
                cursor.style.borderColor = 'transparent';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.borderColor = 'var(--color-primary)';
            });
        });
    } else {
        // Remove cursor element on touch devices
        cursor.remove();
    }
}

/**
 * Navigation Functionality
 * Handles mobile navigation toggle and header scroll effects
 */
function initializeNavigation() {
    const header = document.querySelector('header');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle mobile navigation
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Close mobile navigation when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }
    
    // Handle header scroll effect
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Handle promo contact button click
    const promoContactBtn = document.getElementById('promo-contact-btn');
    if (promoContactBtn) {
        promoContactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Navigate to about.html#contact with a flag to ensure scrolling
            sessionStorage.setItem('scrollToContact', 'true');
            window.location.href = 'about.html#contact';
        });
    }
    
    // Check if we need to scroll to contact (from another page)
    if (window.location.hash === '#contact' && sessionStorage.getItem('scrollToContact') === 'true') {
        sessionStorage.removeItem('scrollToContact');
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            setTimeout(() => {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 700);
        }
    }
    
    // Smooth scroll for anchor links
    const scrollLinks = document.querySelectorAll('a.scroll-to');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll Animations
 * Adds animations to elements as they scroll into view
 * Uses IntersectionObserver API for performance
 */
function initializeScrollAnimations() {
    // Function to check if element is in viewport and add animation class
    const observeElements = (elements, className) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            observer.observe(el);
        });
    };
    
    // Elements that fade in
    const fadeElements = document.querySelectorAll('.hero-content, .section-header, .sponsors-preview, .upcoming, .about-title, .contact-container, .journey h2, .gallery h2, .sponsors h2, .updates h2, .newsletter-content');
    observeElements(fadeElements, 'fade-in');
    
    // Elements that slide in from left
    const slideLeftElements = document.querySelectorAll('.tournament-card, .journey-card:nth-child(odd), .update-card:nth-child(odd), .sponsor-card:nth-child(odd), .tier-card:nth-child(odd), .category-card:nth-child(odd)');
    observeElements(slideLeftElements, 'slide-in-left');
    
    // Elements that slide in from right
    const slideRightElements = document.querySelectorAll('.journey-card:nth-child(even), .update-card:nth-child(even), .sponsor-card:nth-child(even), .tier-card:nth-child(even), .category-card:nth-child(even)');
    observeElements(slideRightElements, 'slide-in-right');
    
    // Scale up animations
    const scaleElements = document.querySelectorAll('.stat, .gallery-item, .schedule-item, .gallery-album');
    observeElements(scaleElements, 'scale-in');
    
    // Initialize GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Parallax effect for hero image
        const heroImage = document.querySelector('.hero-bg-image');
        if (heroImage) {
            gsap.to(heroImage, {
                y: 100,
                scale: 1.1,
                scrollTrigger: {
                    trigger: '.fullscreen-hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
        
        // Animate stats numbers separately for better control
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const targetNumber = parseInt(stat.getAttribute('data-count'));
            
            ScrollTrigger.create({
                trigger: stat,
                start: 'top 80%',
                onEnter: () => {
                    animateNumber(stat, targetNumber);
                }
            });
        });
        
        // Animate sponsors slider (only on desktop)
        if (window.matchMedia('(min-width: 992px)').matches) {
            const sponsorsTrack = document.querySelector('.sponsors-track');
            if (sponsorsTrack) {
                gsap.to(sponsorsTrack, {
                    x: `-${sponsorsTrack.offsetWidth / 2}px`,
                    scrollTrigger: {
                        trigger: '.sponsors-slider',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                });
            }
        }
    }
}

/**
 * Animate Number Counter
 * Helper function for animating numbers counting up
 */
function animateNumber(element, targetNumber) {
    // Only animate if we have a valid target number
    if (isNaN(targetNumber) || targetNumber === 0) return;
    
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutQuad = t => t * (2 - t);
    
    let frame = 0;
    const countTo = targetNumber;
    
    // Store the original target number in a data attribute
    element.setAttribute('data-target', targetNumber);
    
    const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentCount = Math.round(countTo * progress);
        
        if (countTo >= 10) {
            element.textContent = currentCount;
        } else {
            element.textContent = currentCount.toFixed(1);
        }
        
        if (frame === totalFrames) {
            clearInterval(counter);
            // Ensure the final value is set correctly
            element.textContent = countTo >= 10 ? countTo : countTo.toFixed(1);
        }
    }, frameDuration);
}

/**
 * Stats Counter Animation
 * Animates the statistics numbers counting up
 */
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;
    
    // Create a single observer for all stats
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseInt(target.getAttribute('data-count'));
                
                // Only animate if we haven't already animated this number
                if (!target.hasAttribute('data-animated')) {
                    animateNumber(target, targetNumber);
                    target.setAttribute('data-animated', 'true');
                }
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(statNumber => {
        observer.observe(statNumber);
    });
}

/**
 * Gallery Functionality
 * Creates a filterable image gallery with lightbox
 */
function initializeGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.gallery-filter .filter-btn');
    
    if (!galleryGrid || !filterButtons.length) return;
    
    // Filter gallery items
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            const galleryItems = galleryGrid.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 50);
                } else {
                    item.classList.remove('visible');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Make all items visible initially
    const galleryItems = galleryGrid ? galleryGrid.querySelectorAll('.gallery-item') : [];
    galleryItems.forEach(item => {
        item.classList.add('visible');
    });
}

/**
 * Gallery Lightbox Functionality
 * Implements a lightbox for gallery images
 */
function initializeGalleryLightbox() {
    const galleryModal = document.querySelector('.gallery-modal');
    const expandButtons = document.querySelectorAll('.gallery-expand');
    
    if (!galleryModal || !expandButtons.length) return;
    
    const modalImage = galleryModal.querySelector('.modal-image');
    const modalTitle = galleryModal.querySelector('.modal-title');
    const modalDescription = galleryModal.querySelector('.modal-description');
    const closeButton = galleryModal.querySelector('.modal-close');
    
    // Open modal with image data
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const imageSrc = button.getAttribute('data-image');
            const imageTitle = button.getAttribute('data-title');
            const imageDescription = button.getAttribute('data-description');
            
            modalImage.src = imageSrc;
            modalTitle.textContent = imageTitle;
            modalDescription.textContent = imageDescription;
            
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal on background click
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Initialize Album Gallery
 * Handles the album-style gallery on the about page
 */
function initializeAlbumGallery() {
    const carouselContainer = document.querySelector('.gallery-carousel-container');
    if (!carouselContainer) return;
    
    const carouselTrack = carouselContainer.querySelector('.gallery-carousel-track');
    const albums = carouselTrack.querySelectorAll('.gallery-album');
    const prevBtn = carouselContainer.querySelector('.carousel-nav.prev');
    const nextBtn = carouselContainer.querySelector('.carousel-nav.next');
    
    let currentIndex = 0;
    
    // Handle album thumbnail clicks
    albums.forEach((album, albumIndex) => {
        const thumbnails = album.querySelectorAll('.album-thumb');
        const mainImage = album.querySelector('.album-main-image img');
        
        thumbnails.forEach((thumb, thumbIndex) => {
            thumb.addEventListener('click', () => {
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                
                // Update main image
                const thumbImg = thumb.querySelector('img');
                if (thumbImg && mainImage) {
                    mainImage.src = thumbImg.src;
                    mainImage.alt = thumbImg.alt;
                }
            });
        });
    });
    
    // Setup navigation buttons
    if (prevBtn && nextBtn && albums.length > 1) {
        // Show/hide navigation based on position
        updateNavButtons();
        
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentIndex < albums.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
    }
    
    function updateCarousel() {
        const albumWidth = albums[0].offsetWidth;
        carouselTrack.style.transform = `translateX(-${currentIndex * albumWidth}px)`;
        updateNavButtons();
    }
    
    function updateNavButtons() {
        if (prevBtn && nextBtn) {
            prevBtn.classList.toggle('disabled', currentIndex === 0);
            nextBtn.classList.toggle('disabled', currentIndex === albums.length - 1);
        }
    }
    
    // Handle filter buttons for the album gallery
    const filterButtons = document.querySelectorAll('.gallery-filter .filter-btn');
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                const filteredAlbums = [];
                
                // Filter albums and build a new array of visible albums
                albums.forEach(album => {
                    if (filterValue === 'all' || album.getAttribute('data-category') === filterValue) {
                        album.style.display = 'block';
                        filteredAlbums.push(album);
                    } else {
                        album.style.display = 'none';
                    }
                });
                
                // Reset to the first visible album
                currentIndex = 0;
                updateCarousel();
            });
        });
    }
    
    // Initialize with first album
    updateCarousel();
}

/**
 * Tournament Countdown Timer
 * Displays and updates a countdown to the next tournament
 */
function initializeCountdown() {
    const countdownElements = document.querySelectorAll('[data-date]');
    
    if (countdownElements.length === 0) return;
    
    countdownElements.forEach(countdownElement => {
        const targetDate = new Date(countdownElement.getAttribute('data-date')).getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                countdownElement.innerHTML = "In progress";
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            // Check which elements exist in this particular countdown
            const daysElement = countdownElement.querySelector('.days');
            const hoursElement = countdownElement.querySelector('.hours');
            const minutesElement = countdownElement.querySelector('.minutes');
            
            if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
            if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
            if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
        }
        
        updateCountdown();
        // Update countdown every minute
        setInterval(updateCountdown, 60000);
    });
}

/**
 * Interactive Update Cards
 * Handles expanding/collapsing update cards on the home page
 */
function initializeUpdateCards() {
    const updateCards = document.querySelectorAll('.update-card.interactive');
    
    if (updateCards.length === 0) return;
    
    updateCards.forEach(card => {
        const expandToggle = card.querySelector('.update-expand-toggle');
        
        if (!expandToggle) return;
        
        let clickTimeout;
        let isScrolling = false;
        
        // Handle scroll events
        card.addEventListener('scroll', () => {
            isScrolling = true;
            clearTimeout(clickTimeout);
        });
        
        // Reset scroll flag after scrolling stops
        card.addEventListener('scrollend', () => {
            isScrolling = false;
        });
        
        expandToggle.addEventListener('click', (e) => {
            // If we're scrolling, don't expand the card
            if (isScrolling) return;
            
            // Close any other open cards
            updateCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('expanded')) {
                    otherCard.classList.remove('expanded');
                }
            });
            
            // Expand this card
            card.classList.add('expanded');
            
            // Add animation triggers to interactive elements inside expanded content
            // Animate progress bars with delay
            const progressBars = card.querySelectorAll('.progress');
            progressBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 50);
                }, index * 200);
            });
            
            // Initialize gallery carousel if present
            initializeUpdateGallery(card);
            
            // Scroll the card into view if needed
            if (!isElementInViewport(card)) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        // Add close button functionality
        const closeButton = card.querySelector('.close-update');
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.remove('expanded');
            });
        }
    });
    
    // Helper function to check if element is visible in viewport
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Initialize gallery carousel in update card
    function initializeUpdateGallery(card) {
        const carousel = card.querySelector('.gallery-carousel');
        const dots = card.querySelectorAll('.gallery-dot');
        
        if (!carousel || !dots.length) return;
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Update active dot
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                
                // Scroll carousel to corresponding image
                const images = carousel.querySelectorAll('img');
                if (images.length > index) {
                    carousel.scrollTo({
                        left: images[index].offsetLeft,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

/**
 * Update Filter Functionality
 * Handles filtering of update cards based on category
 */
function initializeUpdateFilter() {
    const updateTabs = document.querySelectorAll('.update-tab');
    const updateCards = document.querySelectorAll('.update-card');
    
    if (updateTabs.length === 0 || updateCards.length === 0) return;
    
    updateTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            updateTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const filterValue = tab.getAttribute('data-filter');
            
            // Filter cards
            updateCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
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
}

/**
 * Language Switcher Functionality
 * Handles switching between languages with persistent state management
 */
function initializeLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    if (langButtons.length === 0) return;
    
    // Retrieve stored language preference or default to German
    const storedLang = localStorage.getItem('nicolaSennLanguage') || 'de';
    
    // Set initial state based on stored preference
    document.querySelector(`.lang-btn[data-lang="${storedLang}"]`).classList.add('active');
    
    // Initial language application
    switchLanguage(storedLang, true);
    
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Switch language and persist selection
            switchLanguage(lang, false);
            localStorage.setItem('nicolaSennLanguage', lang);
        });
    });
}

/**
 * Switch Language
 * Comprehensive language transformation across all translatable elements
 * @param {string} lang - Language code ('en' or 'de')
 * @param {boolean} isInitial - Whether this is the initial language application
 */
function switchLanguage(lang, isInitial) {
    // Define translation data for elements without explicit attributes
    const translations = {
        en: {
            search_placeholder: "Search updates...",
            submit_button: "Submit",
            subscribe_button: "Subscribe",
            form_success: "Thank you for your message!",
            form_response: "We'll get back to you shortly.",
            newsletter_success: "Thanks for subscribing!",
            tournament_progress: "In progress",
            copyright: "© 2025 Nicola Senn. All rights reserved."
        },
        de: {
            search_placeholder: "Neuigkeiten suchen...",
            submit_button: "Absenden",
            subscribe_button: "Abonnieren",
            form_success: "Vielen Dank für Ihre Nachricht!",
            form_response: "Wir werden uns in Kürze bei Ihnen melden.",
            newsletter_success: "Danke für Ihr Abonnement!",
            tournament_progress: "Im Gange",
            copyright: "© 2025 Nicola Senn. Alle Rechte vorbehalten."
        }
    };

    // Update elements with data-[lang] attributes
    const translatedElements = document.querySelectorAll(`[data-${lang}]`);
    translatedElements.forEach(element => {
        const translatedText = element.getAttribute(`data-${lang}`);
        if (translatedText) {
            // Only apply animation if not initial load and element is visible
            if (!isInitial && isElementVisible(element)) {
                applyTransitionEffect(element, translatedText);
            } else {
                element.textContent = translatedText;
            }
        }
    });
    
    // Update form placeholders
    const placeholders = document.querySelectorAll('input[placeholder], textarea[placeholder]');
    placeholders.forEach(input => {
        if (input.getAttribute('type') === 'search' || input.classList.contains('search-input')) {
            input.placeholder = translations[lang].search_placeholder;
        }
    });
    
    // Update buttons without explicit data attributes
    const submitButtons = document.querySelectorAll('.submit-button:not([data-en]):not([data-de])');
    submitButtons.forEach(button => {
        const spanElement = button.querySelector('span');
        if (spanElement) {
            spanElement.textContent = translations[lang].submit_button;
        }
    });
    
    const subscribeButtons = document.querySelectorAll('.newsletter-submit:not([data-en]):not([data-de])');
    subscribeButtons.forEach(button => {
        const spanElement = button.querySelector('span');
        if (spanElement) {
            spanElement.textContent = translations[lang].subscribe_button;
        }
    });
    
    // Update copyright
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        copyrightElement.textContent = translations[lang].copyright;
    }
    
    // Set HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update page title
    updatePageTitle(lang);
}

/**
 * Update Page Title
 * Sets the appropriate page title based on current page and language
 */
function updatePageTitle(lang) {
    const currentPath = window.location.pathname;
    let title = '';
    
    if (currentPath.includes('about')) {
        title = lang === 'en' ? 'About Me | Nicola Senn | Professional Tennis Player' : 'Über mich | Nicola Senn | Professioneller Tennisspieler';
    } else if (currentPath.includes('updates')) {
        title = lang === 'en' ? 'Tennis Updates | Nicola Senn | Professional Tennis Player' : 'Tennis Neuigkeiten | Nicola Senn | Professioneller Tennisspieler';
    } else {
        title = lang === 'en' ? 'Nicola Senn | Professional Tennis Player' : 'Nicola Senn | Professioneller Tennisspieler';
    }
    
    document.title = title;
}

/**
 * Apply Transition Effect
 * Creates a smooth transition effect for text changes
 */
function applyTransitionEffect(element, newText) {
    // Create temporary wrapper if element doesn't have position
    const elementPosition = window.getComputedStyle(element).position;
    const needsWrapper = elementPosition === 'static';
    
    if (needsWrapper) {
        element.style.position = 'relative';
    }
    
    // Store original content
    const originalText = element.textContent;
    
    // Create and append transition overlay
    const overlay = document.createElement('span');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.transform = 'scaleX(0)';
    overlay.style.transformOrigin = 'left';
    overlay.style.transition = 'transform 0.3s ease-in-out';
    overlay.style.zIndex = '1';
    element.appendChild(overlay);
    
    // Trigger transition
    setTimeout(() => {
        overlay.style.transform = 'scaleX(1)';
        
        setTimeout(() => {
            // Update text when overlay is fully covering
            element.textContent = newText;
            
            // Re-append the overlay as it was removed with textContent change
            element.appendChild(overlay);
            overlay.style.transformOrigin = 'right';
            
            setTimeout(() => {
                // Reveal new text
                overlay.style.transform = 'scaleX(0)';
                
                // Clean up
                setTimeout(() => {
                    if (needsWrapper) {
                        element.style.position = '';
                    }
                    if (element.contains(overlay)) {
                        element.removeChild(overlay);
                    }
                }, 300);
            }, 50);
        }, 300);
    }, 50);
}

/**
 * Check if Element is Visible
 * Determines if an element is currently visible in the viewport
 */
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Contact Form Handling
 * Handles form submission with validation and animations
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Add animation to form fields
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        const indicator = group.querySelector('.form-indicator');
        
        if (input && indicator) {
            // Focus animations
            input.addEventListener('focus', () => {
                group.classList.add('active');
            });
            
            input.addEventListener('blur', () => {
                group.classList.remove('active');
                
                // Validate on blur
                if (input.value.trim()) {
                    group.classList.add('filled');
                    
                    if (input.checkValidity()) {
                        group.classList.remove('invalid');
                        group.classList.add('valid');
                    } else {
                        group.classList.remove('valid');
                        group.classList.add('invalid');
                    }
                } else {
                    group.classList.remove('filled', 'valid', 'invalid');
                }
            });
        }
    });
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form validation
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            const formGroup = field.closest('.form-group');
            
            if (!field.value.trim() || !field.checkValidity()) {
                formGroup.classList.add('invalid');
                isValid = false;
            } else {
                formGroup.classList.remove('invalid');
                formGroup.classList.add('valid');
            }
        });
        
        if (isValid) {
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Update button state
            const submitButton = contactForm.querySelector('.submit-btn');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;
            
            // Send the email via AJAX
            fetch(contactForm.action, {
                method: contactForm.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name, email, subject, message })
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message || 'Network response was not ok');
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Success message
                    contactForm.innerHTML = `
                        <div class="form-success">
                            <div class="success-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. I'll get back to you shortly.</p>
                            <p class="response-time">Typical response time: 24-48 hours</p>
                        </div>
                    `;
                } else {
                    throw new Error(data.message || 'Failed to send message');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Display error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-error';
                errorDiv.innerHTML = `
                    <p>${error.message}</p>
                    <p class="error-help">If the problem persists, please try again later or contact directly via email.</p>
                `;
                
                const formSubmit = contactForm.querySelector('.form-submit');
                formSubmit.insertBefore(errorDiv, submitButton);
                
                // Remove error message after 5 seconds
                setTimeout(() => {
                    errorDiv.remove();
                }, 5000);
            });
        } else {
            // Scroll to first invalid field
            const firstInvalidField = contactForm.querySelector('.form-group.invalid');
            if (firstInvalidField) {
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

/**
 * Expandable Content
 * Handles click-to-reveal content sections
 */
function initializeExpandableContent() {
    // Stats expansion - removed as no longer needed with new design
    
    // Tournament info toggle
    const infoToggleBtn = document.querySelector('.info-toggle-btn');
    const extendedInfo = document.querySelector('.tournament-extended-info');
    
    if (infoToggleBtn && extendedInfo) {
        infoToggleBtn.addEventListener('click', () => {
            extendedInfo.classList.toggle('active');
            infoToggleBtn.classList.toggle('active');
            
            const icon = infoToggleBtn.querySelector('i');
            
            if (extendedInfo.classList.contains('active')) {
                icon.className = 'fas fa-minus';
            } else {
                icon.className = 'fas fa-plus';
            }
        });
    }
}

/**
 * Journey Cards Initialization
 * Handles the flipping card effect for journey section
 */
function initializeJourneyCards() {
    const journeyCards = document.querySelectorAll('.journey-card-flip');
    
    if (journeyCards.length === 0) return;
    
    journeyCards.forEach(card => {
        const flipBtns = card.querySelectorAll('.flip-btn');
        
        flipBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
        });
    });
}

/**
 * Filter Buttons
 * Handles filtering functionality on various sections
 */
function initializeFilterButtons() {
    // Journey filter
    const journeyFilter = document.querySelector('.journey-filter');
    
    if (journeyFilter) {
        const filterButtons = journeyFilter.querySelectorAll('.filter-btn');
        const journeyCards = document.querySelectorAll('.journey-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                journeyCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 50);
                    } else {
                        card.classList.remove('visible');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Updates filter
    const updatesFilter = document.querySelector('.updates-filter');
    
    if (updatesFilter) {
        const filterButtons = updatesFilter.querySelectorAll('.filter-btn');
        const updateCards = document.querySelectorAll('.update-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                updateCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 50);
                    } else {
                        card.classList.remove('visible');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

/**
 * Tab Functionality
 * Handles tab switching on various sections
 */
function initializeTabs() {
    // Sponsors tabs
    const sponsorsTabs = document.querySelector('.sponsors-tabs');
    
    if (sponsorsTabs) {
        const tabButtons = sponsorsTabs.querySelectorAll('.tab-btn');
        const tabContents = sponsorsTabs.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Show corresponding tab content
                const tabId = button.getAttribute('data-tab');
                
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Rankings tabs
    const rankingsTabs = document.querySelector('.rankings-tabs');
    
    if (rankingsTabs) {
        const tabButtons = rankingsTabs.querySelectorAll('.ranking-tab');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // In a real implementation, this would load different ranking data
                // For this example, we'll just change the title
                const rankingType = button.getAttribute('data-ranking');
                const rankLabel = document.querySelector('.rank-label');
                
                if (rankLabel) {
                    if (rankingType === 'atp') {
                        rankLabel.textContent = 'Current Rank';
                    } else if (rankingType === 'race') {
                        rankLabel.textContent = 'Race Rank';
                    }
                }
            });
        });
    }
}

/**
 * Schedule Slider
 * Handles the tournament schedule slider
 */
function initializeScheduleSlider() {
    const scheduleSlider = document.querySelector('.schedule-slider');
    
    if (!scheduleSlider) return;
    
    const track = scheduleSlider.querySelector('.schedule-track');
    const items = track.querySelectorAll('.schedule-item');
    const prevBtn = scheduleSlider.querySelector('.prev');
    const nextBtn = scheduleSlider.querySelector('.next');
    
    if (items.length <= 3) {
        // Hide navigation if not enough items
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }
    
    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth + parseInt(window.getComputedStyle(items[0]).marginRight);
    
    function scrollToIndex(index) {
        if (index < 0) index = 0;
        if (index > items.length - 3) index = items.length - 3;
        
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        
        // Update button states
        if (currentIndex === 0) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }
        
        if (currentIndex >= items.length - 3) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }
    
    // Initialize button states
    scrollToIndex(0);
    
    // Add button event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            scrollToIndex(currentIndex - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            scrollToIndex(currentIndex + 1);
        });
    }
    
    // Add touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left
            scrollToIndex(currentIndex + 1);
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right
            scrollToIndex(currentIndex - 1);
        }
    }
}

/**
 * Load and display the next tournament data on the main page
 */
async function loadNextTournamentDisplay() {
    const tournamentCard = document.querySelector('.tournament-card');
    if (!tournamentCard) return;

    // Show loading state
    tournamentCard.innerHTML = `
        <div class="loading-state">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading tournament information...</p>
        </div>
    `;

    try {
        // Import MOCK_TOURNAMENTS data instead of fetching from API
        const tournament = MOCK_TOURNAMENTS && MOCK_TOURNAMENTS.length > 0 ? MOCK_TOURNAMENTS[0] : null;
        
        if (!tournament) {
            // Show empty state
            tournamentCard.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <h3>No Upcoming Tournament</h3>
                    <p>Check back later for updates on the next tournament.</p>
                </div>
            `;
            return;
        }
        
        // Update tournament card with the data
        const tournamentDate = new Date(tournament.date);
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        
        tournamentCard.innerHTML = `
            <div class="tournament-date">
                <span class="month">${monthNames[tournamentDate.getMonth()]}</span>
                <span class="day">${tournamentDate.getDate().toString().padStart(2, '0')}</span>
            </div>
            <div class="tournament-details">
                <h3 class="tournament-name">${tournament.name}</h3>
                <p class="tournament-location">${tournament.location}</p>
                <div class="tournament-info-toggle">
                    <button class="info-toggle-btn">Tournament Details <i class="fas fa-plus"></i></button>
                    <div class="tournament-extended-info">
                        <p class="tournament-description">${tournament.description}</p>
                        <div class="tournament-meta">
                            <div class="meta-item">
                                <i class="fas fa-calendar-alt"></i> 
                                <span>${tournamentDate.toLocaleDateString('en-US', { 
                                    month: 'long', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                })}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-trophy"></i> 
                                <span>${tournament.category}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-table-tennis"></i> 
                                <span>${tournament.surface}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tournament-countdown countdown-timer" data-date="${tournament.date}">
                <span class="days">00</span>d
                <span class="hours">00</span>h
                <span class="minutes">00</span>m
            </div>
        `;

        // Initialize countdown
        const countdownElement = tournamentCard.querySelector('.countdown-timer');
        if (countdownElement) {
            updateCountdown(countdownElement, tournamentDate);
        }

        // Add click handler for tournament details toggle
        const toggleBtn = tournamentCard.querySelector('.info-toggle-btn');
        const extendedInfo = tournamentCard.querySelector('.tournament-extended-info');
        if (toggleBtn && extendedInfo) {
            toggleBtn.addEventListener('click', () => {
                const isExpanded = extendedInfo.style.display === 'block';
                extendedInfo.style.display = isExpanded ? 'none' : 'block';
                toggleBtn.querySelector('i').className = isExpanded ? 'fas fa-plus' : 'fas fa-minus';
            });
        }
    } catch (error) {
        console.error('Error loading tournament display:', error);
        tournamentCard.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Error Loading Tournament</h3>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

/**
 * Donation Form Handling
 * Handles the donation button click to redirect to Stripe payment
 */
function initializeDonationForm() {
    const donateButton = document.getElementById('donate-button');
    
    if (!donateButton) return;

    // Handle donation button click
    donateButton.addEventListener('click', () => {
        // Redirect to Stripe Payment Link
        window.location.href = 'https://donate.stripe.com/4gw5mYd6WeSG67CdQQ';
    });
}

/**
 * Sponsorship Image Modal
 * Displays the sponsorship options image in a modal overlay
 */
function initializePdfDownloads() {
    const sponsorButtons = document.querySelectorAll('a[href$=".pdf"]');
    const modal = document.getElementById('pdf-viewer-modal');
    const closeButton = document.querySelector('.pdf-modal-close');
    
    if (!sponsorButtons.length || !modal) return;
    
    // Add click handler to sponsor buttons
    sponsorButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Store original button content
            const originalContent = this.innerHTML;
            
            // Set loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Show the modal (no need to fetch the PDF since we're showing a static image)
            setTimeout(() => {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
                
                // Add a zoom effect to the image when it appears
                const sponsorImage = modal.querySelector('.sponsor-detail-image');
                if (sponsorImage) {
                    sponsorImage.style.transform = 'scale(0.95)';
                    sponsorImage.style.opacity = '0';
                    
                    setTimeout(() => {
                        sponsorImage.style.transition = 'all 0.5s ease-out';
                        sponsorImage.style.transform = 'scale(1)';
                        sponsorImage.style.opacity = '1';
                    }, 50);
                }
                
                // Restore original button content
                this.innerHTML = originalContent;
            }, 300); // Short delay for better UX
        });
    });
    
    // Close modal when clicking the close button
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Enable image zoom on click
    const sponsorImage = modal.querySelector('.sponsor-detail-image');
    if (sponsorImage) {
        let isZoomed = false;
        
        sponsorImage.addEventListener('click', function() {
            if (!isZoomed) {
                this.style.cursor = 'zoom-out';
                this.style.transform = 'scale(1.5)';
                this.style.transition = 'transform 0.3s ease';
            } else {
                this.style.cursor = 'zoom-in';
                this.style.transform = 'scale(1)';
            }
            isZoomed = !isZoomed;
        });
        
        // Reset zoom when modal is closed
        modal.addEventListener('transitionend', function() {
            if (!modal.classList.contains('show') && sponsorImage) {
                sponsorImage.style.transform = 'scale(1)';
                isZoomed = false;
            }
        });
    }
    
    // Close modal function
    function closeModal() {
        // Add closing animation
        const sponsorImage = modal.querySelector('.sponsor-detail-image');
        if (sponsorImage) {
            sponsorImage.style.transform = 'scale(0.95)';
            sponsorImage.style.opacity = '0';
            sponsorImage.style.transition = 'all 0.3s ease-in';
        }
        
        setTimeout(() => {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        }, 200);
    }
}