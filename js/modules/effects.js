/* ============================================
   EFFECTS MODULE
   Particle system and interactive effects
   ============================================ */

import { DOM, createElement, appendTo, removeElement } from './domManager.js';

/**
 * Particle system configuration
 */
const PARTICLE_CONFIG = {
    count: 50,
    maxSize: 3,
    minSize: 1,
    speed: 0.5,
    colors: ['#A66CFF', '#4A2BA9', '#C99FFF', '#8347E6'],
};

/**
 * Particle class
 */
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * (PARTICLE_CONFIG.maxSize - PARTICLE_CONFIG.minSize) + PARTICLE_CONFIG.minSize;
        this.speedX = (Math.random() - 0.5) * PARTICLE_CONFIG.speed;
        this.speedY = (Math.random() - 0.5) * PARTICLE_CONFIG.speed;
        this.color = PARTICLE_CONFIG.colors[Math.floor(Math.random() * PARTICLE_CONFIG.colors.length)];
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

/**
 * Particle system
 */
let particles = [];
let animationId = null;

/**
 * Initialize particle system
 */
export function initParticles() {
    const canvas = DOM.particleCanvas;
    if (!canvas) return;

    // Set canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const ctx = canvas.getContext('2d');

    // Create particles
    particles = [];
    for (let i = 0; i < PARTICLE_CONFIG.count; i++) {
        particles.push(new Particle(canvas));
    }

    // Start animation
    animate(ctx);
}

/**
 * Resize canvas to window size
 */
function resizeCanvas() {
    const canvas = DOM.particleCanvas;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/**
 * Animation loop
 */
function animate(ctx) {
    const canvas = DOM.particleCanvas;
    if (!canvas) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });

    // Draw connections between nearby particles
    drawConnections(ctx);

    // Continue animation
    animationId = requestAnimationFrame(() => animate(ctx));
}

/**
 * Draw connections between nearby particles
 */
function drawConnections(ctx) {
    const maxDistance = 100;

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.strokeStyle = '#A66CFF';
                ctx.globalAlpha = (1 - distance / maxDistance) * 0.2;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }
    }
}

/**
 * Stop particle animation
 */
export function stopParticles() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

/**
 * Create floating heart effect
 * @param {number} x - X position
 * @param {number} y - Y position
 */
export function createHeart(x, y) {
    const isGengar = Math.random() > 0.7; // 30% chance for Gengar

    const element = createElement('div', {
        class: isGengar ? 'mini-gengar' : 'heart',
        style: {
            left: `${x}px`,
            top: `${y}px`,
        }
    });

    appendTo(DOM.heartsContainer, element);

    // Remove after animation
    setTimeout(() => {
        removeElement(element);
    }, 3000);
}

/**
 * Add click effect to body
 */
export function initClickEffects() {
    if (!DOM.body) return;

    DOM.body.addEventListener('click', (e) => {
        // Don't trigger on button clicks
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            return;
        }

        createHeart(e.clientX, e.clientY);
    });
}

/**
 * Create typewriter effect
 * @param {string} text - Text to type
 * @param {HTMLElement} element - Target element
 * @param {number} speed - Typing speed in ms
 * @returns {Promise}
 */
export function typewriterEffect(text, element, speed = 50) {
    return new Promise((resolve) => {
        if (!element) {
            resolve();
            return;
        }

        let index = 0;
        element.textContent = '';

        const interval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;

                // Auto-scroll to keep text visible
                element.scrollTop = element.scrollHeight;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

/**
 * Shake element
 * @param {HTMLElement} element - Element to shake
 */
export function shakeElement(element) {
    if (!element) return;

    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 500);
}

/**
 * Add glow effect to element
 * @param {HTMLElement} element - Element to glow
 * @param {number} duration - Duration in ms
 */
export function glowEffect(element, duration = 1000) {
    if (!element) return;

    element.classList.add('box-glow');
    setTimeout(() => {
        element.classList.remove('box-glow');
    }, duration);
}
