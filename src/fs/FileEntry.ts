export type FileEntry = {
    /**
     * Path relative to analysis root.
     * Always normalized with forward slashes.
     */
    relativePath: string;

    /**
     * Absolute path on filesystem.
     * Internal use only – never exposed outside core.
     */
    absolutePath: string;

    /**
     * File size in bytes.
     */
    size: number;

    /**
     * File content as UTF-8 string.
     */
    content: string;
};