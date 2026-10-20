import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Sparkles, HelpCircle, PhoneCall, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/mockData';
import { AdBanner } from '../components/AdBanner';

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Try at Home', 'Quality & Gold', 'Shipping & Delivery', 'Returns & Exchange', 'Ring Sizing'];

  const filteredFaqs = FAQS.filter((f) => {
    if (activeCategory === 'All') return true;
    return f.category === activeCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#3D2153] to-[#4F3267] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
            <span>Customer Knowledge Base</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-purple-100 font-light">
            Everything you need to know about our Try at Home service, gold hallmarking, diamond certifications, and return policies.
          </p>
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-[#4F3267] text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion list */}
        <div className="bg-white rounded-2xl border border-purple-100 divide-y divide-gray-100 overflow-hidden shadow-xs">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="p-4 sm:p-5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left gap-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F3267] bg-purple-50 px-2 py-0.5 rounded">
                      {faq.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-[#4F3267]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-3 text-xs text-gray-600 leading-relaxed pl-1 pt-1 border-t border-gray-50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Card */}
        <div className="bg-purple-50/60 p-6 rounded-2xl border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <h4 className="font-bold text-gray-900">Still have questions?</h4>
            <p className="text-gray-500 mt-0.5">Our jewellery consultants are available 7 days a week, 10am to 9pm.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="px-4 py-2 bg-[#4F3267] text-white font-semibold rounded-lg hover:bg-[#3D2153] transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Ad Section (As requested) */}
      <AdBanner />
    </div>
  );
};
