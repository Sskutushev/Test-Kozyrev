const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const inputDir = 'assets';
const outputDir = 'dist/assets';

async function optimizeImages() {
    try {
        await fs.mkdir(outputDir, { recursive: true });

        const files = await fs.readdir(inputDir);
        // Filter for image files, excluding SVG
        const imageFiles = files.filter(f => f.match(/\.(png|jpg|jpeg)$/i));

        console.log(`Optimizing ${imageFiles.length} images...`);

        for (const file of imageFiles) {
            const inputPath = path.join(inputDir, file);
            const ext = path.extname(file);
            const baseName = path.basename(file, ext);
            const outputPath = path.join(outputDir, `${baseName}.webp`);

            await sharp(inputPath)
                .webp({ quality: 85 })
                .toFile(outputPath);

            console.log(`Converted ${file} to ${baseName}.webp`);
        }
        
        // Also copy non-image assets like SVGs
        const otherFiles = files.filter(f => !f.match(/\.(png|jpg|jpeg)$/i));
        for (const file of otherFiles) {
             const inputPath = path.join(inputDir, file);
             const outputPath = path.join(outputDir, file);
             await fs.copyFile(inputPath, outputPath);
             console.log(`Copied ${file}`);
        }

        console.log('Optimization and asset copying complete!');
    } catch (error) {
        console.error('Error during image optimization:', error);
        process.exit(1);
    }
}

optimizeImages();
