import { describe, it, expect } from 'vitest';
import { PackageJsonAnalyzer } from '../../src/analyzers';
import { file } from '../helpers/fileEntry';

describe('PackageJsonAnalyzer', () => {
  it('extracts signals from package.json', () => {
    const analyzer = new PackageJsonAnalyzer();

    const pkg = JSON.stringify({
      license: 'MIT',
      scripts: { build: 'tsc' },
      dependencies: { react: '^18.0.0' },
      engines: { node: '>=18' },
    });

    const result = analyzer.analyze([file('package.json', pkg)]);

    expect(result.signals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'runtime.node' }),
        expect.objectContaining({ code: 'license.mit' }),
        expect.objectContaining({ code: 'config.scripts' }),
        expect.objectContaining({ code: 'dependency.react' }),
        expect.objectContaining({ code: 'config.engines.node' }),
      ]),
    );
  });
});
