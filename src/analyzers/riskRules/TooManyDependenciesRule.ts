import { RiskRule } from './RiskRule';
import { AnalysisRisk, AnalysisSignal } from '../../model';

export class TooManyDependenciesRule implements RiskRule {
  readonly code = 'risk.dependencies.too_many';

  apply(signals: AnalysisSignal[]): AnalysisRisk | null {
    const deps = signals.filter((s) => s.code.startsWith('dependency.'));

    if (deps.length <= 50) return null;

    return {
      category: 'maintainability',
      severity: 'medium',
      code: this.code,
      description: `Project has a high number of dependencies (${deps.length}).`,
      relatedSignals: deps.map((d) => d.code),
    };
  }
}
