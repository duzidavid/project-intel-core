import { describe, it, expect } from 'vitest';
import { LanguageAnalyzer } from '../../src/analyzers/LanguageAnalyzer';

describe('LanguageAnalyzer', () => {
    it('detects languages based on file extensions', () => {
        const analyzer = new LanguageAnalyzer();

        const result = analyzer.analyze([
            { relativePath: 'src/index.ts', absolutePath: '', size: 10, content: '' },
            { relativePath: 'README.md', absolutePath: '', size: 10, content: '' },
            { relativePath: 'config.json', absolutePath: '', size: 10, content: '' }
        ]);

        expect(result.signals).toContain('language:TypeScript');
        expect(result.signals).toContain('language:Markdown');
        expect(result.signals).toContain('language:JSON');
    });
});