import { FileEntry } from '../fs/FileEntry';
import { AnalysisSignal } from '../model/AnalysisSignal';

export type AnalyzerResult = {
    signals: AnalysisSignal[];
    risks: string[];
};

export interface Analyzer {
    analyze(files: FileEntry[]): AnalyzerResult;
}