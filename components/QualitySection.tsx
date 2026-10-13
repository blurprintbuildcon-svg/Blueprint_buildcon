'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function QualitySection() {
  const stages = [
    'Planning',
    'Material Selection',
    'Foundation',
    'Structural Work',
    'Electrical & Plumbing',
    'Finishing',
    'Inspection',
    'Handover'
  ];

  return (
    <section className="overflow-hidden border-t border-slate-100 bg-white py-20 text-brand-navy lg:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 border border-brand-orange/30 bg-brand-gray px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            <ShieldCheck size={17} />
            Quality Assurance
          </div>
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            Quality at <span className="text-brand-orange">every stage.</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-500">
            Professional supervision, documented processes, and regular checks keep every detail built to last.
          </p>
        </motion.div>

        <div className="overflow-x-auto pb-5 [scrollbar-color:#e46b3c_transparent]">
          <div className="relative mx-auto min-w-230 max-w-7xl px-2 pt-2">
            <div className="absolute left-[6.25%] right-[6.25%] top-[2.1rem] h-px bg-slate-200" />
            <div className="relative grid grid-cols-8 gap-3">
              {stages.map((stage, idx) => (
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="group text-center"
                >
                  <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-brand-orange text-sm font-bold text-white shadow-[0_4px_14px_rgba(19,96,226,0.3)] transition-transform duration-300 group-hover:scale-110">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="mt-7 min-h-28 border-t-2 border-transparent px-2 pt-4 transition-colors group-hover:border-brand-orange">
                    <CheckCircle2 className="mx-auto mb-3 text-brand-orange" size={18} />
                    <h3 className="text-sm font-bold leading-5 text-brand-navy">{stage}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
