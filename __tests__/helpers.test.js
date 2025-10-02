const { centerString, calculateLayerMaxWidthForLargeTree, calculateLayerWidthForSmallTree } = require('../src/helpers');

describe('Helpers', () => {
  it('centers string with leading spaces', () => {
    expect(centerString('*', 5)).toBe('  *');
    expect(centerString('**', 5)).toBe(' **');

    // 5 layers - small tree
    expect(centerString('^', 7)).toBe('   ^');
    expect(centerString('*~*', 7)).toBe('  *~*');
    expect(centerString('*~*~*~*', 7)).toBe('*~*~*~*');
    expect(centerString('T', 7)).toBe('   T');

    // 6 layers - big tree
    expect(centerString('W', 19)).toBe('         W');
    expect(centerString('*', 19)).toBe('         *');
    expect(centerString('@* * * * *', 19, 'odd')).toBe('    @* * * * *');
    expect(centerString('* * * * * * * * *@', 19, 'even')).toBe(' * * * * * * * * *@');
    expect(centerString('TTTTT', 19)).toBe('       TTTTT');
  });

  it('calculate max width of a layer', () => {
    // big trees
    expect(calculateLayerMaxWidthForLargeTree(6)).toBe(19);
    expect(calculateLayerMaxWidthForLargeTree(7)).toBe(27);
    expect(calculateLayerMaxWidthForLargeTree(20)).toBe(131);
  });

  it('calculate width of a layer', () => {
    // small trees
    expect(calculateLayerWidthForSmallTree(2)).toBe(3);
    expect(calculateLayerWidthForSmallTree(3)).toBe(5);
    expect(calculateLayerWidthForSmallTree(4)).toBe(7);
  });
});
