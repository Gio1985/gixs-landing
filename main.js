/* ===== GIXS — Main JavaScript ===== */
(function () {
    'use strict';

    /* --- Cursor Glow --- */
    const glow = document.getElementById('cursor-glow');
    let mx = 0, my = 0, gx = 0, gy = 0;

    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

    function animateGlow() {
        gx += (mx - gx) * 0.08;
        gy += (my - gy) * 0.08;
        glow.style.transform = `translate(${gx - 300}px, ${gy - 300}px)`;
        requestAnimationFrame(animateGlow);
    }
    if (window.matchMedia('(pointer: fine)').matches) animateGlow();

    /* --- Particle System --- */
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 50;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.size = Math.random() * 1.5 + 0.5;
            this.alpha = Math.random() * 0.3 + 0.05;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(167, 139, 250, ${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(167, 139, 250, ${0.04 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    /* --- Scroll Reveal --- */
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('revealed'), i * 120);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    /* --- Terminal Typing Effect --- */
    const commands = [
        'gixs init --stealth',
        'deploying imagination...',
        'npm run build:future',
        'cloud.architect --scale=infinite',
        'rendering new reality...',
    ];
    const terminalText = document.querySelector('.terminal-text');
    let cmdIndex = 0, charIndex = 0, isDeleting = false;

    function typeCommand() {
        const current = commands[cmdIndex];
        if (!isDeleting) {
            terminalText.textContent = current.substring(0, charIndex++);
            if (charIndex > current.length) {
                isDeleting = true;
                setTimeout(typeCommand, 2000);
                return;
            }
            setTimeout(typeCommand, 60 + Math.random() * 40);
        } else {
            terminalText.textContent = current.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                cmdIndex = (cmdIndex + 1) % commands.length;
                setTimeout(typeCommand, 500);
                return;
            }
            setTimeout(typeCommand, 30);
        }
    }

    /* Start typing when terminal is visible */
    const terminalObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeCommand();
            terminalObserver.disconnect();
        }
    }, { threshold: 0.5 });
    const terminal = document.querySelector('.signal-terminal');
    if (terminal) terminalObserver.observe(terminal);

    /* --- Nav scroll effect --- */
    const nav = document.getElementById('main-nav');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            nav.style.borderBottomColor = 'rgba(255,255,255,0.08)';
        } else {
            nav.style.borderBottomColor = 'rgba(255,255,255,0.03)';
        }
        lastScroll = scrollY;
    }, { passive: true });

    /* --- Domain tag hover sound-like visual feedback --- */
    document.querySelectorAll('.domain-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });

})();
