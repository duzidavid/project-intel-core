import { FileScanner } from '@core/fs/FileScanner';
import { ProjectContext,AnalysisSignal } from '@core/model';

import { AnalysisInput } from './AnalysisInput';


import { LanguageAnalyzer } from '../analyzers/LanguageAnalyzer';

export function analyzeProject(input: AnalysisInput): ProjectContext {
    const scanner = new FileScanner(input.rootPath, input.limits);
    const files = scanner.scan();

    const analyzers = [
        new LanguageAnalyzer()
    ];

    const signals: AnalysisSignal[] = [];
    const risks: string[] = [];

    for (const analyzer of analyzers) {
        const result = analyzer.analyze(files);
        signals.push(...result.signals);
        risks.push(...result.risks);
    }

    return {
        meta: {
            analyzedAt: new Date().toISOString(),
            rootPath: input.rootPath,
            fileCount: files.length
        },
        files: files.map(f => ({
            path: f.relativePath,
            size: f.size
        })),
        signals,
        risks
    };
}