export type SignalKind =
  | 'language'
  | 'framework'
  | 'runtime'
  | 'tooling'
  | 'architecture'
  | 'license'
  | 'dependency'
  | 'pattern'
  | 'config';

export interface AnalysisSignal {
  kind: SignalKind;

  /** Stable identifier (machine-friendly) */
  code: string;

  /** Human-readable value */
  value: string;

  source: string;
  confidence?: number;

  /** Optional extensibility point */
  meta?: Record<string, unknown>;
}
