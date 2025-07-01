// Dark mode functionality
const darkModeToggle = document.getElementById('darkModeToggle');

if (darkModeToggle) {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Menu toggle
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('active');
    });
}

// Form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.required && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Form submission logic would go here
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close menu if open on mobile
            if (window.innerWidth < 768 && menu.classList.contains('active')) {
                hamburger.click();
            }
        }
    });
});

// Download Resume Functionality
document.getElementById('downloadResume').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Create a hidden link to trigger the download
    const link = document.createElement('a');
    link.href = 'Drissi_Mouad_CV.pdf'; // Replace with your actual CV file
    link.download = 'Drissi_Mouad_CV.pdf'; // File name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Visual feedback
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-check"></i> Resume Downloaded!';
    this.classList.add('downloaded');
    
    // Reset after 3 seconds
    setTimeout(() => {
        this.innerHTML = originalText;
        this.classList.remove('downloaded');
    }, 3000);
});