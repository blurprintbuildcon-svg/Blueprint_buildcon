const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function genAssets() {
  const svgPath = path.join(__dirname, '..', 'public', 'Just Logo-01.svg');
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'app');

  // 1. High-res logo render
  const logoBuf = await sharp(svgPath, { density: 300 })
    .resize(320, 320, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // 2. Create 1200x630 OpenGraph image
  const svgOverlay = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0A1227" />
          <stop offset="100%" stop-color="#111C3D" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#grad)" />
      <rect x="40" y="40" width="1120" height="550" rx="24" fill="none" stroke="#1E293B" stroke-width="2" />
      
      <text x="470" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="800" fill="#FFFFFF">BluePrint Build-Con</text>
      <text x="470" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#0052FF" letter-spacing="4px">YOUR VISION OUR VICTORY</text>
      <text x="470" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="#CBD5E1">Premier Residential &amp; Commercial Construction in Pune</text>
      <text x="470" y="380" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#94A3B8">Architectural Planning • Turnkey Civil Contracting • 15-Yr Warranty</text>
      
      <rect x="470" y="420" width="220" height="44" rx="10" fill="#0052FF" />
      <text x="580" y="448" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" text-anchor="middle">blueprintbuildcon.homes</text>
    </svg>
  `);

  await sharp(svgOverlay)
    .composite([{ input: logoBuf, top: 155, left: 95 }])
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('Created public/og-image.png');

  // Create site.webmanifest for PWA & Google Android icon
  const manifest = {
    name: "BluePrint Build-Con",
    short_name: "BluePrint",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#0A1227",
    background_color: "#0A1227",
    display: "standalone"
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Created public/site.webmanifest');
}

genAssets().catch(console.error);
