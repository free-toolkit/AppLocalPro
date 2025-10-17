// Sistema completo del Espejo Mágico con OpenAI
class MagicMirror {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.setupAudio();
        this.currentStream = null;
        this.userImageData = null;
        this.currentStyle = 'medium';
        this.currentColor = 'natural';
        this.currentEffect = null;
    }

    initializeElements() {
        // Botones principales
        this.magicMirrorBtn = document.getElementById('magicMirrorBtn');
        this.closeCamera = document.getElementById('closeCamera');
        this.captureBtn = document.getElementById('captureBtn');
        this.retakeBtn = document.getElementById('retakeBtn');
        this.backToCamera = document.getElementById('backToCamera');
        
        // Contenedores
        this.cameraContainer = document.getElementById('cameraContainer');
        this.analysisResults = document.getElementById('analysisResults');
        this.loadingAnalysis = document.getElementById('loadingAnalysis');
        
        // Elementos de cámara
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.faceOverlay = document.getElementById('faceOverlay');
        this.ctx = this.canvas.getContext('2d');
        
        // Elementos de resultados
        this.faceShape = document.getElementById('faceShape');
        this.facialFeatures = document.getElementById('facialFeatures');
        this.skinTone = document.getElementById('skinTone');
        this.styleSuggestions = document.getElementById('styleSuggestions');
        this.originalPreview = document.getElementById('originalPreview');
        this.styledPreview = document.getElementById('styledPreview');
        
        // Botones de acción
        this.saveStyle = document.getElementById('saveStyle');
        this.shareStyle = document.getElementById('shareStyle');
        this.bookAppointment = document.getElementById('bookAppointment');
        
        // Elementos de audio
        this.cameraSound = document.getElementById('cameraSound');
        this.transitionSound = document.getElementById('transitionSound');
        this.successSound = document.getElementById('successSound');
        this.clickSound = document.getElementById('clickSound');
    }

    setupEventListeners() {
        // Navegación principal
        this.magicMirrorBtn.addEventListener('click', () => this.openCamera());
        this.closeCamera.addEventListener('click', () => this.closeCameraStream());
        this.captureBtn.addEventListener('click', () => this.captureAndAnalyze());
        this.retakeBtn.addEventListener('click', () => this.retakePhoto());
        this.backToCamera.addEventListener('click', () => this.showCamera());
        
        // Botones de acción
        this.saveStyle.addEventListener('click', () => this.saveCurrentStyle());
        this.shareStyle.addEventListener('click', () => this.shareStyle());
        this.bookAppointment.addEventListener('click', () => this.bookAppointment());
        
        // Controles de estilo
        this.setupStyleControls();
    }

    setupStyleControls() {
        // Botones de estilo de corte
        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playSound('click');
                document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentStyle = e.target.dataset.style;
                this.applyHairstyle();
                this.animateStyleChange();
            });
        });

        // Botones de color
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playSound('click');
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentColor = e.target.dataset.color;
                this.applyColor();
                this.animateColorChange();
            });
        });

        // Botones de efectos
        document.querySelectorAll('.effect-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.playSound('click');
                document.querySelectorAll('.effect-btn').forEach(b => b.classList.remove('active'));
                
                if (this.currentEffect === e.target.dataset.effect) {
                    this.currentEffect = null;
                } else {
                    e.target.classList.add('active');
                    this.currentEffect = e.target.dataset.effect;
                }
                
                this.applyEffect();
            });
        });
    }

    setupAudio() {
        // Precargar sonidos
        const audioElements = [this.cameraSound, this.transitionSound, this.successSound, this.clickSound];
        audioElements.forEach(audio => {
            audio.volume = 0.6;
            audio.load();
        });
    }

    playSound(soundType) {
        try {
            const sounds = {
                camera: this.cameraSound,
                transition: this.transitionSound,
                success: this.successSound,
                click: this.clickSound
            };
            
            if (sounds[soundType]) {
                sounds[soundType].currentTime = 0;
                sounds[soundType].play().catch(e => console.log('Audio no pudo reproducirse:', e));
            }
        } catch (error) {
            console.log('Error con audio:', error);
        }
    }

    async openCamera() {
        try {
            this.playSound('transition');
            this.magicMirrorBtn.style.display = 'none';
            this.cameraContainer.classList.remove('hidden');
            
            // Solicitar acceso a la cámara
            this.currentStream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user'
                } 
            });
            
            this.video.srcObject = this.currentStream;
            await this.video.play();
            
            this.animateElement(this.cameraContainer, 'slide-up');
            
        } catch (error) {
            console.error('Error al acceder a la cámara:', error);
            this.showError('No se pudo acceder a la cámara. Asegúrate de permitir los permisos.');
        }
    }

    closeCameraStream() {
        this.playSound('click');
        
        if (this.currentStream) {
            this.currentStream.getTracks().forEach(track => track.stop());
            this.currentStream = null;
        }
        
        this.cameraContainer.classList.add('hidden');
        this.analysisResults.classList.add('hidden');
        this.magicMirrorBtn.style.display = 'block';
        
        this.animateElement(this.magicMirrorBtn, 'pulse');
    }

    captureAndAnalyze() {
        this.playSound('camera');
        
        // Capturar imagen
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
        this.ctx.drawImage(this.video, 0, 0);
        
        this.userImageData = this.canvas.toDataURL('image/png');
        this.showLoading();
        
        // Simular análisis con IA (reemplazar con OpenAI)
        setTimeout(() => {
            this.analyzeWithAI();
        }, 2000);
    }

    async analyzeWithAI() {
        try {
            this.playSound('transition');
            
            // SIMULACIÓN DE ANÁLISIS CON OPENAI
            // Reemplaza esto con tu llamada real a la API de OpenAI
            
            const analysisResult = await this.simulateOpenAIAnalysis();
            
            this.hideLoading();
            this.showResults(analysisResult);
            this.playSound('success');
            
        } catch (error) {
            console.error('Error en análisis AI:', error);
            this.showError('Error en el análisis. Intenta nuevamente.');
        }
    }

    async simulateOpenAIAnalysis() {
        // ESTA ES LA PARTE QUE CONECTARÁS CON OPENAI
        // Reemplaza esta función con tu implementación real
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const faceShapes = ['Ovalado', 'Redondo', 'Cuadrado', 'Corazón', 'Diamante'];
                const features = ['Pómulos definidos', 'Frente amplio', 'Mandíbula fuerte', 'Mejillas llenas'];
                const skinTones = ['Claro', 'Claro-Medio', 'Medio', 'Medio-Oscuro', 'Oscuro'];
                const styles = [
                    'Corte bob asimétrico para realzar pómulos',
                    'Capas suaves para añadir movimiento',
                    'Flequillo lateral para suavizar frente',
                    'Longitud media para equilibrar proporciones',
                    'Reflejos cálidos para iluminar rostro'
                ];
                
                resolve({
                    faceShape: faceShapes[Math.floor(Math.random() * faceShapes.length)],
                    features: [features[Math.floor(Math.random() * features.length)], 
                              features[Math.floor(Math.random() * features.length)]],
                    skinTone: skinTones[Math.floor(Math.random() * skinTones.length)],
                    recommendations: styles.sort(() => 0.5 - Math.random()).slice(0, 3)
                });
            }, 1500);
        });
    }

    // FUNCIÓN PARA INTEGRAR CON OPENAI - LISTA PARA TU API KEY
    async callOpenAIApi(imageData) {
        /*
        IMPLEMENTACIÓN REAL CON OPENAI:
        
        const OPENAI_API_KEY = 'tu-api-key-aqui'; // Agrega tu API Key
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4-vision-preview',
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: 'Analiza esta imagen facial y proporciona: 1. Forma del rostro, 2. Características destacadas, 3. Tono de piel, 4. Recomendaciones de cortes de pelo específicos. Responde en formato JSON.'
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: imageData
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 1000
            })
        });
        
        const data = await response.json();
        return JSON.parse(data.choices[0].message.content);
        */
    }

    showResults(analysis) {
        // Actualizar UI con resultados
        this.faceShape.innerHTML = `<strong>Forma de rostro:</strong> <span class="result-value">${analysis.faceShape}</span>`;
        this.facialFeatures.innerHTML = `<strong>Características:</strong> <span class="result-value">${analysis.features.join(', ')}</span>`;
        this.skinTone.innerHTML = `<strong>Tono de piel:</strong> <span class="result-value">${analysis.skinTone}</span>`;
        
        // Mostrar recomendaciones
        this.styleSuggestions.innerHTML = analysis.recommendations
            .map(rec => `<div class="suggestion-item">✨ ${rec}</div>`)
            .join('');
        
        // Mostrar sección de resultados
        this.cameraContainer.classList.add('hidden');
        this.analysisResults.classList.remove('hidden');
        
        // Inicializar simulador
        this.initializeSimulator();
        
        this.animateElement(this.analysisResults, 'slide-up');
    }

    initializeSimulator() {
        this.originalPreview.style.background = `linear-gradient(45deg, #f0f0f0, #e0e0e0)`;
        this.applyHairstyle();
    }

    applyHairstyle() {
        const styles = {
            short: { class: 'hairstyle-short', label: 'Corte Corto Moderno' },
            medium: { class: 'hairstyle-medium', label: 'Estilo Medio Elegante' },
            long: { class: 'hairstyle-long', label: 'Melena Larga Fluida' },
            layers: { class: 'hairstyle-layers', label: 'Capas con Movimiento' }
        };
        
        // Remover clases anteriores
        this.styledPreview.className = 'preview-box styled';
        this.styledPreview.classList.add(styles[this.currentStyle].class);
    }

    applyColor() {
        const colors = {
            natural: '#8B4513',
            blonde: '#D4B483',
            brunette: '#3A2A1F',
            red: '#A52A2A'
        };
        
        this.styledPreview.style.color = colors[this.currentColor];
    }

    applyEffect() {
        // Remover efectos anteriores
        this.styledPreview.classList.remove('effect-volume', 'effect-curls', 'effect-straight');
        
        if (this.currentEffect) {
            this.styledPreview.classList.add(`effect-${this.currentEffect}`);
        }
    }

    animateStyleChange() {
        this.styledPreview.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.styledPreview.style.transform = 'scale(1)';
            this.styledPreview.style.transition = 'transform 0.3s ease';
        }, 150);
    }

    animateColorChange() {
        this.styledPreview.style.opacity = '0.7';
        setTimeout(() => {
            this.styledPreview.style.opacity = '1';
            this.styledPreview.style.transition = 'opacity 0.5s ease';
        }, 200);
    }

    animateElement(element, animation) {
        element.classList.add(animation);
        setTimeout(() => element.classList.remove(animation), 1000);
    }

    showLoading() {
        this.loadingAnalysis.classList.remove('hidden');
        this.captureBtn.disabled = true;
    }

    hideLoading() {
        this.loadingAnalysis.classList.add('hidden');
        this.captureBtn.disabled = false;
    }

    retakePhoto() {
        this.playSound('click');
        this.userImageData = null;
        this.loadingAnalysis.classList.add('hidden');
        this.animateElement(this.cameraContainer, 'fade-in');
    }

    showCamera() {
        this.playSound('click');
        this.analysisResults.classList.add('hidden');
        this.cameraContainer.classList.remove('hidden');
        this.animateElement(this.cameraContainer, 'slide-up');
    }

    saveCurrentStyle() {
        this.playSound('success');
        alert('💾 Estilo guardado en tus favoritos!');
        // Aquí puedes implementar guardado en localStorage
    }

    shareStyle() {
        this.playSound('click');
        if (navigator.share) {
            navigator.share({
                title: 'Mi nuevo look - Espejo Mágico',
                text: 'Mira el estilo que creé con el Espejo Mágico AI!',
                url: window.location.href
            });
        } else {
            alert('📤 Comparte tu estilo en redes sociales!');
        }
    }

    bookAppointment() {
        this.playSound('click');
        alert('📅 Redirigiendo a agendamiento de cita...');
        // Integrar con sistema de reservas
    }

    showError(message) {
        alert(`❌ ${message}`);
        this.hideLoading();
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const magicMirror = new MagicMirror();
    console.log('✨ Espejo Mágico AI inicializado correctamente');
    
    // Exponer globalmente para debugging
    window.magicMirror = magicMirror;
});

// Efectos CSS adicionales para el simulador
const additionalStyles = `
<style>
.hairstyle-short::before {
    content: "";
    position: absolute;
    top: 25%;
    left: 15%;
    right: 15%;
    height: 25%;
    background: currentColor;
    border-radius: 50% 50% 0 0;
    opacity: 0.9;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.hairstyle-medium::before {
    content: "";
    position: absolute;
    top: 20%;
    left: 10%;
    right: 10%;
    height: 35%;
    background: currentColor;
    border-radius: 45% 45% 50% 50%;
    opacity: 0.9;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.hairstyle-long::before {
    content: "";
    position: absolute;
    top: 15%;
    left: 5%;
    right: 5%;
    height: 50%;
    background: currentColor;
    border-radius: 40% 40% 50% 50%;
    opacity: 0.9;
    box-shadow: 0 6px 15px rgba(0,0,0,0.3);
}

.hairstyle-layers::before {
    content: "";
    position: absolute;
    top: 18%;
    left: 8%;
    right: 8%;
    height: 40%;
    background: currentColor;
    border-radius: 50% 50% 40% 40%;
    opacity: 0.85;
    box-shadow: 
        0 4px 8px rgba(0,0,0,0.2),
        inset 0 -10px 20px rgba(0,0,0,0.1);
}

/* Efectos especiales */
.effect-volume .hairstyle-overlay {
    background: radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.4) 0%, transparent 50%);
}

.effect-curls .hairstyle-overlay::after {
    content: "";
    position: absolute;
    top: 40%;
    left: 20%;
    right: 20%;
    height: 30%;
    background: linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.3) 50%, transparent 90%);
    border-radius: 50%;
}

.effect-straight .hairstyle-overlay::after {
    content: "";
    position: absolute;
    top: 35%;
    left: 15%;
    right: 15%;
    height: 40%;
    background: linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 50%);
}

/* Animaciones de transición */
.preview-box {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.suggestion-item {
    animation: slideIn 0.6s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Responsive adicional */
@media (max-width: 768px) {
    .preview-comparison {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .preview-box {
        width: 150px;
        height: 200px;
    }
    
    .button-group {
        justify-content: center;
    }
    
    .style-btn, .color-btn, .effect-btn {
        flex: 1;
        min-width: 80px;
    }
}
</style>
`;

// Injectar estilos adicionales
document.head.insertAdjacentHTML('beforeend', additionalStyles);
