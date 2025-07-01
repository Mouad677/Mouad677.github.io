// Form submission with Formspree
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Disable submit button
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Get form data
            const formData = new FormData(this);
            
            // Send form data to Formspree
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success message
                    formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                    formStatus.className = 'success';
                    formStatus.style.display = 'block';
                    
                    // Reset form
                    form.reset();
                } else {
                    // Error message
                    formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
                    formStatus.className = 'error';
                    formStatus.style.display = 'block';
                }
            })
            .catch(error => {
                // Error message
                formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
                formStatus.className = 'error';
                formStatus.style.display = 'block';
            })
            .finally(() => {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
                
                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            });
        });
    }
});