import { describe, it, expect } from 'vitest';
import { LanguageAnalyzer } from '../../src/analyzers';
import {file} from '../helpers/fileEntry';



describe('LanguageAnalyzer', () => {
    it('emits language signals for detected file extensions', () => {
        const analyzer = new LanguageAnalyzer();

        const result = analyzer.analyze([
            file('src/index.ts'),
            file('README.md'),
            file('config.json')
        ]);

        expect(result.risks).toHaveLength(0);

        expect(result.signals).toEqual(
            expect.arrayContaining([
                {
                    kind: 'language',
                    code: 'language.typescript',
                    value: 'TypeScript',
                    source: 'LanguageAnalyzer',
                    confidence: 1
                },
                {
                    kind: 'language',
                    code: 'language.markdown',
                    value: 'Markdown',
                    source: 'LanguageAnalyzer',
                    confidence: 1
                },
                {
                    kind: 'language',
                    code: 'language.json',
                    value: 'JSON',
                    source: 'LanguageAnalyzer',
                    confidence: 1
                }
            ])
        );
    });
});