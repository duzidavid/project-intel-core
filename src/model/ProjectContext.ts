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
    files: {
        path: string;
        size: number;
    }[];

    /**
     * Detected high-level project signals
     * (frameworks, languages, tooling, etc.)
     */
    signals: string[];

    /**
     * Detected risks or warnings.
     */
    risks: string[];
};