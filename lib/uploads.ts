import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
const maxSize = 6 * 1024 * 1024; // 6MB
const mimeExtension: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/webp': '.webp',
};

const ensureUploadsDir = async () => {
  await fs.promises.mkdir(uploadsDir, { recursive: true });
};

export async function saveProjectImage(file: File) {
  if (!file || file.size === 0) {
    return null;
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Le fichier doit être une image.');
  }

  if (!mimeExtension[file.type]) {
    throw new Error('Format d’image non pris en charge (png, jpg, webp).');
  }

  if (file.size > maxSize) {
    throw new Error('Image trop volumineuse (max 6MB).');
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = mimeExtension[file.type] || path.extname(file.name) || '.png';
  const fileName = `${Date.now()}-${randomUUID()}${ext}`;

  await ensureUploadsDir();
  const absolutePath = path.join(uploadsDir, fileName);
  await fs.promises.writeFile(absolutePath, buffer);

  return {
    relativePath: path.posix.join('uploads', fileName),
    absolutePath,
  };
}

export async function deleteImageAt(relativePath: string | null | undefined) {
  if (!relativePath) return;
  const normalized = relativePath.replace(/\\/g, '/');
  const absolutePath = path.join(process.cwd(), 'public', normalized);
  try {
    await fs.promises.unlink(absolutePath);
  } catch (error: any) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }
}

