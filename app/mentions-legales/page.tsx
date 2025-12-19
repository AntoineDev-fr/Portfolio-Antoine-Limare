import type { Metadata } from 'next';
import { Container } from '@/components/Container';

export const metadata: Metadata = {
  title: 'Mentions légales — Antoine Limare',
};

export default function MentionsLegales() {
  return (
    <main className="section-padding">
      <Container className="space-y-6">
        <h1 className="text-3xl font-semibold text-white">Mentions légales</h1>
        <p className="text-white/70 leading-relaxed">
          Ce site est un portfolio personnel présenté par Antoine Limare, basé à Rouen, France. Les contenus et visuels sont fournis à titre informatif.
        </p>
        <div className="space-y-4 text-white/70 text-sm">
          <p>
            <strong>Éditeur :</strong> Antoine Limare — Contact : antoine.limare.dev.pro@gmail.com
          </p>
          <p>
            <strong>Hébergement :</strong> Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.
          </p>
          <p>
            <strong>Propriété intellectuelle :</strong> Reproduction ou réutilisation du contenu soumise à autorisation préalable.
          </p>
          <p>
            <strong>Données personnelles :</strong> Le formulaire de contact est non opérant (preuve de concept). Aucune donnée n’est stockée côté serveur.
          </p>
        </div>
      </Container>
    </main>
  );
}
