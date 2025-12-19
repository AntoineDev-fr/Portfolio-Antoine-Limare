import { NextRequest, NextResponse } from 'next/server';
import { projectDb, type DbProject } from '@/lib/db';
import { deleteImageAt, saveProjectImage } from '@/lib/uploads';

export const runtime = 'nodejs';

const serializeProject = (project: DbProject) => ({
  ...project,
  imageUrl: project.imagePath ? `/${project.imagePath.replace(/\\+/g, '/')}` : null,
});

const parseFeatures = (formData: FormData): string[] | undefined => {
  const hasFeaturesField = formData.has('features') || formData.getAll('features').length > 0;
  if (!hasFeaturesField) return undefined;

  const entries = formData.getAll('features').filter((value) => typeof value === 'string') as string[];
  const collected = entries.length
    ? entries
    : (typeof formData.get('features') === 'string' ? [formData.get('features') as string] : []);
  const features: string[] = [];

  for (const entry of collected) {
    if (!entry) continue;
    try {
      const parsed = JSON.parse(entry);
      if (Array.isArray(parsed)) {
        features.push(...parsed.filter((item) => typeof item === 'string').map((item) => item.trim()).filter(Boolean));
        continue;
      }
    } catch {
      // ignore JSON parsing errors
    }
    features.push(...entry.split(/[\n,]/).map((item) => item.trim()).filter(Boolean));
  }

  return features;
};

const getId = (params: { id: string }) => {
  const id = Number(params.id);
  return Number.isFinite(id) ? id : null;
};

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const id = getId(params);
  if (!id) {
    return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });
  }

  const project = projectDb.get(id);
  if (!project) {
    return NextResponse.json({ error: 'Projet introuvable.' }, { status: 404 });
  }

  return NextResponse.json({ project: serializeProject(project) });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = getId(params);
  if (!id) {
    return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });
  }

  try {
    const existing = projectDb.get(id);
    if (!existing) {
      return NextResponse.json({ error: 'Projet introuvable.' }, { status: 404 });
    }

    const formData = await req.formData();
    const nextTitle = formData.has('title') ? (formData.get('title') as string | null)?.trim() : undefined;
    const nextDescription = formData.has('description')
      ? (formData.get('description') as string | null)?.trim()
      : undefined;
    const nextStack = formData.has('stack') ? (formData.get('stack') as string | null)?.trim() ?? null : undefined;
    const nextFeatures = parseFeatures(formData);
    const imageFile = formData.get('image');

    let imagePath = existing.imagePath;
    if (imageFile instanceof File && imageFile.size > 0) {
      const stored = await saveProjectImage(imageFile);
      await deleteImageAt(existing.imagePath);
      imagePath = stored?.relativePath ?? null;
    }

    const updated = projectDb.update(id, {
      title: nextTitle ?? existing.title,
      description: nextDescription ?? existing.description,
      stack: nextStack ?? existing.stack,
      features: nextFeatures ?? existing.features,
      imagePath,
    });

    return NextResponse.json({ project: serializeProject(updated) });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Erreur inattendue lors de la mise à jour.' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = getId(params);
  if (!id) {
    return NextResponse.json({ error: 'Identifiant invalide.' }, { status: 400 });
  }

  try {
    const removed = projectDb.delete(id);
    if (removed?.imagePath) {
      await deleteImageAt(removed.imagePath);
    }
    if (!removed) {
      return NextResponse.json({ error: 'Projet introuvable ou déjà supprimé.' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Erreur inattendue lors de la suppression.' },
      { status: 500 },
    );
  }
}
