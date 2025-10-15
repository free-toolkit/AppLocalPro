// Estado de la aplicación
let appState = {
    currentScreen: 'home',
    previousScreens: [],
    cart: []
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
    document.getElementById('appTitle').textContent = 'GustoApp';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="app-welcome">
                <h3>¡Bienvenido a GustoApp!</h3>
                <p>Tu restaurante de confianza</p>
            </div>
            <div class="app-buttons">
                <button class="app-btn primary" onclick="showMenu()">
                    <i class="fas fa-book"></i>
                    Ver Menú
                </button>
                <button class="app-btn secondary" onclick="showReservations()">
                    <i class="fas fa-calendar-check"></i>
                    Reservar Mesa
                </button>
                <button class="app-btn secondary" onclick="showFidelizacion()">
                    <i class="fas fa-crown"></i>
                    Programa Fidelidad
                </button>
                <button class="app-btn secondary" onclick="showCart()">
                    <i class="fas fa-shopping-cart"></i>
                    Mi Pedido (${appState.cart.length})
                </button>
            </div>
        </div>
    `;
}
function showMenu() {
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'menu';
    document.getElementById('appTitle').textContent = 'Nuestro Menú';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="menu-categories">
                <div class="category-tabs">
                    <button class="category-tab active" onclick="showCategory('entrantes')">Entrantes</button>
                    <button class="category-tab" onclick="showCategory('principales')">Principales</button>
                    <button class="category-tab" onclick="showCategory('postres')">Postres</button>
                    <button class="category-tab" onclick="showCategory('bebidas')">Bebidas</button>
                </div>
            </div>
            <div class="menu-items" id="menuItems">
                ${generateMenuItems('entrantes')}
            </div>
        </div>
        <style>
        .menu-categories {
            margin-bottom: 1.5rem;
        }
        .category-tabs {
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            padding-bottom: 0.5rem;
        }
        .category-tab {
            padding: 0.5rem 1rem;
            border: none;
            background: #f0f0f0;
            border-radius: 20px;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.3s;
        }
        .category-tab.active {
            background: #DC143C;
            color: white;
        }
        .menu-items {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .menu-item {
            display: flex;
            gap: 1rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 12px;
            border-left: 4px solid #DC143C;
        }
        .menu-item-image {
            width: 80px;
            height: 80px;
            background: #ddd;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
        }
        .menu-item-info {
            flex: 1;
        }
        .menu-item-info h4 {
            margin-bottom: 0.5rem;
            color: #333;
        }
        .menu-item-info p {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        .menu-item-price {
            font-weight: bold;
            color: #DC143C;
            font-size: 1.1rem;
        }
        .menu-item-actions {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: white;
            border-radius: 20px;
            padding: 0.3rem;
        }
        .quantity-btn {
            width: 30px;
            height: 30px;
            border: none;
            background: #DC143C;
            color: white;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .add-to-cart-btn {
            background: #DC143C;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
        }
        </style>
    `;
}
function generateMenuItems(category) {
    const menuData = {
        entrantes: [
            { name: 'Bruschetta Clásica', description: 'Pan tostado con tomate y albahaca', price: 8.50 },
            { name: 'Carpaccio de Res', description: 'Láminas de res con rúcula y parmesano', price: 12.00 },
            { name: 'Calamares Fritos', description: 'Crujientes calamares con alioli', price: 10.50 }
        ],
        principales: [
            { name: 'Risotto de Champiñones', description: 'Arroz cremoso con champiñones silvestres', price: 16.00 },
            { name: 'Salmón a la Plancha', description: 'Salmón con verduras al vapor', price: 18.50 },
            { name: 'Pizza Margarita', description: 'Clásica pizza con tomate y mozzarella', price: 12.00 }
        ],
        postres: [
            { name: 'Tiramisú Casero', description: 'Postre italiano clásico', price: 6.50 },
            { name: 'Brownie de Chocolate', description: 'Con helado de vainilla', price: 7.00 },
            { name: 'Crema Catalana', description: 'Postre tradicional con caramelo crujiente', price: 5.50 }
        ],
        bebidas: [
            { name: 'Vino de la Casa', description: 'Copa de vino tinto o blanco', price: 4.50 },
            { name: 'Cerveza Artesanal', description: 'Selección de cervezas locales', price: 5.00 },
            { name: 'Refrescos', description: 'Coca-Cola, Fanta, Agua', price: 2.50 }
        ]
    };
    return menuData[category].map(item => `
        <div class="menu-item">
            <div class="menu-item-image">
                <i class="fas fa-utensils"></i>
            </div>
            <div class="menu-item-info">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <div class="menu-item-price">€${item.price}</div>
            </div>
            <div class="menu-item-actions">
                <button class="add-to-cart-btn" onclick="addToCart('${item.name}', ${item.price})">
                    Añadir
                </button>
            </div>
        </div>
    `).join('');
}
function showCategory(category) {
    document.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('menuItems').innerHTML = generateMenuItems(category);
}
function addToCart(itemName, price) {
    const existingItem = appState.cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        appState.cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }
    // Actualizar badge del carrito
    showHomeScreen();
    // Mostrar confirmación
    alert(`¡${itemName} añadido al carrito!`);
}
function showCart() {
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'cart';
    document.getElementById('appTitle').textContent = 'Mi Pedido';
    if (appState.cart.length === 0) {
        document.getElementById('appContent').innerHTML = `
            <div class="app-screen">
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Tu carrito está vacío</h3>
                    <p>Añade algunos productos del menú</p>
                    <button class="app-btn primary" onclick="showMenu()">
                        <i class="fas fa-book"></i>
                        Ver Menú
                    </button>
                </div>
            </div>
            <style>
            .empty-cart {
                text-align: center;
                padding: 3rem 1rem;
            }
            .empty-cart i {
                font-size: 4rem;
                color: #ddd;
                margin-bottom: 1rem;
            }
            </style>
        `;
        return;
    }
    const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="cart-items">
                ${appState.cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <strong>${item.name}</strong>
                            <span>€${item.price} x ${item.quantity}</span>
                        </div>
                        <div class="cart-item-total">
                            €${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div class="cart-item-actions">
                            <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-total">
                <strong>Total: €${total.toFixed(2)}</strong>
            </div>
            <div class="cart-actions">
                <button class="app-btn primary" onclick="checkout()" style="width: 100%;">
                    <i class="fas fa-credit-card"></i>
                    Proceder al Pago
                </button>
                <button class="app-btn secondary" onclick="showMenu()" style="width: 100%;">
                    <i class="fas fa-plus"></i>
                    Añadir Más Productos
                </button>
            </div>
        </div>
        <style>
        .cart-items {
            margin-bottom: 1.5rem;
        }
        .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 12px;
            margin-bottom: 0.8rem;
        }
        .cart-item-info {
            flex: 1;
        }
        .cart-item-info strong {
            display: block;
            margin-bottom: 0.2rem;
        }
        .cart-item-info span {
            color: #666;
            font-size: 0.9rem;
        }
        .cart-item-total {
            font-weight: bold;
            color: #DC143C;
            margin: 0 1rem;
        }
        .cart-item-actions {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .cart-total {
            text-align: center;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            font-size: 1.2rem;
        }
        .cart-actions {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        </style>
    `;
}
function updateQuantity(itemName, change) {
    const item = appState.cart.find(item => item.name === itemName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            appState.cart = appState.cart.filter(i => i.name !== itemName);
        }
    }
    showCart();
}
function checkout() {
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'checkout';
    const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('appTitle').textContent = 'Confirmar Pedido';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="checkout-summary">
                <h4>Resumen del Pedido</h4>
                ${appState.cart.map(item => `
                    <div class="checkout-item">
                        <span>${item.name} x${item.quantity}</span>
                        <span>€${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
                <div class="checkout-total">
                    <strong>Total: €${total.toFixed(2)}</strong>
                </div>
            </div>
            <div class="checkout-form">
                <div class="form-group">
                    <label>Dirección de entrega:</label>
                    <input type="text" class="form-input" placeholder="Tu dirección">
                </div>
                <div class="form-group">
                    <label>Teléfono:</label>
                    <input type="tel" class="form-input" placeholder="+34 ...">
                </div>
                <div class="form-group">
                    <label>Método de pago:</label>
                    <select class="form-input">
                        <option>Tarjeta de crédito</option>
                        <option>PayPal</option>
                        <option>Efectivo</option>
                    </select>
                </div>
            </div>
            <button class="app-btn primary" onclick="confirmOrder()" style="width: 100%; margin-top: 2rem;">
                <i class="fas fa-check"></i>
                Confirmar Pedido
            </button>
        </div>
        <style>
        .checkout-summary {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        .checkout-summary h4 {
            margin-bottom: 1rem;
            color: #333;
        }
        .checkout-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #dee2e6;
        }
        .checkout-total {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 2px solid #DC143C;
            font-size: 1.2rem;
        }
        .checkout-form {
            margin-bottom: 1rem;
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
        </style>
    `;
}
function confirmOrder() {
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'order-confirmed';
    document.getElementById('appTitle').textContent = 'Pedido Confirmado';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="order-confirmed">
                <div class="confirmation-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>¡Pedido Confirmado!</h3>
                <p>Tu pedido está siendo preparado</p>
                <div class="order-details">
                    <div class="detail-item">
                        <strong>Número de pedido:</strong>
                        <span>#${Math.floor(Math.random() * 1000)}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Tiempo estimado:</strong>
                        <span>25-35 minutos</span>
                    </div>
                    <div class="detail-item">
                        <strong>Total:</strong>
                        <span>€${appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                    </div>
                </div>
                <div class="confirmation-buttons">
                    <button class="app-btn primary" onclick="showFidelizacion()">
                        <i class="fas fa-crown"></i>
                        Ganar Puntos
                    </button>
                    <button class="app-btn secondary" onclick="appState.cart = []; showHomeScreen();">
                        <i class="fas fa-home"></i>
                        Volver al Inicio
                    </button>
                </div>
            </div>
        </div>
        <style>
        .order-confirmed {
            text-align: center;
            padding: 2rem 0;
        }
        .confirmation-icon {
            font-size: 4rem;
            color: #28a745;
            margin-bottom: 1rem;
        }
        .order-details {
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
function showReservations() {
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'reservations';
    document.getElementById('appTitle').textContent = 'Reservar Mesa';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="reservation-form">
                <div class="form-group">
                    <label>Fecha:</label>
                    <input type="date" id="reservationDate" class="form-input">
                </div>
                <div class="form-group">
                    <label>Hora:</label>
                    <select id="reservationTime" class="form-input">
                        <option value="13:00">01:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="20:00">08:00 PM</option>
                        <option value="21:00">09:00 PM</option>
                        <option value="22:00">10:00 PM</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Número de personas:</label>
                    <select id="reservationGuests" class="form-input">
                        <option value="1">1 persona</option>
                        <option value="2">2 personas</option>
                        <option value="3">3 personas</option>
                        <option value="4">4 personas</option>
                        <option value="5">5 personas</option>
                        <option value="6">6 personas</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Zona preferida:</label>
                    <select id="reservationZone" class="form-input">
                        <option value="terraza">Terraza</option>
                        <option value="interior">Interior</option>
                        <option value="vip">Zona VIP</option>
                    </select>
                </div>
                <button class="app-btn primary" onclick="confirmReservation()" style="width: 100%; margin-top: 2rem;">
                    <i class="fas fa-check"></i>
                    Confirmar Reserva
                </button>
            </div>
        </div>
        <style>
        .reservation-form {
            margin-bottom: 1rem;
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
        </style>
    `;
}
function confirmReservation() {
    const date = document.getElementById('reservationDate').value;
    const time = document.getElementById('reservationTime').value;
    const guests = document.getElementById('reservationGuests').value;
    const zone = document.getElementById('reservationZone').value;
    if (!date) {
        alert('Por favor selecciona una fecha');
        return;
    }
    appState.previousScreens.push(appState.currentScreen);
    appState.currentScreen = 'reservation-confirmed';
    document.getElementById('appTitle').textContent = 'Reserva Confirmada';
    document.getElementById('appContent').innerHTML = `
        <div class="app-screen">
            <div class="reservation-confirmed">
                <div class="confirmation-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>¡Reserva Confirmada!</h3>
                <p>Tu mesa ha sido reservada exitosamente</p>
                <div class="reservation-details">
                    <div class="detail-item">
                        <strong>Fecha:</strong>
                        <span>${date}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Hora:</strong>
                        <span>${time}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Personas:</strong>
                        <span>${guests}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Zona:</strong>
                        <span>${zone}</span>
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
                    <div class="points-value">1,250</div>
                    <p>Puntos acumulados</p>
                </div>
            </div>
            <div class="benefits-list">
                <h4>Tus Beneficios</h4>
                <div class="benefit-item">
                    <i class="fas fa-gift"></i>
                    <div class="benefit-info">
                        <strong>10 puntos por cada €1 gastado</strong>
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
                    <i class="fas fa-wine-glass-alt"></i>
                    <div class="benefit-info">
                        <strong>Bebida de cortesía</strong>
                        <span>En tu cumpleaños</span>
                    </div>
                </div>
            </div>
            <div class="rewards-section">
                <h4>Recompensas Disponibles</h4>
                <div class="reward-item">
                    <div class="reward-info">
                        <strong>Postre Gratis</strong>
                        <span>300 puntos</span>
                    </div>
                    <button class="btn btn-primary">Canjear</button>
                </div>
                <div class="reward-item">
                    <div class="reward-info">
                        <strong>€10 Descuento</strong>
                        <span>500 puntos</span>
                    </div>
                    <button class="btn btn-primary">Canjear</button>
                </div>
                <div class="reward-item">
                    <div class="reward-info">
                        <strong>Cena para 2</strong>
                        <span>1,200 puntos</span>
                    </div>
                    <button class="btn btn-outline" disabled>Faltan 50 pts</button>
                </div>
            </div>
        </div>
        <style>
        .fidelizacion-header {
            text-align: center;
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: linear-gradient(135deg, #DC143C, #B22222);
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
            color: #DC143C;
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
            color: #DC143C;
            font-weight: bold;
        }
        .btn-outline {
            background: transparent;
            border: 2px solid #DC143C;
            color: #DC143C;
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
            case 'menu':
                showMenu();
                break;
            case 'cart':
                showCart();
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
    console.log('Demo GustoApp Restaurante cargado');
});