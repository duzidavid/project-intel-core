import { FileEntry } from '../../src/fs/FileEntry';

export function file(
    relativePath: string,
    overrides?: Partial<FileEntry>
): FileEntry {
    return {
        relativePath,
        absolutePath: '',
        size: 1,
        content: '',
        ...overrides
    };
}