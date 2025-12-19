import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.join(process.cwd(), 'projet_portfolio.db');

// Ensure the database file exists alongside the app
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '');
}

export type DbProject = {
  id: number;
  title: string;
  description: string;
  stack: string | null;
  features: string[];
  imagePath: string | null;
  createdAt: string;
  updatedAt: string;
};

const db = new Database(dbPath);

// Simple migration to keep schema in sync
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    stack TEXT,
    features TEXT DEFAULT '[]',
    image_path TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );
`);

const normaliseRow = (row: any): DbProject => ({
  id: row.id,
  title: row.title,
  description: row.description,
  stack: row.stack ?? null,
  features: row.features ? JSON.parse(row.features) : [],
  imagePath: row.image_path ?? null,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const projectDb = {
  all(): DbProject[] {
    const rows = db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();
    return rows.map(normaliseRow);
  },

  get(id: number): DbProject | undefined {
    const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    return row ? normaliseRow(row) : undefined;
  },

  create(data: Omit<DbProject, 'id' | 'createdAt' | 'updatedAt'>): DbProject {
    const stmt = db.prepare(
      `INSERT INTO projects (title, description, stack, features, image_path)
       VALUES (@title, @description, @stack, @features, @image_path)`,
    );
    const featuresJson = JSON.stringify(data.features ?? []);
    const info = stmt.run({
      title: data.title,
      description: data.description,
      stack: data.stack ?? null,
      features: featuresJson,
      image_path: data.imagePath ?? null,
    });
    const created = this.get(Number(info.lastInsertRowid));
    if (!created) {
      throw new Error('Project creation failed');
    }
    return created;
  },

  update(id: number, data: Partial<Omit<DbProject, 'id' | 'createdAt' | 'updatedAt'>>): DbProject {
    const existing = this.get(id);
    if (!existing) {
      throw new Error('Project not found');
    }

    const next: DbProject = {
      ...existing,
      ...data,
      features: data.features ?? existing.features,
      imagePath: data.imagePath ?? existing.imagePath,
      updatedAt: new Date().toISOString(),
    };

    db.prepare(
      `UPDATE projects
       SET title = @title,
           description = @description,
           stack = @stack,
           features = @features,
           image_path = @image_path,
           updated_at = datetime('now')
       WHERE id = @id`,
    ).run({
      id,
      title: next.title,
      description: next.description,
      stack: next.stack ?? null,
      features: JSON.stringify(next.features ?? []),
      image_path: next.imagePath ?? null,
    });

    const updated = this.get(id);
    if (!updated) {
      throw new Error('Project update failed');
    }
    return updated;
  },

  delete(id: number): DbProject | undefined {
    const existing = this.get(id);
    if (!existing) return undefined;
    db.prepare('DELETE FROM projects WHERE id = ?').run(id);
    return existing;
  },
};
