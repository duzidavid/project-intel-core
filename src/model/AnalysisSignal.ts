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
    value: string;
    source: string;
    confidence?: number;
}