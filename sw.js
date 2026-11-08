const V='atody-v19',SHELL=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(V).then(c=>c.put('index.html',y));return x}).catch(()=>caches.match('index.html')));return}
if(/fonts\.(googleapis|gstatic)\.com$/.test(u.host)||u.origin===location.origin){e.respondWith(caches.match(r).then(h=>{const n=fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(V).then(c=>c.put(r,y))}return x}).catch(()=>h);return h||n}))}});
