import fs from 'fs';
import path from 'path';
import { AnalysisLimits } from '../analysis';
import { FileEntry } from './FileEntry';

export class FileScanner {
  private readonly rootPath: string;
  private readonly limits: AnalysisLimits;

  private fileCount = 0;
  private totalBytes = 0;
  private readonly startTime = Date.now();

  constructor(rootPath: string, limits: AnalysisLimits) {
    this.rootPath = fs.realpathSync(rootPath);
    this.limits = limits;
  }

  scan(): FileEntry[] {
    const results: FileEntry[] = [];
    this.scanDirectory(this.rootPath, 0, results);
    return results;
  }

  private scanDirectory(currentPath: string, depth: number, results: FileEntry[]): void {
    this.enforceTimeout();
    this.enforceDepth(depth);

    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      this.enforceTimeout();

      const absolute = path.join(currentPath, entry.name);
      const real = fs.realpathSync(absolute);

      // Prevent path traversal
      if (!real.startsWith(this.rootPath)) {
        continue;
      }

      // Ignore symlinks
      if (entry.isSymbolicLink()) {
        continue;
      }

      if (entry.isDirectory()) {
        this.scanDirectory(real, depth + 1, results);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      this.processFile(real, results);
    }
  }

  private processFile(absolutePath: string, results: FileEntry[]): void {
    this.enforceTimeout();
    this.enforceFileLimit();

    const stat = fs.statSync(absolutePath);

    if (stat.size > this.limits.maxFileSizeBytes) {
      return;
    }

    const ext = path.extname(absolutePath).toLowerCase();
    if (!this.limits.allowedExtensions.includes(ext)) {
      return;
    }

    const content = fs.readFileSync(absolutePath, 'utf8');

    this.fileCount += 1;
    this.totalBytes += stat.size;

    if (this.totalBytes > this.limits.maxTotalBytes) {
      throw new Error('Analysis aborted: total file size limit exceeded');
    }

    results.push({
      relativePath: path.relative(this.rootPath, absolutePath).split(path.sep).join('/'),
      absolutePath,
      size: stat.size,
      content,
    });
  }

  private enforceFileLimit(): void {
    if (this.fileCount >= this.limits.maxFiles) {
      throw new Error('Analysis aborted: file count limit exceeded');
    }
  }

  private enforceDepth(depth: number): void {
    if (depth > this.limits.maxDirectoryDepth) {
      throw new Error('Analysis aborted: directory depth limit exceeded');
    }
  }

  private enforceTimeout(): void {
    if (Date.now() - this.startTime > this.limits.timeoutMs) {
      throw new Error('Analysis aborted: timeout exceeded');
    }
  }
}
