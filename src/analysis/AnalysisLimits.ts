    /**
 * Hard security and resource limits for a single analysis run.
 *
 * These limits are mandatory and must be provided by the caller.
 * The core engine will NOT run without explicit limits.
 *
 * Limits are enforced strictly to protect against:
 * - denial of service (DoS)
 * - zip bombs
 * - path traversal attacks
 * - excessive memory or CPU usage
 */
export type AnalysisLimits = {
  /**
   * Maximum number of files that may be processed.
   */
  maxFiles: number;

  /**
   * Maximum size of a single file in bytes.
   * Files exceeding this limit are skipped.
   */
  maxFileSizeBytes: number;

  /**
   * Maximum total size of all processed files in bytes.
   * Once exceeded, analysis must abort.
   */
  maxTotalBytes: number;

  /**
   * Maximum allowed directory depth relative to the root path.
   */
  maxDirectoryDepth: number;

  /**
   * Maximum duration of the analysis in milliseconds.
   * Once exceeded, analysis must terminate immediately.
   */
  timeoutMs: number;

  /**
   * Whitelisted file extensions that are allowed to be analyzed.
   * All other files are ignored.
   *
   * Example: ['.ts', '.js', '.json', '.md']
   */
  allowedExtensions: string[];
};