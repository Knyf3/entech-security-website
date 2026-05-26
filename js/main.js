
document.addEventListener('DOMContentLoaded', () => {
    // Helper function for Intersection Observer
    const setupIntersectionObserver = (selector, className) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(className);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1 // Trigger when 10% of the element is visible
            });
            elements.forEach(element => observer.observe(element));
        }
    };

    // 1. Sticky header scroll detection
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile nav toggle (hamburger open/close)
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.navbar-nav');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('mobile-open');
            hamburger.classList.toggle('is-active');
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('mobile-open');
                hamburger.classList.remove('is-active');
            });
        });
    }

    // 3. Dropdown hover/click support (for desktop for now, click for mobile)
    const navDropdowns = document.querySelectorAll('.nav-dropdown');

    navDropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        if (dropdownToggle && dropdownMenu) {
            // Desktop hover
            if (window.innerWidth > 768) {
                dropdown.addEventListener('mouseenter', () => {
                    dropdownMenu.classList.add('show');
                });
                dropdown.addEventListener('mouseleave', () => {
                    dropdownMenu.classList.remove('show');
                });
            } else { // Mobile click
                dropdownToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdownMenu.classList.toggle('show');
                });

                // Close dropdown if clicked outside
                document.addEventListener('click', (e) => {
                    if (!dropdown.contains(e.target)) {
                        dropdownMenu.classList.remove('show');
                    }
                });
            }
        }
    });

    // 4. IntersectionObserver for .fade-in elements
    setupIntersectionObserver('.fade-in', 'is-visible');

    // 5. Contact form submit handler
    const contactForm = document.querySelector('.contact-form form');
    const contactFormMessage = document.createElement('div');
    contactFormMessage.className = 'form-message';
    contactFormMessage.style.cssText = 'padding: 15px; margin-top: 20px; border-radius: var(--radius); text-align: center; font-weight: 600; display: none;';

    if (contactForm) {
        contactForm.parentNode.insertBefore(contactFormMessage, contactForm.nextSibling);

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission

            // Simulate success feedback
            contactFormMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            contactFormMessage.style.backgroundColor = 'var(--teal-light)';
            contactFormMessage.style.color = 'var(--teal)';
            contactFormMessage.style.display = 'block';

            contactForm.reset(); // Clear the form

            // Hide message after a few seconds
            setTimeout(() => {
                contactFormMessage.style.display = 'none';
            }, 5000);
        });
    }

    // 6. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
