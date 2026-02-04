import { RiskRule } from './RiskRule';
import { AnalysisRisk, AnalysisSignal } from '../../model';

export class MissingLicenseRule implements RiskRule {
  readonly code = 'risk.license.missing';

  apply(signals: AnalysisSignal[]): AnalysisRisk | null {
    const hasLicense = signals.some((s) => s.code.startsWith('license.'));

    if (hasLicense) return null;

    return {
      category: 'legal',
      severity: 'medium',
      code: this.code,
      description: 'No license information found in the project.',
      relatedSignals: [],
    };
  }
}
