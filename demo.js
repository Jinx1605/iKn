// demo.js
document.addEventListener('DOMContentLoaded', () => {
    // Wait for the theme manager to be fully initialized
    const waitForThemeManager = () => {
        if (window.themeManager && typeof window.themeManager.createIcon === 'function') {
            initializeDemo();
        } else {
            setTimeout(waitForThemeManager, 50); // Check again in 50ms
        }
    };

    const initializeDemo = () => {
        // --- DEMO: Create icons using the public API ---
        const iconsToCreate = [
            { container: '#main-container', iconClass: 'fa-music', text: 'Music', onClick: () => alert('Playing Music!') },
            { container: '#main-container', iconClass: 'fa-route', text: 'Maps', onClick: () => alert('Opening Maps...') },
            { container: '#main-container', iconClass: 'fa-video', text: 'Videos', onClick: () => alert('Browsing Videos.') },
            { container: '#main-container', iconClass: 'fa-cog', text: 'Settings', onClick: () => window.themeManager.toggleControls() }
        ];

        iconsToCreate.forEach((iconData, i) => {
            const icon = window.themeManager.createIcon(iconData);
            if (icon) {
                // Set initial positions for the demo icons
                icon.style.left = `${100 + i * 120}px`;
                icon.style.top = `${window.innerHeight / 2 - 50}px`;
            }
        });

        // Add keyboard shortcuts and easy access methods
        setupEasyAccess();
        
        // Show a brief intro message
        setTimeout(() => {
            console.log('🎮 Glassmorphic Icon System Ready!');
            console.log('💡 Easy Access:');
            console.log('   • Ctrl+Shift+T - Toggle settings');
            console.log('   • Ctrl+Shift+S - Show settings');
            console.log('   • Ctrl+Shift+H - Hide settings');
            console.log('   • Escape - Hide settings');
            console.log('   • Double-click background - Toggle settings');
            console.log('   • Click the Settings icon');
        }, 1000);
    };

    const setupEasyAccess = () => {
        // Add global keyboard shortcuts for easy access
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+T to toggle theme controls
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                window.themeManager.toggleControls();
                console.log('🎛️ Settings panel toggled');
            }
            // Ctrl+Shift+H to hide controls
            if (e.ctrlKey && e.shiftKey && e.key === 'H') {
                e.preventDefault();
                window.themeManager.hideControls();
                console.log('👁️ Settings panel hidden');
            }
            // Ctrl+Shift+S to show controls
            if (e.ctrlKey && e.shiftKey && e.key === 'S') {
                e.preventDefault();
                window.themeManager.showControls();
                console.log('🔧 Settings panel shown');
            }
            // Escape to hide controls
            if (e.key === 'Escape' && window.themeManager.isControlsVisible()) {
                e.preventDefault();
                window.themeManager.hideControls();
                console.log('🚪 Settings panel closed with Escape');
            }
        });

        // Double-click anywhere on background to toggle controls
        document.addEventListener('dblclick', (e) => {
            if (e.target === document.body || e.target.id === 'main-container') {
                window.themeManager.toggleControls();
                console.log('👆 Settings panel toggled with double-click');
            }
        });

        // Auto-show settings after 3 seconds for demo purposes
        setTimeout(() => {
            if (!window.themeManager.isControlsVisible()) {
                window.themeManager.showControls();
                console.log('🎬 Auto-showing settings panel for demo');
            }
        }, 3000);
    };

    // Start the initialization process
    waitForThemeManager();
});