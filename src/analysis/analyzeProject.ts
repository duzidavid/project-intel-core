import { FileScanner } from '../fs';
import { ProjectContext, AnalysisSignal, AnalysisRisk } from '../model';

import { Analyzer, SignalAnalyzer,LanguageAnalyzer,PackageJsonAnalyzer,RiskMapperAnalyzer } from '../analyzers';

import { AnalysisInput } from './AnalysisInput';

export function analyzeProject(input: AnalysisInput): ProjectContext {
    // ── Scan files ────────────────────────────────────────────────
    const scanner = new FileScanner(input.rootPath, input.limits);
    const files = scanner.scan();

    // ── Phase 1: file analyzers ───────────────────────────────────
    const analyzers: Analyzer[] = [
        new LanguageAnalyzer(),
        new PackageJsonAnalyzer()
    ];

    const signals: AnalysisSignal[] = [];
    const risks: AnalysisRisk[] = [];

    for (const analyzer of analyzers) {
        const result = analyzer.analyze(files);
        signals.push(...result.signals);
        risks.push(...result.risks);
    }

    // ── Phase 2: signal analyzers ─────────────────────────────────
    const signalAnalyzers: SignalAnalyzer[] = [
        new RiskMapperAnalyzer()
    ];

    for (const analyzer of signalAnalyzers) {
        const newRisks = analyzer.analyze(signals);
        risks.push(...newRisks);
    }

    // ── Final context ─────────────────────────────────────────────
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