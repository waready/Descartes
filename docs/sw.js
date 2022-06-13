importScripts('js/sw-utils.js');

const Static_cache    = 'static-v3';
const Dynamic_cache   = 'dynamic-v1';
const Inmutalbe_cache = 'inmutable-v1';


const APP_SHELL = [
   // '/',
    'index.html',
    'img/icons/152x152.png',  
    'img/icons/144x144.png',   
    'img/favicon.ico',
    'js/app.js',
    'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
    'https://code.jquery.com/jquery-3.2.1.slim.min.js',
    "css/bootstrap.min.css",
    "css/sweetalert.css",
    "js/sweetalert.min.js",
    "js/TweenMax.min.js",
    "js/Winwheel.min.js"
];

self.addEventListener('install', e =>{
    const cacheStatic = caches.open(Static_cache).then(cache => cache.addAll(APP_SHELL));

    const cacheInmutable = caches.open(Inmutalbe_cache).then(cache => cache.addAll(APP_SHELL_INMUTABLE));

    e.waitUntil(Promise.all([cacheStatic,cacheInmutable]));
});

self.addEventListener('activate', e =>{
    const respuesta = caches.keys().then( keys => {
        keys.forEach( key =>{
            if( key !== Static_cache && key.includes('static')){
                return caches.delete(key);
            }
        });
    });
    e.waitUntil(respuesta);
})

self.addEventListener ('fetch', e => {

    const respuesta = caches.match( e.request ).then( resp =>{
        if (resp){
            return resp;
        }
        else{
            return fetch (e.request).then(newRes =>{
                return actualizaCacheDinamico(Dynamic_cache, e.request,newRes);
            })
        }
    });

    e.respondWith(respuesta);

})