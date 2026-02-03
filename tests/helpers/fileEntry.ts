import { FileEntry } from '../../src/fs/FileEntry';

export const file = (path: string, content = ''): FileEntry => ({
  relativePath: path,
  absolutePath: path,
  size: content.length,
  content,
});
