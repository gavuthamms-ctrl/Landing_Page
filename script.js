/**
 * Wrap God PPF - Optimized Performance & Premium Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky & Scroll-Aware Header Logic
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (!header) return;

        // Sticky class toggle
        header.classList.toggle('scrolled', window.scrollY > 50);


        lastScrollY = window.scrollY;
        
        // Update Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById("scroll-progress");
        if (progressBar) progressBar.style.width = scrolled + "%";
    });

    // 2. Navigation & Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
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
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
                if (hamburger) {
                    hamburger.classList.remove('toggle');
                }
                
                // Allow lenis if active, else standard scroll
                if (typeof lenis !== 'undefined') {
                    lenis.scrollTo(target);
                } else {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
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
        lenis.on('scroll', ScrollTrigger.update);

        // Fail-safe initialization to guarantee visibility
        gsap.set(".fade-in, .slide-in-left, .slide-in-right, .section-title, .grid > div, .about-text p", { opacity: 1, y: 0, x: 0, scale: 1 });

        // Logo & Hero Reveal
        const heroTl = gsap.timeline();
        heroTl.fromTo(".logo-img", 
            { scale: 0.8, opacity: 0, filter: "blur(10px)" }, 
            { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
        )
        .fromTo(".hero h1", 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=1"
        )
        .fromTo(".hero p", 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8"
        )
        .fromTo(".hero-btns", 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8"
        );

        // Section Headers
        document.querySelectorAll(".section-title").forEach(title => {
            gsap.fromTo(title, 
                { opacity: 0, y: 50, letterSpacing: "15px" },
                {
                    opacity: 1,
                    y: 0,
                    letterSpacing: "4px",
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Staggered Grids
        document.querySelectorAll(".grid").forEach(container => {
            gsap.fromTo(container.children, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Universal Fade-in Elements
        gsap.utils.toArray(".fade-in, .slide-in-left, .slide-in-right").forEach(el => {
            // Check if element is already part of a grid stagger to avoid conflicts
            if (!el.closest('.grid') && !el.classList.contains('section-title')) {
                // Determine direction based on class
                let startX = 0;
                let startY = 30;
                
                if (el.classList.contains('slide-in-left')) {
                    startX = -50;
                    startY = 0;
                } else if (el.classList.contains('slide-in-right')) {
                    startX = 50;
                    startY = 0;
                }

                gsap.fromTo(el, 
                    { opacity: 0, x: startX, y: startY },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

        // Premium Cards (Glint and Lift)
        gsap.utils.toArray(".series-card, .coverage-card").forEach(card => {
            ScrollTrigger.create({
                trigger: card,
                start: "top 80%",
                onEnter: () => card.classList.add('glint-active'),
                onLeave: () => card.classList.remove('glint-active'),
                onEnterBack: () => card.classList.add('glint-active'),
                onLeaveBack: () => card.classList.remove('glint-active')
            });
        });
        
        // Safety Fallback Reveal - Final Catch all
        setTimeout(() => {
            gsap.to(".fade-in, .slide-in-left, .slide-in-right, .section-title, .grid > div, .about-text p", 
                { opacity: 1, y: 0, x: 0, scale: 1, clearProps: "all", duration: 0.2 }
            );
        }, 2000);

    } else {
        // Absolute fallback if GSAP completely fails to load
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .section-title, .grid > div').forEach(el => {
            el.style.opacity = 1;
            el.style.transform = 'none';
        });
    }

    // Modal Logic
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
            const card = btn.closest('.series-card');
            if (!card) return;
            
            const seriesKey = card.getAttribute('data-series');
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
                if(modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });

    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // 5. Contact Form Logic (Dual Submission: WhatsApp + Email)
    const contactForms = document.querySelectorAll('#contact-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            
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
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
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

    // 6.5 Premium Custom Cursor Animation (Desktop Only)
    if (window.innerWidth >= 993) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        const cursorFollower = document.createElement('div');
        cursorFollower.classList.add('custom-cursor-follower');
        document.body.appendChild(cursorFollower);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let followerX = mouseX;
        let followerY = mouseY;

        // Move the solid dot instantly
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            gsap.set(cursor, { x: mouseX - 3, y: mouseY - 3 }); // Center the 6px dot
        });

        // Smooth trail for the outer ring
        gsap.ticker.add(() => {
            followerX += (mouseX - followerX) * 0.15; // 0.15 controls trailing smoothness
            followerY += (mouseY - followerY) * 0.15;
            gsap.set(cursorFollower, { x: followerX - 18, y: followerY - 18 }); // Center 36px ring
        });

        // Expand ring on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .why-item, .series-card, .coverage-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorFollower.classList.add('active'));
            el.addEventListener('mouseleave', () => cursorFollower.classList.remove('active'));
        });
    }

    // 7. Auto Year & Back To Top
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            if (typeof lenis !== 'undefined') {
                lenis.scrollTo(0);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
});
