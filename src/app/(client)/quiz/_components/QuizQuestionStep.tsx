'use client';

import React from 'react';
import { Compass, ArrowLeft } from 'lucide-react';
import { QuizQuestion } from '@/types';

interface QuizQuestionStepProps {
  question: QuizQuestion;
  currentStep: number;
  totalSteps: number;
  onSelectOption: (value: string) => void;
  onPrevStep: () => void;
}

export function QuizQuestionStep({
  question,
  currentStep,
  totalSteps,
  onSelectOption,
  onPrevStep,
}: QuizQuestionStepProps) {
  return (
    <div className="card-lux p-6 sm:p-12 border border-noir-800 bg-noir-900/60 shadow-2xl relative overflow-hidden">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-mono text-noir-400 mb-2">
          <span className="flex items-center gap-1.5 text-gold-400 uppercase tracking-widest">
            <Compass className="w-4 h-4" />
            Olfactory Consultation
          </span>
          <span>
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-noir-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-gold-600 to-gold-400 h-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Header */}
      <div className="mb-8">
        <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-noir-50 leading-snug mb-2">
          {question.title}
        </h2>
        <p className="text-sm text-noir-400">{question.subtitle}</p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelectOption(opt.value)}
            className="p-4 rounded-xl text-left border border-noir-800 bg-noir-950/60 hover:bg-noir-800/60 hover:border-gold-400/50 transition-all duration-200 group flex flex-col justify-between cursor-pointer"
          >
            <div>
              <h4 className="font-serif text-lg font-medium text-noir-100 group-hover:text-gold-300 transition-colors">
                {opt.label}
              </h4>
              {opt.description && (
                <p className="text-xs text-noir-400 mt-1 leading-relaxed">{opt.description}</p>
              )}
            </div>
            <div className="mt-3 flex items-center justify-end text-[11px] font-mono text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Select &rarr;</span>
            </div>
          </button>
        ))}
      </div>

      {/* Back Button */}
      {currentStep > 0 && (
        <button
          onClick={onPrevStep}
          className="text-xs text-noir-400 hover:text-noir-200 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Previous Question</span>
        </button>
      )}
    </div>
  );
}
