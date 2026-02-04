import { describe, it, expect } from 'vitest';
import { RiskMapperAnalyzer } from '../../src/analyzers';
import { signal } from '../helpers/signal';

describe('RiskMapperAnalyzer', () => {
  it('emits legal risk when GPL license is detected', () => {
    const analyzer = new RiskMapperAnalyzer();

    const signals = [signal('license', 'license.gpl-3.0', 'GPL-3.0', 'PackageJsonAnalyzer')];

    const risks = analyzer.analyze(signals);

    const gplRisk = risks.find((r) => r.code === 'risk.license.gpl');

    expect(gplRisk).toBeDefined();
    expect(gplRisk).toEqual({
      category: 'legal',
      severity: 'high',
      code: 'risk.license.gpl',
      description: 'GPL license detected, which may impose strong copyleft obligations.',
      relatedSignals: ['license.gpl-3.0'],
    });
  });

  it('emits medium legal risk when no license signal exists', () => {
    const analyzer = new RiskMapperAnalyzer();

    const risks = analyzer.analyze([]);

    const missingLicenseRisk = risks.find((r) => r.code === 'risk.license.missing');

    expect(missingLicenseRisk).toBeDefined();
    expect(missingLicenseRisk!.severity).toBe('medium');
  });

  it('emits maintainability risk when dependency count is high', () => {
    const analyzer = new RiskMapperAnalyzer();

    const signals = Array.from({ length: 55 }, (_, i) =>
      signal('dependency', `dependency.lib${i}`, `lib${i}`, 'PackageJsonAnalyzer'),
    );

    const risks = analyzer.analyze(signals);

    const dependencyRisk = risks.find((r) => r.code === 'risk.dependencies.too_many');

    expect(dependencyRisk).toBeDefined();
    expect(dependencyRisk!.severity).toBe('medium');
  });
});
