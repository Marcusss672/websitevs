// Master translation database
const masterTranslations = {
    en: {
        // Homepage
        'welcome': 'WELCOME TO',
        'queue-now': 'QUEUE NOW',
        'view-queue': 'VIEW QUEUING',
        'facilitator': 'FACILITATOR',
        
        // Customer page
        'customer-welcome': 'Welcome',
        'choose-lane': 'YOU MAY NOW CHOOSE YOUR LANE FOR YOUR TRANSACTION',
        'priority-lane': 'PRIORITY LANE',
        'regular-lane': 'REGULAR LANE',
        'get-queue-number': 'Get Your Queue Number',
        'email-address': 'Email address',
        'transaction-type': 'Transaction Type',
        'select-transaction': 'Select Transaction Type',
        'tuition': 'Tuition and Payments',
        'graduates': 'Graduates',
        'enrollment': 'Enrollment and Inquiries',
        'schedule': 'Schedule',
        'document': 'Request for Document',
        'others': 'Others',
        'get-queue-btn': 'Get Queue Number',
        
     
        // Queue Display page
                'regular': 'Regular',
                'priority': 'Priority',
                'now-serving': 'Now Serving:',
                'skipped-numbers': 'Skipped Numbers',
                'queue-display': 'Queue Display',
                'live-queue-status': 'Live queue status and updates',
                'back-home': 'Back to Home',
                'no-skipped-numbers': 'No skipped numbers',
        
        // Success page
        'youre-on-queue': "You're on Queue!",
        'check-email': 'CHECK YOUR EMAIL TO VIEW LIVE QUEUING',
        'okay': 'OKAY'
    },
    tl: {
        // Homepage
        'welcome': 'MALIGAYANG PAGDATING SA',
        'queue-now': 'PUMILA NGAYON',
        'view-queue': 'TINGNAN ANG PILA',
        'facilitator': 'TAGAPANGASIWA',
        
        // Customer page
        'customer-welcome': 'Maligayang Pagdating',
        'choose-lane': 'MAAARI NA NINYONG PILIIN ANG INYONG LANE PARA SA INYONG TRANSAKSYON',
        'priority-lane': 'PRAYORIDAD NA LINYA',
        'regular-lane': 'KARANIWANG LINYA',
        'get-queue-number': 'Kunin ang Inyong Queue Number',
        'email-address': 'Email address',
        'transaction-type': 'Uri ng Transaksyon',
        'select-transaction': 'Pumili ng Uri ng Transaksyon',
        'tuition': 'Tuition at Bayad',
        'graduates': 'Graduates',
        'enrollment': 'Enrollment at Katanungan',
        'schedule': 'Iskedyul',
        'document': 'Kahilingan ng Dokumento',
        'others': 'Iba pa',
        'get-queue-btn': 'Kunin ang Queue Number',
        
        // Queue Display page
        'regular': 'Karaniwan',
                'priority': 'Prayoridad',
                'now-serving': 'Kasalukuyang Tinatawag:',
                'skipped-numbers': 'Nilaktawang Numero',
                'queue-display': 'Pagpapakita ng Pila',
                'live-queue-status': 'Live na katayuan ng pila at mga update',
                'back-home': 'Bumalik sa Home',
                'no-skipped-numbers': 'Walang nilaktawang numero',
                
        
        // Success page
        'youre-on-queue': 'Kayo ay nasa Pila!',
        'check-email': 'TINGNAN ANG INYONG EMAIL PARA MAKITA ANG LIVE QUEUING',
        'okay': 'OKAY'
    }
};

// Global language manager
class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.init();
    }
    
    init() {
        this.loadLanguagePreference();
        this.updateLanguageButtons(this.currentLanguage);
        this.applyTranslations();
    }
    
    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.saveLanguagePreference(lang);
        this.updateLanguageButtons(lang);
        this.applyTranslations();
        
        // Update URL parameter without refreshing the page
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);
    }
    
    saveLanguagePreference(lang) {
        // Save to localStorage (more reliable than cookies)
        localStorage.setItem('preferred_language', lang);
        // Also save to cookie as backup
        document.cookie = `preferred_language=${lang}; path=/; max-age=86400`;
    }
    
    loadLanguagePreference() {
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        
        if (urlLang && masterTranslations[urlLang]) {
            this.currentLanguage = urlLang;
            this.saveLanguagePreference(urlLang); // Save the URL language
            return;
        }
        
        // Check localStorage
        const storedLang = localStorage.getItem('preferred_language');
        if (storedLang && masterTranslations[storedLang]) {
            this.currentLanguage = storedLang;
            return;
        }
        
        // Check cookie as fallback
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'preferred_language' && masterTranslations[value]) {
                this.currentLanguage = value;
                return;
            }
        }
    }
    
    updateLanguageButtons(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
    }
    
    applyTranslations() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = masterTranslations[this.currentLanguage]?.[key];
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
                    element.placeholder = translation;
                } else if (element.tagName === 'OPTION') {
                    element.textContent = translation;
                } else if (element.tagName === 'BUTTON') {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// Initialize global language manager when DOM is loaded
function initializeLanguageSystem() {
    if (!window.languageManager) {
        window.languageManager = new LanguageManager();
    }
}

// Initialize immediately if DOM is already loaded, otherwise wait for DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguageSystem);
} else {
    initializeLanguageSystem();
}

// Global functions
function changeLanguage(lang) {
    if (window.languageManager) {
        window.languageManager.changeLanguage(lang);
    }
}

function navigateWithLanguage(page) {
    const currentLang = window.languageManager ? window.languageManager.getCurrentLanguage() : 'en';
    window.location.href = `${page}?lang=${currentLang}`;
}