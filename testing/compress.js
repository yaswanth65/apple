const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');

// All images referenced in index.html that are PNG or JPEG (not already webp)
const imagesToCompress = [
  // hero3imgs
  'hero3imgs/Home-Page.png',
  'hero3imgs/Homepage 2.png',
  'hero3imgs/apple_airpods_max_8.jpg.jpeg',
  // imgdrive
  'imgdrive/shopiphone.png',
  'imgdrive/discovermac.png',
  'imgdrive/watchseries 10.png',
  'imgdrive/iwatch.png',
  'imgdrive/airpods4.png',
  'imgdrive/card01.png',
  'imgdrive/card02.png',
  'imgdrive/card03.png',
  'imgdrive/card05.png',
  'imgdrive/essential-addons.png',
  'imgdrive/mackeyboardblack.jpeg',
  'imgdrive/iphoneaccessories.png',
  'imgdrive/ipadkeyboard.jpeg',
  'imgdrive/large.png',
  'imgdrive/large2.png',
  'imgdrive/large3.png',
  // Also compress unused but present images
  'imgdrive/Home-Page.png',
  'imgdrive/Homepage 2.png',
  'imgdrive/iphoneaccessories-.jpeg',
  'media/hero.png',
  'media/Link.png',
];

async function compressImage(relativePath) {
  const inputPath = path.join(ROOT, relativePath);

  if (!fs.existsSync(inputPath)) {
    console.log(`  SKIP (not found): ${relativePath}`);
    return null;
  }

  const ext = path.extname(relativePath).toLowerCase();
  const dirName = path.dirname(relativePath);
  const baseName = path.basename(relativePath, ext);

  // For files with double extensions like .jpg.jpeg, strip both
  let cleanBase = baseName;
  const secondExt = path.extname(cleanBase).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp'].includes(secondExt)) {
    cleanBase = path.basename(cleanBase, secondExt);
  }

  const outputRelative = path.join(dirName, cleanBase + '.webp');
  const outputPath = path.join(ROOT, outputRelative);

  const inputStats = fs.statSync(inputPath);
  const inputSizeKB = (inputStats.size / 1024).toFixed(1);

  try {
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(1);
    const savings = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(1);

    console.log(`  OK: ${relativePath} (${inputSizeKB}KB) -> ${outputRelative} (${outputSizeKB}KB) [${savings}% smaller]`);

    return {
      original: relativePath,
      compressed: outputRelative,
      originalSize: inputStats.size,
      compressedSize: outputStats.size,
    };
  } catch (err) {
    console.error(`  ERROR: ${relativePath} - ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('=== Image Compression (PNG/JPEG -> WebP, quality 85) ===\n');

  let totalOriginal = 0;
  let totalCompressed = 0;
  let count = 0;

  for (const img of imagesToCompress) {
    const result = await compressImage(img);
    if (result) {
      totalOriginal += result.originalSize;
      totalCompressed += result.compressedSize;
      count++;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Compressed: ${count} images`);
  console.log(`Total original:   ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total compressed: ${(totalCompressed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total saved:      ${((totalOriginal - totalCompressed) / 1024 / 1024).toFixed(2)} MB (${(((totalOriginal - totalCompressed) / totalOriginal) * 100).toFixed(1)}%)`);

  // Generate the HTML replacement map for referenced images only
  console.log('\n=== HTML src replacements needed ===');
  const htmlImages = imagesToCompress.slice(0, 19); // Only the ones in index.html
  for (const img of htmlImages) {
    const ext = path.extname(img).toLowerCase();
    let baseName = path.basename(img, ext);
    const secondExt = path.extname(baseName).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.webp'].includes(secondExt)) {
      baseName = path.basename(baseName, secondExt);
    }
    const dirName = path.dirname(img);
    const newPath = path.join(dirName, baseName + '.webp').replace(/\\/g, '/');
    console.log(`  ./${img} -> ./${newPath}`);
  }
}

main().catch(console.error);
