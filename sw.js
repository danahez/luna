// Guarda la app para que abra sin conexión. No guarda ni envía datos personales.
const CACHE="luna-v1";
const FILES=["./","index.html","fonts.css","fonts/Figtree-0.woff2","fonts/Fraunces-1.woff2","manifest.webmanifest","icon.svg","icon-192.png","icon-512.png","icon-180.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  // Red primero para recibir actualizaciones; si no hay conexión, la copia guardada
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))));
});
