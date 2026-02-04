import { SignalAnalyzer } from './Analyzer';
import { AnalysisSignal, AnalysisRisk } from '../model';

export class RiskMapperAnalyzer implements SignalAnalyzer {
  readonly name = 'RiskMapperAnalyzer';

  analyze(signals: AnalysisSignal[]): AnalysisRisk[] {
    const risks: AnalysisRisk[] = [];

    const codes = signals.map((s) => s.code);

    const has = (prefix: string) => codes.some((c) => c.startsWith(prefix));
    const byPrefix = (prefix: string) => codes.filter((c) => c.startsWith(prefix));

    // ── Rule: GPL license detected ───────────────────────────────
    const gplLicenses = ['license.gpl', 'license.gpl-2.0', 'license.gpl-3.0'];

    if (gplLicenses.some((code) => codes.includes(code))) {
      risks.push({
        category: 'legal',
        severity: 'high',
        code: 'risk.license.gpl',
        description: 'GPL license detected, which may impose strong copyleft obligations.',
        relatedSignals: byPrefix('license.'),
      });
    }

    // ── Rule: Missing license ────────────────────────────────────
    if (!has('license.')) {
      risks.push({
        category: 'legal',
        severity: 'medium',
        code: 'risk.license.missing',
        description: 'No license information found in the project.',
        relatedSignals: [],
      });
    }

    // ── Rule: Too many dependencies ──────────────────────────────
    const dependencies = byPrefix('dependency.');
    if (dependencies.length > 50) {
      risks.push({
        category: 'maintainability',
        severity: 'medium',
        code: 'risk.dependencies.too_many',
        description: `Project has a high number of dependencies (${dependencies.length}).`,
        relatedSignals: dependencies,
      });
    }

    return risks;
  }
}
