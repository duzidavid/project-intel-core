import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { analyzeProject } from '../../src';

const limits = {
    maxFiles: 10,
    maxFileSizeBytes: 1000,
    maxTotalBytes: 5000,
    maxDirectoryDepth: 5,
    timeoutMs: 5000,
    allowedExtensions: ['.ts']
};

describe('analyzeProject', () => {
    it('returns ProjectContext with file metadata', () => {
        const root = fs.mkdtempSync(path.join(os.tmpdir(), 'core-test-'));
        fs.writeFileSync(path.join(root, 'a.ts'), 'export const x = 1');

        const ctx = analyzeProject({ rootPath: root, limits });

        expect(ctx.meta.fileCount).toBe(1);
        expect(ctx.files).toHaveLength(1);

        const file = ctx.files[0]!;
        expect(file.path).toBe('a.ts');
    });
});