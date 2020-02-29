var staticCacheName = 'restaurant-cache-1';
let urlToCache = [
'/',
'/restaurant.html',
'/css/styles.css',
'/data/restaurants.json',
'/img/1.jpg',
'/img/2.jpg',
'/img/3.jpg',
'/img/4.jpg',
'/img/5.jpg',
'/img/6.jpg',
'/img/7.jpg',
'/img/8.jpg',
'/img/9.jpg',
'/img/10.jpg',
'/js/main.js',
'/js/restaurant_info.js',
'/js/dbhelper.js',
];
self.addEventListener('install', event => {
  console.log('V1 installing…');

  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
console.log(cache);
 return cache.addAll(urlToCache);
  }).catch((error) =>{
console.log(error);
})

);
});

self.addEventListener('activate', function(event) {
  console.log('activate');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
return cacheName.startsWith('restaurant-') &&
    cacheName != staticCacheName;
  }).map(function(cacheName) {
          return caches.delete(cacheName); //it will delete the old cachname and replace it by the new one
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
     caches.match(event.request).then(function(response) {
       console.log('fetch');
        return response || fetch(event.request);
      })
    );
});
