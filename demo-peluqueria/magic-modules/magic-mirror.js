
// magic-modules/magic-mirror.js
window.magicMirror = {
    initCamera: function() {
        return new Promise((resolve) => {
            console.log('🎥 Cámara mágica inicializada');
            
            // Intentar acceder a la cámara real si está disponible
            const video = document.getElementById('magic-camera');
            if (video && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'user' } 
                })
                .then(function(stream) {
                    video.srcObject = stream;
                    video.play();
                    resolve();
                })
                .catch(function(error) {
                    console.log('Cámara no disponible, usando simulación:', error);
                    // Simulación si la cámara falla
                    simulateCamera();
                    resolve();
                });
            } else {
                // Simulación para navegadores sin soporte de cámara
                simulateCamera();
                resolve();
            }
        });
    },
    
    stopCamera: function() {
        console.log('🛑 Cámara mágica detenida');
        const video = document.getElementById('magic-camera');
        if (video && video.srcObject) {
            const tracks = video.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            video.srcObject = null;
        }
    },
    
    generateStyleRecommendations: function() {
        return [
            {
                id: 'modern-premium',
                name: '🔥 Corte Moderno Premium',
                description: 'Estilo vanguardista que combina técnicas modernas con elegancia atemporal. Perfecto para profesionales.',
                confidence: 92,
                price: 9.99
            },
            {
                id: 'classic-elegance',
                name: '💎 Elegancia Clásica',
                description: 'Corte tradicional con un toque de sofisticación moderna que nunca pasa de moda.',
                confidence: 85,
                price: 7.99
            },
            {
                id: 'urban-style',
                name: '🏙 Estilo Urbano',
                description: 'Look contemporáneo perfecto para el día a día en la ciudad.',
                confidence: 78,
                price: 6.99
            },
            {
                id: 'executive-cut',
                name: '💼 Corte Ejecutivo',
                description: 'Estilo profesional y pulido para reuniones de negocios importantes.',
                confidence: 88,
                price: 8.99
            },
            {
                id: 'sport-fusion',
                name: '⚡ Fusión Deportiva',
                description: 'Corte dinámico y práctico para un estilo de vida activo.',
                confidence: 75,
                price: 5.99
            }
        ];
    },
    
    applyStylePreview: function(styleName) {
        console.log('✨ Aplicando vista previa:', styleName);
        
        // Aplicar efecto visual en el overlay
        const overlay = document.getElementById('magic-overlay');
        if (overlay) {
            const ctx = overlay.getContext('2d');
            ctx.clearRect(0, 0, overlay.width, overlay.height);
            
            // Efecto de brillo dorado
            ctx.fillStyle = 'rgba(255, 215, 0, 0.1)';
            ctx.fillRect(0, 0, overlay.width, overlay.height);
            
            // Texto del estilo aplicado
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('✨ ' + styleName, overlay.width / 2, overlay.height / 2);
            
            // Efecto de partículas
            drawParticles(ctx, overlay.width, overlay.height);
        }
        
        // Mostrar notificación de éxito
        showMagicNotification(`✨ Vista previa aplicada: ${styleName}`);
    },
    
    getFaceAnalysis: function() {
        return {
            faceShape: this.detectFaceShape(),
            skinTone: this.analyzeSkinTone(),
            features: this.detectFeatures(),
            compatibility: this.calculateCompatibility()
        };
    },
    
    detectFaceShape: function() {
        const shapes = ['ovalado', 'redondo', 'cuadrado', 'corazón', 'diamante'];
        return shapes[Math.floor(Math.random() * shapes.length)];
    },
    
    analyzeSkinTone: function() {
        const tones = ['claro', 'medio', 'oscuro', 'oliva'];
        return tones[Math.floor(Math.random() * tones.length)];
    },
    
    detectFeatures: function() {
        const features = [
            'pómulos altos',
            'frente amplia', 
            'mandíbula definida',
            'nariz recta',
            'labios carnosos',
            'cejas definidas'
        ];
        // Retornar 3 características aleatorias
        return features.sort(() => 0.5 - Math.random()).slice(0, 3);
    },
    
    calculateCompatibility: function() {
        // Simular cálculo de compatibilidad (70-95%)
        return Math.floor(Math.random() * 26) + 70;
    }
};

// Función para simular cámara cuando no hay acceso real
function simulateCamera() {
    const video = document.getElementById('magic-camera');
    if (video) {
        video.style.background = 'linear-gradient(45deg, #8B4513, #D2691E)';
        video.style.display = 'flex';
        video.style.alignItems = 'center';
        video.style.justifyContent = 'center';
        video.style.color = 'white';
        video.style.fontSize = '1.2rem';
        video.innerHTML = '🎥 Cámara Simulada - Espejo Mágico Activo';
    }
}

// Función para dibujar partículas de efecto mágico
function drawParticles(ctx, width, height) {
    const particles = 15;
    for (let i = 0; i < particles; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 10 + 5;
        
        ctx.fillStyle = `rgba(255, 215, 0, ${Math.random() * 0.8 + 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Función para mostrar notificaciones mágicas
function showMagicNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #8B4513, #D2691E);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: bold;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Añadir estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log('🔮 Magic Mirror module loaded successfully');
