/* ============================================
   DOM MANAGER MODULE
   Handles DOM selection and manipulation
   ============================================ */

/**
 * Cached DOM elements for performance
 */
export const DOM = {
    // Intro Screen
    introScreen: null,
    pressStartBtn: null,
    
    // Main Content
    mainContent: null,
    
    // Letter
    letterText: null,
    dialogCursor: null,
    
    // Canvas
    particleCanvas: null,
    
    // Interactive
    heartsContainer: null,
    
    // Body
    body: null,
};

/**
 * Initialize DOM element references
 */
export function initDOM() {
    // Intro Screen
    DOM.introScreen = document.getElementById('intro-screen');
    DOM.pressStartBtn = document.getElementById('press-start');
    
    // Main Content
    DOM.mainContent = document.getElementById('main-content');
    
    // Letter
    DOM.letterText = document.getElementById('letter-text');
    DOM.dialogCursor = document.getElementById('dialog-cursor');
    
    // Canvas
    DOM.particleCanvas = document.getElementById('particle-canvas');
    
    // Interactive
    DOM.heartsContainer = document.getElementById('hearts-container');
    
    // Body
    DOM.body = document.body;
    
    // Validate all elements exist
    const missingElements = Object.entries(DOM)
        .filter(([key, value]) => value === null)
        .map(([key]) => key);
    
    if (missingElements.length > 0) {
        console.warn('Missing DOM elements:', missingElements);
    }
    
    return DOM;
}

/**
 * Add event listener with error handling
 * @param {HTMLElement} element - DOM element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 */
export function addEvent(element, event, handler) {
    if (!element) {
        console.error('Cannot add event to null element');
        return;
    }
    
    element.addEventListener(event, handler);
}

/**
 * Remove event listener
 * @param {HTMLElement} element - DOM element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 */
export function removeEvent(element, event, handler) {
    if (!element) {
        console.error('Cannot remove event from null element');
        return;
    }
    
    element.removeEventListener(event, handler);
}

/**
 * Add class to element
 * @param {HTMLElement} element - DOM element
 * @param {string} className - Class name to add
 */
export function addClass(element, className) {
    if (!element) return;
    element.classList.add(className);
}

/**
 * Remove class from element
 * @param {HTMLElement} element - DOM element
 * @param {string} className - Class name to remove
 */
export function removeClass(element, className) {
    if (!element) return;
    element.classList.remove(className);
}

/**
 * Toggle class on element
 * @param {HTMLElement} element - DOM element
 * @param {string} className - Class name to toggle
 */
export function toggleClass(element, className) {
    if (!element) return;
    element.classList.toggle(className);
}

/**
 * Check if element has class
 * @param {HTMLElement} element - DOM element
 * @param {string} className - Class name to check
 * @returns {boolean}
 */
export function hasClass(element, className) {
    if (!element) return false;
    return element.classList.contains(className);
}

/**
 * Create element with attributes
 * @param {string} tag - HTML tag
 * @param {Object} attributes - Element attributes
 * @param {string} content - Inner content
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'class') {
            element.className = value;
        } else if (key === 'style') {
            Object.assign(element.style, value);
        } else {
            element.setAttribute(key, value);
        }
    });
    
    if (content) {
        element.innerHTML = content;
    }
    
    return element;
}

/**
 * Append child to parent
 * @param {HTMLElement} parent - Parent element
 * @param {HTMLElement} child - Child element
 */
export function appendTo(parent, child) {
    if (!parent || !child) return;
    parent.appendChild(child);
}

/**
 * Remove element from DOM
 * @param {HTMLElement} element - Element to remove
 */
export function removeElement(element) {
    if (!element || !element.parentNode) return;
    element.parentNode.removeChild(element);
}

/**
 * Get element position
 * @param {HTMLElement} element - Element
 * @returns {Object} Position {x, y}
 */
export function getPosition(element) {
    if (!element) return { x: 0, y: 0 };
    const rect = element.getBoundingClientRect();
    return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY
    };
}

/**
 * Smooth scroll to element
 * @param {HTMLElement} element - Target element
 */
export function scrollToElement(element) {
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
