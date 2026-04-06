/**
 * Wrap God PPF - Optimized Performance & Premium Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Header Logic
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // 2. Navigation & Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                if (navLinks) navLinks.classList.remove('active');
                if (hamburger) hamburger.classList.remove('toggle');

                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Lenis Smooth Scroll Initialization
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 4. Advanced GSAP Animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // SYNC LENIS WITH SCROLLTRIGGER
        lenis.on('scroll', ScrollTrigger.update);

        // Logo & Hero Reveal
        const heroTl = gsap.timeline();
        heroTl.from(".logo-img", { 
            scale: 0, 
            rotation: -10, 
            filter: "blur(20px)", 
            duration: 1.5, 
            ease: "back.out(1.7)" 
        })
        .from(".hero h1", { opacity: 0, y: 100, filter: "blur(10px)", duration: 1.2, ease: "power4.out" }, "-=1")
              .from(".hero p", { opacity: 0, y: 30, duration: 1, ease: "power3.out" }, "-=0.8")
              .from(".hero-btns", { opacity: 0, y: 20, duration: 1, ease: "power3.out" }, "-=0.8");

        // Section Headers Reveal
        document.querySelectorAll(".section-title").forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out"
            });
        });

        // Parallax Background Image
        gsap.to("body::before", {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            },
            y: 200, // Move 200px down slightly differently
            ease: "none"
        });

        // Staggered Cards Reveal
        const staggerContainers = document.querySelectorAll(".grid");
        staggerContainers.forEach(container => {
            const cards = container.children;
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: container,
                    start: "top 85%"
                },
                opacity: 0,
                y: 60,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            });
        });

        // Signature 3D Reveal for Product Cards
        gsap.utils.toArray(".series-card, .coverage-card").forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 95%",
                    onEnter: () => card.classList.add('glint-active') // Trigger shimmer
                },
                opacity: 0,
                rotationX: -25,
                rotationY: 10,
                y: 100,
                transformOrigin: "center top",
                duration: 1.5,
                ease: "power4.out",
                delay: index * 0.1
            });

            // Image Zoom within card
            const img = card.querySelector('img');
            if (img) {
                gsap.from(img, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 95%"
                    },
                    scale: 1.3,
                    duration: 2,
                    ease: "power2.out"
                });
            }
        });

        // Heading Expansion Reveal
        gsap.utils.toArray(".section-title").forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 95%"
                },
                letterSpacing: "15px",
                opacity: 0,
                filter: "blur(10px)",
                duration: 1.5,
                ease: "power3.out"
            });
        });

        // Universal 'Premium' Reveal for all .fade-in elements
        gsap.utils.toArray(".fade-in, .section-title, .about-text p").forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 95%",
                    once: true
                },
                opacity: 0,
                y: 30,
                scale: 0.98,
                filter: "blur(5px)",
                duration: 1.2,
                ease: "power2.out"
            });
        });

        // Cinematic Image Parallax (About Us)
        gsap.to(".parallax-img", {
            scrollTrigger: {
                trigger: ".parallax-container",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5 // Smooth tracking
            },
            y: "-15%", // Move image up inside container
            ease: "none"
        });

        // Safety Reveal: Ensure everything is visible after 2 seconds no matter what
        setTimeout(() => {
            gsap.to(".fade-in, .section-title, .grid > div", { opacity: 1, y: 0, duration: 0.2 });
        }, 2000);
    }

    // 4. Modal Logic (Product Series)
    const seriesData = {
        aura: { title: "AURA Series", vibe: "The foundational energy...", desc: "Step into premium protection without compromise. 6.5 MIL TPU barrier...", specs: "6.5 MIL", warranty: "5-Year", finish: "High-Gloss/Matte", adhesive: "Ashland Glue" },
        centurion: { title: "CENTURION Series", vibe: "The armored defender...", desc: "7.5 MIL TPU construction for the daily driver who demands more.", specs: "7.5 MIL", warranty: "8-Year", finish: "High-Gloss/Matte", adhesive: "Ashland Glue" },
        demigod: { title: "DEMIGOD Series", vibe: "The elite layer of strength...", desc: "8.5 MIL thickness built to dominate the elements for a decade.", specs: "8.5 MIL", warranty: "10-Year", finish: "High-Gloss/Matte", adhesive: "Ashland Glue" },
        immortal: { title: "IMMORTAL Series", vibe: "The ultimate everlasting armor...", desc: "Flagship 9.5 MIL ultra-thick TPU. The pinnacle of technology.", specs: "9.5 MIL", warranty: "Lifetime", finish: "High-Gloss/Matte", adhesive: "Ashland Glue" }
    };

    const modal = document.getElementById('series-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    document.querySelectorAll('.learn-more').forEach(btn => {
        btn.addEventListener('click', () => {
            const seriesKey = btn.closest('.service-card').getAttribute('data-series');
            const data = seriesData[seriesKey];
            if (data && modalBody) {
                modalBody.innerHTML = `
                    <span class="modal-vibe">${data.vibe}</span>
                    <h2 class="section-title">${data.title}</h2>
                    <p class="modal-description">${data.desc}</p>
                    <div class="modal-highlights">
                        <div class="highlight-item"><i class="fas fa-layer-group"></i><strong>Thickness</strong><p>${data.specs}</p></div>
                        <div class="highlight-item"><i class="fas fa-shield-alt"></i><strong>Warranty</strong><p>${data.warranty}</p></div>
                        <div class="highlight-item"><i class="fas fa-palette"></i><strong>Finishes</strong><p>${data.finish}</p></div>
                        <div class="highlight-item"><i class="fas fa-tint"></i><strong>Adhesive</strong><p>${data.adhesive}</p></div>
                    </div>
                    <div class="modal-footer"><a href="contact.html" class="btn btn-primary">Book Now</a></div>
                `;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // 5. Contact Form Logic (Dual Submission: WhatsApp + Email)
    const contactForms = document.querySelectorAll('#contact-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // We do NOT preventDefault() to allow FormSubmit.co to work
            // but we open WhatsApp first.
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            // Gather Form Data
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const vehicle = formData.get('vehicle') || 'Not specified';
            const service = formData.get('service') || 'Not specified';
            const message = formData.get('message') || 'No details';

            // 1. WhatsApp Redirection (Opens in new tab)
            const whatsappNumber = "8531007766";
            const waText = `*New Quote Request*%0A%0AName: ${name}%0APhone: ${phone}%0AVehicle: ${vehicle}%0AService: ${service}%0AMessage: ${message}`;
            const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${waText}`;
            window.open(whatsappUrl, '_blank');

            // 2. Visual Feedback
            submitBtn.innerText = 'Sending Both...';
            submitBtn.disabled = true;

            // Note: If you see "file://" error, use Live Server in VS Code!
            
            // Allow the form to submit normally to FormSubmit.co
        });
    });

    // 6. 3D Tilt Micro-interaction
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            const rotateX = (y - 0.5) * 15; // 15 degrees max tilt
            const rotateY = (x - 0.5) * -15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.transition = 'none'; // Instant response on move
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease-out'; // Smooth return
        });
    });
});
