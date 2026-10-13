'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';
import type { PublicProject } from '@/lib/public-content';

import Link from 'next/link';

export default function ProjectsGallery({ projects: providedProjects }: { projects?: PublicProject[] }) {
  const projectData = providedProjects ?? projects;
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<PublicProject | null>(null);
  const router = useRouter();

  const categories = ['All', 'Residential', 'Villas', 'Commercial', 'Renovation'];

  const filteredProjects = filter === 'All' 
    ? projectData
    : projectData.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-6">
            Our Recent Projects
          </h2>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat
                    ? 'bg-brand-navy text-white'
                    : 'bg-brand-gray text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col bg-white"
              >
                <Link href={`/projects/${project.id}`} className="relative h-64 overflow-hidden block">
                  <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-sm">
                    {project.category}
                  </div>
                </Link>
                <div className="p-6 bg-white flex-1 flex flex-col">
                  <Link href={`/projects/${project.id}`}>
                    <h3 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-orange transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <MapPin size={16} className="mr-1 shrink-0" />
                    <span>{project.location}</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-2 flex-1">{project.description}</p>
                  <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100">
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-brand-orange font-semibold flex items-center hover:text-blue-700 transition-colors"
                    >
                      View Project <ExternalLink size={16} className="ml-2" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="text-xs text-slate-400 hover:text-brand-navy font-medium py-1 px-2.5 rounded-full hover:bg-slate-100 transition-colors"
                      title="Quick summary modal"
                    >
                      Quick Preview
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 pt-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-navy/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
            >
              <button
                className="absolute top-4 right-4 z-20 bg-white/50 backdrop-blur-md p-2 rounded-full text-brand-navy hover:bg-white transition-colors shadow-sm"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="md:w-1/2 h-64 md:h-auto relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-10 overflow-y-auto">
                <div className="inline-block bg-blue-50 text-blue-700 border border-blue-200/60 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {selectedProject.category}
                </div>
                <h2 className="text-3xl font-bold text-brand-navy mb-2">{selectedProject.title}</h2>
                <div className="flex items-center text-slate-500 mb-6">
                  <MapPin size={18} className="mr-1" />
                  <span>{selectedProject.location}</span>
                </div>
                
                <h4 className="font-semibold text-brand-navy mb-2">Project Overview</h4>
                <p className="text-slate-600 mb-6 leading-relaxed">{selectedProject.description}</p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-semibold text-brand-navy mb-2">Scope of Work</h4>
                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                      {selectedProject.scope.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-navy mb-2">Details</h4>
                    <div className="text-sm text-slate-600 space-y-2">
                      <p><span className="font-medium">Area:</span> {selectedProject.details.area}</p>
                      <p><span className="font-medium">Duration:</span> {selectedProject.details.duration}</p>
                      <p><span className="font-medium">Completion:</span> {selectedProject.details.completion}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/projects/${selectedProject.id}`}
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 py-3 bg-brand-orange text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center text-sm shadow-md"
                  >
                    View Full Details Page
                  </Link>
                  <button 
                    onClick={() => {
                      setSelectedProject(null);
                      router.push('/contact');
                    }}
                    className="flex-1 py-3 bg-brand-navy text-white rounded-lg hover:bg-slate-800 transition-colors font-semibold text-center text-sm"
                  >
                    Discuss Your Project
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
