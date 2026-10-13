const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processLogo() {
  const inputPath = path.join(__dirname, '..', 'public', 'logo.jpg');
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'app');

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // 1. Create transparent version: public/logo.png
  // Key out the flat white background while keeping dark blueprint lines and colored artwork
  const transparentData = Buffer.from(data);
  for (let i = 0; i < transparentData.length; i += channels) {
    const r = transparentData[i];
    const g = transparentData[i + 1];
    const b = transparentData[i + 2];

    // Background is near white (r, g, b all high and close together)
    const minC = Math.min(r, g, b);
    const maxC = Math.max(r, g, b);
    const diff = maxC - minC;

    // If pure white or off-white with virtually no color saturation
    if (minC > 248 && diff < 8) {
      transparentData[i + 3] = 0;
    } else if (minC > 230 && diff < 12) {
      // Soft antialiased edge
      const factor = (248 - minC) / 18;
      transparentData[i + 3] = Math.max(0, Math.min(255, Math.round(255 * factor)));
    }
  }

  await sharp(transparentData, { raw: { width, height, channels } })
    .png()
    .toFile(path.join(publicDir, 'logo.png'));
  console.log('Created public/logo.png');

  // 2. Create Dark-mode / Dark-header version: public/logo-dark.png
  // Where dark text (#0a1227) is turned to crisp white (#ffffff)
  const darkNavData = Buffer.from(transparentData);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const a = darkNavData[idx + 3];
      if (a === 0) continue;

      const r = darkNavData[idx];
      const g = darkNavData[idx + 1];
      const b = darkNavData[idx + 2];

      // If it's the dark text or dark line (not blue and not grey concrete)
      // Bottom text "BluePrint" and "IDEAS | STRUCTURES | REALITY" or thin dark lines
      const isBlue = b > 140 && b > r + 40;
      if (!isBlue) {
        // If it is dark text (r < 70, g < 70, b < 90)
        if (r < 70 && g < 70 && b < 90) {
          darkNavData[idx] = 255;
          darkNavData[idx + 1] = 255;
          darkNavData[idx + 2] = 255;
        }
      }
    }
  }

  await sharp(darkNavData, { raw: { width, height, channels } })
    .png()
    .toFile(path.join(publicDir, 'logo-white.png'));
  console.log('Created public/logo-white.png');

  // 3. Extract the 3D 'B' Mark: public/logo-mark.png
  // The 'B' is situated roughly from y: 80 to 740, and x: 180 to 840
  // Let's find tight bounding box of the 'B' artwork above the text (y < 750)
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 50; y < 750; y++) {
    for (let x = 100; x < width - 100; x++) {
      const idx = (y * width + x) * channels;
      if (transparentData[idx + 3] > 30) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log('Mark Bounding box:', { minX, maxX, minY, maxY });

  // Add slight padding
  const pad = 20;
  const cropLeft = Math.max(0, minX - pad);
  const cropTop = Math.max(0, minY - pad);
  const cropWidth = Math.min(width - cropLeft, (maxX - minX) + pad * 2);
  const cropHeight = Math.min(height - cropTop, (maxY - minY) + pad * 2);

  await sharp(transparentData, { raw: { width, height, channels } })
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png()
    .toFile(path.join(publicDir, 'logo-mark.png'));
  console.log('Created public/logo-mark.png');

  // 4. Create App Icon / Favicon: app/icon.png and public/favicon.ico
  // Make a square icon with subtle rounded squircle container or pure mark
  await sharp(path.join(publicDir, 'logo-mark.png'))
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(appDir, 'icon.png'));
  console.log('Created app/icon.png');

  // 32x32 for public/favicon.ico (png format is standard for modern next.js)
  await sharp(path.join(publicDir, 'logo-mark.png'))
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Created public/favicon.ico');
}

processLogo().catch(console.error);
