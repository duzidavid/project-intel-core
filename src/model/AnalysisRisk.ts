export type RiskLevel = 'low' | 'medium' | 'high';

export interface AnalysisRisk {
    level: RiskLevel;
    code: string;
    message: string;
    source: string;
    relatedSignals?: string[];
}