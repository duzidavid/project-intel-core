import { describe, it, expect } from 'vitest';
import { LanguageAnalyzer } from '../../src/analyzers/LanguageAnalyzer';
import { file } from '../helpers/fileEntry';

describe('LanguageAnalyzer', () => {
    it('detects languages based on file extensions', () => {
        const analyzer = new LanguageAnalyzer();

        const result = analyzer.analyze([
            file('src/index.ts'),
            file('README.md'),
            file('config.json')
        ]);

        expect(result.signals).toContainEqual({ kind: 'language', value: 'TypeScript' });
        expect(result.signals).toContainEqual({ kind: 'language', value: 'Markdown' });
        expect(result.signals).toContainEqual({ kind: 'language', value: 'JSON' });
    });
});