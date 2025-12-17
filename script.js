// ============================================================================
// GLOBAL LOADER
// ============================================================================
window.addEventListener('load', function() {
    const globalLoader = document.querySelector('.global-loader');
    
    // Mostrar por al menos 1 segundo para evitar flash
    setTimeout(() => {
        globalLoader.classList.add('fade-out');
        
        // Remover del DOM después de la animación
        setTimeout(() => {
            globalLoader.style.display = 'none';
        }, 500);
    }, 1000);
});

// ============================================================================
// NAVEGACIÓN RESPONSIVE
// ============================================================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
            navLinks.style.backdropFilter = 'blur(10px)';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '1rem';
            navLinks.style.gap = '1rem';
            navLinks.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
            navLinks.style.zIndex = '1000';
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });
});

// ============================================================================
// BACK TO TOP BUTTON
// ============================================================================
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================================================
// INTERSECTION OBSERVER PARA ANIMACIONES AL SCROLL
// ============================================================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Añadir clase visible con retardo escalonado
            const delay = entry.target.dataset.index * 100 || 0;
            
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
        }
    });
}, observerOptions);

// Observar todos los elementos con animación de scroll
document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
    el.dataset.index = index;
    observer.observe(el);
});

// ============================================================================
// TOGGLE DE TEMA
// ============================================================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Verificar tema guardado
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeButton(savedTheme);

themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-moon';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
    } else {
        themeIcon.className = 'fas fa-sun';
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
    }
}

// ============================================================================
// CONTROL DE ANIMACIONES DE LOADING
// ============================================================================
const toggleLoadersBtn = document.getElementById('toggle-loaders');
const loaders = document.querySelectorAll('.spinner, .dot, .pulse-ring, .inner-ring');

let animationsRunning = true;

toggleLoadersBtn.addEventListener('click', function() {
    animationsRunning = !animationsRunning;
    
    loaders.forEach(loader => {
        if (animationsRunning) {
            loader.style.animationPlayState = 'running';
            toggleLoadersBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar Animaciones';
        } else {
            loader.style.animationPlayState = 'paused';
            toggleLoadersBtn.innerHTML = '<i class="fas fa-play"></i> Reanudar Animaciones';
        }
    });
});

// ============================================================================
// EFECTO RIPPLE MEJORADO PARA BOTONES
// ============================================================================
document.querySelectorAll('.btn-ripple').forEach(button => {
    button.addEventListener('click', function(e) {
        // Crear elemento de ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        
        // Posicionar ripple en el punto de clic
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        // Estilos del ripple
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Añadir ripple al botón
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        // Remover ripple después de la animación
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Inyectar keyframes para ripple si no existen
if (!document.querySelector('#ripple-keyframes')) {
    const style = document.createElement('style');
    style.id = 'ripple-keyframes';
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================================
// CONTADOR DE CLICS EN BOTONES
// ============================================================================
let clickCount = 0;
const clickCountElement = document.getElementById('click-count');
const buttonState = document.getElementById('button-state');

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        // Incrementar contador
        clickCount++;
        clickCountElement.textContent = clickCount;
        
        // Actualizar estado
        buttonState.textContent = 'Clickeado!';
        buttonState.style.background = 'var(--gradient-accent)';
        buttonState.style.color = 'white';
        
        // Resetear estado después de 1 segundo
        setTimeout(() => {
            buttonState.textContent = 'Normal';
            buttonState.style.background = 'var(--color-bg)';
            buttonState.style.color = 'var(--color-text)';
        }, 1000);
        
        // Efecto de confeti para muchos clics
        if (clickCount % 10 === 0) {
            createConfetti();
        }
    });
});

// ============================================================================
// CONTROL DE ANIMACIONES DE TEXTO
// ============================================================================
// Reiniciar animación de typing
const restartTypingBtn = document.getElementById('restart-typing');
const typingText = document.querySelector('.typing-text');

restartTypingBtn.addEventListener('click', function() {
    // Reiniciar animación
    typingText.style.animation = 'none';
    
    // Forzar reflow
    void typingText.offsetWidth;
    
    // Reactivar animación
    typingText.style.animation = 'typing 3.5s steps(30) 1s 1 normal both, blink 0.7s step-end infinite';
});

// Toggle de efecto neon
const neonToggle = document.getElementById('neon-toggle');
const neonText = document.querySelector('.neon-text');

neonToggle.addEventListener('change', function() {
    if (this.checked) {
        neonText.style.animation = 'neonFlicker 3s infinite alternate';
    } else {
        neonText.style.animation = 'none';
        neonText.style.textShadow = 'none';
    }
});

// ============================================================================
// PANEL DE CONTROL
// ============================================================================
// Control de velocidad de animación
const speedSlider = document.getElementById('speed-slider');
const speedValue = document.getElementById('speed-value');

speedSlider.addEventListener('input', function() {
    const speed = this.value;
    speedValue.textContent = `${speed}x`;
    
    // Aplicar velocidad a todas las animaciones CSS
    document.querySelectorAll('*').forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        const animationDuration = computedStyle.animationDuration;
        const transitionDuration = computedStyle.transitionDuration;
        
        if (animationDuration && animationDuration !== '0s') {
            element.style.animationDuration = `calc(${animationDuration} / ${speed})`;
        }
        
        if (transitionDuration && transitionDuration !== '0s') {
            element.style.transitionDuration = `calc(${transitionDuration} / ${speed})`;
        }
    });
});

// Reducir movimiento (accesibilidad)
const reduceMotionToggle = document.getElementById('reduce-motion');

reduceMotionToggle.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.style.setProperty('--transition-normal', 'none');
        document.documentElement.style.setProperty('--transition-slow', 'none');
        document.documentElement.style.setProperty('--transition-bounce', 'none');
        
        // Pausar todas las animaciones
        document.querySelectorAll('*').forEach(el => {
            if (el.style.animationPlayState !== 'paused') {
                el.style.animationPlayState = 'paused';
            }
        });
    } else {
        document.documentElement.style.setProperty('--transition-normal', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)');
        document.documentElement.style.setProperty('--transition-slow', 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)');
        document.documentElement.style.setProperty('--transition-bounce', 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)');
        
        // Reanudar animaciones
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Cambio de temas de color
const colorThemes = document.querySelectorAll('.color-theme');

colorThemes.forEach(theme => {
    theme.addEventListener('click', function() {
        const themeName = this.dataset.theme;
        
        // Remover clase active de todos
        colorThemes.forEach(t => t.classList.remove('active'));
        
        // Añadir clase active al seleccionado
        this.classList.add('active');
        
        // Aplicar tema
        applyColorTheme(themeName);
    });
});

function applyColorTheme(themeName) {
    const root = document.documentElement;
    
    switch(themeName) {
        case 'sunset':
            root.style.setProperty('--color-primary', '#ff7e5f');
            root.style.setProperty('--color-secondary', '#feb47b');
            root.style.setProperty('--color-accent', '#ff6b6b');
            break;
        case 'ocean':
            root.style.setProperty('--color-primary', '#2193b0');
            root.style.setProperty('--color-secondary', '#6dd5ed');
            root.style.setProperty('--color-accent', '#3b82f6');
            break;
        case 'forest':
            root.style.setProperty('--color-primary', '#11998e');
            root.style.setProperty('--color-secondary', '#38ef7d');
            root.style.setProperty('--color-accent', '#10b981');
            break;
        default:
            root.style.setProperty('--color-primary', '#667eea');
            root.style.setProperty('--color-secondary', '#764ba2');
            root.style.setProperty('--color-accent', '#ff6b6b');
    }
    
    // Guardar tema en localStorage
    localStorage.setItem('colorTheme', themeName);
}

// Cargar tema guardado
const savedColorTheme = localStorage.getItem('colorTheme') || 'default';
applyColorTheme(savedColorTheme);

// Marcar tema activo
document.querySelector(`.color-theme[data-theme="${savedColorTheme}"]`).classList.add('active');

// ============================================================================
// EFECTO CONFETI (para celebración de clics)
// ============================================================================
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#ff6b6b', '#f59e0b', '#10b981'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Posición aleatoria
        const x = Math.random() * window.innerWidth;
        const y = -20;
        
        // Color aleatorio
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Tamaño aleatorio
        const size = Math.random() * 10 + 5;
        
        // Estilos
        confetti.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: ${size < 8 ? '50%' : '2px'};
            top: ${y}px;
            left: ${x}px;
            z-index: 9999;
            pointer-events: none;
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        document.body.appendChild(confetti);
        
        // Animación
        const animation = confetti.animate([
            { 
                transform: `translate(0, 0) rotate(0deg)`,
                opacity: 1 
            },
            { 
                transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`,
                opacity: 0 
            }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        // Remover después de la animación
        animation.onfinish = () => confetti.remove();
    }
}

// ============================================================================
// AÑADIR AÑO ACTUAL AL FOOTER
// ============================================================================
document.getElementById('current-year').textContent = new Date().getFullYear();

// ============================================================================
// PRELOADER DE IMÁGENES
// ============================================================================
const images = document.querySelectorAll('img');

images.forEach(img => {
    // Crear un contenedor de carga para cada imagen
    const loader = document.createElement('div');
    loader.className = 'image-loader';
    loader.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--color-bg-light);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Añadir spinner de carga
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.style.width = '30px';
    spinner.style.height = '30px';
    loader.appendChild(spinner);
    
    // Añadir loader si la imagen no está cargada
    if (!img.complete) {
        img.parentNode.style.position = 'relative';
        img.parentNode.appendChild(loader);
        
        img.addEventListener('load', function() {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        });
        
        img.addEventListener('error', function() {
            loader.innerHTML = '<span style="color: var(--color-text-secondary); font-size: 0.8rem;">Error al cargar</span>';
        });
    }
});

// ============================================================================
// ELEMENTOS INTERACTIVOS ADICIONALES
// ============================================================================
// Efecto de sonido al hacer clic (opcional)
document.querySelectorAll('.btn, .card').forEach(element => {
    element.addEventListener('click', function(e) {
        // Crear efecto de sonido visual
        const clickEffect = document.createElement('div');
        clickEffect.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%) scale(0);
            animation: clickEffect 0.5s ease-out forwards;
        `;
        
        clickEffect.style.left = e.clientX + 'px';
        clickEffect.style.top = e.clientY + 'px';
        
        document.body.appendChild(clickEffect);
        
        setTimeout(() => {
            clickEffect.remove();
        }, 500);
    });
});

// Inyectar keyframes para efecto de clic
if (!document.querySelector('#click-effect-keyframes')) {
    const style = document.createElement('style');
    style.id = 'click-effect-keyframes';
    style.textContent = `
        @keyframes clickEffect {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================================
// CURSOR PERSONALIZADO
// ============================================================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

// Seguir cursor del mouse
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Efecto en elementos interactivos
const interactiveElements = document.querySelectorAll('button, .card, a, input, .btn');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
    });
});

// Añadir estilos para cursor personalizado
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--color-primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.2s, width 0.3s, height 0.3s;
        mix-blend-mode: difference;
    }
    
    .cursor-hover {
        transform: translate(-50%, -50%) scale(1.5);
        background: rgba(102, 126, 234, 0.2);
        border-color: var(--color-accent);
    }
    
    * {
        cursor: none;
    }
    
    @media (max-width: 768px) {
        .custom-cursor {
            display: none;
        }
        
        * {
            cursor: auto;
        }
    }
`;
document.head.appendChild(cursorStyles);

// ============================================================================
// PERFORMANCE: Limpiar elementos de confeti después de un tiempo
// ============================================================================
setInterval(() => {
    const confettiElements = document.querySelectorAll('.confetti');
    if (confettiElements.length > 100) {
        confettiElements.forEach((el, index) => {
            if (index > 50) el.remove();
        });
    }
}, 5000);