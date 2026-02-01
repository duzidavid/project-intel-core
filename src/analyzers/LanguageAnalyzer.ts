import { Analyzer } from './Analyzer';
import { FileEntry } from '../fs/FileEntry';

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
        const languages = new Set<string>();

        for (const file of files) {
            const ext = file.relativePath.substring(
                file.relativePath.lastIndexOf('.')
            );

            const lang = EXTENSION_TO_LANGUAGE[ext];
            if (lang) {
                languages.add(lang);
            }
        }

        return {
            signals: Array.from(languages).map(l => `language:${l}`),
            risks: []
        };
    }
}