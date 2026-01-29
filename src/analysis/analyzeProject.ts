import { AnalysisInput } from './AnalysisInput';
import { FileScanner } from '../fs/FileScanner';
import { ProjectContext } from '../model/ProjectContext';

export function analyzeProject(input: AnalysisInput): ProjectContext {
    const scanner = new FileScanner(input.rootPath, input.limits);
    const files = scanner.scan();

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
        signals: [],
        risks: []
    };
}