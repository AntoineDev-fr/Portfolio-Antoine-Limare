'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Glow } from '@/components/Glow';
import { TimelineItem } from '@/components/TimelineItem';
import { projects, skills, softSkills, timeline } from '@/lib/data';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [copyLabel, setCopyLabel] = useState("Copier l'email");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('antoine.limare.dev.pro@gmail.com');
      setCopyLabel('Copie !');
      setTimeout(() => setCopyLabel("Copier l'email"), 2000);
    } catch (error) {
      setCopyLabel('Copie impossible');
    }
  };

  const heroHighlights = useMemo(
    () => [
      'Front-end (React/Next.js) avec focus accessibilité et performances.',
      'Design system léger, micro-interactions, animations Framer Motion.',
      'Collaboration fluide, documentation concise, livraison soignée.',
    ],
    [],
  );

  return (
    <div className="relative">
      <div className="noise-overlay" aria-hidden />
      <Glow className="-left-24 top-10 h-64 w-64" />
      <Glow className="right-10 top-40 h-72 w-72" />
      <Navbar />
      <main>
        <Section id="hero" className="pt-10 pb-20">
          <Container className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6 }} className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden />
                Portfolio — Antoine Limare
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">Développeur web</h1>
                <p className="text-lg text-white/80">Concepteur développeur d’applications — Rouen, France.</p>
              </div>
              <p className="max-w-2xl text-white/70 leading-relaxed text-base md:text-lg">
                Interfaces modernes, animées et accessibles, pensées mobile-first. J’aime livrer des produits clairs,
                maintenables et performants en React / Next.js avec un design sobre.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button href="#projets" variant="primary">
                  Voir mes projets
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button href="#contact" variant="ghost">
                  Me contacter
                </Button>
                <Link
                  href="https://github.com/AntoineDev-fr"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-primary hover:text-primary"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/antoine-limare-17aab62ab/"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-primary hover:text-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {heroHighlights.map((item) => (
                  <Card key={item} className="p-4">
                    <p className="text-sm text-white/75 leading-relaxed">{item}</p>
                  </Card>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1 } }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-br from-primary/40 via-primary/10 to-transparent rounded-full" aria-hidden />
              <Card className="p-6 border-white/15 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary font-semibold border border-primary/30">
                    AL
                  </span>
                  <div>
                    <p className="text-sm text-white/60">Basé à</p>
                    <p className="text-lg font-medium">Rouen, France</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-white/75 leading-relaxed">
                  <p>
                    Niveau débutant / intermédiaire, avec une forte appétence pour React, Next.js et le design system. Je privilégie les composants réutilisables, l’accessibilité et les performances.
                  </p>
                  <p>
                    Objectif : créer des expériences web claires, efficaces, en gardant un code lisible et maintenable.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-white/70">
                  {['HTML', 'CSS', 'JavaScript', 'Python', 'SQL', 'React', 'Next.js'].map((tag) => (
                    <Badge key={tag} className="bg-white/5">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          </Container>
        </Section>

        <Section id="apropos">
          <Container className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-12 bg-primary" aria-hidden />
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">À propos</p>
              </div>
              <h2 className="text-3xl font-semibold text-white">Qui suis-je ?</h2>
              <p className="text-white/75 leading-relaxed text-lg">
                Formé en conception et développement d’applications, je construis des interfaces web modernes en Next.js. J’aime structurer le travail, prototyper rapidement et garantir des livrables propres. Mes outils du quotidien : React, Tailwind, TypeScript, Framer Motion.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {softSkills.map((item) => (
                  <Card key={item.title} className="p-4 border-white/10">
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-xs text-white/70 leading-relaxed">{item.text}</p>
                  </Card>
                ))}
              </div>
            </div>
            <Card className="p-6 border-white/15">
              <h3 className="text-lg font-semibold text-white">Ce que j’apporte</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/75">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                  Interfaces claires et accessibles, optimisées pour le mobile en priorité.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                  Code organisé, composants réutilisables et animations discrètes qui améliorent l’expérience.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                  Collaboration fluide : documentation concise, attention aux détails et écoute des besoins.
                </li>
              </ul>
            </Card>
          </Container>
        </Section>

        <Section id="competences">
          <Container>
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-12 bg-primary" aria-hidden />
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">Compétences</p>
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-white">Stack & savoir-faire</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <Card className="p-4 border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                        <skill.icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-white">{skill.name}</h3>
                        <p className="text-xs text-white/60">{skill.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        <Section id="projets">
          <Container>
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-12 bg-primary" aria-hidden />
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">Projets</p>
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-white">Projets</h2>
            <p className="mt-2 text-white/70">Selection de projets recents : vitrine metier et applis C#.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {projects.map((project, index) => {
                const hasCode = Boolean(project.codeUrl);
                const hasDemo = Boolean(project.demoUrl);

                return (
                  <motion.div
                    key={project.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                    transition={{ delay: index * 0.08, duration: 0.45 }}
                  >
                    <Card className="flex h-full flex-col border-white/10 p-5">
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                      <p className="mt-2 text-sm text-white/70 leading-relaxed">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-primary">
                        <Badge className="bg-primary/10 border-primary/30 text-primary">{project.stack}</Badge>
                      </div>
                      <ul className="mt-4 space-y-2 text-sm text-white/75">
                        {project.features.map((feature) => (
                          <li key={feature} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          href={project.codeUrl ?? '#'}
                          disabled={!hasCode}
                          aria-label={hasCode ? 'Voir le code' : 'Code non disponible'}
                        >
                          Code
                        </Button>
                        <Button
                          variant="ghost"
                          href={project.demoUrl ?? '#'}
                          disabled={!hasDemo}
                          aria-label={hasDemo ? 'Voir la d�mo' : 'D�mo non disponible'}
                        >
                          D�mo
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </Section>
        <Section id="parcours">
          <Container className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-12 bg-primary" aria-hidden />
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">Parcours</p>
              </div>
              <h2 className="text-3xl font-semibold text-white">Étapes clés</h2>
              <p className="text-white/70 leading-relaxed">Un chemin construit progressivement, entre formation académique et premières expériences terrain.</p>
              <Card className="p-5 border-white/10">
                <h3 className="text-base font-semibold text-white">Synthèse</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  Focus sur la compréhension des fondamentaux, la rigueur du code et l’apprentissage continu. Chaque étape m’aide à consolider mes bases et à affiner mon sens produit.
                </p>
              </Card>
            </div>
            <div>
              {timeline.map((item, idx) => (
                <TimelineItem key={item.title} title={item.title} detail={item.detail} isLast={idx === timeline.length - 1} />
              ))}
            </div>
          </Container>
        </Section>

        <Section id="contact" className="pb-20">
          <Container className="max-w-3xl">
            <Card className="p-6 border-white/10">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-12 bg-primary" aria-hidden />
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">Contact</p>
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-white">Restons en contact</h2>
              <p className="mt-3 text-white/70 leading-relaxed">
                Vous avez un besoin, une idee ou simplement envie d'echanger ? Ecrivez-moi, je repondrai rapidement.
              </p>
              <div className="mt-5 space-y-3 text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" aria-hidden />
                  <Link href="mailto:antoine.limare.dev.pro@gmail.com" className="hover:text-primary transition">
                    antoine.limare.dev.pro@gmail.com
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-primary" aria-hidden />
                  <Link href="https://github.com/AntoineDev-fr" className="hover:text-primary transition">
                    github.com/AntoineDev-fr
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-primary" aria-hidden />
                  <Link href="https://www.linkedin.com/in/antoine-limare-17aab62ab/" className="hover:text-primary transition">
                    linkedin.com/in/antoine-limare-17aab62ab
                  </Link>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={handleCopy} variant="outline">
                  <Copy className="h-4 w-4" aria-hidden />
                  {copyLabel}
                </Button>
                <Button href="mailto:antoine.limare.dev.pro@gmail.com" variant="ghost">
                  Envoyer un email
                </Button>
              </div>
            </Card>
          </Container>
        </Section>
      </main>

      <footer className="border-t border-white/10 bg-dark/70 py-6">
        <Container className="flex flex-col gap-3 items-center justify-between text-sm text-white/60 md:flex-row">
          <span>© {new Date().getFullYear()} Antoine Limare</span>
          <div className="flex items-center gap-3">
            <Link href="https://github.com/AntoineDev-fr" className="hover:text-primary transition">
              GitHub
            </Link>
            <Link href="https://www.linkedin.com/in/antoine-limare-17aab62ab/" className="hover:text-primary transition">
              LinkedIn
            </Link>
            <Link href="/mentions-legales" className="hover:text-primary transition">
              Mentions légales
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  );
}
