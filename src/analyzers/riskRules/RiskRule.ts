import { AnalysisSignal, AnalysisRisk } from '../../model';

export interface RiskRule {
  readonly code: string;
  apply(signals: AnalysisSignal[]): AnalysisRisk | null;
}
