const fs = require('fs');
const path = require('path');

function printTree(dirPath, prefix = '') {
  const items = fs.readdirSync(dirPath);

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);

    // Skip the node_modules directory
    if (item === 'node_modules' || item === '.git') {
      return;
    }

    console.log(`${prefix}${isLast ? '└── ' : '├── '}${item}`);

    if (stats.isDirectory()) {
      printTree(itemPath, `${prefix}${isLast ? '    ' : '│   '}`);
    }
  });
}

console.log("Project Directory Tree:");
printTree(path.resolve(__dirname));