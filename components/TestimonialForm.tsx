'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Star, StarHalf } from 'lucide-react';

export default function TestimonialForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    feedback: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, rating }),
      });
      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        setFormData({ fullname: '', email: '', feedback: '' });
        setRating(0);
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      alert("An error occurred while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - left) / width;
    if (percent < 0.5) {
      setHoverRating(index + 0.5);
    } else {
      setHoverRating(index + 1);
    }
  };

  const renderStars = () => {
    const stars = [];
    const currentRating = hoverRating > 0 ? hoverRating : rating;
    for (let i = 0; i < 5; i++) {
      const isHalf = currentRating - i === 0.5;
      const isFull = currentRating - i >= 1;
      stars.push(
        <div
          key={i}
          className="relative cursor-pointer text-slate-400 hover:text-yellow-400 transition-colors"
          onMouseMove={(e) => handleMouseMove(e, i)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setRating(hoverRating)}
        >
          {isFull ? (
            <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
          ) : isHalf ? (
            <div className="relative w-8 h-8">
              <Star className="w-8 h-8 absolute text-yellow-400" />
              <div className="absolute overflow-hidden w-4 h-8 text-yellow-400">
                <Star className="w-8 h-8 fill-yellow-400" />
              </div>
            </div>
          ) : (
            <Star className="w-8 h-8 text-yellow-400 opacity-30" />
          )}
        </div>
      );
    }
    return stars;
  };

  return (
    <div className="mt-20 max-w-3xl mx-auto bg-brand-navy rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 text-white">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Share Your Experience</h3>
          <p className="text-slate-300">We value your feedback. Let us know how we did!</p>
        </div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <CheckCircle2 className="w-16 h-16 text-brand-orange mb-4" />
            <h4 className="text-xl font-bold mb-2">Thank You!</h4>
            <p className="text-slate-300">Your feedback has been submitted for review.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Rate Your Experience
              </label>
              <div className="flex gap-2">
                {renderStars()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  required
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="feedback" className="flex justify-between items-center block text-sm font-medium text-slate-300 mb-2">
                <span>Share Feedback</span>
                <span className={`text-xs ${formData.feedback.length < 25 ? 'text-brand-orange' : 'text-slate-400'}`}>
                  {formData.feedback.length}/500
                </span>
              </label>
              <textarea
                id="feedback"
                required
                minLength={25}
                maxLength={500}
                rows={4}
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all resize-none"
                placeholder="Tell us about your project and experience with Blueprint BuildCon..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-orange text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
            >
              <span>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</span>
              {!isSubmitting && <Send className="w-5 h-5" />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
