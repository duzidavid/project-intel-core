import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';

import { analyzeProject } from '../../src/analysis/analyzeProject';

const limits = {
    maxFiles: 50,
    maxFileSizeBytes: 10_000,
    maxTotalBytes: 100_000,
    maxDirectoryDepth: 5,
    timeoutMs: 5_000,
    allowedExtensions: ['.ts', '.json', '.md']
};

describe('analyzeProject (pipeline)', () => {
    it('produces signals and risks from real project files', () => {
        const root = fs.mkdtempSync(
            path.join(os.tmpdir(), 'project-intel-')
        );

        // ── project files ──────────────────────────────────────────
        fs.writeFileSync(
            path.join(root, 'index.ts'),
            'export const x = 1;'
        );

        fs.writeFileSync(
            path.join(root, 'package.json'),
            JSON.stringify({
                license: 'GPL-3.0',
                dependencies: {
                    react: '^18.0.0'
                }
            })
        );

        // ── analyze ────────────────────────────────────────────────
        const ctx = analyzeProject({
            rootPath: root,
            limits
        });

        // ── meta ───────────────────────────────────────────────────
        expect(ctx.meta.fileCount).toBe(2);
        expect(ctx.signals.length).toBeGreaterThan(0);
        expect(ctx.risks.length).toBeGreaterThan(0);

        // ── signals ────────────────────────────────────────────────
        expect(ctx.signals).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    kind: 'language',
                    code: 'language.typescript'
                }),
                expect.objectContaining({
                    kind: 'license',
                    code: 'license.gpl-3.0'
                }),
                expect.objectContaining({
                    kind: 'dependency',
                    code: 'dependency.react'
                })
            ])
        );

        // ── risks ──────────────────────────────────────────────────
        expect(ctx.risks).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    category: 'legal',
                    severity: 'high',
                    code: 'risk.license.gpl'
                })
            ])
        );
    });
});