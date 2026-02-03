import { Analyzer } from './Analyzer';
import { AnalysisSignal, AnalysisRisk } from '../model';
import { FileEntry } from '../fs';

type PackageJson = {
  name?: string;
  license?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
  engines?: {
    node?: string;
  };
};

export class PackageJsonAnalyzer implements Analyzer {
  readonly name = 'PackageJsonAnalyzer';

  analyze(files: FileEntry[]): { signals: AnalysisSignal[]; risks: AnalysisRisk[] } {
    const pkgFile = files.find((f) => f.relativePath === 'package.json');
    if (!pkgFile || !pkgFile.content) {
      return { signals: [], risks: [] };
    }

    let pkg: PackageJson;
    try {
      pkg = JSON.parse(pkgFile.content);
    } catch {
      return { signals: [], risks: [] };
    }

    const signals: AnalysisSignal[] = [];

    // runtime: Node.js
    signals.push({
      kind: 'runtime',
      code: 'runtime.node',
      value: 'Node.js',
      source: this.name,
      confidence: 1,
    });

    // engines.node
    if (pkg.engines?.node) {
      signals.push({
        kind: 'config',
        code: 'config.engines.node',
        value: pkg.engines.node,
        source: this.name,
      });
    }

    // license
    if (pkg.license) {
      signals.push({
        kind: 'license',
        code: `license.${pkg.license.toLowerCase()}`,
        value: pkg.license,
        source: this.name,
      });
    }

    // scripts
    if (pkg.scripts && Object.keys(pkg.scripts).length > 0) {
      signals.push({
        kind: 'config',
        code: 'config.scripts',
        value: 'scripts',
        source: this.name,
      });
    }

    // dependencies
    const deps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
    };

    for (const dep of Object.keys(deps ?? {})) {
      signals.push({
        kind: 'dependency',
        code: `dependency.${dep.toLowerCase()}`,
        value: dep,
        source: this.name,
      });
    }

    return {
      signals,
      risks: [],
    };
  }
}
