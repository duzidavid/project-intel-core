import { RiskRule } from './RiskRule';
import { AnalysisRisk, AnalysisSignal } from '../../model';

export class GplLicenseRule implements RiskRule {
  readonly code = 'risk.license.gpl';

  apply(signals: AnalysisSignal[]): AnalysisRisk | null {
    const licenses = signals.filter((s) => s.code.startsWith('license.gpl'));

    if (licenses.length === 0) return null;

    return {
      category: 'legal',
      severity: 'high',
      code: this.code,
      description: 'GPL license detected, which may impose strong copyleft obligations.',
      relatedSignals: licenses.map((l) => l.code),
    };
  }
}
