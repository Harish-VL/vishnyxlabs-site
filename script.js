// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.service-card, .about-content, .contact-container, .work-card, .testimonial-card, .faq-item'
    );
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // -----------------------
    // EmailJS integration
    // -----------------------

    // TODO: replace these with your real EmailJS IDs
    const EMAILJS_PUBLIC_KEY   = 'YOUR_PUBLIC_KEY';
    const EMAILJS_SERVICE_ID   = 'YOUR_SERVICE_ID';
    const EMAILJS_CONTACT_TPL  = 'YOUR_CONTACT_TEMPLATE_ID';
    const EMAILJS_AUDIT_TPL    = 'YOUR_AUDIT_TEMPLATE_ID';

    if (window.emailjs) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        console.warn('EmailJS library not loaded. Check the script tag in index.html.');
    }

    function setStatus(el, type, msg) {
        if (!el) return;
        el.classList.remove('success', 'error');
        if (type) el.classList.add(type);
        el.textContent = msg || '';
    }

    // Contact form
    const contactForm   = document.getElementById('contact-form');
    const contactStatus = document.getElementById('contact-status');
    const contactSubmit = document.getElementById('contact-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!window.emailjs) {
                setStatus(contactStatus, 'error', 'Email service not configured.');
                return;
            }

            const from_name  = (document.getElementById('name') || {}).value || '';
            const from_email = (document.getElementById('email') || {}).value || '';
            const message    = (document.getElementById('message') || {}).value || '';

            contactSubmit.disabled = true;
            contactSubmit.textContent = 'Sending...';
            setStatus(contactStatus, null, '');

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TPL, {
                from_name,
                from_email,
                message
            }).then(() => {
                setStatus(contactStatus, 'success', 'Thanks! We will get back to you soon.');
                contactForm.reset();
            }).catch(err => {
                console.error('Contact form email error', err);
                setStatus(contactStatus, 'error', 'Something went wrong. Please try again.');
            }).finally(() => {
                contactSubmit.disabled = false;
                contactSubmit.textContent = 'Send Message';
            });
        });
    }

    // Audit form (modal)
    const auditForm   = document.getElementById('audit-form');
    const auditStatus = document.getElementById('audit-status');
    const auditSubmit = document.getElementById('audit-submit');

    if (auditForm) {
        auditForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!window.emailjs) {
                setStatus(auditStatus, 'error', 'Email service not configured.');
                return;
            }

            const from_name  = (document.getElementById('audit-name') || {}).value || '';
            const from_email = (document.getElementById('audit-email') || {}).value || '';
            const message    = (document.getElementById('audit-notes') || {}).value || 'Free tech audit request';

            auditSubmit.disabled = true;
            auditSubmit.textContent = 'Sending...';
            setStatus(auditStatus, null, '');

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUDIT_TPL, {
                from_name,
                from_email,
                message
            }).then(() => {
                setStatus(auditStatus, 'success', 'Audit request sent. We will reach out shortly.');
                auditForm.reset();
                closeModal();
            }).catch(err => {
                console.error('Audit form email error', err);
                setStatus(auditStatus, 'error', 'Something went wrong. Please try again.');
            }).finally(() => {
                auditSubmit.disabled = false;
                auditSubmit.textContent = 'Claim Free Audit';
            });
        });
    }
});

// Modal Logic
function openModal() {
    document.getElementById('lead-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('lead-modal').classList.remove('active');
}

// Close modal on outside click
document.getElementById('lead-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('lead-modal')) {
        closeModal();
    }
});

document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();

    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ) {
        // Already on homepage → scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // On privacy, terms, etc → navigate home
        window.location.href = 'index.html';
    }
});
