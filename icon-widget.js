/**
 * iKn Icon Widget - Embeddable JavaScript widget for creating OTF editable icons
 * Compatible with Apple macOS and iOS design guidelines
 */

class IconWidget {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            size: options.size || 100,
            backgroundColor: options.backgroundColor || '#007AFF',
            iconColor: options.iconColor || '#FFFFFF',
            cornerRadius: options.cornerRadius || 22,
            shadowEnabled: options.shadowEnabled !== false,
            editable: options.editable !== false,
            ...options
        };
        
        this.svgIcons = {
            'home': 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
            'heart': 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
            'star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
            'settings': 'M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.44,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z',
            'user': 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
            'mail': 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
        };
        
        this.init();
    }
    
    init() {
        this.createWidget();
        this.attachEventListeners();
    }
    
    createWidget() {
        this.container.innerHTML = `
            <div class="ikn-widget" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <div class="ikn-icon-container" style="
                    width: ${this.options.size}px;
                    height: ${this.options.size}px;
                    background: ${this.options.backgroundColor};
                    border-radius: ${this.options.cornerRadius}px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    cursor: ${this.options.editable ? 'pointer' : 'default'};
                    transition: all 0.2s ease;
                    ${this.options.shadowEnabled ? 'box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);' : ''}
                ">
                    <svg class="ikn-icon" width="${this.options.size * 0.6}" height="${this.options.size * 0.6}" viewBox="0 0 24 24" fill="${this.options.iconColor}">
                        <path d="${this.svgIcons.home}"/>
                    </svg>
                </div>
                ${this.options.editable ? this.createEditorPanel() : ''}
            </div>
        `;
    }
    
    createEditorPanel() {
        return `
            <div class="ikn-editor" style="
                margin-top: 16px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-radius: 12px;
                padding: 16px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                display: none;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            ">
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-size: 13px; font-weight: 600; color: #1d1d1f; margin-bottom: 6px;">Icon</label>
                    <div class="ikn-icon-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
                        ${Object.keys(this.svgIcons).map(icon => `
                            <button class="ikn-icon-option" data-icon="${icon}" style="
                                width: 40px;
                                height: 40px;
                                border: 2px solid #e5e5e7;
                                border-radius: 8px;
                                background: white;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                cursor: pointer;
                                transition: all 0.2s ease;
                            ">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1d1d1f">
                                    <path d="${this.svgIcons[icon]}"/>
                                </svg>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-size: 13px; font-weight: 600; color: #1d1d1f; margin-bottom: 6px;">Background Color</label>
                    <input type="color" class="ikn-bg-color" value="${this.options.backgroundColor}" style="
                        width: 100%;
                        height: 40px;
                        border: 2px solid #e5e5e7;
                        border-radius: 8px;
                        cursor: pointer;
                        background: none;
                    ">
                </div>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-size: 13px; font-weight: 600; color: #1d1d1f; margin-bottom: 6px;">Icon Color</label>
                    <input type="color" class="ikn-icon-color" value="${this.options.iconColor}" style="
                        width: 100%;
                        height: 40px;
                        border: 2px solid #e5e5e7;
                        border-radius: 8px;
                        cursor: pointer;
                        background: none;
                    ">
                </div>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-size: 13px; font-weight: 600; color: #1d1d1f; margin-bottom: 6px;">Corner Radius</label>
                    <input type="range" class="ikn-radius" min="0" max="50" value="${this.options.cornerRadius}" style="
                        width: 100%;
                        height: 6px;
                        border-radius: 3px;
                        background: #e5e5e7;
                        outline: none;
                        cursor: pointer;
                    ">
                </div>
                
                <button class="ikn-download" style="
                    width: 100%;
                    height: 44px;
                    background: #007AFF;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                ">
                    Download Icon
                </button>
            </div>
        `;
    }
    
    attachEventListeners() {
        const iconContainer = this.container.querySelector('.ikn-icon-container');
        const editor = this.container.querySelector('.ikn-editor');
        
        if (this.options.editable && iconContainer && editor) {
            // Toggle editor
            iconContainer.addEventListener('click', () => {
                const isVisible = editor.style.display !== 'none';
                editor.style.display = isVisible ? 'none' : 'block';
            });
            
            // Icon selection
            const iconButtons = this.container.querySelectorAll('.ikn-icon-option');
            iconButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const iconName = button.dataset.icon;
                    this.updateIcon(iconName);
                    this.updateIconSelection(button);
                });
            });
            
            // Color inputs
            const bgColorInput = this.container.querySelector('.ikn-bg-color');
            const iconColorInput = this.container.querySelector('.ikn-icon-color');
            const radiusInput = this.container.querySelector('.ikn-radius');
            
            bgColorInput?.addEventListener('input', (e) => {
                this.updateBackgroundColor(e.target.value);
            });
            
            iconColorInput?.addEventListener('input', (e) => {
                this.updateIconColor(e.target.value);
            });
            
            radiusInput?.addEventListener('input', (e) => {
                this.updateCornerRadius(e.target.value);
            });
            
            // Download button
            const downloadButton = this.container.querySelector('.ikn-download');
            downloadButton?.addEventListener('click', () => {
                this.downloadIcon();
            });
            
            // Hover effects
            iconContainer.addEventListener('mouseenter', () => {
                if (this.options.shadowEnabled) {
                    iconContainer.style.transform = 'translateY(-2px)';
                    iconContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.16), 0 4px 8px rgba(0, 0, 0, 0.12)';
                }
            });
            
            iconContainer.addEventListener('mouseleave', () => {
                iconContainer.style.transform = 'translateY(0)';
                if (this.options.shadowEnabled) {
                    iconContainer.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)';
                }
            });
        }
    }
    
    updateIcon(iconName) {
        const iconElement = this.container.querySelector('.ikn-icon path');
        if (iconElement && this.svgIcons[iconName]) {
            iconElement.setAttribute('d', this.svgIcons[iconName]);
        }
    }
    
    updateIconSelection(selectedButton) {
        const iconButtons = this.container.querySelectorAll('.ikn-icon-option');
        iconButtons.forEach(button => {
            button.style.borderColor = '#e5e5e7';
            button.style.background = 'white';
        });
        selectedButton.style.borderColor = '#007AFF';
        selectedButton.style.background = '#f0f8ff';
    }
    
    updateBackgroundColor(color) {
        const iconContainer = this.container.querySelector('.ikn-icon-container');
        if (iconContainer) {
            iconContainer.style.background = color;
            this.options.backgroundColor = color;
        }
    }
    
    updateIconColor(color) {
        const iconElement = this.container.querySelector('.ikn-icon');
        if (iconElement) {
            iconElement.setAttribute('fill', color);
            this.options.iconColor = color;
        }
    }
    
    updateCornerRadius(radius) {
        const iconContainer = this.container.querySelector('.ikn-icon-container');
        if (iconContainer) {
            iconContainer.style.borderRadius = `${radius}px`;
            this.options.cornerRadius = radius;
        }
    }
    
    downloadIcon() {
        const iconContainer = this.container.querySelector('.ikn-icon-container');
        const svgIcon = this.container.querySelector('.ikn-icon');
        
        // Create a canvas to render the icon
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = this.options.size * 2; // Higher resolution
        
        canvas.width = size;
        canvas.height = size;
        
        // Draw background with rounded corners
        ctx.fillStyle = this.options.backgroundColor;
        this.drawRoundedRect(ctx, 0, 0, size, size, this.options.cornerRadius * 2);
        ctx.fill();
        
        // Convert SVG to image and draw on canvas
        const svgData = new XMLSerializer().serializeToString(svgIcon);
        const img = new Image();
        const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
            const iconSize = size * 0.6;
            const iconOffset = (size - iconSize) / 2;
            ctx.drawImage(img, iconOffset, iconOffset, iconSize, iconSize);
            
            // Download the image
            canvas.toBlob((blob) => {
                const link = document.createElement('a');
                link.download = 'ikn-icon.png';
                link.href = URL.createObjectURL(blob);
                link.click();
                URL.revokeObjectURL(url);
                URL.revokeObjectURL(link.href);
            });
        };
        
        img.src = url;
    }
    
    drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }
    
    // Public API methods
    setIcon(iconName) {
        if (this.svgIcons[iconName]) {
            this.updateIcon(iconName);
        }
    }
    
    setBackgroundColor(color) {
        this.updateBackgroundColor(color);
    }
    
    setIconColor(color) {
        this.updateIconColor(color);
    }
    
    setCornerRadius(radius) {
        this.updateCornerRadius(radius);
    }
    
    getConfiguration() {
        return {
            backgroundColor: this.options.backgroundColor,
            iconColor: this.options.iconColor,
            cornerRadius: this.options.cornerRadius,
            size: this.options.size
        };
    }
}

// Make it available globally
if (typeof window !== 'undefined') {
    window.IconWidget = IconWidget;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IconWidget;
}