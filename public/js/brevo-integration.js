// Initialize Brevo form
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');

    if (newsletterForm) {
        // Add loading state class
        newsletterForm.classList.add('brevo-form');
        
        // Add error handling for network issues
        window.addEventListener('offline', function() {
            if (newsletterMessage) {
                newsletterMessage.textContent = 'Keine Internetverbindung. Bitte versuchen Sie es später erneut.';
                newsletterMessage.style.color = '#f44336';
            }
        });

        // Handle form submission
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            const email = emailInput.value;

            // Basic email validation
            if (!email || !email.includes('@') || !email.includes('.')) {
                newsletterMessage.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
                newsletterMessage.style.color = '#f44336';
                return;
            }

            // Show loading state
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;
            newsletterMessage.textContent = '';

            try {
                // Call our Vercel API endpoint
                const response = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Replace form with success message
                    newsletterForm.innerHTML = `
                        <div class="newsletter-success">
                            <div class="success-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h4 data-en="Thank You!" data-de="Vielen Dank!">Vielen Dank!</h4>
                            <p data-en="You've successfully subscribed to my newsletter" data-de="Du hast dich erfolgreich für meinen Newsletter angemeldet">Du hast dich erfolgreich für meinen Newsletter angemeldet</p>
                        </div>
                    `;
                } else {
                    throw new Error(data.error || 'Subscription failed');
                }
            } catch (error) {
                console.error('Newsletter subscription error:', error);
                newsletterMessage.textContent = error.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
                newsletterMessage.style.color = '#f44336';
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
}); 