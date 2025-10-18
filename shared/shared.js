// shared/shared.js

// Navegación entre demos
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', () => {
            if (navMenu.style.display === 'block') {
                navMenu.style.display = 'none';
            }
        });
    }
});

// Función para reproducir sonidos
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Audio play prevented:", e));
    }
}

// Smooth scroll para enlaces internos (si los hay)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
