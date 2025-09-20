// dynamic-background.js

/**
 * Generates a random vibrant color as an HSL string.
 * @returns {string} e.g., 'hsl(280, 70%, 50%)'
 */
function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 20) + 70; // 70-90%
    const lightness = Math.floor(Math.random() * 20) + 40;  // 40-60%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Creates and applies a random linear gradient to the document body.
 */
function setRandomGradientBackground() {
    const body = document.body;
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const angle = Math.floor(Math.random() * 360);

    body.style.backgroundImage = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

// Set the background as soon as the document is ready.
document.addEventListener('DOMContentLoaded', setRandomGradientBackground);