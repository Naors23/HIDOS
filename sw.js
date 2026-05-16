const CACHE = 'hidos-v2';

self.addEventListener('install', e => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      const icon = await generateIcon();
      await cache.put('/HIDOS/icon.png', icon);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('icon.png')) {
    e.respondWith(
      caches.match(e.request).then(c => c || generateIcon())
    );
    return;
  }
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

async function generateIcon() {
  const canvas = new OffscreenCanvas(192, 192);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#16213e';
  ctx.beginPath();
  ctx.roundRect(0, 0, 192, 192, 36);
  ctx.fill();
  ctx.fillStyle = '#e2b96f';
  ctx.font = 'bold 115px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('H', 96, 100);
  const blob = await canvas.convertToBlob({ type: 'image/png' });
  return new Response(blob, { headers: { 'Content-Type': 'image/png' } });
}
