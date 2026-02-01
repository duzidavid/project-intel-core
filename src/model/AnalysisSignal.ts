export type AnalysisSignal =
    | {
    kind: 'language';
    value: string;
}
    | {
    kind: 'framework';
    value: string;
};