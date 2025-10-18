// shared/shared.js — Versión mejorada

document.addEventListener('DOMContentLoaded', () => {
    // Navegación del sitio principal (solo si existe)
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.demos-navigation')) {
                navMenu.style.display = 'none';
            }
        });
    }
});

// Función universal para reproducir sonidos (si están presentes)
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Audio play prevented:", e));
    }
}

// Smooth scroll (solo en sitio principal)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
