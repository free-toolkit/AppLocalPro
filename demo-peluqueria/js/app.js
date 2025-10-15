// Estado de la aplicación
let appState = {
    currentScreen: 'home',
    previousScreens: []
};
// Funciones de la app
function openApp() {
    document.getElementById('appModal').style.display = 'block';
    showHomeScreen();
}
function closeApp() {
    document.getElementById('appModal').style.display = 'none';
    appState.currentScreen = 'home';
    appState.previousScreens = [];
}
function showDashboard() {
    document.getElementById('dashboardModal').style.display = 'block';
}
function closeDashboard() {
    document.getElementById('dashboardModal').style.display = 'none';
}
function showHomeScreen() {
    appState.currentScreen = 'home';
    document.getElementById('appTitle').textContent = 'StyleCorte';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="app-welcome">
                <h3>¡Bienvenido a StyleCorte!</h3>
                <p>Tu peluquería de confianza</p>
            </div>
            <div class="app-buttons">
                <button class="app-btn primary" onclick="showServices()">
                    <i class="fas fa-calendar-check"></i>
                    Reservar Cita
                </button>
                <button class="app-btn secondary" onclick="showFidelizacion()">
                    <i class="fas fa-crown"></i>
                    Programa Fidelidad
                </button>
                <button class="app-btn secondary" onclick="showRecomendaciones()">
                    <i class="fas fa-star"></i>
                    Recomendaciones
                </button>
            </div>
        </div>
    `;
}
function showServices() {
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'services';
    document.getElementById('appTitle').textContent = 'Nuestros Servicios';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="services-list">
                <div class="service-item" onclick="selectService('Corte Clásico', 25)">
                    <i class="fas fa-cut"></i>
                    <div class="service-info">
                        <strong>Corte Clásico</strong>
                        <span>€25</span>
                    </div>
                </div>
                <div class="service-item" onclick="selectService('Corte y Barba', 35)">
                    <i class="fas fa-air-freshener"></i>
                    <div class="service-info">
                        <strong>Corte y Barba</strong>
                        <span>€35</span>
                    </div>
                </div>
                <div class="service-item" onclick="selectService('Arreglo Barba', 15)">
                    <i class="fas fa-scissors"></i>
                    <div class="service-info">
                        <strong>Arreglo Barba</strong>
                        <span>€15</span>
                    </div>
                </div>
                <div class="service-item" onclick="selectService('Tinte Cabello', 45)">
                    <i class="fas fa-palette"></i>
                    <div class="service-info">
                        <strong>Tinte Cabello</strong>
                        <span>€45</span>
                    </div>
                </div>
            </div>
        </div>
        <style>
        .services-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .service-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s;
            border-left: 4px solid #8B4513;
        }
        .service-item:hover {
            background: #e9ecef;
            transform: translateX(5px);
        }
        .service-item i {
            font-size: 1.5rem;
            color: #8B4513;
            width: 40px;
        }
        .service-info {
            flex: 1;
        }
        .service-info strong {
            display: block;
            margin-bottom: 0.2rem;
        }
        .service-info span {
            color: #8B4513;
            font-weight: bold;
        }
        </style>
    `;
}
function selectService(service, price) {
    appState.selectedService = { name: service, price: price };
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'booking';
    document.getElementById('appTitle').textContent = 'Reservar Cita';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="booking-info">
                <h4>${service}</h4>
                <p class="price">€${price}</p>
            </div>
            <div class="booking-form">
                <div class="form-group">
                    <label>Fecha:</label>
                    <input type="date" id="bookingDate" class="form-input">
                </div>
                <div class="form-group">
                    <label>Hora:</label>
                    <select id="bookingTime" class="form-input">
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="17:00">05:00 PM</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Estilista:</label>
                    <select id="bookingStylist" class="form-input">
                        <option value="carlos">Carlos (Especialista en Cortes)</option>
                        <option value="maria">María (Colorista Profesional)</option>
                        <option value="juan">Juan (Barbería Clásica)</option>
                    </select>
                </div>
                <button class="app-btn primary" onclick="confirmBooking()" style="width: 100%; margin-top: 2rem;">
                    <i class="fas fa-check"></i>
                    Confirmar Reserva
                </button>
            </div>
        </div>
        <style>
        .booking-info {
            text-align: center;
            margin-bottom: 2rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 12px;
        }
        .booking-info h4 {
            color: #333;
            margin-bottom: 0.5rem;
        }
        .price {
            font-size: 1.5rem;
            font-weight: bold;
            color: #8B4513;
        }
        .form-group {
            margin-bottom: 1rem;
        }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        }
        .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
        }
        .form-input:focus {
            outline: none;
            border-color: #8B4513;
        }
        </style>
    `;
}
function confirmBooking() {
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const stylist = document.getElementById('bookingStylist').value;
    if (!date) {
        alert('Por favor selecciona una fecha');
        return;
    }
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'confirmation';
    document.getElementById('appTitle').textContent = 'Reserva Confirmada';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="confirmation-message">
                <div class="confirmation-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>¡Reserva Confirmada!</h3>
                <p>Tu cita ha sido agendada exitosamente</p>
                <div class="booking-details">
                    <div class="detail-item">
                        <strong>Servicio:</strong>
                        <span>${appState.selectedService.name}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Fecha:</strong>
                        <span>${date} a las ${time}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Precio:</strong>
                        <span>€${appState.selectedService.price}</span>
                    </div>
                </div>
                <div class="confirmation-buttons">
                    <button class="app-btn primary" onclick="showFidelizacion()">
                        <i class="fas fa-crown"></i>
                        Ganar Puntos
                    </button>
                    <button class="app-btn secondary" onclick="showHomeScreen()">
                        <i class="fas fa-home"></i>
                        Volver al Inicio
                    </button>
                </div>
            </div>
        </div>
        <style>
        .confirmation-message {
            text-align: center;
            padding: 2rem 0;
        }
        .confirmation-icon {
            font-size: 4rem;
            color: #28a745;
            margin-bottom: 1rem;
        }
        .booking-details {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 12px;
            margin: 2rem 0;
            text-align: left;
        }
        .detail-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #dee2e6;
        }
        .detail-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        .confirmation-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        </style>
    `;
}
function showFidelizacion() {
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'fidelizacion';
    document.getElementById('appTitle').textContent = 'Programa Fidelidad';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="fidelizacion-header">
                <div class="points-display">
                    <h3>Tus Puntos</h3>
                    <div class="points-value">850</div>
                    <p>Puntos acumulados</p>
                </div>
            </div>
            <div class="benefits-list">
                <h4>Tus Beneficios</h4>
                <div class="benefit-item">
                    <i class="fas fa-gift"></i>
                    <div class="benefit-info">
                        <strong>50 puntos por cada €10 gastados</strong>
                        <span>Acumula puntos en cada visita</span>
                    </div>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-tag"></i>
                    <div class="benefit-info">
                        <strong>500 puntos = €10 descuento</strong>
                        <span>Canjea tus puntos por descuentos</span>
                    </div>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-birthday-cake"></i>
                    <div class="benefit-info">
                        <strong>Regalo de cumpleaños</strong>
                        <span>Obten un servicio gratis en tu cumpleaños</span>
                    </div>
                </div>
            </div>
            <div class="rewards-section">
                <h4>Recompensas Disponibles</h4>
                <div class="reward-item">
                    <div class="reward-info">
                        <strong>Corte Gratis</strong>
                        <span>1000 puntos</span>
                    </div>
                    <button class="btn btn-primary" disabled>Canjear</button>
                </div>
                <div class="reward-item">
                    <div class="reward-info">
                        <strong>€10 Descuento</strong>
                        <span>500 puntos</span>
                    </div>
                    <button class="btn btn-primary">Canjear</button>
                </div>
            </div>
        </div>
        <style>
        .fidelizacion-header {
            text-align: center;
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: linear-gradient(135deg, #8B4513, #D2691E);
            color: white;
            border-radius: 16px;
        }
        .points-value {
            font-size: 3rem;
            font-weight: bold;
            margin: 0.5rem 0;
        }
        .benefits-list, .rewards-section {
            margin-bottom: 2rem;
        }
        .benefits-list h4, .rewards-section h4 {
            margin-bottom: 1rem;
            color: #333;
        }
        .benefit-item, .reward-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 12px;
            margin-bottom: 0.8rem;
        }
        .benefit-item i {
            font-size: 1.5rem;
            color: #8B4513;
            width: 30px;
        }
        .benefit-info {
            flex: 1;
        }
        .benefit-info strong {
            display: block;
            margin-bottom: 0.2rem;
        }
        .benefit-info span {
            color: #666;
            font-size: 0.9rem;
        }
        .reward-item {
            justify-content: space-between;
        }
        .reward-info strong {
            display: block;
            margin-bottom: 0.2rem;
        }
        .reward-info span {
            color: #8B4513;
            font-weight: bold;
        }
        </style>
    `;
}
function showRecomendaciones() {
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'recomendaciones';
    document.getElementById('appTitle').textContent = 'Recomendaciones';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="recomendaciones-header">
                <h3>Recomienda y Gana</h3>
                <p>Comparte tu experiencia y obtén recompensas</p>
            </div>
            <div class="referral-code">
                <strong>Tu Código de Referido:</strong>
                <div class="code-display">STYLE#850</div>
                <p>Comparte este código con tus amigos</p>
            </div>
            <div class="referral-benefits">
                <h4>Beneficios por Referir:</h4>
                <div class="benefit-card">
                    <i class="fas fa-user-plus"></i>
                    <div>
                        <strong>+200 puntos</strong>
                        <p>Por cada amigo que se registre</p>
                    </div>
                </div>
                <div class="benefit-card">
                    <i class="fas fa-euro-sign"></i>
                    <div>
                        <strong>10% descuento</strong>
                        <p>Para tu amigo en su primera visita</p>
                    </div>
                </div>
            </div>
            <div class="share-buttons">
                <button class="app-btn primary" style="width: 100%;">
                    <i class="fas fa-share-alt"></i>
                    Compartir por WhatsApp
                </button>
                <button class="app-btn secondary" style="width: 100%;">
                    <i class="fas fa-link"></i>
                    Copiar Enlace
                </button>
            </div>
        </div>
        <style>
        .recomendaciones-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .referral-code {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 2rem;
        }
        .code-display {
            font-family: monospace;
            font-size: 1.5rem;
            font-weight: bold;
            color: #8B4513;
            margin: 0.5rem 0;
            padding: 0.5rem;
            background: white;
            border-radius: 8px;
            border: 2px dashed #8B4513;
        }
        .referral-benefits {
            margin-bottom: 2rem;
        }
        .referral-benefits h4 {
            margin-bottom: 1rem;
            color: #333;
        }
        .benefit-card {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: white;
            border-radius: 12px;
            margin-bottom: 0.8rem;
            border-left: 4px solid #8B4513;
        }
        .benefit-card i {
            font-size: 1.5rem;
            color: #8B4513;
            width: 40px;
        }
        .share-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        </style>
    `;
}
function goBack() {
    if (appState.previousScreens.length > 0) {
        const previousScreen = appState.previousScreens.pop();
        appState.currentScreen = previousScreen;
        switch(previousScreen) {
            case 'home':
                showHomeScreen();
                break;
            case 'services':
                showServices();
                break;
            default:
                showHomeScreen();
        }
    } else {
        showHomeScreen();
    }
}
// Cerrar modales al hacer click fuera
window.onclick = function(event) {
    const appModal = document.getElementById('appModal');
    const dashboardModal = document.getElementById('dashboardModal');
    if (event.target === appModal) {
        closeApp();
    }
    if (event.target === dashboardModal) {
        closeDashboard();
    }
}
// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Demo StyleCorte Pro cargado');
});