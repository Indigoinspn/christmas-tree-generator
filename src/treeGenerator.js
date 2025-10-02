const { MESSAGES, NUMBER_REG_EXP } = require('./constants');
const { calculateLayerWidthForSmallTree, calculateLayerMaxWidthForLargeTree, centerString } = require('./helpers');

/**
 * Generates the ASCII Christmas tree as a string.
 * Accepts any input (string, number, etc.), but valid value is a positive number,
 * validates the range, and returns either the tree or a friendly message.
 *
 * Rules:
 * - Input must be a valid positive number.
 * - Value is floored to an integer.
 * - Valid range: 4 to 20 layers (inclusive).
 * - <= 0   → invalid size
 * - non numbers → invalid size
 * - < 4 → "tree too small"
 * - > 20 → "tree too big"
 *
 * @param {any} input - user-provided value (e.g., "8", 8, 8.9, "abc")
 * @returns {string} complete ASCII tree or error message
 *  example: npm start -- --layers 8 --output tree.txt
 */

function generateTree(input) {
  // Checks that input string contains number otherwise throws new error
  if (!NUMBER_REG_EXP.test(input)) {
    throw new Error(MESSAGES.INVALID_SIZE);
  }
  // First converts input to a number, then rounds it down using.
  const layersQuantity = Math.floor(Number(input));

  // If not a positive number return "invalid size"
  if (layersQuantity <= 0) {
    return MESSAGES.NOT_AVAILABLE;
  }

  // Handle too small trees
  if (layersQuantity < 4) {
    return MESSAGES.TREE_TOO_SMALL;
  }

  // Handle oversized trees
  if (layersQuantity > 20) {
    return MESSAGES.TREE_TOO_BIG;
  }

  // Now we have a valid integer in range [4, 20]
  const treeLayers = [];

  // *** Case 1: Small tree (4 to 5 layers) ***
  if (layersQuantity >= 4 && layersQuantity <= 5) {
    //
    // Widest layer is second from the end
    const widestLayerNumber = layersQuantity - 1;
    const maxSymbolsQuantity = calculateLayerWidthForSmallTree(widestLayerNumber);

    // Top - 1 layer of the tree
    treeLayers.push(centerString('^', maxSymbolsQuantity));

    // Body: layers from 2 to (layers - 1)
    for (let layerNumber = 2; layerNumber <= layersQuantity - 1; layerNumber++) {
      let pattern = '';

      // Even layer: *~*~*...
      if (layerNumber % 2 === 0) {
        const symbolsQuantity = calculateLayerWidthForSmallTree(layerNumber);
        const pairs = Math.floor(symbolsQuantity / 2);
        pattern = '*~'.repeat(pairs) + '*';
      }

      // Odd layer (3, 5, ...): *'o'*'o'*...
      else {
        const patternCount = Math.floor(layerNumber / 2);
        pattern = "*'o'".repeat(patternCount) + '*';
      }
      treeLayers.push(centerString(pattern, maxSymbolsQuantity));
    }

    // Tree trunk - last layer
    treeLayers.push(centerString('T', maxSymbolsQuantity));
  }

  //***  Case 2: Large tree (6 to 20 layers) ***
  else {
    const maxSymbolsQuantity = calculateLayerMaxWidthForLargeTree(layersQuantity);

    // Top - 1 and 2 layer of the tree
    treeLayers.push(centerString('W', maxSymbolsQuantity));
    treeLayers.push(centerString('*', maxSymbolsQuantity));

    // Each layer adds 4 more stars
    let starCount = 1;
    for (let layerNumber = 3; layerNumber <= layersQuantity - 2; layerNumber++) {
      starCount += 4;
      let layerStarSymbols = '* '.repeat(starCount - 1) + '*'; //adding space after a "*" symbol
      let centeredLayerSymbols = '';

      // Add '@' symbol starting from the 3rd layer, alternating sides:
      //
      // - Even layers: '@' at the end
      if (layerNumber % 2 === 0) {
        centeredLayerSymbols = centerString(layerStarSymbols + '@', maxSymbolsQuantity, 'even');
      }
      //
      // - Odd layers (3rd, 5th, ...):  '@' at the beginning
      else {
        centeredLayerSymbols = centerString('@' + layerStarSymbols, maxSymbolsQuantity, 'odd');
      }

      treeLayers.push(centeredLayerSymbols);
    }

    // Tree trunk (two layers)
    const treeTrunk = centerString('TTTTT', maxSymbolsQuantity);
    treeLayers.push(treeTrunk);
    treeLayers.push(treeTrunk);
  }

  let treePicture = '';

  //Small tree
  if (layersQuantity <= 5) {
    treePicture = treeLayers.join('\n'); // Join all lines with newline
    return MESSAGES.CONGRATS_MSG + treePicture;
  }
  //Big tree
  //Adding new line between layers
  treePicture = treeLayers.join('\n\n'); // Join all lines with newline
  return MESSAGES.CONGRATS_MSG + treePicture;
}

module.exports = { generateTree };
