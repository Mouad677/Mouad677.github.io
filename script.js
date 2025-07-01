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