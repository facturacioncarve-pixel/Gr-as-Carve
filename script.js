document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const header = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Simple Form Submission Simulation
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Form validation status
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Redirigiendo a WhatsApp...';
            submitBtn.disabled = true;

            // Construct WhatsApp message
            const whatsappNumber = '525614856469';
            const text = `Hola, mi nombre es ${name}. 
            Mi teléfono es: ${phone}. 
            Estoy interesado en el servicio de: ${service}.
            Detalles: ${message}`;
            
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

            // Redirect after a short delay to show the "Redirigiendo" state
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                
                // Reset form and button
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                
                formStatus.style.color = 'var(--primary)';
                formStatus.innerText = `¡Gracias ${name}! Te hemos redirigido a WhatsApp para finalizar tu solicitud.`;
                
                setTimeout(() => {
                    formStatus.innerText = '';
                }, 5000);
            }, 1000);
        });
    }

    // Drag to scroll for Gallery (Desktop swipe)
    const gallery = document.querySelector('.gallery-grid');
    let isDown = false;
    let startDate;
    let startX;
    let scrollLeft;

    if (gallery) {
        gallery.addEventListener('mousedown', (e) => {
            isDown = true;
            gallery.classList.add('grabbing');
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });

        gallery.addEventListener('mouseleave', () => {
            isDown = false;
            gallery.classList.remove('grabbing');
        });

        gallery.addEventListener('mouseup', () => {
            isDown = false;
            gallery.classList.remove('grabbing');
        });

        gallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast
            gallery.scrollLeft = scrollLeft - walk;
        });
    }

    // Modal logic for Articles
    const modals = document.querySelectorAll('.modal');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    const closeBtns = document.querySelectorAll('.close-modal');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.classList.remove('show');
            });
            document.body.style.overflow = '';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Dynamic Reviews Carousel Logic
    // Agrega aquí tus reseñas reales. El sistema las mostrará de manera aleatoria.
    const allReviews = [
        { name: 'Julio Armando Gonzalez Garcia', initial: 'J', color: '#f4b400', date: 'hace un mes', text: '"Hola súper recomendable, les agradezco mucho. Excelente servicio todo super. Saludos"' }
        // Puedes agregar más reseñas copiando este formato:
        // { name: 'Nombre del Cliente', initial: 'N', color: '#4285f4', date: 'hace 2 meses', text: '"El texto de su opinión aquí."' }
    ];

    const reviewsTrack = document.getElementById('reviewsTrack');
    const reviewDotsContainer = document.getElementById('reviewDots');

    if (reviewsTrack && reviewDotsContainer) {
        // Shuffle and select reviews
        const shuffledReviews = allReviews.sort(() => 0.5 - Math.random()).slice(0, 4);
        
        reviewsTrack.innerHTML = '';
        reviewDotsContainer.innerHTML = '';

        shuffledReviews.forEach((review, index) => {
            reviewsTrack.innerHTML += `
                <div class="review-card">
                    <div class="review-header">
                        <div class="user-info">
                            <div class="user-avatar" style="background-color: ${review.color};">${review.initial}</div>
                            <div class="user-details">
                                <h4>${review.name}</h4>
                                <div class="stars-mini">★★★★★</div>
                            </div>
                        </div>
                        <span class="review-date">${review.date}</span>
                    </div>
                    <p class="review-text">${review.text}</p>
                    <div class="google-icon-card">
                        <img src="google-g-icon.svg" alt="G" width="14">
                    </div>
                </div>
            `;
            reviewDotsContainer.innerHTML += `<div class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`;
        });

        const prevReviewBtn = document.getElementById('prevReviewBtn');
        const nextReviewBtn = document.getElementById('nextReviewBtn');
        const reviewDots = document.querySelectorAll('.review-dots .dot');
        let currentReviewIndex = 0;
        const totalReviews = shuffledReviews.length;

        function updateCarousel() {
            reviewsTrack.style.transform = `translateX(-${currentReviewIndex * 100}%)`;
            reviewDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentReviewIndex);
            });
        }

        if (prevReviewBtn && nextReviewBtn) {
            if (totalReviews <= 1) {
                prevReviewBtn.style.display = 'none';
                nextReviewBtn.style.display = 'none';
                if (reviewDotsContainer) reviewDotsContainer.style.display = 'none';
            } else {
                prevReviewBtn.style.display = 'flex';
                nextReviewBtn.style.display = 'flex';
                if (reviewDotsContainer) reviewDotsContainer.style.display = 'flex';

                prevReviewBtn.addEventListener('click', () => {
                    currentReviewIndex = (currentReviewIndex === 0) ? totalReviews - 1 : currentReviewIndex - 1;
                    updateCarousel();
                });

                nextReviewBtn.addEventListener('click', () => {
                    currentReviewIndex = (currentReviewIndex === totalReviews - 1) ? 0 : currentReviewIndex + 1;
                    updateCarousel();
                });
            }
        }

        if (totalReviews > 1) {
            reviewDots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    currentReviewIndex = parseInt(e.target.getAttribute('data-index'));
                    updateCarousel();
                });
            });
        }
    }

    // Random TikTok Video Injector
    const tiktokContainer = document.getElementById('tiktok-random-container');
    if (tiktokContainer) {
        const tiktokVideoIds = [
            '7651674385362816276',
            '7651674125651561748',
            '7650154587487259924'
        ];
        const randomId = tiktokVideoIds[Math.floor(Math.random() * tiktokVideoIds.length)];
        
        tiktokContainer.innerHTML = `
            <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@gruascarve/video/${randomId}" data-video-id="${randomId}" style="max-width: 605px;min-width: 325px; margin: 0 auto; border-radius: 8px; overflow: hidden;" > 
                <section> 
                    <a target="_blank" title="@gruascarve" href="https://www.tiktok.com/@gruascarve?refer=embed">@gruascarve</a> 
                </section> 
            </blockquote>
        `;
        
        const script = document.createElement('script');
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
    }

});
