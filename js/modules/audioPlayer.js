/* ============================================
   AUDIO PLAYER MODULE
   Visual controls and interactions for Spotify
   ============================================ */

import { DOM, addClass, removeClass } from './domManager.js';

/**
 * Player state
 */
const playerState = {
    isPlaying: false,
    volume: 1.0,
};

/**
 * Initialize audio player visual effects
 */
export function initAudioPlayer() {
    // Since we're using Spotify iframe, we can't control playback directly
    // But we can add visual enhancements

    const gameboyScreen = document.querySelector('.gameboy-screen');
    if (!gameboyScreen) return;

    // Add hover effects
    gameboyScreen.addEventListener('mouseenter', () => {
        addClass(gameboyScreen, 'hover-glow');
    });

    gameboyScreen.addEventListener('mouseleave', () => {
        removeClass(gameboyScreen, 'hover-glow');
    });

    // Add decorative control buttons
    addControlButtons(gameboyScreen);
}

/**
 * Add decorative control buttons
 * @param {HTMLElement} container - Container element
 */
function addControlButtons(container) {
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'controls';

    // Create decorative buttons (A, B style)
    const buttonA = createControlButton('A');
    const buttonB = createControlButton('B');

    controlsDiv.appendChild(buttonB);
    controlsDiv.appendChild(buttonA);

    container.appendChild(controlsDiv);
}

/**
 * Create a control button
 * @param {string} label - Button label
 * @returns {HTMLElement}
 */
function createControlButton(label) {
    const button = document.createElement('div');
    button.className = 'control-btn';
    button.setAttribute('aria-label', `Button ${label}`);
    button.setAttribute('role', 'button');
    button.setAttribute('tabindex', '0');

    // Add visual feedback
    button.addEventListener('click', () => {
        animateButtonPress(button);
    });

    button.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            animateButtonPress(button);
        }
    });

    return button;
}

/**
 * Animate button press
 * @param {HTMLElement} button - Button element
 */
function animateButtonPress(button) {
    button.style.transform = 'translateY(2px)';
    button.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.7)';

    setTimeout(() => {
        button.style.transform = '';
        button.style.boxShadow = '';
    }, 100);

    // Play a subtle visual effect
    createRipple(button);
}

/**
 * Create ripple effect
 * @param {HTMLElement} element - Element to add ripple to
 */
function createRipple(element) {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.width = '100%';
    ripple.style.height = '100%';
    ripple.style.top = '0';
    ripple.style.left = '0';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Add ripple animation to stylesheet
 */
function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize ripple animation
addRippleAnimation();

/**
 * Get player state
 * @returns {Object} Player state
 */
export function getPlayerState() {
    return { ...playerState };
}

/**
 * Toggle play/pause (visual only)
 */
export function togglePlay() {
    playerState.isPlaying = !playerState.isPlaying;
    console.log('Player state:', playerState.isPlaying ? 'Playing' : 'Paused');
}

/**
 * Set volume (visual only)
 * @param {number} value - Volume value (0-1)
 */
export function setVolume(value) {
    playerState.volume = Math.max(0, Math.min(1, value));
    console.log('Volume set to:', playerState.volume);
}

/**
 * Add visual equalizer effect
 */
export function addEqualizerEffect() {
    const screenHeader = document.querySelector('.screen-header');
    if (!screenHeader) return;

    const equalizer = document.createElement('div');
    equalizer.className = 'equalizer';
    equalizer.style.cssText = `
        display: flex;
        gap: 3px;
        justify-content: center;
        margin-top: 5px;
    `;

    // Create bars
    for (let i = 0; i < 5; i++) {
        const bar = document.createElement('div');
        bar.style.cssText = `
            width: 3px;
            height: 10px;
            background: var(--color-secondary);
            animation: equalizer-${i} 0.${5 + i}s ease-in-out infinite;
        `;
        equalizer.appendChild(bar);
    }

    screenHeader.appendChild(equalizer);

    // Add equalizer animations
    addEqualizerAnimations();
}

/**
 * Add equalizer animations to stylesheet
 */
function addEqualizerAnimations() {
    const style = document.createElement('style');
    let animations = '';

    for (let i = 0; i < 5; i++) {
        animations += `
            @keyframes equalizer-${i} {
                0%, 100% { height: ${5 + Math.random() * 5}px; }
                50% { height: ${15 + Math.random() * 10}px; }
            }
        `;
    }

    style.textContent = animations;
    document.head.appendChild(style);
}
