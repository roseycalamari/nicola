document.addEventListener('DOMContentLoaded', function() {
    // Language switching functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
    
    function switchLanguage(lang) {
        // Update all elements with data-en and data-de attributes
        const elements = document.querySelectorAll('[data-en], [data-de]');
        
        elements.forEach(element => {
            if (element.hasAttribute(`data-${lang}`)) {
                const text = element.getAttribute(`data-${lang}`);
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });
        
        // Update active language button
        langButtons.forEach(button => {
            if (button.getAttribute('data-lang') === lang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // Set initial language based on browser preference or default to English
    const browserLang = navigator.language.split('-')[0];
    const initialLang = browserLang === 'de' ? 'de' : 'en';
    switchLanguage(initialLang);
}); 