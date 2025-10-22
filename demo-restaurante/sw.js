const CACHE_NAME = 'gastroneo-v2';
const BASE_PATH = '/AppLocalPro/demo-restaurante/'; // Ajusta según tu estructura

const urlsToCache = [
  BASE_PATH + 'index.html',
  BASE_PATH + 'manifest.json',
  // Assets locales
  BASE_PATH + 'icon-192.png',
  BASE_PATH + 'icon-512.png',
  // Estilos y fuentes externas (¡sin espacios!)
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&family=Rajdhani:wght@400;500;600&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache)
          .catch((err) => {
            console.warn('Algunos recursos no se pudieron cachear:', err);
            // Continúa aunque falle algún recurso externo
          });
      })
      .then(() => self.skipWaiting()) // Activa el SW inmediatamente
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Solo cachear solicitudes GET seguras
  if (event.request.method !== 'GET') return;

  // Ignorar URLs de APIs o datos dinámicos
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('chrome-extension://')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si está en caché, devolverlo
        if (response) return response;
        
        // Si no, buscar en red y cachear respuesta (solo para HTML/JS/CSS/íconos)
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clonar la respuesta para cachearla
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            // Solo cachear recursos estáticos
            if (event.request.url.includes(BASE_PATH) || 
                event.request.url.includes('fonts.googleapis.com') ||
                event.request.url.includes('cloudflare.com')) {
              cache.put(event.request, responseToCache);
            }
          });

          return response;
        });
      })
  );
});
