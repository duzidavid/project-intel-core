import { AnalysisLimits } from './AnalysisLimits';

/**
 * Input boundary for the core analysis engine.
 *
 * The core engine does not perform environment-specific actions
 * such as cloning repositories or handling authentication.
 * It operates strictly on an existing filesystem path.
 */
export type AnalysisInput = {
  /**
   * Absolute path to the root directory of the project to be analyzed.
   *
   * The path must exist and must point to a directory.
   * Validation of existence and access is expected to happen
   * before invoking the core engine.
   */
  rootPath: string;

  /**
   * Mandatory security and resource limits for the analysis.
   *
   * Analysis will not start without explicit limits.
   */
  limits: AnalysisLimits;
};
