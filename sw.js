self.addEventListener('fetch', e => {
  if (e.request.url.includes('icon.png')) {
    e.respondWith(generateIcon());
    return;
  }
  e.respondWith(fetch(e.request));
});

async function generateIcon() {
  const canvas = new OffscreenCanvas(192, 192);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#16213e';
  roundRect(ctx, 0, 0, 192, 192, 36);
  ctx.fill();
  ctx.fillStyle = '#e2b96f';
  ctx.font = 'bold 120px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('H', 96, 100);
  const blob = await canvas.convertToBlob({ type: 'image/png' });
  return new Response(blob, { headers: { 'Content-Type': 'image/png' } });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
