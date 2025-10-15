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
    document.getElementById('appTitle').textContent = 'FitPro Gym';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="app-welcome">
                <h3>¡Bienvenido a FitPro!</h3>
                <p>Tu gimnasio de confianza</p>
            </div>
            <div class="app-buttons">
                <button class="app-btn primary" onclick="showClasses()">
                    <i class="fas fa-calendar-alt"></i>
                    Reservar Clase
                </button>
                <button class="app-btn secondary" onclick="showProgress()">
                    <i class="fas fa-chart-line"></i>
                    Mi Progreso
                </button>
                <button class="app-btn secondary" onclick="showCommunity()">
                    <i class="fas fa-users"></i>
                    Comunidad
                </button>
                <button class="app-btn secondary" onclick="showPlans()">
                    <i class="fas fa-crown"></i>
                    Mis Planes
                </button>
            </div>
        </div>
    `;
}
function showClasses() {
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'classes';
    document.getElementById('appTitle').textContent = 'Clases Disponibles';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="classes-list">
                <div class="class-item" onclick="selectClass('Yoga Matutino', '08:00 AM', 20)">
                    <i class="fas fa-spa"></i>
                    <div class="class-info">
                        <strong>Yoga Matutino</strong>
                        <span>08:00 AM - 20 plazas</span>
                    </div>
                    <div class="class-status available">Disponible</div>
                </div>
                <div class="class-item" onclick="selectClass('CrossFit Avanzado', '10:00 AM', 15)">
                    <i class="fas fa-dumbbell"></i>
                    <div class="class-info">
                        <strong>CrossFit Avanzado</strong>
                        <span>10:00 AM - 15 plazas</span>
                    </div>
                    <div class="class-status available">Disponible</div>
                </div>
                <div class="class-item" onclick="selectClass('Pilates Reformer', '17:00 PM', 12)">
                    <i class="fas fa-running"></i>
                    <div class="class-info">
                        <strong>Pilates Reformer</strong>
                        <span>05:00 PM - 12 plazas</span>
                    </div>
                    <div class="class-status full">Llena</div>
                </div>
                <div class="class-item" onclick="selectClass('Spinning Intenso', '19:00 PM', 25)">
                    <i class="fas fa-bicycle"></i>
                    <div class="class-info">
                        <strong>Spinning Intenso</strong>
                        <span>07:00 PM - 25 plazas</span>
                    </div>
                    <div class="class-status available">Disponible</div>
                </div>
            </div>
        </div>
        <style>
        .classes-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .class-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s;
            border-left: 4px solid #2E8B57;
        }
        .class-item:hover {
            background: #e9ecef;
            transform: translateX(5px);
        }
        .class-item i {
            font-size: 1.5rem;
            color: #2E8B57;
            width: 40px;
        }
        .class-info {
            flex: 1;
        }
        .class-info strong {
            display: block;
            margin-bottom: 0.2rem;
        }
        .class-info span {
            color: #666;
            font-size: 0.9rem;
        }
        .class-status {
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
        }
        .class-status.available {
            background: #d4edda;
            color: #155724;
        }
        .class-status.full {
            background: #f8d7da;
            color: #721c24;
        }
        </style>
    `;
}
function selectClass(className, time, capacity) {
    appState.selectedClass = { name: className, time: time, capacity: capacity };
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'booking';
    document.getElementById('appTitle').textContent = 'Reservar Clase';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="booking-info">
                <h4>${className}</h4>
                <p class="time">${time}</p>
                <p class="capacity">${capacity} plazas disponibles</p>
            </div>
            <div class="booking-form">
                <div class="form-group">
                    <label>Fecha:</label>
                    <input type="date" id="classDate" class="form-input">
                </div>
                <div class="form-group">
                    <label>Entrenador:</label>
                    <select id="classTrainer" class="form-input">
                        <option value="carlos">Carlos (Especialista Yoga)</option>
                        <option value="ana">Ana (CrossFit Coach)</option>
                        <option value="miguel">Miguel (Pilates Master)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Nivel:</label>
                    <select id="classLevel" class="form-input">
                        <option value="beginner">Principiante</option>
                        <option value="intermediate">Intermedio</option>
                        <option value="advanced">Avanzado</option>
                    </select>
                </div>
                <button class="app-btn primary" onclick="confirmClassBooking()" style="width: 100%; margin-top: 2rem;">
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
        .time {
            font-size: 1.2rem;
            font-weight: bold;
            color: #2E8B57;
            margin-bottom: 0.5rem;
        }
        .capacity {
            color: #666;
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
            border-color: #2E8B57;
        }
        </style>
    `;
}
function confirmClassBooking() {
    const date = document.getElementById('classDate').value;
    const trainer = document.getElementById('classTrainer').value;
    const level = document.getElementById('classLevel').value;
    if (!date) {
        alert('Por favor selecciona una fecha');
        return;
    }
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'confirmation';
    document.getElementById('appTitle').textContent = 'Clase Reservada';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="confirmation-message">
                <div class="confirmation-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>¡Clase Reservada!</h3>
                <p>Tu plaza ha sido confirmada exitosamente</p>
                <div class="booking-details">
                    <div class="detail-item">
                        <strong>Clase:</strong>
                        <span>${appState.selectedClass.name}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Horario:</strong>
                        <span>${appState.selectedClass.time}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Fecha:</strong>
                        <span>${date}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Entrenador:</strong>
                        <span>${document.getElementById('classTrainer').options[document.getElementById('classTrainer').selectedIndex].text}</span>
                    </div>
                </div>
                <div class="confirmation-buttons">
                    <button class="app-btn primary" onclick="showProgress()">
                        <i class="fas fa-chart-line"></i>
                        Ver Mi Progreso
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
function showProgress() {
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'progress';
    document.getElementById('appTitle').textContent = 'Mi Progreso';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="progress-header">
                <div class="progress-stats">
                    <div class="stat">
                        <strong>12</strong>
                        <span>Clases este mes</span>
                    </div>
                    <div class="stat">
                        <strong>85%</strong>
                        <span>Asistencia</span>
                    </div>
                    <div class="stat">
                        <strong>4.2kg</strong>
                        <span>Peso perdido</span>
                    </div>
                </div>
            </div>
            <div class="progress-chart">
                <h4>Tu Evolución</h4>
                <div class="chart-placeholder">
                    <i class="fas fa-chart-line"></i>
                    <p>Gráfico de progreso</p>
                </div>
            </div>
            <div class="achievements">
                <h4>Logros Desbloqueados</h4>
                <div class="achievement-item">
                    <i class="fas fa-trophy"></i>
                    <div class="achievement-info">
                        <strong>Primera Clase</strong>
                        <span>Completada el 15/01/2024</span>
                    </div>
                </div>
                <div class="achievement-item">
                    <i class="fas fa-fire"></i>
                    <div class="achievement-info">
                        <strong>10 Clases</strong>
                        <span>Mantenimiento constante</span>
                    </div>
                </div>
            </div>
        </div>
        <style>
        .progress-header {
            margin-bottom: 2rem;
        }
        .progress-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            text-align: center;
        }
        .stat {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 12px;
        }
        .stat strong {
            display: block;
            font-size: 1.5rem;
            color: #2E8B57;
            margin-bottom: 0.5rem;
        }
        .stat span {
            color: #666;
            font-size: 0.9rem;
        }
        .progress-chart {
            margin-bottom: 2rem;
        }
        .progress-chart h4 {
            margin-bottom: 1rem;
            color: #333;
        }
        .chart-placeholder {
            background: #f8f9fa;
            padding: 3rem;
            border-radius: 12px;
            text-align: center;
            color: #666;
        }
        .chart-placeholder i {
            font-size: 3rem;
            color: #2E8B57;
            margin-bottom: 1rem;
        }
        .achievements h4 {
            margin-bottom: 1rem;
            color: #333;
        }
        .achievement-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 12px;
            margin-bottom: 0.8rem;
        }
        .achievement-item i {
            font-size: 1.5rem;
            color: #FFD700;
            width: 30px;
        }
        .achievement-info strong {
            display: block;
            margin-bottom: 0.2rem;
        }
        .achievement-info span {
            color: #666;
            font-size: 0.9rem;
        }
        </style>
    `;
}
function showCommunity() {
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'community';
    document.getElementById('appTitle').textContent = 'Comunidad';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="community-header">
                <h3>Comunidad FitPro</h3>
                <p>Conecta con otros miembros</p>
            </div>
            <div class="community-stats">
                <div class="community-stat">
                    <strong>856</strong>
                    <span>Miembros</span>
                </div>
                <div class="community-stat">
                    <strong>42</strong>
                    <span>En línea</span>
                </div>
            </div>
            <div class="community-posts">
                <div class="post-item">
                    <div class="post-header">
                        <div class="post-avatar">MG</div>
                        <div class="post-info">
                            <strong>María González</strong>
                            <span>Hace 2 horas</span>
                        </div>
                    </div>
                    <p>¡Increíble clase de yoga hoy! 🧘‍♀️ #fitness #yoga</p>
                </div>
                <div class="post-item">
                    <div class="post-header">
                        <div class="post-avatar">CR</div>
                        <div class="post-info">
                            <strong>Carlos Ruiz</strong>
                            <span>Hace 5 horas</span>
                        </div>
                    </div>
                    <p>Nuevo récord personal en press banca 💪 #progress #gym</p>
                </div>
            </div>
            <button class="app-btn primary" style="width: 100%; margin-top: 1rem;">
                <i class="fas fa-plus"></i>
                Crear Publicación
            </button>
        </div>
        <style>
        .community-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .community-stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .community-stat {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
        }
        .community-stat strong {
            display: block;
            font-size: 1.8rem;
            color: #2E8B57;
            margin-bottom: 0.5rem;
        }
        .post-item {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1rem;
        }
        .post-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 0.8rem;
        }
        .post-avatar {
            width: 40px;
            height: 40px;
            background: #2E8B57;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        .post-info strong {
            display: block;
            margin-bottom: 0.2rem;
        }
        .post-info span {
            color: #666;
            font-size: 0.8rem;
        }
        </style>
    `;
}
function showPlans() {
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'plans';
    document.getElementById('appTitle').textContent = 'Mis Planes';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="current-plan">
                <h4>Tu Plan Actual</h4>
                <div class="plan-card premium">
                    <div class="plan-header">
                        <i class="fas fa-crown"></i>
                        <h5>Plan Premium</h5>
                    </div>
                    <div class="plan-features">
                        <span><i class="fas fa-check"></i> Acceso ilimitado</span>
                        <span><i class="fas fa-check"></i> Todas las clases</span>
                        <span><i class="fas fa-check"></i> Entrenador personal</span>
                        <span><i class="fas fa-check"></i> Nutricionista</span>
                    </div>
                    <div class="plan-price">
                        <strong>€59/mes</strong>
                        <span>Renovación: 15/02/2024</span>
                    </div>
                </div>
            </div>
            <div class="upgrade-section">
                <h4>Mejorar Plan</h4>
                <div class="upgrade-options">
                    <div class="upgrade-option">
                        <strong>Plan Básico</strong>
                        <span>€29/mes</span>
                        <button class="btn btn-outline">Seleccionar</button>
                    </div>
                    <div class="upgrade-option premium">
                        <strong>Plan Premium</strong>
                        <span>€59/mes</span>
                        <button class="btn btn-primary" disabled>Actual</button>
                    </div>
                    <div class="upgrade-option">
                        <strong>Plan Elite</strong>
                        <span>€89/mes</span>
                        <button class="btn btn-outline">Mejorar</button>
                    </div>
                </div>
            </div>
        </div>
        <style>
        .current-plan {
            margin-bottom: 2rem;
        }
        .current-plan h4 {
            margin-bottom: 1rem;
            color: #333;
        }
        .plan-card {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 12px;
            border-left: 4px solid #2E8B57;
        }
        .plan-card.premium {
            background: linear-gradient(135deg, #2E8B57, #228B22);
            color: white;
        }
        .plan-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        .plan-header i {
            font-size: 1.5rem;
        }
        .plan-features {
            margin-bottom: 1rem;
        }
        .plan-features span {
            display: block;
            margin-bottom: 0.5rem;
        }
        .plan-price {
            text-align: center;
        }
        .plan-price strong {
            font-size: 1.5rem;
            display: block;
        }
        .upgrade-section h4 {
            margin-bottom: 1rem;
            color: #333;
        }
        .upgrade-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .upgrade-option {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .upgrade-option.premium {
            background: #2E8B57;
            color: white;
        }
        .btn-outline {
            background: transparent;
            border: 2px solid #2E8B57;
            color: #2E8B57;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
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
            case 'classes':
                showClasses();
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
    console.log('Demo FitPro Gym cargado');
});