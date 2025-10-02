#!/usr/bin/env node

const { generateTree } = require('./treeGenerator');
const { writeToFile } = require('./fileWriter');
const { NUMBER_REG_EXP, MESSAGES } = require('./constants');

/**
 * Parses command-line arguments
 * Expected format: --layers <number> --output <path>
 * Example: npm start -- --layers 8 --output tree.txt
 */
function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length !== 4) {
    console.error('Usage: node cli.js --layers <number> --output <path>');
    process.exit(1);
  }

  const layersIndex = args.indexOf('--layers');
  const outputIndex = args.indexOf('--output');

  if (layersIndex === -1 || outputIndex === -1) {
    console.error('Both --layers and --output are required');
    process.exit(1);
  }

  const layers = args[layersIndex + 1];
  const outputPath = args[outputIndex + 1];

  return { layers, outputPath };
}

// Main execution
try {
  const { layers, outputPath } = parseArgs();

  const tree = generateTree(layers); // treeGenerator function handles all validation
  writeToFile(outputPath, tree);
  console.log(`✅ We have received your order for the New Year's Christmas tree with "${layers}" layers.\nPlease check the order in the file "${outputPath}".`);
  //
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
