import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';

import { FileScanner } from '../../src/fs';

const limits = {
  maxFiles: 10,
  maxFileSizeBytes: 1000,
  maxTotalBytes: 5000,
  maxDirectoryDepth: 5,
  timeoutMs: 5000,
  allowedExtensions: ['.ts', '.md'],
};

function createTempProject(files: Record<string, string>) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'core-test-'));
  for (const [filePath, content] of Object.entries(files)) {
    const full = path.join(root, filePath);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  }
  return root;
}

describe('FileScanner', () => {
  it('scans allowed files only', () => {
    const root = createTempProject({
      'src/index.ts': 'console.log("ok")',
      'README.md': '# test',
      'secret.env': 'NOPE',
    });

    const scanner = new FileScanner(root, limits);
    const files = scanner.scan();

    const paths = files.map((f) => f.relativePath);

    expect(paths).toHaveLength(2);
    expect(paths).toContain('src/index.ts');
    expect(paths).toContain('README.md');
  });
});
