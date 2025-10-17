// magic-modules/payment-handler.js
window.paymentHandler = {
    currentStyle: null,
    
    showPaymentModal: function(style) {
        this.currentStyle = style;
        
        // Crear modal de pago
        const modalHTML = `
            <div class="payment-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); display:flex; align-items:center; justify-content:center; z-index:3000; font-family: 'Segoe UI', sans-serif;">
                <div style="background:linear-gradient(135deg, #fff, #f8f9fa); padding:2rem; border-radius:20px; text-align:center; max-width:450px; width:90%; box-shadow: 0 20px 40px rgba(0,0,0,0.3); border: 2px solid #8B4513;">
                    <!-- Header -->
                    <div style="margin-bottom:1.5rem;">
                        <div style="font-size:3rem; margin-bottom:0.5rem;">💎</div>
                        <h3 style="color:#8B4513; margin-bottom:0.5rem; font-size:1.5rem;">Confirmar Compra</h3>
                        <p style="color:#666; font-size:0.9rem;">Estilo premium para tu próxima visita</p>
                    </div>
                    
                    <!-- Style Info -->
                    <div style="background:rgba(139, 69, 19, 0.1); padding:1.5rem; border-radius:15px; margin:1rem 0; border-left:4px solid #8B4513;">
                        <h4 style="color:#333; margin-bottom:0.5rem; font-size:1.2rem;">${style.name}</h4>
                        <p style="color:#666; margin-bottom:1rem; line-height:1.4;">${style.description}</p>
                        
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem;">
                            <span class="confidence-badge" style="background:linear-gradient(135deg, #FFD700, #FFA500); color:#8B4513; padding:8px 15px; border-radius:20px; font-size:0.8em; font-weight:bold; box-shadow:0 3px 10px rgba(0,0,0,0.2);">
                                🎯 ${style.confidence}% compatible
                            </span>
                            <div style="font-size:1.8rem; font-weight:bold; color:#8B4513; text-shadow:1px 1px 2px rgba(0,0,0,0.1);">
                                €${style.price}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Benefits -->
                    <div style="margin:1.5rem 0; text-align:left;">
                        <div style="display:flex; align-items:center; margin-bottom:0.8rem; padding:0.5rem; background:rgba(255,215,0,0.1); border-radius:8px;">
                            <span style="font-size:1.2rem; margin-right:10px;">✅</span>
                            <span style="color:#333; font-size:0.9rem;">Vista previa aplicada con éxito</span>
                        </div>
                        <div style="display:flex; align-items:center; margin-bottom:0.8rem; padding:0.5rem; background:rgba(139,69,19,0.1); border-radius:8px;">
                            <span style="font-size:1.2rem; margin-right:10px;">💳</span>
                            <span style="color:#333; font-size:0.9rem;">Pago seguro procesado por StyleCorte Pro</span>
                        </div>
                        <div style="display:flex; align-items:center; padding:0.5rem; background:rgba(0,128,0,0.1); border-radius:8px;">
                            <span style="font-size:1.2rem; margin-right:10px;">📱</span>
                            <span style="color:#333; font-size:0.9rem;">Disponible en tu app para mostrar al estilista</span>
                        </div>
                    </div>
                    
                    <!-- Payment Buttons -->
                    <div style="display:flex; gap:1rem; justify-content:center; margin-top:2rem;">
                        <button onclick="window.paymentHandler.closePaymentModal()" style="flex:1; padding:1rem 1.5rem; border:2px solid #8B4513; background:transparent; color:#8B4513; border-radius:12px; cursor:pointer; font-weight:bold; font-size:1rem; transition:all 0.3s;">
                            Cancelar
                        </button>
                        <button onclick="window.paymentHandler.completePurchase('${style.id}')" style="flex:1; padding:1rem 1.5rem; background:linear-gradient(135deg, #8B4513, #D2691E); color:white; border:none; border-radius:12px; cursor:pointer; font-weight:bold; font-size:1rem; transition:all 0.3s; box-shadow:0 5px 15px rgba(139,69,19,0.3);">
                            🛒 Comprar Ahora
                        </button>
                    </div>
                    
                    <!-- Security Notice -->
                    <div style="margin-top:1.5rem; padding-top:1rem; border-top:1px solid #eee;">
                        <p style="color:#666; font-size:0.7rem; display:flex; align-items:center; justify-content:center; gap:5px;">
                            <span>🔒</span>
                            Transacción 100% segura · SSL Encriptado
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Añadir efectos de hover a los botones
        this.addButtonEffects();
    },
    
    addButtonEffects: function() {
        setTimeout(() => {
            const buttons = document.querySelectorAll('.payment-modal button');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '';
                });
            });
        }, 100);
    },
    
    closePaymentModal: function() {
        const modal = document.querySelector('.payment-modal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
        this.currentStyle = null;
    },
    
    completePurchase: function(styleId) {
        console.log('🛒 Procesando compra del estilo:', styleId);
        
        // Mostrar loader
        this.showPurchaseLoader();
        
        // Simular procesamiento de pago (2 segundos)
        setTimeout(() => {
            this.hidePurchaseLoader();
            this.showSuccessMessage(styleId);
        }, 2000);
    },
    
    showPurchaseLoader: function() {
        const modal = document.querySelector('.payment-modal');
        if (modal) {
            modal.innerHTML = `
                <div style="text-align:center; padding:3rem 2rem;">
                    <div style="font-size:4rem; margin-bottom:1rem;">⏳</div>
                    <h3 style="color:#8B4513; margin-bottom:1rem;">Procesando Pago</h3>
                    <p style="color:#666; margin-bottom:2rem;">Estamos confirmando tu compra...</p>
                    <div style="display:inline-block; width:50px; height:50px; border:4px solid #f3f3f3; border-top:4px solid #8B4513; border-radius:50%; animation:spin 1s linear infinite;"></div>
                </div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            `;
        }
    },
    
    hidePurchaseLoader: function() {
        const modal = document.querySelector('.payment-modal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
    },
    
    showSuccessMessage: function(styleId) {
        const successHTML = `
            <div class="success-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); display:flex; align-items:center; justify-content:center; z-index:3000;">
                <div style="background:linear-gradient(135deg, #fff, #f8f9fa); padding:3rem 2rem; border-radius:20px; text-align:center; max-width:400px; width:90%; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                    <div style="font-size:4rem; margin-bottom:1rem;">🎉</div>
                    <h3 style="color:#28a745; margin-bottom:1rem; font-size:1.5rem;">¡Compra Exitosa!</h3>
                    <p style="color:#333; margin-bottom:1rem; font-size:1.1rem; font-weight:bold;">${this.currentStyle.name}</p>
                    <p style="color:#666; margin-bottom:2rem; line-height:1.4;">
                        Tu estilo ha sido aplicado y guardado en tu perfil.<br>
                        Puedes mostrarlo a tu estilista en tu próxima visita.
                    </p>
                    
                    <div style="background:rgba(40, 167, 69, 0.1); padding:1rem; border-radius:10px; margin:1.5rem 0; border-left:4px solid #28a745;">
                        <p style="color:#333; margin:0; font-size:0.9rem;">
                            <strong>📱 Disponible en:</strong> Mi Perfil → Mis Estilos Guardados
                        </p>
                    </div>
                    
                    <button onclick="window.paymentHandler.finalizePurchase()" style="padding:1rem 2rem; background:linear-gradient(135deg, #28a745, #20c997); color:white; border:none; border-radius:12px; cursor:pointer; font-weight:bold; font-size:1rem; transition:all 0.3s;">
                        ✅ Continuar
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', successHTML);
    },
    
    finalizePurchase: function() {
        const successModal = document.querySelector('.success-modal');
        if (successModal) {
            successModal.remove();
        }
        
        // Redirigir a home después de compra
        setTimeout(() => {
            if (typeof showHomeScreen === 'function') {
                showHomeScreen();
            }
        }, 500);
        
        // Resetear estilo actual
        this.currentStyle = null;
        
        console.log('✅ Compra finalizada exitosamente');
    },
    
    // Métodos adicionales para gestión de pagos
    validatePayment: function(cardInfo) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    valid: true,
                    transactionId: 'TXN_' + Math.random().toString(36).substr(2, 9),
                    timestamp: new Date().toISOString()
                });
            }, 1000);
        });
    },
    
    getPurchaseHistory: function() {
        return JSON.parse(localStorage.getItem('styleCortePurchases') || '[]');
    },
    
    savePurchase: function(style) {
        const purchases = this.getPurchaseHistory();
        purchases.push({
            style: style,
            purchaseDate: new Date().toISOString(),
            transactionId: 'TXN_' + Math.random().toString(36).substr(2, 9)
        });
        
        localStorage.setItem('styleCortePurchases', JSON.stringify(purchases));
    }
};

// Añadir estilos CSS para animaciones
const paymentStyles = document.createElement('style');
paymentStyles.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .payment-modal button:hover {
        transform: translateY(-2px) !important;
    }
`;
document.head.appendChild(paymentStyles);

console.log('💳 Payment Handler module loaded successfully');
