import { describe, it, expect } from 'vitest';
import { RiskMapperAnalyzer } from '../../src/analyzers';
import { AnalysisSignal } from '../../src/model';

describe('RiskMapperAnalyzer', () => {
  const analyzer = new RiskMapperAnalyzer();

  it('creates high legal risk when GPL license is detected', () => {
    const signals: AnalysisSignal[] = [
      {
        kind: 'license',
        code: 'license.gpl-3.0',
        value: 'GPL-3.0',
        source: 'PackageJsonAnalyzer',
      },
    ];

    const risks = analyzer.analyze(signals);

    expect(risks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: 'legal',
          severity: 'high',
          code: 'risk.license.gpl',
        }),
      ]),
    );
  });

  it('creates medium legal risk when license is missing', () => {
    const signals: AnalysisSignal[] = [
      {
        kind: 'language',
        code: 'language.typescript',
        value: 'TypeScript',
        source: 'LanguageAnalyzer',
      },
    ];

    const risks = analyzer.analyze(signals);

    expect(risks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: 'legal',
          severity: 'medium',
          code: 'risk.license.missing',
        }),
      ]),
    );
  });

  it('creates maintainability risk when dependency count is high', () => {
    const signals: AnalysisSignal[] = Array.from({ length: 55 }).map((_, i) => ({
      kind: 'dependency',
      code: `dependency.lib${i}`,
      value: `lib${i}`,
      source: 'PackageJsonAnalyzer',
    }));

    const risks = analyzer.analyze(signals);

    expect(risks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: 'maintainability',
          severity: 'medium',
          code: 'risk.dependencies.too_many',
        }),
      ]),
    );
  });

  it('does not create false positive risks', () => {
    const signals: AnalysisSignal[] = [
      {
        kind: 'license',
        code: 'license.mit',
        value: 'MIT',
        source: 'PackageJsonAnalyzer',
      },
    ];

    const risks = analyzer.analyze(signals);

    expect(risks.find((r) => r.code === 'risk.license.gpl')).toBeUndefined();
    expect(risks.find((r) => r.code === 'risk.license.missing')).toBeUndefined();
  });
});
