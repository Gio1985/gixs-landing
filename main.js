(function () {
    "use strict";

    document.documentElement.classList.add("js");

    var translations = {
        es: {
            nav_ecosystem: "Ecosistema",
            nav_suite: "Suite",
            nav_contact: "Contacto",
            hero_eyebrow: "Prelanzamiento privado",
            hero_title: "GIXS",
            hero_lede: "Un estudio luxury tech que orquesta soluciones digitales donde la ingenieria se encuentra con la creatividad.",
            hero_cta: "Iniciar una conversacion",
            hero_secondary: "Explorar ecosistema",
            metric_one_label: "Focus",
            metric_one_value: "Cloud, Apps, Games",
            metric_two_label: "Modo",
            metric_two_value: "Precision delivery",
            metric_three_label: "Dominio",
            brand_eyebrow: "Vision de marca",
            brand_title: "Ingenieria silenciosa para productos que se sienten inevitables.",
            brand_body: "GIXS nace como un ecosistema de innovacion para construir, depurar y escalar sistemas digitales con criterio tecnico y sensibilidad creativa. Menos ruido. Mas arquitectura. Mas oficio.",
            ecosystem_eyebrow: "Ecosistema de servicios",
            ecosystem_title: "Capacidades de alto nivel, presentadas como un solo sistema.",
            service_cloud_title: "Cloud Consulting & Architecture",
            service_cloud_body: "Infraestructura elegante, resiliente y preparada para crecer sin sobredimensionar complejidad.",
            service_app_title: "High-End App Development",
            service_app_body: "Aplicaciones premium con experiencia cuidada, codigo mantenible y rendimiento medible.",
            service_game_title: "Game Design & Development",
            service_game_body: "Showcase de titulos propios, mundos interactivos y prototipos jugables con identidad.",
            service_debug_title: "Problem Solving & Strategic Debugging",
            service_debug_body: "Diagnostico profundo para problemas criticos, regresiones invisibles y decisiones tecnicas bloqueadas.",
            service_sap_title: "SAP ABAP Specialized Development",
            service_sap_body: "Desarrollo especializado para entornos SAP donde estabilidad, trazabilidad y precision importan.",
            suite_eyebrow: "Modelo de suscripcion",
            suite_title: "Una suite premium para que las PYMES escalen con software propio sin cargar con un departamento completo.",
            suite_body: "Aplicaciones modulares, soporte estrategico y mejoras continuas bajo una membresia mensual. Operacion, datos, automatizacion y experiencia de cliente trabajando como una sola capa de crecimiento.",
            suite_item_one: "Operations OS",
            suite_item_two: "Client Intelligence",
            suite_item_three: "Workflow Automation",
            suite_item_four: "Executive Dashboards",
            contact_eyebrow: "Entrada privada",
            contact_title: "Construyamos una ventaja que no parezca prestada.",
            contact_body: "GIXS esta en fase de prelanzamiento. Las colaboraciones se abren de forma selectiva para proyectos con ambicion real y margen para hacer las cosas bien.",
            footer_copy: "GIXS. Engineering systems with creative gravity."
        },
        en: {
            nav_ecosystem: "Ecosystem",
            nav_suite: "Suite",
            nav_contact: "Contact",
            hero_eyebrow: "Private prelaunch",
            hero_title: "GIXS",
            hero_lede: "A luxury tech studio orchestrating digital solutions where engineering meets creativity.",
            hero_cta: "Start a conversation",
            hero_secondary: "Explore ecosystem",
            metric_one_label: "Focus",
            metric_one_value: "Cloud, Apps, Games",
            metric_two_label: "Mode",
            metric_two_value: "Precision delivery",
            metric_three_label: "Domain",
            brand_eyebrow: "Brand vision",
            brand_title: "Quiet engineering for products that feel inevitable.",
            brand_body: "GIXS is an innovation ecosystem built to design, debug, and scale digital systems with technical judgment and creative sensitivity. Less noise. More architecture. More craft.",
            ecosystem_eyebrow: "Service ecosystem",
            ecosystem_title: "High-level capabilities, presented as one integrated system.",
            service_cloud_title: "Cloud Consulting & Architecture",
            service_cloud_body: "Elegant, resilient infrastructure ready to grow without inflating complexity.",
            service_app_title: "High-End App Development",
            service_app_body: "Premium applications with refined experience, maintainable code, and measurable performance.",
            service_game_title: "Game Design & Development",
            service_game_body: "A showcase of original titles, interactive worlds, and playable prototypes with identity.",
            service_debug_title: "Problem Solving & Strategic Debugging",
            service_debug_body: "Deep diagnosis for critical issues, invisible regressions, and blocked technical decisions.",
            service_sap_title: "SAP ABAP Specialized Development",
            service_sap_body: "Specialized development for SAP environments where stability, traceability, and precision matter.",
            suite_eyebrow: "Subscription model",
            suite_title: "A premium app suite for SMBs to scale with owned software without carrying a full department.",
            suite_body: "Modular applications, strategic support, and continuous improvements under a monthly membership. Operations, data, automation, and customer experience working as one growth layer.",
            suite_item_one: "Operations OS",
            suite_item_two: "Client Intelligence",
            suite_item_three: "Workflow Automation",
            suite_item_four: "Executive Dashboards",
            contact_eyebrow: "Private entry",
            contact_title: "Let us build an advantage that does not feel rented.",
            contact_body: "GIXS is in prelaunch. Collaborations open selectively for projects with real ambition and enough room to do things well.",
            footer_copy: "GIXS. Engineering systems with creative gravity."
        }
    };

    function setLanguage(lang) {
        var dictionary = translations[lang] || translations.es;
        document.documentElement.lang = lang;
        document.querySelectorAll("[data-t]").forEach(function (node) {
            var key = node.getAttribute("data-t");
            if (dictionary[key]) {
                node.textContent = dictionary[key];
            }
        });
        document.querySelectorAll(".lang-btn").forEach(function (button) {
            button.classList.toggle("active", button.getAttribute("data-lang") === lang);
        });
        try {
            localStorage.setItem("gixs_lang", lang);
        } catch (error) {}
    }

    var currentLanguage = "es";
    try {
        currentLanguage = localStorage.getItem("gixs_lang") || "es";
    } catch (error) {}

    document.querySelectorAll(".lang-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            setLanguage(button.getAttribute("data-lang"));
        });
    });
    setLanguage(currentLanguage);

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll("[data-reveal]").forEach(function (node) {
        revealObserver.observe(node);
    });

    var canvas = document.getElementById("signal-field");
    var context = canvas && canvas.getContext("2d");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!context || reduceMotion) {
        return;
    }

    var width = 0;
    var height = 0;
    var points = [];

    function resize() {
        var ratio = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        points = Array.from({ length: width < 720 ? 22 : 42 }, function () {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.18,
                vy: (Math.random() - 0.5) * 0.18,
                r: Math.random() * 1.4 + 0.5
            };
        });
    }

    function frame() {
        context.clearRect(0, 0, width, height);
        context.strokeStyle = "rgba(15,111,88,0.07)";
        context.fillStyle = "rgba(18,25,29,0.18)";

        points.forEach(function (point, index) {
            point.x += point.vx;
            point.y += point.vy;

            if (point.x < -20) point.x = width + 20;
            if (point.x > width + 20) point.x = -20;
            if (point.y < -20) point.y = height + 20;
            if (point.y > height + 20) point.y = -20;

            context.beginPath();
            context.arc(point.x, point.y, point.r, 0, Math.PI * 2);
            context.fill();

            for (var i = index + 1; i < points.length; i += 1) {
                var other = points[i];
                var dx = point.x - other.x;
                var dy = point.y - other.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 155) {
                    context.globalAlpha = 1 - distance / 155;
                    context.beginPath();
                    context.moveTo(point.x, point.y);
                    context.lineTo(other.x, other.y);
                    context.stroke();
                    context.globalAlpha = 1;
                }
            }
        });

        requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    frame();
})();
