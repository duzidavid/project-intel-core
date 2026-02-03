import { AnalysisSignal } from './AnalysisSignal';
import { AnalysisRisk } from './AnalysisRisk';
import { FileSummary } from './FileSummary';

export type ProjectContext = {
  meta: {
    analyzedAt: string;
    rootPath: string;
    fileCount: number;
  };

  /**
   * List of analyzed files (metadata only).
   * File contents are NOT exposed outside the core.
   */
  files: FileSummary[];

  /**
   * Detected high-level project signals
   * (frameworks, languages, tooling, etc.)
   */
  signals: AnalysisSignal[];

  /**
   * Detected risks or warnings.
   */
  risks: AnalysisRisk[];
};
