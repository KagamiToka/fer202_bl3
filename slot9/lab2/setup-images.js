const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('Created images directory');
}

// Create placeholder images info
const imageInfo = [
  { name: 'movie1.jpg', description: 'Galactic Wars - Sci-Fi' },
  { name: 'movie2.jpg', description: 'Laugh Out Loud - Comedy' },
  { name: 'movie3.jpg', description: 'Deep Blue - Drama' },
  { name: 'movie4.jpg', description: 'Haunted House - Horror' },
  { name: 'movie5.jpg', description: 'City of Love - Romance' },
  { name: 'movie6.jpg', description: 'The Time Traveler - Sci-Fi' },
  { name: 'movie7.jpg', description: 'Street Runner - Action' },
  { name: 'movie8.jpg', description: 'Hidden Truth - Thriller' },
  { name: 'movie9.jpg', description: 'Kingdom of Ash - Comedy' }
];

// Create a README file with image information
const readmeContent = `# Movie Images Setup

This directory contains movie poster images for the Movie Explorer application.

## Required Images

${imageInfo.map(img => `- ${img.name} - ${img.description}`).join('\n')}

## How to Add Images

1. **Download Images**: You can use any of these methods:
   - Use placeholder services:
     - https://picsum.photos/300/400 (random images)
     - https://via.placeholder.com/300x400 (placeholder images)
   - Download actual movie posters and rename them
   - Create your own images

2. **Image Requirements**:
   - Format: JPG or PNG
   - Size: Recommended 300x400 pixels (aspect ratio 3:4)
   - Naming: Must match exactly (movie1.jpg, movie2.jpg, etc.)

3. **Quick Setup with Placeholder Images**:
   \`\`\`bash
   # Using curl (if available)
   curl "https://picsum.photos/300/400" -o movie1.jpg
   curl "https://picsum.photos/300/400" -o movie2.jpg
   # ... repeat for all 9 images
   \`\`\`

## Notes

- Images are loaded from the public/images directory
- The application will show broken image placeholders if images are missing
- You can replace these with actual movie posters later
`;

fs.writeFileSync(path.join(imagesDir, 'README.md'), readmeContent);
console.log('Created images README file');

console.log('\n🎬 Movie Explorer Image Setup Complete!');
console.log('\nNext steps:');
console.log('1. Add movie poster images to public/images/ directory');
console.log('2. Run: npm start');
console.log('3. Open http://localhost:3000 in your browser');
console.log('\nFor quick testing, you can use placeholder images from:');
console.log('- https://picsum.photos/300/400');
console.log('- https://via.placeholder.com/300x400');
