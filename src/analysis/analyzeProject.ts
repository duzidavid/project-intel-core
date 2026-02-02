import { FileScanner } from '../fs';
import { ProjectContext,AnalysisSignal, AnalysisRisk } from '../model';
import { LanguageAnalyzer } from '../analyzers';

import { AnalysisInput } from './AnalysisInput';




export function analyzeProject(input: AnalysisInput): ProjectContext {
    const scanner = new FileScanner(input.rootPath, input.limits);
    const files = scanner.scan();

    const analyzers = [
        new LanguageAnalyzer()
    ];

    const signals: AnalysisSignal[] = [];
    const risks: AnalysisRisk[] = [];

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