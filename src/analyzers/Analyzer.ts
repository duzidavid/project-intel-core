import { FileEntry } from '../fs';
import { AnalysisSignal, AnalysisRisk } from '../model';

export type AnalyzerResult = {
    signals: AnalysisSignal[];
    risks: AnalysisRisk[];
};

export interface Analyzer {
    readonly name: string;
    analyze(files: FileEntry[]): AnalyzerResult;
}