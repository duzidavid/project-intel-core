import { SignalAnalyzer } from './Analyzer';
import { AnalysisSignal, AnalysisRisk } from '../model';
import { RiskRule, GplLicenseRule, MissingLicenseRule, TooManyDependenciesRule } from './riskRules';

export class RiskMapperAnalyzer implements SignalAnalyzer {
  readonly name = 'RiskMapperAnalyzer';

  private readonly rules: RiskRule[] = [
    new GplLicenseRule(),
    new MissingLicenseRule(),
    new TooManyDependenciesRule(),
  ];

  analyze(signals: AnalysisSignal[]): AnalysisRisk[] {
    return this.rules
      .map((rule) => rule.apply(signals))
      .filter((r): r is AnalysisRisk => r !== null);
  }
}
