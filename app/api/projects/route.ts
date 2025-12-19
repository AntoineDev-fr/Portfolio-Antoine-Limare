import { NextRequest, NextResponse } from 'next/server';
import { projectDb, type DbProject } from '@/lib/db';
import { saveProjectImage } from '@/lib/uploads';

export const runtime = 'nodejs';

const serializeProject = (project: DbProject) => ({
  ...project,
  imageUrl: project.imagePath ? `/${project.imagePath.replace(/\\+/g, '/')}` : null,
});

const parseFeatures = (formData: FormData): string[] => {
  const collected: string[] = [];
  const multi = formData.getAll('features').filter((value) => typeof value === 'string') as string[];
  if (multi.length) {
    collected.push(...multi);
  } else {
    const single = formData.get('features');
    if (typeof single === 'string') {
      collected.push(single);
    }
  }

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
      // ignore JSON parsing errors, fallback to split below
    }
    features.push(...entry.split(/[\n,]/).map((item) => item.trim()).filter(Boolean));
  }

  return features;
};

export async function GET() {
  const projects = projectDb.all().map((project) => serializeProject(project));
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = (formData.get('title') as string | null)?.trim();
    const description = (formData.get('description') as string | null)?.trim();
    const stack = (formData.get('stack') as string | null)?.trim() || null;
    const features = parseFeatures(formData);
    const imageFile = formData.get('image');

    if (!title || !description) {
      return NextResponse.json({ error: 'Champs title et description requis.' }, { status: 400 });
    }

    let imagePath: string | null = null;
    if (imageFile instanceof File && imageFile.size > 0) {
      const stored = await saveProjectImage(imageFile);
      imagePath = stored?.relativePath ?? null;
    }

    const project = projectDb.create({
      title,
      description,
      stack,
      features,
      imagePath,
    });

    return NextResponse.json({ project: serializeProject(project) }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Erreur inattendue lors de la création du projet.' },
      { status: 500 },
    );
  }
}
