/* ============================================
   MAIN APP CONTROLLER
   Orchestrates all modules and app flow
   ============================================ */

import {
    initDOM,
    DOM,
    addEvent,
    addClass,
    removeClass
} from './modules/domManager.js';

import {
    initParticles,
    initClickEffects,
    typewriterEffect
} from './modules/effects.js';

import {
    initAudioPlayer,
    addEqualizerEffect
} from './modules/audioPlayer.js';

/**
 * Letter text content
 */
const LETTER_TEXT = `Holi Mire, wow... Esta parte de la tarjeta no está hecha con IA o tecnología, yo me estoy dando el tiempo de al menos escribir esto.

Solo quiero darte las gracias por llegar a mi vida y seguir en ella. Agradezco cada "hola", cada Gengar que me dices, cada cosa... y en verdad eres ÚNICA.

Agradezco al universo que me hizo chocar contigo. Vales oro. Gracias por cada regalo que me das.

Solo quería darme mi tiempo para programar esto y que esta tarjeta sea única para ti. Crearé un servidor para alojar esto que mantendré cada vez que pueda, para que si algún momento te sientes triste, vengas y te relajes.`;

/**
 * App state
 */
const appState = {
    introComplete: false,
    letterComplete: false,
};

/**
 * Initialize the application
 */
async function init() {
    console.log('🎮 Initializing Pokémon Letter App...');

    // Initialize DOM
    initDOM();

    // Setup intro screen
    setupIntroScreen();

    console.log('✅ App initialized successfully!');
}

/**
 * Setup intro screen
 */
function setupIntroScreen() {
    if (!DOM.pressStartBtn) return;

    // Add click event to start button
    addEvent(DOM.pressStartBtn, 'click', handlePressStart);

    // Add keyboard support
    addEvent(document, 'keydown', (e) => {
        if (!appState.introComplete && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handlePressStart();
        }
    });
}

/**
 * Handle press start button
 */
async function handlePressStart() {
    if (appState.introComplete) return;

    console.log('🎮 Starting game...');
    appState.introComplete = true;

    // Play sound effect (placeholder - would need actual audio file)
    playStartSound();

    // Fade out intro screen
    addClass(DOM.introScreen, 'fade-out');

    // Wait for fade out animation
    await sleep(1000);

    // Hide intro screen
    addClass(DOM.introScreen, 'hidden');

    // Show main content
    removeClass(DOM.mainContent, 'hidden');

    // Initialize main app features
    initMainApp();
}

/**
 * Initialize main app features
 */
async function initMainApp() {
    console.log('🎨 Initializing main app features...');

    // Initialize particle system
    initParticles();

    // Initialize click effects
    initClickEffects();

    // Initialize audio player
    initAudioPlayer();

    // Equalizer effect removed - was causing visual vibration
    // addEqualizerEffect();

    // Wait a bit before starting typewriter
    await sleep(500);

    // Start typewriter effect for letter
    await startLetterTypewriter();

    console.log('✨ All features initialized!');
}

/**
 * Start typewriter effect for the letter
 */
async function startLetterTypewriter() {
    if (!DOM.letterText) return;

    console.log('✍️ Starting typewriter effect...');

    // Show dialog cursor during typing
    removeClass(DOM.dialogCursor, 'hidden');

    // Type the letter
    await typewriterEffect(LETTER_TEXT, DOM.letterText, 50);

    // Hide cursor after typing is complete
    addClass(DOM.dialogCursor, 'hidden');

    appState.letterComplete = true;
    console.log('✅ Letter complete!');

    // Add a subtle glow effect to the dialog box
    const dialogBox = document.querySelector('.dialog-box');
    if (dialogBox) {
        dialogBox.style.animation = 'pulse-glow 2s ease-in-out infinite alternate';
    }
}

/**
 * Play start sound (placeholder)
 */
function playStartSound() {
    // In a real implementation, this would play an actual sound file
    console.log('🔊 Playing start sound...');

    // You could add Web Audio API here or use an <audio> element
    // Example:
    // const audio = new Audio('assets/sounds/start.mp3');
    // audio.play().catch(err => console.log('Audio play failed:', err));
}

/**
 * Sleep utility
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Handle errors
 * @param {Error} error - Error object
 */
function handleError(error) {
    console.error('❌ Application error:', error);

    // You could show a user-friendly error message here
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--color-accent);
        color: white;
        padding: 20px;
        border-radius: 8px;
        font-family: var(--font-primary);
        font-size: 12px;
        z-index: 9999;
        text-align: center;
    `;
    errorDiv.textContent = 'Oops! Something went wrong. Please refresh the page.';
    document.body.appendChild(errorDiv);
}

/**
 * Window load event
 */
window.addEventListener('load', () => {
    try {
        init();
    } catch (error) {
        handleError(error);
    }
});

/**
 * Handle page visibility change
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('👋 Page hidden');
        // Could pause animations here if needed
    } else {
        console.log('👀 Page visible');
        // Could resume animations here if needed
    }
});

/**
 * Handle window resize
 */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log('📐 Window resized');
        // Particle canvas resize is handled in effects.js
    }, 250);
});

/**
 * Log app info
 */
console.log(`
╔═══════════════════════════════════════╗
║   🎮 POKÉMON LETTER - GENGAR THEME   ║
║   Made with 💜 by Jhonas             ║
║   Version: 1.0.0                      ║
╚═══════════════════════════════════════╝
`);

// Export for debugging
window.APP_STATE = appState;
window.APP_DOM = DOM;
