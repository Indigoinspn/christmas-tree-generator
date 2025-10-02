// src/helpers.js

/**
 * Calculates the width of the layer for small trees (4–5 layers).
 * The widest layer is always second from the end (layers - 1).
 * The widest layer has width = 2 * (layers - 1) - 1.
 */
function calculateLayerWidthForSmallTree(layerNumber) {
  // Width of every new layer (except 1 and last) is wider on 2 symbols
  // -1  subtract extra symbol from the fist layer
  return layerNumber * 2 - 1;
}

/**
 * Calculates the maximum width for large trees (6–20 layers). *
 * Explanation:
 * - layers - 4 = number of rows where stars increase (excluding first two and last two rows)
 * - *4 Each such layer adds 4 stars
 * - +1 Adding base star count = 1 (fist star on the second layer)
 * - +2 '@' symbols (left and right)to calculate correct center for the odd layers
 */
function calculateLayerMaxWidthForLargeTree(layersQuantity) {
  return (layersQuantity - 4) * 8 + 2 + 1;
}

/**
 * Adds leading spaces to center-align the string (no trailing spaces)
 * @param {string} layerSymbols
 * @param {number} maxSymbolsQuantity
 * @param {type} 'even' or 'odd' layer
 * @returns {string}
 */
function centerString(layerSymbols, maxSymbolsQuantity, type) {
  let leftPadding = '';
  //
  // Even layers with "@" symbol at the end
  if (type === 'even') {
    // decreasing on 1 symbol as "@" symbol should not affect left padding
    leftPadding = (maxSymbolsQuantity - (layerSymbols.length - 1)) / 2;
  }

  // Odd layers with "@" symbol at the beginning
  else if (type === 'odd') {
    // increasing on 1 symbol as if "@" symbol also placed to the end of the layer so that we receive correct length and stars center
    leftPadding = (maxSymbolsQuantity - (layerSymbols.length + 1)) / 2;
  }

  //other cases
  else {
    leftPadding = (maxSymbolsQuantity - layerSymbols.length) / 2;
  }
  return ' '.repeat(leftPadding) + layerSymbols;
}

module.exports = {
  calculateLayerWidthForSmallTree,
  calculateLayerMaxWidthForLargeTree,
  centerString,
};
