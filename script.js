// ==================== Smooth Scrolling ====================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Update URL hash for browser history
                    const targetId = this.getAttribute('href');
                    history.pushState(null, null, targetId);
                    
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        });

        // ==================== Browser Back/Forward Button Support ====================
        window.addEventListener('popstate', () => {
            const hash = window.location.hash;
            if (hash) {
                const target = document.querySelector(hash);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else {
                // If no hash, scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });

        // ==================== Scroll to Top Button ====================
        const scrollToTopBtn = document.getElementById('scrollToTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Update URL to home
            history.pushState(null, null, '#home');
        });

        // ==================== Navbar Background on Scroll ====================
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 15, 0.98)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 255, 136, 0.1)';
            } else {
                navbar.style.background = 'rgba(10, 10, 15, 0.95)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            }
        });

        // ==================== Scroll Reveal Animation ====================
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        const revealOnScroll = () => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('load', revealOnScroll);

        // ==================== Animated Progress Bars ====================
        const animateProgressBars = () => {
            const progressBars = document.querySelectorAll('.progress-bar');
            
            progressBars.forEach(bar => {
                const barTop = bar.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (barTop < windowHeight - 100 && bar.style.width === '0%') {
                    const targetWidth = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = targetWidth + '%';
                    }, 200);
                }
            });
        };

        window.addEventListener('scroll', animateProgressBars);
        window.addEventListener('load', animateProgressBars);

        // ==================== 3D Tilt Effect for Skill Cards ====================
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });

        // ==================== Form Validation and Submission ====================
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (name === '') {
                alert('Please enter your name');
                return;
            }
            
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            if (subject === '') {
                alert('Please enter a subject');
                return;
            }
            
            if (message === '') {
                alert('Please enter your message');
                return;
            }
            
            // If all validations pass
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });

        // ==================== Parallax Effect on Hero Section ====================
        window.addEventListener('mousemove', (e) => {
            const heroSection = document.querySelector('.hero-section');
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;
            
            heroSection.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
        });

        // ==================== Active Navigation Link ====================
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // ==================== Add dynamic particles effect ====================
        function createParticles() {
            const heroSection = document.querySelector('.hero-section');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = Math.random() * 4 + 1 + 'px';
                particle.style.height = particle.style.width;
                particle.style.background = Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)';
                particle.style.borderRadius = '50%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.opacity = Math.random() * 0.5;
                particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
                particle.style.pointerEvents = 'none';
                
                heroSection.appendChild(particle);
            }
        }

        // Initialize particles on page load
        window.addEventListener('load', createParticles);