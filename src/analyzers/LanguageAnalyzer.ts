import { AnalysisSignal } from '../model';
import { FileEntry } from '../fs';
import { Analyzer } from './Analyzer';

const EXTENSION_TO_LANGUAGE: Record<string, string> = {
    '.ts': 'TypeScript',
    '.js': 'JavaScript',
    '.json': 'JSON',
    '.md': 'Markdown',
    '.yaml': 'YAML',
    '.yml': 'YAML'
};

export class LanguageAnalyzer implements Analyzer {
    analyze(files: FileEntry[]) {
        const found = new Set<string>();

        for (const file of files) {
            const ext = file.relativePath.slice(file.relativePath.lastIndexOf('.'));
            const lang = EXTENSION_TO_LANGUAGE[ext];
            if (lang) {
                found.add(lang);
            }
        }

        const signals: AnalysisSignal[] = Array.from(found).map(value => ({
            kind: 'language',
            value,
            source: 'LanguageAnalyzer',
            confidence: 1
        }));

        return {
            signals,
            risks: []
        };
    }
}