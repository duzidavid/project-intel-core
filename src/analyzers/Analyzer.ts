import { FileEntry } from '../fs/FileEntry';

export type AnalyzerResult = {
    signals: string[];
    risks: string[];
};

export interface Analyzer {
    analyze(files: FileEntry[]): AnalyzerResult;
}