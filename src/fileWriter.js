const fs = require('fs');
const path = require('path');

/**
 * Writes content to a file
 * @param {string} outputPath
 * @param {string} content
 */
function writeToFile(outputPath, content) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, content, 'utf8');
}

module.exports = { writeToFile };
