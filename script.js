document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links (only for # links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.includes('.html')) return;

            e.preventDefault();

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lightbox Logic
    const images = document.querySelectorAll('.clickable-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightbox && lightboxImg && lightboxClose) {
        images.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
            }
        });
    }

    // AI News RSS Fetch Logic
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        // Fetch AI News using rss2json
        fetch('https://api.rss2json.com/v1/api.json?rss_url=https://techcrunch.com/category/artificial-intelligence/feed/')
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    newsContainer.innerHTML = '';
                    data.items.slice(0, 12).forEach(item => {
                        const newsItem = document.createElement('div');
                        newsItem.className = 'glass-panel eco-card';
                        newsItem.innerHTML = `
                            <h3 style="font-size: 1.1rem; margin-bottom: 10px;">${item.title}</h3>
                            <p style="font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">${item.pubDate.split(' ')[0]}</p>
                            <a href="${item.link}" target="_blank" class="btn-outline" style="font-size: 0.8rem; padding: 5px 15px;">Read More</a>
                        `;
                        newsContainer.appendChild(newsItem);
                    });
                } else {
                    newsContainer.innerHTML = '<p>No news found.</p>';
                }
            })
            .catch(err => {
                newsContainer.innerHTML = '<p>Failed to load AI News.</p>';
            });
    }
});
