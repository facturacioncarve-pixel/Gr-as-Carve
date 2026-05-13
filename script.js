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
            const whatsappNumber = '525612800284';
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

});
