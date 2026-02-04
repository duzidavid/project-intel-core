import { AnalysisSignal, SignalKind } from '../../src/model';

export function signal(
  kind: SignalKind,
  code: string,
  value: string,
  source = 'test',
): AnalysisSignal {
  return {
    kind,
    code,
    value,
    source,
    confidence: 1,
  };
}
