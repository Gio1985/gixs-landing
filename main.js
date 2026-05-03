/* ===== GIXS — Main JavaScript ===== */
(function () {
    'use strict';

    /* --- i18n System --- */
    const translations = {
        en: {
            nav_status: 'Building in stealth',
            hero_overline: 'STEALTH MODE',
            hero_title_1: 'Engineering',
            hero_title_2: 'the Invisible.',
            hero_subtitle: 'We architect systems that power experiences people feel — but never see.',
            hero_tag_1: 'Software Engineering',
            hero_tag_2: 'Game Development',
            hero_tag_3: 'Cloud Architecture',
            phil_title_1: 'Precision Code',
            phil_text_1: 'Scalable, maintainable systems engineered for the long run.',
            phil_title_2: 'Immersive Worlds',
            phil_text_2: 'Interactive experiences that blur the line between digital and tangible.',
            phil_title_3: 'Cloud Native',
            phil_text_3: 'Resilient architectures designed for zero downtime at any scale.',
            signal_label: 'Transmission',
            signal_quote: '"The best technology disappears. It becomes the medium through which extraordinary things happen."',
            contact_title: 'Ready to build something?',
            contact_subtitle: "We're selectively taking on projects that challenge the status quo.",
            footer_copy: '© 2026 GIXS. All systems operational.'
        },
        es: {
            nav_status: 'Construyendo en stealth',
            hero_overline: 'MODO STEALTH',
            hero_title_1: 'Ingeniería',
            hero_title_2: 'de lo Invisible.',
            hero_subtitle: 'Arquitectamos sistemas que potencian experiencias que la gente siente — pero nunca ve.',
            hero_tag_1: 'Ingeniería de Software',
            hero_tag_2: 'Desarrollo de Videojuegos',
            hero_tag_3: 'Arquitectura Cloud',
            phil_title_1: 'Código de Precisión',
            phil_text_1: 'Sistemas escalables y mantenibles diseñados para el largo plazo.',
            phil_title_2: 'Mundos Inmersivos',
            phil_text_2: 'Experiencias interactivas que borran la línea entre lo digital y lo tangible.',
            phil_title_3: 'Cloud Native',
            phil_text_3: 'Arquitecturas resilientes diseñadas para cero tiempo de inactividad a cualquier escala.',
            signal_label: 'Transmisión',
            signal_quote: '"La mejor tecnología desaparece. Se convierte en el medio a través del cual suceden cosas extraordinarias."',
            contact_title: '¿Listo para construir algo?',
            contact_subtitle: 'Aceptamos selectivamente proyectos que desafían el status quo.',
            footer_copy: '© 2026 GIXS. Todos los sistemas operativos.'
        }
    };

    const commandsList = {
        en: ['gixs init --stealth', 'deploying imagination...', 'npm run build:future', 'cloud.architect --scale=infinite', 'rendering new reality...'],
        es: ['gixs init --stealth', 'desplegando imaginación...', 'npm run build:future', 'cloud.architect --scale=infinite', 'renderizando nueva realidad...']
    };

    let currentLang = 'en';
    try {
        currentLang = localStorage.getItem('gixs_lang') || 'en';
    } catch (e) {
        console.warn('Local storage is disabled or unavailable.');
    }
    
    let commands = commandsList[currentLang];

    function updateLanguage(lang) {
        currentLang = lang;
        try {
            localStorage.setItem('gixs_lang', lang);
        } catch (e) {}
        
        commands = commandsList[lang];
        
        document.querySelectorAll('[data-t]').forEach(el => {
            const key = el.getAttribute('data-t');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        document.documentElement.lang = lang;
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            if (lang !== currentLang) {
                updateLanguage(lang);
                charIndex = 0;
                cmdIndex = 0;
            }
        });
    });

    // Initial load
    updateLanguage(currentLang);

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
    const PARTICLE_COUNT = window.innerWidth < 768 ? 20 : 50;

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

    // Cleanup complete
})();
