// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Get saved theme or default to light
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        // Apply theme on load
        this.applyTheme(this.currentTheme);
        
        // Setup event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        const desktopToggle = document.getElementById('theme-toggle');
        const mobileToggle = document.getElementById('theme-toggle-mobile');
        
        if (desktopToggle) {
            desktopToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme(theme) {
        const body = document.body;
        const toggles = [
            document.getElementById('theme-toggle'),
            document.getElementById('theme-toggle-mobile')
        ];

        if (theme === 'dark') {
            body.classList.add('dark-mode');
            this.updateToggleIcons(toggles, true);
        } else {
            body.classList.remove('dark-mode');
            this.updateToggleIcons(toggles, false);
        }
    }

    updateToggleIcons(toggles, isDark) {
        toggles.forEach(toggle => {
            if (toggle) {
                const sunIcon = toggle.querySelector('.sun-icon');
                const moonIcon = toggle.querySelector('.moon-icon');
                
                if (isDark) {
                    sunIcon?.classList.add('hidden');
                    moonIcon?.classList.remove('hidden');
                } else {
                    sunIcon?.classList.remove('hidden');
                    moonIcon?.classList.add('hidden');
                }
            }
        });
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});