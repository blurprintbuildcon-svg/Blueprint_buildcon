'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';

const categories = ['Featured', 'Buildings', 'Civil', 'Industrial', 'Special Projects'] as const;
type Category = (typeof categories)[number];

const matchesCategory = (category: Category, projectCategory: string) => {
  if (category === 'Featured') return true;
  if (category === 'Buildings') return ['Residential', 'Villas'].includes(projectCategory);
  if (category === 'Civil') return projectCategory === 'Commercial';
  if (category === 'Industrial') return projectCategory === 'Commercial';
  return projectCategory === 'Renovation';
};

export default function AboutProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState<Category>('Featured');
  const visibleProjects = projects.filter((project) => matchesCategory(activeCategory, project.category));

  return (
    <section id="our-work" className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-brand-orange">Selected work</p>
            <h2 className="max-w-xl text-4xl font-bold leading-tight text-brand-navy md:text-5xl">
              Built with purpose. Made to last.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-slate-500">
            A selection of spaces shaped by thoughtful planning, exacting execution, and a deep respect for the people who use them.
          </p>
        </div>

        <div className="mb-12 flex gap-7 overflow-x-auto border-b border-slate-200 pb-0" role="tablist" aria-label="Project categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={`relative shrink-0 pb-4 text-sm font-bold transition-colors ${
                activeCategory === category ? 'text-brand-navy' : 'text-slate-400 hover:text-brand-navy'
              }`}
            >
              {category}
              {activeCategory === category && <span className="absolute bottom-0 left-0 h-1 w-full bg-brand-orange" />}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-x-6 gap-y-12 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Link href={`/projects/${project.id}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">
                <div className="relative aspect-[1.48] overflow-hidden bg-brand-gray">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-navy/0 transition-colors duration-500 group-hover:bg-brand-navy/35" />
                  <span className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center bg-brand-orange text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 shadow-md">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 pt-5">
                  <div>
                    <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-orange transition-colors">{project.title}</h3>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Location <span className="text-brand-navy">{project.location}</span>
                    </p>
                  </div>
                  <span className="pt-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">{project.category}</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}