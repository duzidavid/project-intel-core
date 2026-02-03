import { Analyzer } from './Analyzer';
import { AnalysisSignal, AnalysisRisk } from '../model';
import { FileEntry } from '../fs';

const EXTENSION_TO_LANGUAGE: Record<string, string> = {
  '.ts': 'TypeScript',
  '.js': 'JavaScript',
  '.json': 'JSON',
  '.md': 'Markdown',
  '.yml': 'YAML',
  '.yaml': 'YAML',
};

export class LanguageAnalyzer implements Analyzer {
  readonly name = 'LanguageAnalyzer';

  analyze(files: FileEntry[]): { signals: AnalysisSignal[]; risks: AnalysisRisk[] } {
    const detected = new Set<string>();

    for (const file of files) {
      const idx = file.relativePath.lastIndexOf('.');
      if (idx === -1) continue;

      const ext = file.relativePath.slice(idx);
      const language = EXTENSION_TO_LANGUAGE[ext];

      if (language) {
        detected.add(language);
      }
    }

    const signals: AnalysisSignal[] = Array.from(detected).map((language) => ({
      kind: 'language',
      code: `language.${language.toLowerCase()}`,
      value: language,
      source: this.name,
      confidence: 1,
    }));

    return {
      signals,
      risks: [],
    };
  }
}
