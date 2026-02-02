import { describe, it, expect } from 'vitest';
import { LanguageAnalyzer } from '../../src/analyzers/LanguageAnalyzer';
import { file } from '../helpers/fileEntry';

describe('LanguageAnalyzer', () => {
    it('emits language signals for detected file extensions', () => {
        const analyzer = new LanguageAnalyzer();

        const result = analyzer.analyze([
            file('src/index.ts'),
            file('README.md'),
            file('config.json')
        ]);

        expect(result.signals).toEqual(
            expect.arrayContaining([
                {
                    kind: 'language',
                    value: 'TypeScript',
                    source: 'LanguageAnalyzer',
                    confidence: 1
                },
                {
                    kind: 'language',
                    value: 'Markdown',
                    source: 'LanguageAnalyzer',
                    confidence: 1
                },
                {
                    kind: 'language',
                    value: 'JSON',
                    source: 'LanguageAnalyzer',
                    confidence: 1
                }
            ])
        );
    });
});