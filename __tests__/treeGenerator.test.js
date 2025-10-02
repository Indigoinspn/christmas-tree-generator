const { generateTree } = require('../src/treeGenerator');
const { MESSAGES } = require('../src/constants');

describe('Tree generator', () => {
  it('throws "Invalid size format" for non-numbers', () => {
    const invalidInputs = ['true', 'false', 'Infinity', '-Infinity', 'null', 'undefined', 'NaN', '[]', '{}', '() => 5', 'abc', '', ' - 2', '12.34.56'];

    invalidInputs.forEach((input) => {
      expect(() => generateTree(input)).toThrow(MESSAGES.INVALID_SIZE);
    });
  });

  it('returns "size is not available" for invalid number <= 0', () => {
    expect(generateTree(0)).toContain('size is not available');
    expect(generateTree('0')).toContain('size is not available');
    expect(generateTree(' 0 ')).toContain('size is not available');
    expect(generateTree(-10)).toContain('size is not available');
    expect(generateTree('-10')).toContain('size is not available');
  });

  it('returns "too small" for numbers < 4', () => {
    expect(generateTree(' 1 ')).toContain('too small');
    expect(generateTree('1')).toContain('too small');
    expect(generateTree(1)).toContain('too small');
    expect(generateTree('   2')).toContain('too small');
    expect(generateTree('3')).toContain('too small');
    expect(generateTree(3)).toContain('too small');
  });

  it('returns "too big" for numbers > 20', () => {
    expect(generateTree(' 22 ')).toContain('too big');
    expect(generateTree(21)).toContain('too big');
    expect(generateTree(100)).toContain('too big');
  });

  it('rounds down float numbers', () => {
    expect(generateTree(6.88)).not.toContain('too small');
    expect(generateTree(6.88)).not.toContain('too big');
    expect(generateTree(6.88)).not.toContain('size is not available');
    expect(generateTree(6.88)).toContain('W');
    expect(generateTree(6.88)).toContain('@* * * * *');
    expect(generateTree(6.88)).toContain('TTTTT');
    expect(generateTree(5.1155)).not.toContain('too small');
    expect(generateTree(5.1155)).not.toContain('too big');
    expect(generateTree(5.1155)).not.toContain('size is not available');
    expect(generateTree(' 5.1155 ')).not.toContain('size is not available');
    expect(generateTree(5.1155)).toContain('^');
    expect(generateTree(5.1155)).toContain("*'o'*");
  });

  it('generates tree for valid integer 5', () => {
    const result = generateTree(5);
    expect(result).not.toContain('too small');
    expect(result).not.toContain('too big');
    expect(result).not.toContain('size is not available');
    expect(result).toContain('^');
    expect(result).toContain('*~*');
    expect(result).toContain("*'o'*");
    expect(result).toContain('*~*~*~*');
    expect(result).toContain('T');
  });

  it('generates tree for valid integer 8', () => {
    const result = generateTree(8);
    expect(result).not.toContain('too small');
    expect(result).not.toContain('too big');
    expect(result).not.toContain('size is not available');
    expect(result).toContain('W');
    expect(result).toContain('TTTTT');
    expect(result).toContain('* * * * * * * * * * * * * * * * *@');
  });

  it('generates tree for valid integer 20', () => {
    const result = generateTree(20);
    expect(result).not.toContain('too small');
    expect(result).not.toContain('too big');
    expect(result).not.toContain('size is not available');
    expect(result).toContain('W');
    expect(result).toContain('TTTTT');
  });
});

it('generates correctly aligned tree for 5 layers', () => {
  const result = generateTree(5);
  const lines = result.split('\n');
  expect(lines).toEqual(['   ^', '  *~*', " *'o'*", '*~*~*~*', '   T']);
});
