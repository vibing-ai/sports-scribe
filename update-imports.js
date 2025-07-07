const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'web');

function updateImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content.replace(/@heroui\/react/g, '@nextui-org/react');
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated imports in ${path.relative(process.cwd(), filePath)}`);
  }
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.match(/\.(tsx|ts|js|jsx)$/)) {
      updateImports(fullPath);
    }
  });
}

console.log('Updating imports from @heroui/react to @nextui-org/react...');
processDirectory(directory);
console.log('Import updates complete!');
