import { AnalysisInput } from './AnalysisInput';
import { FileScanner } from '../fs/FileScanner';
import { ProjectContext } from '../model/ProjectContext';
import { LanguageAnalyzer } from '../analyzers/LanguageAnalyzer';

export function analyzeProject(input: AnalysisInput): ProjectContext {
    const scanner = new FileScanner(input.rootPath, input.limits);
    const files = scanner.scan();

    const analyzers = [
        new LanguageAnalyzer()
    ];

    const signals: string[] = [];
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