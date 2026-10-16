'use client';

import React, { useState } from 'react';
import { QUIZ_QUESTIONS, PRODUCTS } from '@/data/mockData';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import {
  QuizQuestionStep,
  QuizResultsSection,
  type ScoredProduct,
} from './_components';

export default function QuizPage() {
  const { addItem } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<ScoredProduct[] | null>(null);

  const question = QUIZ_QUESTIONS[currentStep];
  const totalSteps = QUIZ_QUESTIONS.length;

  const handleSelectOption = (value: string) => {
    const updated = { ...answers, [question.id]: value };
    setAnswers(updated);

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      calculateResults(updated);
    }
  };

  const calculateResults = (finalAnswers: Record<string, string>) => {
    const q1 = finalAnswers.q1; // men, women, unisex
    const q2 = finalAnswers.q2; // Fragrance family
    const q3 = finalAnswers.q3; // Occasion
    const q4 = finalAnswers.q4; // Budget
    const q5 = finalAnswers.q5; // Sillage

    const scored = PRODUCTS.filter((p) => p.status === 'active' && p.category !== 'discovery-sets').map(
      (product) => {
        let score = 0;

        // Gender match (+3 or +2)
        if (product.gender === q1) {
          score += 3;
        } else if (product.gender === 'unisex' || q1 === 'unisex') {
          score += 2;
        }

        // Family match (+4)
        if (product.fragranceFamily.toLowerCase() === q2.toLowerCase()) {
          score += 4;
        }

        // Occasion match (+2)
        if (product.occasions.some((o) => o.toLowerCase().includes(q3.toLowerCase()))) {
          score += 2;
        }

        // Budget match (+2)
        const price = product.discountPrice || product.price;
        if (q4 === 'under-3000' && price < 3000) {
          score += 2;
        } else if (q4 === '3000-5000' && price >= 3000 && price <= 5000) {
          score += 2;
        } else if (q4 === '5000+' && price >= 5000) {
          score += 2;
        }

        // Sillage match (+2 or +3)
        if (q5 === 'subtle' && product.sillage === 'Subtle') score += 2;
        if (q5 === 'moderate' && (product.sillage === 'Moderate' || product.sillage === 'Subtle'))
          score += 2;
        if (q5 === 'strong' && (product.sillage === 'Strong' || product.sillage === 'Very Strong'))
          score += 3;

        // Flags (+1 each)
        if (product.featured) score += 1;
        if (product.bestSeller) score += 1;

        // Calculate match percentage (max score approx 15)
        const matchPercentage = Math.min(99, Math.max(75, Math.round((score / 15) * 100)));

        return { product, score, matchPercentage };
      }
    );

    scored.sort((a, b) => b.score - a.score);
    setResults(scored.slice(0, 3));
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setResults(null);
  };

  const handleAddToCart = (product: Product) => {
    addItem(product, product.sizes[0], 1);
  };

  return (
    <div className="container-lux py-12 max-w-4xl min-h-[75vh] flex flex-col justify-center">
      {results === null ? (
        <QuizQuestionStep
          question={question}
          currentStep={currentStep}
          totalSteps={totalSteps}
          onSelectOption={handleSelectOption}
          onPrevStep={() => setCurrentStep((prev) => prev - 1)}
        />
      ) : (
        <QuizResultsSection
          results={results}
          onAddToCart={handleAddToCart}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
