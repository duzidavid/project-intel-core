export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface AnalysisRisk {
  category: 'security' | 'maintainability' | 'performance' | 'legal' | 'unknown';

  severity: RiskSeverity;

  /** Stable identifier */
  code: string;

  /** Human-readable description */
  description: string;

  /** Signals that contributed to this risk */
  relatedSignals: string[];

  /** Optional context */
  meta?: Record<string, unknown>;
}
